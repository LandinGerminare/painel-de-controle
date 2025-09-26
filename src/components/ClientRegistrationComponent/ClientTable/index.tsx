import Button from "@/components/FormComponents/Button";
import useModal from "@/context/Modal";
import Image from "next/image";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { clientsTableMock } from "../../../../public/Mock/clientTableMock";
import PaginationTable from "./PaginationTable";
import ClientCadasterModal from "../ClientCadasterModal";
import { IUser } from "@/types/User";
import { useTripleRequest } from "@/hooks/triple/useTripleRequest";
import { toast } from "react-toastify";
import { useState } from "react";
import useClientRegistration from "@/context/ClientRegistration";

interface ClientTableProps {
  users: IUser[];
}

export default function ClientTable({ users }: ClientTableProps) {
  const { setModalContent } = useModal();
  const { refreshUsers } = useClientRegistration();
  const [deleteResult, deleteUser] = useTripleRequest("DELETE", {
    onSuccess(_) {
      setModalContent(null)
      toast.success("Usuário deletado com sucesso!")
      refreshUsers();
    },
    onError(_) {
      toast.error("Erro ao deletar o usuário.")
    }
  })

  return (
    <div className="flex flex-col gap-2">
      {users.map((client) => (
        <div
          key={client.id}
          className="flex flex-row px-3 py-2 items-center bg-neutral-700 rounded-lg"
        >
          <div className="flex flex-row gap-4 w-full">
            <div className="flex flex-row ml-4 w-full gap-2 items-center px-6 py-2">
              <div className="w-[20%]">{item("Cliente", client.name)}</div>
              <div className="w-[20%]">{item("Função", client.role)}</div>
              <div className="w-[20%]">{item("Telefone", client.whatsapp_number)}</div>
              <div className="w-[20%]">{item("Permissões", client.role)}</div>
              <div className="w-[20%]">{item("Status", client.status)}</div>
            </div>
            <div className="flex justify-end">
              <Button
                className="flex items-center justify-center gap-2 px-2 py-2 rounded-lg transition-transform duration-200 hover:scale-110"
                onClick={() => setModalContent(<ClientCadasterModal client={client} isEdit={true} />)}
              >
                <FaEdit size={18} color="#fff" />
              </Button>

              <Button
                className="flex items-center justify-center gap-2 px-2 py-2 rounded-lg transition-transform duration-200 hover:scale-110"
                onClick={() => deleteUser({
                  url: `/users/${client.whatsapp_number}`
                })}
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
