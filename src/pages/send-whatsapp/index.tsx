import Layout from "@/components/Layout";
import Header from "@/components/Layout/Header";
import BasePage from "@/components/Lib/BasePage";
import SendWhatsappView from "@/components/SendWhatsappComponent";
import { SendWhatsappProvider } from "@/context/SendWhatsapp";

export default function SendWhatsapp() {
  return (
    <SendWhatsappProvider>
      <Layout>
        <BasePage header={<Header title="Enviar Mensagem via WhatsApp" button={null} />}>
          <SendWhatsappView />
        </BasePage>
      </Layout>
    </SendWhatsappProvider>
  )
}