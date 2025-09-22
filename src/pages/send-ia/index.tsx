import Layout from "@/components/Layout";
import Header from "@/components/Layout/Header";
import BasePage from "@/components/Lib/BasePage";
import SendIaViewComponent from "@/components/SendIaComponents/SendIaViewComponent";

export default function SendIa() {
  return (
    <Layout>
      <BasePage header={<Header title="Tabela Clientes" button={null} />}>
        <SendIaViewComponent />
      </BasePage>
    </Layout>
  )
}