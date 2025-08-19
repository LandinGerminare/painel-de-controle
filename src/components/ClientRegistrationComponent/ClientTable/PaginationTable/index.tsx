import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function PaginationTable() {
  return (
    <div className="flex items-center justify-between w-full bg-neutral-700 rounded-lg py-2 px-2">
      <span className="text-white font-extralight">Monstrando 1 até 10 de 97 resultados</span>

      <div className="flex border border-neutral-400 rounded-lg overflow-hidden">
        <button className="px-4 py-2 text-neutral-300 hover:bg-neutral-800 border-r border-neutral-400">
          <FaArrowLeft />
        </button>
        <button className="px-4 py-2 text-neutral-300 hover:bg-neutral-800 border-r border-neutral-400">
          1
        </button>
        <button className="px-4 py-2 bg-primary-500 text-white border-r border-neutral-400">
          2
        </button>
        <button className="px-4 py-2 text-neutral-300 hover:bg-neutral-800 border-r border-neutral-400">
          3
        </button>
        <button className="px-4 py-2 text-neutral-300 hover:bg-neutral-800">
          <FaArrowRight />
        </button>
      </div>

    </div>
  )
}