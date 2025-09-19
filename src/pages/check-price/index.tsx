import CheckPriceViewComponent from "@/components/CheckPriceComponent/CheckPriceViewComponent";
import Layout from "@/components/Layout";
import Header from "@/components/Layout/Header";
import BasePage from "@/components/Lib/BasePage";

export default function CheckPrice() {
  return (
    <Layout>
      <BasePage header={<Header title="Conferir Preços" button={null} />}>
        <CheckPriceViewComponent />
      </BasePage>
    </Layout >
  );
}