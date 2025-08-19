import ClientCadasterModal from "@/components/ClientRegistrationComponent/ClientCadasterModal";
import ClientTable from "@/components/ClientRegistrationComponent/ClientTable";
import Button from "@/components/FormComponents/Button";
import InputPrimary from "@/components/FormComponents/InputPrimary";
import Layout from "@/components/Layout";
import useModal from "@/context/Modal";

export default function ClientRegistration() {
  const { setModalContent } = useModal();

  return (
    <Layout>
      <div className="flex flex-col w-full items-center">
        <div className="max-w-6xl w-full flex flex-col gap-4">
          <div className="relative flex items-center w-full">
            <h1 className="absolute left-1/2 -translate-x-1/2 text-white text-4xl font-bold">
              Tabela Clientes
            </h1>

            <div className="ml-auto">
              <Button
                title="Cadastrar Cliente"
                onClick={() => setModalContent(<ClientCadasterModal />)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-4 w-[70%]">
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
        </div>
      </div>
    </Layout>
  )
}