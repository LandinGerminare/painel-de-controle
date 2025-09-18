

interface IHeaderProps {
  title: string;
  button: React.ReactNode;
}

export default function Header({ title, button }: IHeaderProps) {
  return (
    <header
      className={`flex w-full h-20 bg-neutral-800 overflow-hidden`}
    >
      <div className="flex flex-row justify-between items-center w-full px-8">
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        <div>{button}</div>
      </div>
    </header>
  );
}
