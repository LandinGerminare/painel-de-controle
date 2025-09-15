import { priceApi } from "@/api/priceApi";
import ModalSendWhatsapp from "@/components/CheckPriceComponent/ModalSendWhatsapp";
import Button from "@/components/FormComponents/Button";
import InputPriceComponent from "@/components/FormComponents/InputPriceComponent";
import Layout from "@/components/Layout";
import useModal from "@/context/Modal";
import Loading from "@/lib/Loading";
import { PriceCity } from "@/types/Cities";
import { DwPdf } from "@/utils/DownloadPdf";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { toast } from "react-toastify";

export default function CheckPrice() {
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState<PriceCity[]>([]);
  const [sendPdf, setSendPdf] = useState()
  const [isHovered, setIsHovered] = useState(false);
  const { setModalContent } = useModal();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await priceApi.get("/v1/prices/all-today-prices");

        setCities(response.data);
      } catch (error: any) {
        toast.error("Erro ao carregar preços.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePdf = async () => {
    try {
      setLoading(true);
      const payload = cities.map((c) => ({
        ...c,
        value: Number(c.value_market),
      }));

      const response = await priceApi.post("/v1/prices/generate-pdf", payload, {
        responseType: "arraybuffer",
      });
      setSendPdf(response.data)
      DwPdf(response)

      toast.success("PDF baixado com sucesso!");
    } catch (error: any) {
      toast.error("Erro ao gerar PDF");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (cityId: number, value: string) => {
    const numericValue = parseFloat(value) || 0;
    setCities(prev =>
      prev.map(city =>
        city.city_id === cityId
          ? { ...city, value_market: numericValue }
          : city
      )
    );
  };

  if (loading) {
    return (
      <Layout>
        <Loading />
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="w-full flex justify-center">
        <div className="gap-4 max-w-6xl flex flex-col w-full">
          <h1 className="text-white text-center text-4xl font-bold">Conferir Preços</h1>

          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-4">
              {cities.length > 0 ? (
                cities.map((city, index) => {
                  return (
                    <InputPriceComponent
                      key={city.city_id}
                      value={city?.value_market !== null ? String(city.value_market) : ""}
                      onChange={(value) => handleChange(city.city_id, value)}
                      city={city.city_name}
                    />
                  )
                })
              ) : (
                <p className="text-white">Nenhuma cidade encontrada.</p>
              )}
            </div>
            <div className="flex w-full gap-4">
              <Button containerStyle={"w-full"} title="Gerar Pdf" onClick={handlePdf} />
              <Button
                title="Enviar Planilha"
                onClick={() => {
                  sendPdf ? setModalContent(<ModalSendWhatsapp sendPdf={sendPdf} />) : toast.warning("Favor Gerar o PDF.");
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                  width: "100%",
                  fontWeight: "600",
                  color: isHovered ? "#62E390" : "#4EB673",
                  borderColor: isHovered ? "#62E390" : "#4EB673",
                  borderWidth: "1px",
                  borderStyle: "solid",
                }}
              >
                <FaWhatsapp size={20} className="mb-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout >
  );
}