import Button from "@/components/FormComponents/Button";
import ButtonCadaster from "@/components/FormComponents/ButtonCadaster";
import InputSecondary from "@/components/FormComponents/InputSecondary";
import BaseModal from "@/components/Lib/BaseModal";
import useClientRegistration from "@/context/ClientRegistration";
import useModal from "@/context/Modal";
import { useTripleRequest } from "@/hooks/triple/useTripleRequest";
import { IClientCadaster } from "@/types/User";
import { phoneMask } from "@/utils/formatters";
import { useEffect, useState } from "react";
import { PatternFormat } from "react-number-format";
import { toast } from "react-toastify";
import SelectMyMarketsModal from "../SelectMyMarketsModal";

interface IProps {
  client?: IClientCadaster,
  isEdit?: boolean
}

export default function ClientCadasterModal(props: IProps) {
  const { setModalContent } = useModal()
  const [openedMarketModal, setOpenedMarketModal] = useState(false);
  const { refreshUsers } = useClientRegistration();
  const [selectedMarkets, setSelectedMarkets] = useState<AvailableMarket[]>([]);
  const [form, setForm] = useState<IClientCadaster>({
    name: "",
    whatsapp_number: "",
    password: "",
    role: "",
  });

  const [createUserResult, createUser] = useTripleRequest("POST", {
    onSuccess(_) {
      refreshUsers();
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

  const [updateUserResult, updateUser] = useTripleRequest("PUT", {
    onSuccess(_) {
      refreshUsers();
      toast.success(
        "Usuário editado com sucesso!"
      );
      setForm({
        name: "",
        whatsapp_number: "",
        role: "",
      })
      setModalContent(null)
    },
    onError(errorMessage) {
      toast.error(errorMessage);
    },
  })

  useEffect(() => {
    if (props.client) {
      setForm({
        name: props.client.name,
        whatsapp_number: props.client.whatsapp_number?.startsWith("55")
          ? props.client.whatsapp_number.substring(2)
          : props.client.whatsapp_number,
        password: props.client.password || "",
        role: props.client.role,
      });
    }
  }, [props.client]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveMarketsToClient = async (markets: AvailableMarket[]) => {
    if (!props.client) return;

    try {
      const body = {
        data: {
          schema: {
            user_number: "String",
            symbols: "String"
          },
          records: markets.map((market) => ({
            user_number: `${props.client?.whatsapp_number}`,
            symbols: market.cd_ativo
          }))
        }
      };

      const response = await fetch(`https://germinaredata.com/api/rest/ByVkIbyu/save-new-user`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6ImFwcDoxOCJ9.srE23jzRBrFB2pkxsXish60xQ8B6ydSBzIMhBpuefbI`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        // Se o status não for 200~299, lança erro
        throw new Error(`Erro ao salvar mercados: ${response.status}`);
      }

      updateUser({
        url: `/users/${props.client?.whatsapp_number}`,
        body: {
          name: form.name,
          role: form.role
        }
      })
    } catch (error) {
      console.error("Error saving markets:", error);
    }
  };

  return (
    <BaseModal
      title={props.isEdit ? "Editar Cliente" : "Cadastrar Cliente"}
      containerStyle={"w-[800px]"}
    >
      <div className="w-full flex justify-center">
        <div className="max-w-6xl flex flex-col gap-12 w-full justify-center items-center">
          <div className="flex flex-col gap-2 w-full">
            {props.isEdit && (
              <div className="flex justify-between items-center">
                <p className="text-lg">{selectedMarkets.length > 0 ? `${selectedMarkets.length} praças selecionadas` : "Nenhuma praça selecionada"}</p>
                <Button
                  title="Selecionar Praças"
                  onClick={() => setOpenedMarketModal(true)}
                />
              </div>
            )}
            <InputSecondary
              label="Nome"
              name="name"
              value={form.name}
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
              value={phoneMask(form.whatsapp_number)}
              onValueChange={(values) => {
                setForm({ ...form, whatsapp_number: values.value });
              }}
              customInput={InputSecondary}
              placeholder="+55 (99) 99999-9999"
              disabled={props.isEdit}
            />
            <InputSecondary
              label="Senha"
              name="password"
              value={form.password}
              placeholder="*****"
              componentStyle={"w-full"}
              onChange={handleChange}
              disabled={props.isEdit}
            />
            <div className="flex flex-col">
              <p className="font-medium text-white">Roles</p>
              <select
                name="role"
                value={form.role}
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
                title={props.isEdit ? "Salvar Alterações" : "Cadastrar Cliente"}
                containerStyle={"w-full"}
                onClick={() => {
                  if (props.isEdit) {
                    if (selectedMarkets.length > 0) {
                      saveMarketsToClient(selectedMarkets);
                    } else {
                      updateUser({
                        url: `/users/${props.client?.whatsapp_number}`,
                        body: {
                          name: form.name,
                          role: form.role
                        }
                      })
                    }
                  } else {
                    createUser({
                      url: `/users`,
                      body: {
                        name: form.name,
                        whatsapp_number: `55${form.whatsapp_number}`,
                        status: `CONECTADO_AO_WHATSAPP_BASIC`,
                        password: form.password,
                        role: form.role
                      }
                    })
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {openedMarketModal && (
        <SelectMyMarketsModal
          setOpenedMarketModal={setOpenedMarketModal}
          whatsapp_number={props.client?.whatsapp_number || ""}
          onClose={(activeMarkets) => setSelectedMarkets(activeMarkets)}
        />
      )}
    </BaseModal>
  )
}