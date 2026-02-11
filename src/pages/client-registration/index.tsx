import ClientCadasterModal from "@/components/ClientRegistrationComponent/ClientCadasterModal";
import ClientRegistrationViewComponent from "@/components/ClientRegistrationComponent/ClientRegistrationViewComponent";
import Button from "@/components/FormComponents/Button";
import Layout from "@/components/Layout";
import Header from "@/components/Layout/Header";
import BasePage from "@/components/Lib/BasePage";
import { ClientRegistrationProvider } from "@/context/ClientRegistration";
import useModal from "@/context/Modal";

export default function ClientRegistration() {
  const { setModalContent } = useModal();

  return (
    <Layout>
      <BasePage
        header={<Header title="Tabela Clientes"
          button={<Button
            title="Cadastrar Cliente"
            onClick={() => setModalContent(<ClientCadasterModal />)}
          />}
        />
        }>
        <ClientRegistrationViewComponent />
      </BasePage>
    </Layout>
  )
}