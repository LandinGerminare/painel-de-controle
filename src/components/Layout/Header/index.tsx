import useLayout from "@/context/Layout";
import { HiOutlineMenu } from "react-icons/hi";

export default function Header() {
  const { collapsed, setCollapsed } = useLayout()

  return (
    <header
      className={`flex w-full h-20 bg-neutral-800 overflow-hidden`}
    >
      <div className="pl-3 flex flex-row items-center text-white">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hover:bg-neutral-700 rounded-full p-2"
        >
          <HiOutlineMenu size={22} />
        </button>
        <div className={`flex items-center overflow-hidden transition-all duration-300`}>
          <img src="/images/germinare_logo.png" className="h-9 -ml-3" />
        </div>
      </div>
    </header>
  );
}
