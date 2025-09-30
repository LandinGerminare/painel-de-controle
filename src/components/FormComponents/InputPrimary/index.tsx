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
  componentStyle?: string;
}

export default function InputPrimary({
  children,
  containerStyle,
  inputStyle,
  componentStyle,
  label,
  subtitle,
  ...props
}: InputProps) {
  return (
    <div className={`flex flex-col ${componentStyle}`}>
      {(label || subtitle) && (
        <div className="flex items-center justify-between mb-1">
          {label && <p className="font-medium text-white">{label}</p>}
          {(subtitle || props.required) && (
            <p className="text-[0.7rem] text-neutral-600">
              {props.required ? "Obrigatório" : subtitle}
            </p>
          )}
        </div>
      )}
      <div
        className={`bg-neutral-700 rounded-lg h-14 inputContainer overflow-hidden flex items-center w-full text-white ${containerStyle}`}
      >
        {children && <div className="pl-2">{children}</div>}

        <input
          className={`outline-none py-4 px-3 w-full bg-transparent text-white ${inputStyle}`}
          {...props}
        />
      </div>
    </div>
  );
}
