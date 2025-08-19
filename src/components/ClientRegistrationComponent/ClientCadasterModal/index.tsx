import ButtonCadaster from "@/components/FormComponents/ButtonCadaster";
import InputSecondary from "@/components/FormComponents/InputSecondary";
import BaseModal from "@/components/Lib/BaseModal";
import { useState } from "react";
import { FaUserAlt } from "react-icons/fa";

export default function ClientCadasterModal() {

  const [image, setImage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return (
    <BaseModal
      title="Cadastrar Cliente"
      containerStyle={"w-screen h-screen"}
    >
      <div className="w-full flex justify-center">
        <div className="max-w-6xl flex flex-col gap-12 w-full justify-center items-center">
          <button
            className="relative h-52 w-64 rounded-full border border-neutral-300 bg-neutral-400 flex justify-center items-center cursor-pointer overflow-hidden"
            style={
              image
                ? {
                  backgroundImage: `url(${image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
                : {}
            }
          >
            {!image && <FaUserAlt size={100} color="#2A2C32" />}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </button>

          <div className="flex flex-col gap-2 w-full">
            <div className="flex gap-8 w-full">
              <InputSecondary
                label="Nome"
                placeholder="Digite o nome..."
                componentStyle={"w-full"}
              />
              <InputSecondary
                label="Email"
                placeholder="Digite o email..."
                componentStyle={"w-full"}
              />
            </div>
            <div className="flex gap-8 w-full">
              <InputSecondary
                label="Empresa"
                placeholder="Digite o nome da empresa..."
                componentStyle={"w-full"}
              />
              <InputSecondary
                label="Cargo"
                placeholder="Digite o cargo..."
                componentStyle={"w-full"}
              />
            </div>
            <div className="flex gap-8 w-full">
              <InputSecondary
                label="Área"
                placeholder="Digite a área..."
                componentStyle={"w-full"}
              />
              <InputSecondary
                label="Produto"
                placeholder="Digite o produto..."
                componentStyle={"w-full"}
              />
            </div>
            <div className="flex gap-8 w-full">
              <InputSecondary
                label="Telefone"
                placeholder="(XX) XXXXX-XXXX"
                componentStyle={"w-full"}
              />
              <InputSecondary
                label="Cidade"
                placeholder="Busque pela cidade"
                componentStyle={"w-full"}
              />
            </div>

            <div className="w-full mt-3">
              <ButtonCadaster
                title="Cadastrar Usuário"
                containerStyle={"w-full"}
              />
            </div>
          </div>
        </div>
      </div>
    </BaseModal>
  )
}