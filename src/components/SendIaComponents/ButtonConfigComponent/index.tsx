import { ButtonHTMLAttributes, DetailedHTMLProps, MouseEventHandler } from "react";
import { FaRegSun } from "react-icons/fa";

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}

export default function ButtonConfigComponent({ onClick }: ButtonProps) {
  return (
    <button
      className="bg-neutral-600 w-14 h-14 rounded-full flex items-center justify-center"
      onClick={(e) => {
        if (onClick) onClick(e);
      }}
    >
      <FaRegSun size={24} color="#FFF" />
    </button>
  )
}