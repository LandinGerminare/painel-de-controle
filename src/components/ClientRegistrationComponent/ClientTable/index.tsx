import LandinPerfil from "@/../public/images/Pessoas/perfillandin.png";
import Button from "@/components/FormComponents/Button";
import Image from "next/image";
import { FaEdit, FaRegTrashAlt, FaTrash } from "react-icons/fa";
import PaginationTable from "./PaginationTable";

export default function ClientTable() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row px-3 py-2 items-center bg-neutral-700 rounded-lg">
        <Image
          src={LandinPerfil}
          alt="Perfil de Landin"
          className="h-16 w-16 rounded-full border border-neutral-300 object-cover"
        />
        <div className="flex flex-row gap-4 w-full">
          <div className="flex flex-row justify-between ml-4 w-full gap-4 items-center">
            {item("Cliente", "Junior Landin")}
            {item("Email", "juniorlandin10@gmail.com")}
            {item("Telefone", "(34) 993173001")}
            {item("Empresa", "Germinare")}
            {item("Função", "Desenvolvedor Front-End")}
          </div>
          <div className="flex justify-end">
            <Button className="flex items-center justify-center gap-2 px-2 py-2 rounded-lg transition-transform duration-200 hover:scale-110">
              <FaEdit size={18} color="#fff" />
            </Button>

            <Button className="flex items-center justify-center gap-2 px-2 py-2 rounded-lg transition-transform duration-200 hover:scale-110">
              <FaRegTrashAlt size={18} color="#FD5868" />
            </Button>
          </div>
        </div>
      </div>

      <PaginationTable />
    </div>
  );
}

function item(title: string, value: string) {
  return (
    <div className="flex flex-col gap-0">
      <p className="text-xs text-neutral-300">{title}</p>
      <p className="text-lg text-neutral-100 font-medium">{value}</p>
    </div>
  );
}
