import DashboardComponent from "@/components/DashboardComponent";
import Layout from "@/components/Layout";

export default function Dashboard() {
  return (
    <Layout>
      <div className="w-full">
        <h1 className="text-white text-center text-4xl font-bold">Painel de Controle</h1>
      </div>

      <DashboardComponent />
    </Layout>
  )
}