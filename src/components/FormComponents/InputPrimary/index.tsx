interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
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
  ...props
}: InputProps) {
  return (
    <div className={`flex flex-col ${componentStyle}`}>
      <div
        className={`bg-neutral-600 rounded-lg h-11 inputContainer overflow-hidden flex items-center w-full ${containerStyle} ${props.disabled ? "bg-neutral-200" : "bg-transparent"
          } `}
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
