import ButtonCadaster from "@/components/FormComponents/ButtonCadaster";
import InputSecondary from "@/components/FormComponents/InputSecondary";
import BaseModal from "@/components/Lib/BaseModal";
import { phoneMask } from "@/utils/formatters";
import { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { IClientCadaster } from "../type";
import { PatternFormat } from "react-number-format";
import { useTripleRequest } from "@/hooks/triple/useTripleRequest";
import { toast } from "react-toastify";
import useModal from "@/context/Modal";

interface IProps {
  client?: IClientCadaster
}

export default function ClientCadasterModal(props: IProps) {
  const { setModalContent } = useModal()
  const [form, setForm] = useState<IClientCadaster>({
    name: "",
    whatsapp_number: "",
    password: "",
    role: "",
  });

  const [createUserResult, createUser] = useTripleRequest("POST", {
    onSuccess(_) {
      toast.success(
        "Usuário criado com sucesso!"
      );
      setForm({
        name: "",
        whatsapp_number: "",
        password: "",
        role: "",
      })
      setModalContent(null)
    },
    onError(errorMessage) {
      toast.error(errorMessage);
    },
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <BaseModal
      title="Cadastrar Cliente"
      containerStyle={"w-[800px]"}
    >
      <div className="w-full flex justify-center">
        <div className="max-w-6xl flex flex-col gap-12 w-full justify-center items-center">
          <div className="flex flex-col gap-2 w-full">
            <InputSecondary
              label="Nome"
              name="name"
              value={props.client?.name ? props.client.name : form.name}
              placeholder="Digite o nome..."
              componentStyle={"w-full"}
              onChange={handleChange}
            />
            <PatternFormat
              format="+55 (##) #####-####"
              label="Telefone"
              name="whatsapp_number"
              allowEmptyFormatting
              mask="_"
              value={props.client?.whatsapp_number ? props.client?.whatsapp_number : phoneMask(form.whatsapp_number)}
              onValueChange={(values) => {
                setForm({ ...form, whatsapp_number: values.value });
              }}
              customInput={InputSecondary}
              placeholder="+55 (99) 99999-9999"
            />
            <InputSecondary
              label="Senha"
              name="password"
              value={props.client?.password ? props.client?.password : form.password}
              placeholder="*****"
              componentStyle={"w-full"}
              onChange={handleChange}
            />
            <div className="flex flex-col">
              <p className="font-medium text-white">Roles</p>
              <select
                name="role"
                value={props.client?.role ? props.client?.role : form.role}
                onChange={handleChange}
                className="w-full px-3 border-[1px] border-neutral-700 rounded-lg h-11 overflow-hidden focus-within:border-primary-900 flex items-center bg-transparent text-white"
              >
                <option value="" className="text-white bg-neutral-700">Nenhum</option>
                <option value="ADMIN" className="text-white bg-neutral-700">ADMIN</option>
                <option value="USER" className="text-white bg-neutral-700">USER</option>
              </select>
            </div>

            <div className="w-full mt-3">
              <ButtonCadaster
                title="Cadastrar Usuário"
                containerStyle={"w-full"}
                onClick={() => {
                  createUser({
                    url: `/users`,
                    body: {
                      name: form.name,
                      whatsapp_number: form.whatsapp_number,
                      password: form.password,
                      role: form.role
                    }
                  })
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </BaseModal>
  )
}