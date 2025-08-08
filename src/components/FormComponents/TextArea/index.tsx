interface InputProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  children?: React.ReactNode;
  containerStyle?: string;
  inputStyle?: string;
  componentStyle?: string;
}

export default function TextArea({
  children,
  containerStyle,
  inputStyle,
  componentStyle,
  ...props
}: InputProps) {
  return (
    <div className={`flex flex-col ${componentStyle}`}>
      <div
        className={`border-[1px] border-neutral-700 rounded-lg min-h-64 inputContainer w-full ${containerStyle} ${props.disabled ? "bg-neutral-200" : "bg-transparent"
          }`}
      >
        {children && <div className="pl-2">{children}</div>}

        <textarea
          className={`outline-none py-4 px-3 h-full w-full min-h-64 bg-transparent resize-vertical overflow-y-auto text-white ${inputStyle}`}
          {...props}
        />
      </div>
    </div>
  );
}
