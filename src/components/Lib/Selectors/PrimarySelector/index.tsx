import { Lock } from "phosphor-react";

interface PrimarySelectorProps {
  text: string;
  onClick: () => void;
  isSelected: boolean;
  containerStyle?: string;
  disabled?: boolean;
}

export default function PrimarySelector(props: PrimarySelectorProps) {
  return (
    <div
      onClick={!props.disabled ? props.onClick : undefined}
      className={`flex flex-row justify-center items-center gap-2 py-2 px-6 border-[1px] rounded-lg cursor-pointer text-white
        ${props.isSelected ? "bg-primary-600 border-primary-900" : "bg-[#1E1E1E] border-neutral-800"} 
        ${props.disabled
          ? "bg-neutral-400 border-neutral-500 cursor-not-allowed opacity-80"
          : "hover:bg-neutral-300 hover:border-neutral-150"
        } 
        ${props.containerStyle}`}
    >
      {props.disabled && <Lock size={16} weight="bold" />}
      <p>{props.text}</p>
    </div>
  );
}