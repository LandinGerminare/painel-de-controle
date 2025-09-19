import { useState } from "react";
import InputSecondary from "../InputSecondary";
import Toggle from "../Toggle";
import { Circle } from "phosphor-react";
import { AiFillAlert, AiOutlineDown } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";

interface IFormCityProps {
  cityId: number;
  cityName: string;
  value: string | number;
  boardingMonth: string | number;
  taxed: boolean;
  checkPrice?: boolean;
  value_traded?: string | number;
  onChange: (field: string, value: any) => void;
  isInvalid?: boolean;
}

export default function CityForm({
  cityName,
  value,
  boardingMonth,
  taxed,
  checkPrice,
  onChange,
  isInvalid,
  value_traded
}: IFormCityProps) {
  const [expand, setExpand] = useState(false);

  return (
    <div className="w-full flex flex-col bg-neutral-800 rounded-lg px-6 border border-neutral-600">
      <div
        className="flex flex-row justify-between items-center cursor-pointer py-6"
        onClick={() => setExpand(!expand)}
      >
        <div className="flex flex-row gap-3 items-center">
          {value && boardingMonth ? (
            <FaCheckCircle size={16} className="text-green-500" />
          ) : isInvalid ? (
            <FaCircleXmark size={16} className="text-red-500" />
          ) : (
            <Circle size={16} className="text-neutral-600" />
          )}
          <h2 className="text-lg font-semibold text-white mt-1">{cityName}</h2>
        </div>
        <span className="text-sm text-white flex items-center gap-2">
          {value && boardingMonth ? "Preenchido" : "Pendente"}
          <AiOutlineDown />
        </span>
      </div>

      {expand && (
        <div className="w-full flex flex-row justify-between gap-8 border-t border-neutral-600 py-6">
          <InputSecondary
            componentStyle="w-full"
            label="Balcão"
            placeholder="R$ 0,00"
            value={value}
            onChange={(e) => onChange("value", e.target.value)}
          />

          {checkPrice && (
            <InputSecondary
              componentStyle="w-full"
              label="Traded Level"
              placeholder="R$ 0,00"
              value={value_traded}
              onChange={(e) => onChange("value_traded", e.target.value)}
            />
          )}

          <InputSecondary
            componentStyle="w-full"
            label="Embarque"
            type="month"
            value={boardingMonth || ""}
            min={`${new Date().getFullYear()}-01`}
            max={`${new Date().getFullYear()}-12`}
            onFocus={(e) => e.target.showPicker && e.target.showPicker()}
            onChange={(e) => onChange("boardingMonth", e.target.value)}
            disabled={checkPrice}
          />

          <Toggle
            label="Imposto"
            value={taxed}
            onChange={(val) => onChange("taxed", val)}
            disabled={checkPrice}
          />
        </div>
      )}
    </div>
  );
}
