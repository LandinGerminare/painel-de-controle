import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  MouseEventHandler
} from "react";

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  title?: string;
  loading?: boolean;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  children?: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  containerStyle?: React.HTMLAttributes<HTMLButtonElement> | string;
  imageSrc?: string;
}

export default function ButtonCadaster({
  title,
  children,
  containerStyle,
  loading = false,
  size = "medium",
  disabled = false,
  onClick,
  imageSrc,
  ...props
}: ButtonProps) {
  let style =
    "bg-primary-500 hover:bg-primary-600 active:border-primary-700 active:text-primary-700";

  let sizeStyle =
    size === "small"
      ? "p-2 text-sm "
      : size === "large"
        ? "p-3 text-lg "
        : "p-[10px] text-base ";

  let disabledStyle = disabled
    ? " bg-neutral-700 text-neutral-200 cursor-not-allowed hover:bg-neutral-700 hover:text-neutral-400"
    : "";

  return (
    <button
      onClick={(e) => {
        if (loading) return;
        if (onClick) onClick(e);
      }}
      className={`flex text-white items-center h-14 justify-center rounded-lg gap-3 transition-all text-center active:border-button-1000 cursor-pointer ${disabledStyle ? disabledStyle : style} ${sizeStyle} ${containerStyle}`}
      {...props}
    >
      {loading ? "Carregando..." : (
        <>
          {imageSrc && <img src={imageSrc} className="w-[18px] h-[20px]" />}
          {title &&
            <p className="
              tablet:whitespace-nowrap tablet:overflow-hidden tablet:text-ellipsis tablet:inline-block tablet:max-w-full
              desktop:whitespace-normal desktop:overflow-visible desktop:text-clip
            ">
              {title}
            </p>}
          {children}
        </>
      )}
    </button>
  );
}
