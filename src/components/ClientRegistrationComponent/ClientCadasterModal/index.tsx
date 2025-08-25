import ButtonCadaster from "@/components/FormComponents/ButtonCadaster";
import InputSecondary from "@/components/FormComponents/InputSecondary";
import BaseModal from "@/components/Lib/BaseModal";
import { phoneMask } from "@/utils/formatters";
import { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { IClientCadaster } from "../type";

interface IProps {
  client?: IClientCadaster
}

export default function ClientCadasterModal(props: IProps) {
  const [form, setForm] = useState<IClientCadaster>({
    name: "",
    email: "",
    company: "",
    role: "",
    area: "",
    produto: "",
    phone: "",
    city: "",
    image: null as string | null,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setForm({ ...form, image: imageUrl });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    switch (name) {
      case "telefone":
        formattedValue = value.replace(/\D/g, "");
        break;
      default:
        break;
    }

    setForm({ ...form, [e.target.name]: e.target.value });
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
              form.image
                ? {
                  backgroundImage: `url(${form.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
                : {}
            }
          >
            {!form.image && <FaUserAlt size={100} color="#2A2C32" />}
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
                name="name"
                value={props.client?.name ? props.client.name : form.name}
                placeholder="Digite o nome..."
                componentStyle={"w-full"}
                onChange={handleChange}
              />
              <InputSecondary
                label="Email"
                value={props.client?.email ? props.client.email : form.email}
                name="email"
                placeholder="Digite o email..."
                componentStyle={"w-full"}
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-8 w-full">
              <InputSecondary
                label="Empresa"
                name="company"
                value={props.client?.company ? props.client.company : form.company}
                placeholder="Digite o nome da empresa..."
                componentStyle={"w-full"}
                onChange={handleChange}
              />
              <InputSecondary
                label="Cargo"
                name="role"
                value={props.client?.role ? props.client.role : form.role}
                placeholder="Digite o cargo..."
                componentStyle={"w-full"}
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-8 w-full">
              <InputSecondary
                label="Área"
                name="area"
                value={props.client?.area ? props.client.area : form.area}
                placeholder="Digite a área..."
                componentStyle={"w-full"}
                onChange={handleChange}
              />
              <InputSecondary
                label="Produto"
                name="produto"
                value={props.client?.produto ? props.client.produto : form.produto}
                placeholder="Digite o produto..."
                componentStyle={"w-full"}
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-8 w-full">
              <InputSecondary
                label="Telefone"
                name="phone"
                value={props.client?.phone ? props.client?.phone : phoneMask(form.phone)}
                placeholder="(XX) XXXXX-XXXX"
                componentStyle={"w-full"}
                onChange={handleChange}
              />
              <InputSecondary
                label="Cidade"
                name="city"
                value={props.client?.city ? props.client.city : form.city}
                placeholder="Busque pela cidade"
                componentStyle={"w-full"}
                onChange={handleChange}
              />
            </div>

            <div className="w-full mt-3">
              <ButtonCadaster
                title="Cadastrar Usuário"
                containerStyle={"w-full"}
                onClick={() => console.log(form)}
              />
            </div>
          </div>
        </div>
      </div>
    </BaseModal>
  )
}