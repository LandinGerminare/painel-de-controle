import { DetailedHTMLProps, InputHTMLAttributes } from "react";

interface YesNoToggleProps {
  label?: string;
  value?: boolean;
  onChange?: (value: boolean) => void;
  containerStyle?: string;
  name?: string;
  disabled?: boolean;
  option1: string;
  option2: string;
}

export default function YesNoToggle({
  label,
  value,
  onChange,
  containerStyle,
  option1,
  option2,
  ...props
}: YesNoToggleProps) {
  return (
    <div className={`flex flex-col ${containerStyle} gap-2`}>
      {label && (
        <p className="font-medium text-white mb-1">{label}</p>
      )}

      <div className="flex gap-4">
        <label className="flex items-center cursor-pointer gap-2">
          <input
            type="radio"
            className="sr-only"
            checked={value === false}
            onChange={() => onChange?.(false)}
            {...props}
          />
          <div
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all 
            ${value === false
                ? props.disabled ? "bg-neutral-600 border-neutral-600" : "bg-primary-600 border-primary-600 shadow-md shadow-primary-600/50"
                : "border-neutral-400 bg-transparent"}`}
          />
          <span className="text-white text-xl">{option1}</span>
        </label>

        <label className="flex items-center cursor-pointer gap-2">
          <input
            type="radio"
            className="sr-only"
            checked={value === true}
            onChange={() => onChange?.(true)}
            {...props}
          />
          <div
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all 
            ${value === true
                ? props.disabled ? "bg-neutral-600 border-neutral-600" : "bg-primary-600 border-primary-600 shadow-md shadow-primary-600/50"
                : "border-neutral-400 bg-transparent"}`}
          />
          <span className="text-white text-xl">{option2}</span>
        </label>
      </div>
    </div>
  );
}
