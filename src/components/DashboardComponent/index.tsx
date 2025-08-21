import ClientList from "./ClientList";
import GraphicProducts from "./GraphicProducts";
import ProductList from "./ProductList";

export default function DashboardComponent() {
  return (
    <div className="w-full h-full flex flex-col gap-3">
      <ClientList />
      <ProductList />
      <GraphicProducts />
    </div>
  )
}