import Button from "@/components/FormComponents/Button";
import Layout from "@/components/Layout";
import Header from "@/components/Layout/Header";
import BasePage from "@/components/Lib/BasePage";
import SendWhatsappView from "@/components/SendWhatsappComponent";
import ClientModal from "@/components/SendWhatsappComponent/ClientModal";
import useModal from "@/context/Modal";
import { SendWhatsappProvider } from "@/context/SendWhatsapp";

export default function SendWhatsapp() {
  const { setModalContent } = useModal();

  return (
    <SendWhatsappProvider>
      <Layout>
        <BasePage
          header={<Header title="Enviar Mensagem via WhatsApp"
            button={<Button title="Selecionar Cliente" onClick={() => setModalContent(<ClientModal />)}
            />} />
          }>
          <SendWhatsappView />
        </BasePage>
      </Layout>
    </SendWhatsappProvider>
  )
}