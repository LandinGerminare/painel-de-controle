import Button from "@/components/FormComponents/Button";
import useModal from "@/context/Modal";
import Image from "next/image";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { clientsTableMock } from "../../../../public/Mock/clientTableMock";
import PaginationTable from "./PaginationTable";
import ClientCadasterModal from "../ClientCadasterModal";

export default function ClientTable() {
  const { setModalContent } = useModal();

  return (
    <div className="flex flex-col gap-2">
      {clientsTableMock.map((client, index) => (
        <div
          key={index}
          className="flex flex-row px-3 py-2 items-center bg-neutral-700 rounded-lg"
        >
          <div className="flex flex-row gap-4 w-full">
            <div className="flex flex-row ml-4 w-full gap-2 items-center">
              <div className="w-[100px]">{item("Cliente", client.name)}</div>
              <div className="w-[170px]">{item("Função", client.role)}</div>
            </div>
            <div className="flex justify-end">
              <Button
                className="flex items-center justify-center gap-2 px-2 py-2 rounded-lg transition-transform duration-200 hover:scale-110"
                onClick={() => setModalContent(<ClientCadasterModal client={client} />)}
              >
                <FaEdit size={18} color="#fff" />
              </Button>

              <Button
                className="flex items-center justify-center gap-2 px-2 py-2 rounded-lg transition-transform duration-200 hover:scale-110"
                onClick={() => alert(`BORA DELETAR ${client.name}`)}
              >
                <FaRegTrashAlt size={18} color="#FD5868" />
              </Button>
            </div>
          </div>
        </div>
      ))}

      {clientsTableMock.length >= 15 && (
        <PaginationTable />
      )}
    </div>
  );
}

function item(title: string, value: string) {
  return (
    <div className="flex flex-col gap-0">
      <p className="text-xs text-neutral-300">{title}</p>
      <p className="text-lg text-neutral-100 font-medium truncate">{value}</p>
    </div>
  );
}
