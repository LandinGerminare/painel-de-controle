import DashboardComponent from "@/components/DashboardComponent";
import Layout from "@/components/Layout";
import Header from "@/components/Layout/Header";
import BasePage from "@/components/Lib/BasePage";

export default function Dashboard() {
  return (
    <Layout>
      <BasePage header={<Header title="Painel de Controle" button={null} />}>
        <DashboardComponent />
      </BasePage>
    </Layout>
  )
}