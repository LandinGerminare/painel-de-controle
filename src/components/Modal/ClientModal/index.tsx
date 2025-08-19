import Image from 'next/image'
import Button from "@/components/FormComponents/Button";
import InputPrimary from "@/components/FormComponents/InputPrimary";
import BaseModal from "@/components/Lib/BaseModal";
import BaseUserCard from "@/components/Lib/BaseUserCard";
import { FaCheck, FaCheckCircle, FaRegCheckCircle } from "react-icons/fa";
import LandinTeste from "@/../public/images/Pessoas/perfillandin.png"

export default function ClientModal() {
  return (
    <BaseModal title={"Selecionar Clientes"} containerStyle="max-w-[1280px] min-w-[770px]">
      <div className="h-full flex flex-col gap-4">
        <InputPrimary
          componentStyle="w-[50%]"
          placeholder="Digite o nome para pesquisar.."
        />
        <div className='flex flex-row gap-4 scrollbar overflow-y-auto'>
          <BaseUserCard
            containerStyle="flex flex-col items-center gap-8 pb-8 w-72"
          >
            <div className='flex flex-col items-center w-full'>
              <div className='w-full flex justify-end pr-4 pt-2'>
                <div className="relative w-8 h-8">
                  <FaCheckCircle size={28} color="#4EB673" />
                  <FaCheck size={18} color="white" className="absolute top-1.5 left-1.5" />
                </div>
              </div>
              <div className="w-52 h-52 relative rounded-full px-9 -mt-3">
                <Image
                  src={LandinTeste}
                  alt="Logo Germinare"
                  fill
                  className="rounded-full object-contain"
                />
              </div>
              <div className='rounded-xl bg-primary-500 w-28 py-2 text-center -mt-8 z-10'>
                <p className='text-white font-bold'>Landin</p>
              </div>

              <p className='text-[#BFBFBF] mt-4 text-center break-words w-52'>Desenvolvedor Front-End Germinare</p>
            </div>
          </BaseUserCard>
        </div>

        <div className="text-white flex flex-col gap-2">
          <h5 className="font-bold text-lg">Clientes Selecionados</h5>
          <p className="font-light">Isabela, Landin, Amanda</p>
        </div>

        <Button
          title="Selecionar Cliente"
        >
          <FaCheck />
        </Button>
      </div>
    </BaseModal>
  )
}