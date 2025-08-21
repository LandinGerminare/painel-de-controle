import BaseCard from "@/components/Lib/BaseUserCard";
import { productsMock } from "../../../../public/Mock/productsMock"

export default function ProductList() {
  return (
    <div className="flex flex-col gap-2">
      <h5 className="text-xl text-white font-bold">Produtos</h5>

      <div className='flex flex-row gap-4 scrollbar overflow-y-auto'>
        {productsMock.map((product) => (
          <BaseCard
            containerStyle="flex flex-col gap-4 p-4 max-w-72"
            key={product.id}
          >
            <h5 className="text-lg text-white font-bold">{product.nome}</h5>
            <div className="flex flex-col w-full">
              <div className="w-full flex justify-around">
                <p className='text-[#BFBFBF] break-words w-52'>Rendimento</p>
                <p className='text-[#BFBFBF] text-end break-words w-52'>Quantidade</p>
              </div>
              <div className="w-full flex justify-around">
                <p className='text-[#BFBFBF] break-words w-52'>{product.rendimento}</p>
                <p className='text-[#BFBFBF] text-end break-words w-52'>{product.quantidade}</p>
              </div>
            </div>
          </BaseCard>
        ))}
      </div>
    </div>
  )
}