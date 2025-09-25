import ClientTable from "@/components/ClientRegistrationComponent/ClientTable";
import InputPrimary from "@/components/FormComponents/InputPrimary";
import { useTripleRequest } from "@/hooks/triple/useTripleRequest";
import { IClientCadaster } from "../type";
import { useEffect } from "react";

export default function ClientRegistrationViewComponent() {

  const [users, getUsers] =
    useTripleRequest<IClientCadaster>("GET");

  useEffect(() => {
    getUsers({
      url: `/users/phones`,
      defaultError:
        "Ocorreu um erro ao obter as informações de mercado. Tente novamente mais tarde.",
    });
  }, []);

  return (
    <div className="w-full flex-1 gap-4 flex flex-col">
      <div className="flex flex-row gap-4 w-full">
        <InputPrimary
          placeholder="Pesquise pelo nome do Cliente..."
          componentStyle="w-full"
        />
        <InputPrimary
          placeholder="Pesquise pelo nome da Empresa..."
          componentStyle="w-full"
        />
      </div>

      <ClientTable />
    </div>
  )
}