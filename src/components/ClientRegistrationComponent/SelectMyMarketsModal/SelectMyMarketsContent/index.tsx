import InputPrimary from "@/components/FormComponents/InputPrimary";
import { useState } from "react";
import MarketItem from "./MarketItem";
import Button from "@/components/FormComponents/Button";

interface SelectMyMarketsContentProps {
  inactiveMarkets: AvailableMarket[];
  activeMarkets: AvailableMarket[];
  setActiveMarkets: (markets: AvailableMarket[]) => void;
  setInactiveMarkets: (markets: AvailableMarket[]) => void;
  setOpenedMarketModal: (open: boolean) => void;
  onClose: (activeMarkets: AvailableMarket[]) => void;
}

export default function SelectMyMarketsContent(
  props: SelectMyMarketsContentProps
) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleActivate = (market: AvailableMarket) => {
    props.setActiveMarkets([...props.activeMarkets, market]);
    props.setInactiveMarkets(props.inactiveMarkets.filter(m => m.cd_ativo !== market.cd_ativo));
  };

  const handleDeactivate = (market: AvailableMarket) => {
    props.setInactiveMarkets([...props.inactiveMarkets, market]);
    props.setActiveMarkets(props.activeMarkets.filter(m => m.cd_ativo !== market.cd_ativo));
  };

  const filteredInactive = props.inactiveMarkets.filter(
    (m) =>
      m.praca.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.cd_ativo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredActive = props.activeMarkets.filter(
    (m) =>
      m.praca.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.cd_ativo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="w-full text-lg">Selecione quais as praças mais importantes para a sua filial</p>
        <Button
          title="Confirmar Praças"
          containerStyle={"w-1/4"}
          style={{ borderColor: '#4EB673', color: '#4EB673' }}
          onClick={() => props.onClose(props.activeMarkets)}
        />
      </div>
      <InputPrimary
        placeholder="Pesquisar praças..."
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
        containerStyle="w-full"
      />
      <div className="flex gap-4">
        <div className="w-1/2 flex flex-col gap-2">
          <h3 className="text-lg font-bold text-neutral-100">Praças Inativas</h3>
          {filteredInactive.length > 0 ? (
            filteredInactive.map((market) => (
              <MarketItem
                key={market.cd_ativo}
                market={market}
                onClick={() => handleActivate(market)}
              />
            ))
          ) : (
            <p className="text-neutral-500">Nenhuma praça inativa</p>
          )}
        </div>

        <div className="w-0 border-[1px] border-primary-900"></div>

        <div className="w-1/2 flex flex-col gap-2">
          <h3 className="text-lg font-bold text-neutral-100">Praças Ativas</h3>
          {filteredActive.length > 0 ? (
            filteredActive.map((market) => (
              <MarketItem
                key={market.cd_ativo}
                market={market}
                onClick={() => handleDeactivate(market)}
                checked={true}
              />
            ))
          ) : (
            <p className="text-neutral-500">Nenhuma praça ativa</p>
          )}
        </div>
      </div>
    </div>
  );
}
