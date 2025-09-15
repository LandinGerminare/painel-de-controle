import { City } from "@/types/Cities";

interface IInputProps {
  value: string;
  onChange: (value: string) => void;
  selectedCities?: City;
  disabled?: boolean;
  city?: string;
}

export default function InputPriceComponent({
  value,
  onChange,
  selectedCities,
  disabled,
  city
}: IInputProps) {
  return (
    <div className="mt-2 w-full">
      <div className="flex items-center pl-3 border-b border-neutral-600">
        <div className="shrink-0 text-base text-gray-400 select-none sm:text-sm/6">R$</div>
        <input
          type="text"
          value={value ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="0.00"
          className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
          disabled={disabled}
        />
        <div className="grid shrink-0 grid-cols-1 focus-within:relative">
          <span className="text-gray-400 text-base">
            {city
              ? city
              : `${selectedCities?.nm_cidade} - ${selectedCities?.nm_uf}`
            }
          </span>
        </div>
      </div>
    </div>
  )
}