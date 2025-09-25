interface ErrorProps {
  errorMessage: string;
  bodyStyle?: string;
  textStyle?: string;
}

export default function Error(props: ErrorProps) {
  return (
    <div
      className={`h-full flex flex-col justify-center items-center ${props.bodyStyle ?? ""
        }`}
    >
      <p
        className={`text-neutral-800 text-center text-xl ${props.textStyle ?? ""
          }`}
      >
        {props.errorMessage}
      </p>
    </div>
  );
}
