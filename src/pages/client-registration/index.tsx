import ClientCadasterModal from "@/components/ClientRegistrationComponent/ClientCadasterModal";
import ClientRegistrationViewComponent from "@/components/ClientRegistrationComponent/ClientRegistrationViewComponent";
import Button from "@/components/FormComponents/Button";
import Layout from "@/components/Layout";
import Header from "@/components/Layout/Header";
import BasePage from "@/components/Lib/BasePage";
import useAuth from "@/context/Auth";
import useModal from "@/context/Modal";
import { useEffect } from "react";

export default function ClientRegistration() {
  const { setModalContent } = useModal();
  const { isAdmin, clearCredentials } = useAuth();

  useEffect(() => {
    if (!isAdmin()) {
      clearCredentials();
    }
  }, [isAdmin]);

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