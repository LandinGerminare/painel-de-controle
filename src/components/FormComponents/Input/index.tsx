import React, { useId, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  subtitle?: string;
  children?: React.ReactNode;
  containerStyle?: string;
  inputStyle?: string;
  componentstyle?: string;
  icon?: React.ReactNode;
  variant?: "dark" | "white";
}

export default function Input({
  label,
  subtitle,
  children,
  type,
  id,
  icon,
  variant = "dark",
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && !showPassword ? "password" : "text";

  const isDark = variant === "dark";

  return (
    <div className={`flex flex-col gap-1 ${props.componentstyle ?? ""}`}>
      {label && (
        <label
          htmlFor={inputId}
          className={`text-xs uppercase tracking-widest ${isDark ? "text-[#9CA3AF]" : "text-neutral-600"
            }`}
        >
          {label}
        </label>
      )}

      {subtitle && (
        <span
          className={`text-xs ${isDark ? "text-[#A0A0A0]" : "text-neutral-500"
            }`}
        >
          {subtitle}
        </span>
      )}

      <label
        htmlFor={inputId}
        className={`
          border rounded-lg h-12 w-full flex items-center cursor-text px-3
          ${isDark
            ? "border-neutral-700 bg-neutral-900"
            : "border-neutral-300 bg-white"}
        `}
      >
        {children && (
          <div className={`mr-2 ${isDark ? "text-border" : "text-neutral-500"}`}>
            {children}
          </div>
        )}

        <input
          id={inputId}
          className={`
            font-title text-lg w-full h-full outline-none
            placeholder:font-title
            ${isDark
              ? "text-[#d3d2d2] bg-neutral-900"
              : "text-neutral-800 bg-white"}
            ${props.inputStyle ?? ""}
          `}
          type={inputType}
          {...props}
        />

        {isPassword ? (
          <div
            className={`cursor-pointer ml-2 ${isDark ? "text-[#868686]" : "text-neutral-500"
              }`}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
          </div>
        ) : (
          <div
            className={`ml-2 ${isDark ? "text-[#868686]" : "text-neutral-500"
              }`}
          >
            {icon}
          </div>
        )}
      </label>
    </div>
  );
}

