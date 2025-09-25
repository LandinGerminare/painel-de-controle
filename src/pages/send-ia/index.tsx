import Layout from "@/components/Layout";
import Header from "@/components/Layout/Header";
import BasePage from "@/components/Lib/BasePage";
import ButtonConfigComponent from "@/components/SendIaComponents/ButtonConfigComponent";
import ModalTextSendIa from "@/components/SendIaComponents/ModalTextSendIa";
import SendIaViewComponent from "@/components/SendIaComponents/SendIaViewComponent";
import useModal from "@/context/Modal";

export default function SendIa() {

  const { setModalContent } = useModal();

  return (
    <Layout>
      <BasePage header={<Header title="Inteligência I.A" button={<ButtonConfigComponent onClick={() => setModalContent(<ModalTextSendIa />)} />} />}>
        <SendIaViewComponent />
      </BasePage>
    </Layout>
  )
}