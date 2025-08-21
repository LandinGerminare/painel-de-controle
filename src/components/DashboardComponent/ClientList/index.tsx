import BaseCard from "@/components/Lib/BaseUserCard";
import Image from 'next/image';
import { clientsMock } from "../../../../public/Mock/clientMock"

export default function ClientList() {
  return (
    <div className="flex flex-col gap-2">
      <h5 className="text-xl text-white font-bold">Clientes</h5>

      <div className='flex flex-row gap-4 scrollbar overflow-y-auto'>
        {clientsMock.map((client) => (
          <BaseCard
            key={client.id}
            containerStyle="flex flex-col items-center gap-8 pt-6 pb-4 w-72"
          >
            <div className="flex flex-col items-center w-full">
              <div className="w-52 h-52 relative rounded-full px-9">
                <Image
                  src={client.image}
                  alt={client.name}
                  fill
                  className="rounded-full object-contain"
                />
              </div>
              <div className="rounded-xl bg-primary-500 p-2 text-center -mt-8 z-10">
                <p className="text-white font-bold line-clamp-1">{client.name}</p>
              </div>

              <div className="flex flex-col w-full mt-2">
                <div className="w-full flex justify-around px-2">
                  <p className="text-[#BFBFBF] break-words w-52">Pagos</p>
                  <p className="text-[#BFBFBF] text-end break-words w-52">Quantidade</p>
                </div>
                <div className="w-full flex justify-around px-2">
                  <p className="text-[#BFBFBF] break-words w-52">{client.pagos}</p>
                  <p className="text-[#BFBFBF] text-end break-words w-52">{client.quantidade}</p>
                </div>
              </div>
            </div>
          </BaseCard>
        ))}
      </div>
    </div>
  )
}