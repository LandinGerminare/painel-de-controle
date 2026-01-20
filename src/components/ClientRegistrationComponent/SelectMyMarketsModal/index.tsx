import { motion } from "framer-motion";
import { X } from "phosphor-react";
import { useEffect, useState } from "react";
import SelectMyMarketsContent from "./SelectMyMarketsContent";
import Loading from "@/lib/Loading";

interface SelectMyMarketsModalProps {
  setOpenedMarketModal: (open: boolean) => void;
  whatsapp_number: string;
  onClose: (activeMarkets: AvailableMarket[]) => void;
}

export default function SelectMyMarketsModal({ setOpenedMarketModal, whatsapp_number, onClose }: SelectMyMarketsModalProps) {
  const [activeMarkets, setActiveMarkets] = useState<AvailableMarket[]>([]);
  const [inactiveMarkets, setInactiveMarkets] = useState<AvailableMarket[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarkets = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://germinaredata.com/api/rest/lmDtnueA/user-symbols-activate?user_number=${whatsapp_number}`,
          {
            method: "GET",
            headers: {
              "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6ImFwcDoxOCJ9.srE23jzRBrFB2pkxsXish60xQ8B6ydSBzIMhBpuefbI`,
              "Content-Type": "application/json"
            },
          }
        );

        if (!response.ok) {
          throw new Error("Erro ao buscar mercados");
        }

        const result = await response.json();
        const inativos = (result.data ?? []).filter((item: any) => !item.active);
        const ativos = (result.data ?? []).filter((item: any) => item.active);

        setInactiveMarkets(inativos);
        setActiveMarkets(ativos);
      } catch (err: any) {
        setError(err.message || "Erro inesperado");
      } finally {
        setLoading(false);
      }
    };

    fetchMarkets();
  }, []);

  const handleClose = () => {
    onClose(activeMarkets);
    setOpenedMarketModal(false);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => setOpenedMarketModal(false)}
      />
      <motion.div
        className="relative bg-neutral-900 rounded-md w-[1000px] max-h-[80vh] flex flex-col overflow-hidden shadow-xl"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center px-8 py-4 border-b border-neutral-700">
          <p className="text-white text-2xl font-semibold">Selecionar Praças</p>
          <button
            className="ml-auto bg-neutral-800 text-white p-2 rounded-lg hover:bg-neutral-700"
            onClick={handleClose}
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 flex-1 overflow-y-auto text-white scrollbar">
          {loading && <Loading />}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && (
            <SelectMyMarketsContent
              inactiveMarkets={inactiveMarkets}
              activeMarkets={activeMarkets}
              setActiveMarkets={setActiveMarkets}
              setInactiveMarkets={setInactiveMarkets}
              setOpenedMarketModal={setOpenedMarketModal}
              onClose={handleClose}
            />
          )}
        </div>
      </motion.div>
    </div>
  );
}
