import MetaApi from "@/api/MetaApi";
import ButtonCadaster from "@/components/FormComponents/ButtonCadaster";
import TextArea from "@/components/FormComponents/TextArea";
import useSendWhatsapp from "@/context/SendWhatsapp";
import { useState } from "react";
import { toast } from "react-toastify";
import TypeSend from "./TypeSend";

export default function SendWhatsappView() {
  const { selectedClients } = useSendWhatsapp()
  const [selectedType, setSelectedType] = useState<string>("");
  const [message, setMessage] = useState("");
  const [fileUrl, setFileUrl] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");

  async function handleMessageWpp() {
    if (selectedClients.length === 0) {
      toast.warning("Selecione ao menos um cliente.");
      return;
    }

    if (!message.trim()) {
      toast.warning("Digite uma mensagem para enviar.");
      return;
    }

    for (const client of selectedClients) {
      try {
        if (selectedType === "text" || !fileUrl) {
          await MetaApi.sendWhatsapp({ to: client.phone, message });
        } else if (selectedType === "image") {
          await MetaApi.sendWhatsapp({
            to: client.phone,
            type: "image",
            url: "https://i.pinimg.com/736x/1a/32/01/1a320118838f41af1f5a60ade6eb5732.jpg",
            message,
          });
        } else if (selectedType === "file") {
          await MetaApi.sendWhatsapp({
            to: client.phone,
            type: "document",
            url: fileUrl,
            filename: fileName,
            message,
          });
        }

        toast.success("Mensagem enviada com sucesso!");
      } catch (err) {
        toast.error("Ocorreu algum erro ao enviar a mensagem!");
        console.error("Erro ao enviar mensagem:", err);
      }
    }
  }


  return (
    <div className="w-full flex-1 gap-4 flex flex-col">
      <p className="text-white">
        Neste campo, você pode escrever a mensagem que será enviada aos clientes selecionados.
        No botão abaixo, selecione os clientes para os quais deseja enviar a mensagem.
      </p>

      <div className="w-full flex justify-between">
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="w-full px-3 border-[1px] border-neutral-700 rounded-lg h-11 overflow-hidden focus-within:border-primary-900 flex items-center bg-transparent text-white"
        >
          <option value="" className="text-white bg-neutral-700">Nenhum</option>
          <option value="image" className="text-white bg-neutral-700">Imagem</option>
          <option value="file" className="text-white bg-neutral-700">Arquivo</option>
        </select>
      </div>

      <TypeSend
        selectedType={selectedType}
        setFileUrl={setFileUrl}
        setFileName={setFileName}
      />

      <TextArea
        placeholder="Digite o texto..."
        value={message}
        onChange={(e: any) => setMessage(e.target.value)}
        componentStyle="h-full"
        containerStyle="h-full"
      />

      <div className="w-full flex flex-col gap-2">
        <h5 className="text-white font-bold text-lg">Clientes Selecionados</h5>
        <p className="text-white font-light">
          {selectedClients.length > 0
            ? selectedClients.map((c) => c.nome).join(", ")
            : "Nenhum cliente selecionado."}
        </p>
      </div>

      <ButtonCadaster
        title="Enviar"
        onClick={handleMessageWpp}
      />
    </div>
  )
}
