import Button from "@/components/FormComponents/Button";
import InputPrimary from "@/components/FormComponents/InputPrimary";
import BaseModal from "@/components/Lib/BaseModal";
import BaseCard from '@/components/Lib/BaseUserCard';
import Image from 'next/image';
import { useState } from "react";
import { FaCheck, FaCheckCircle } from "react-icons/fa";
import { pessoas } from "../../../../public/Mock/clientMock";
import useSendWhatsapp from "@/context/SendWhatsapp";
import useModal from "@/context/Modal";

export default function ClientModal() {
  const [search, setSearch] = useState("");

  const { setSelectedClients, selectClientsId, setSelectClientsId } = useSendWhatsapp()
  const { setModalContent } = useModal()

  const filteredPessoas = pessoas.filter((client) =>
    client.nome.toLowerCase().includes(search.toLowerCase())
  );

  const toggleClient = (id: number) => {
    setSelectClientsId((prev) =>
      prev.includes(id)
        ? prev.filter((clientId) => clientId !== id)
        : [...prev, id]
    );
  };

  const handleConfirm = () => {
    const selectedData = pessoas
      .filter((c) => selectClientsId.includes(c.id))
      .map((c) => ({ id: c.id, nome: c.nome, phone: c.phone }));

    setSelectedClients(selectedData);
    setModalContent(null);
  };

  return (
    <BaseModal title={"Selecionar Clientes"} containerStyle="w-[100rem]">
      <div className="h-full flex flex-col gap-4">
        <InputPrimary
          componentStyle="w-[50%]"
          placeholder="Digite o nome para pesquisar.."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className='flex flex-row gap-4 scrollbar overflow-y-hidden'>
          {filteredPessoas.map((client) => {
            const isSelected = selectClientsId.includes(client.id);
            return (
              <div
                key={client.id}
                onClick={() => toggleClient(client.id)}
                className="cursor-pointer hover:scale-105 transition h-96"
              >
                <BaseCard
                  containerStyle="flex flex-col items-center gap-8 pb-8 w-72 mt-6 h-80"
                >
                  <div className='flex flex-col items-center w-full'>
                    <div className='w-full flex justify-end pr-4 pt-2'>
                      {isSelected && (
                        <div className="relative w-8 h-8">
                          <FaCheckCircle size={28} color="#4EB673" />
                          <FaCheck size={18} color="white" className="absolute top-1.5 left-1.5" />
                        </div>
                      )}
                    </div>
                    <div className={`w-52 h-52 relative rounded-full px-9 -mt-3 ${!isSelected ? "mt-5" : ""}`}>
                      <Image
                        src={client.foto}
                        alt={client.nome}
                        fill
                        className="rounded-full object-contain"
                      />
                    </div>
                    <div className='rounded-xl bg-primary-500 p-2 text-center -mt-8 z-10'>
                      <p className='text-white font-bold line-clamp-1'>{client.nome}</p>
                    </div>
                    <p className='text-[#BFBFBF] mt-4 text-center break-words w-52'>{client.funcao}</p>
                  </div>
                </BaseCard>
              </div>
            )
          })}
        </div>

        <div className="text-white flex flex-col gap-2">
          <h5 className="font-bold text-lg">Clientes Selecionados</h5>
          <p className="font-light">
            {selectClientsId.length > 0
              ? pessoas
                .filter((c) => selectClientsId.includes(c.id))
                .map((c) => c.nome)
                .join(", ")
              : "Nenhum cliente selecionado"}
          </p>
        </div>

        <Button
          title="Selecionar Clientes"
          onClick={handleConfirm}
        >
          <FaCheck />
        </Button>
      </div>
    </BaseModal>
  )
}