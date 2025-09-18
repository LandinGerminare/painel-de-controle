import Layout from "@/components/Layout";
import Header from "@/components/Layout/Header";
import BasePage from "@/components/Lib/BasePage";
import SendPriceViewComponent from "@/components/SendPriceComponent/SendPriceViewComponent";

export default function SendPricePage() {
  
  return (
    <Layout>
      <BasePage header={<Header title="Envio de Preços" button={null} />}>
        <SendPriceViewComponent />
      </BasePage>
    </Layout>
  );
}