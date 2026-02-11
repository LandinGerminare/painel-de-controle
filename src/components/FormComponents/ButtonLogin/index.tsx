import { ButtonHTMLAttributes, DetailedHTMLProps, MouseEventHandler } from "react";

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  title?: string;
  children?: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  colorButton?: string;
  buttonStyle?: string;
  componentstyle?: string;
  icon?: React.ReactNode;
  loading?: boolean;
  isDisabled?: boolean;
}

export default function ButtonLogin({
  title,
  children,
  onClick,
  buttonStyle,
  loading,
  colorButton,
  componentstyle,
  icon,
  isDisabled,
  ...props
}: ButtonProps) {
  return (
    <button
      onClick={(e) => {
        if (loading) return;
        if (onClick) onClick(e);
      }}
      className={`
        flex justify-center items-center gap-2 rounded-lg font-title text-white font-semibold text-lg transition-colors 
        ${componentstyle ? componentstyle : "w-full h-12"}
        ${colorButton ? colorButton : "bg-[#E87A30]"}
        ${isDisabled ? "bg-primary-900" : "hover:bg-[#CF6A26]"}
        `}
      {...props}
    >
      {icon && <span className="flex items-center">{icon}</span>}

      {title && <span>{title}</span>}

      {children}
    </button>
  )
}