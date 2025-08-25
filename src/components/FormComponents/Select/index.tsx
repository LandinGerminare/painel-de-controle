interface SelectProps
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  label?: string;
  children: React.ReactNode;
  containerStyle?: string;
  subtitle?: string;
  componentStyle?: string;
}

const Select = ({
  label,
  children,
  containerStyle,
  subtitle,
  componentStyle,
  ...props
}: SelectProps) => {
  return (
    <div className={`flex flex-col ${componentStyle}`}>
      <div className="flex items-center justify-between mb-1">
        {label && <p className="text-sm text-white">{label}</p>}
        {subtitle && (
          <p className="text-[0.7rem] text-neutral-200">{subtitle}</p>
        )}
      </div>

      <div
        className={`border-[1px] border-neutral-700 rounded-lg inputContainer overflow-hidden focus-within:border-primary-900 flex items-center w-full transition-colors duration-200 ${containerStyle} ${props.disabled ? "bg-neutral-800" : "bg-transparent"
          }`}
      >
        <select
          className="outline-none p-2 w-full bg-neutral-800 scrollbar"
          disabled={props.disabled}
          {...props}
        >
          {children}
        </select>
      </div>
    </div>
  );
};

export default Select;
