import { Check } from "phosphor-react";

interface IMarketItem {
  market: AvailableMarket;
  onClick?: () => void;
  checked?: boolean;
}

export default function MarketItem({ market, onClick, checked }: IMarketItem) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer flex flex-row gap-3 px-4 py-3 bg-neutral-700 rounded-lg"
    >
      {checkbox(checked ?? false)}
      <p className="mt-0.5">{market.praca}</p>
    </div>
  );
}

function checkbox(isSelected: boolean) {
  if (isSelected) {
    return (
      <div className="w-7 h-7 flex flex-col justify-center items-center rounded-lg bg-primary-600">
        <Check className="text-neutral-1000 text-xl" />
      </div>
    );
  }
  return (
    <div className="w-7 h-7 rounded-lg border-[1px] border-neutral-400"></div>
  );
}
