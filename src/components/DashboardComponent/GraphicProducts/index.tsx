import BaseCard from "@/components/Lib/BaseUserCard";
import PrimarySelector from "@/components/Lib/Selectors/PrimarySelector";
import { useState } from "react";
import ClientGraphic from "./ClientGraphic";
import ProductGraphic from "./ProductGraphic";

export default function GraphicProducts() {

  const [productsView, setProductsView] = useState("Clientes")

  return (
    <div className="h-full">
      <BaseCard containerStyle="h-full">
        <div className="flex flex-col h-full p-4 gap-8">
          <div className="w-full flex justify-between">
            <h5 className="text-2xl text-white font-bold">PRODUTORES <span className="text-primary-500">2025</span></h5>

            <div className="flex gap-2 w-1/2 justify-end">
              <PrimarySelector
                text="Clientes"
                isSelected={productsView === "Clientes"}
                onClick={() => {
                  setProductsView("Clientes");
                }}
                containerStyle="max-w-72 w-full"
              />
              <PrimarySelector
                text="Produtos"
                isSelected={productsView === "Produtos"}
                onClick={() => {
                  setProductsView("Produtos");
                }}
                containerStyle="max-w-72 w-full"
              />
            </div>
          </div>

          <div className="h-full">
            {productsView === "Clientes" ? (
              <ClientGraphic />
            ) : (
              <ProductGraphic />
            )}
          </div>
        </div>
      </BaseCard>
    </div>
  )
}