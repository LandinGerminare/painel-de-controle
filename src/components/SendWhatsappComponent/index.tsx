import Button from "@/components/FormComponents/Button";
import ButtonCadaster from "@/components/FormComponents/ButtonCadaster";
import TextArea from "@/components/FormComponents/TextArea";
import Layout from "@/components/Layout";
import ClientModal from "@/components/SendWhatsappComponent/ClientModal";
import useModal from "@/context/Modal";
import useSendWhatsapp from "@/context/SendWhatsapp";

export default function SendWhatsappView() {
  const { setModalContent } = useModal();
  const { selectedClients } = useSendWhatsapp()

  return (
    <Layout>
      <div className="w-full flex justify-center">
        <div className="gap-4 max-w-6xl flex flex-col">
          <h1 className="text-white text-center text-4xl font-bold">Enviar Mensagem via WhatsApp</h1>
          <p className="text-white">Neste campo, você pode escrever a mensagem que será enviada aos clientes selecionados. No botão abaixo, selecione os clientes para os quais deseja enviar a mensagem.</p>
          <div className="w-full flex justify-end">
            <Button
              title="Selecionar Cliente"
              onClick={() => setModalContent(<ClientModal />)}
            />
          </div>
          <TextArea
            placeholder="Digite o texto..."
          />

          <div className="w-full flex flex-col gap-2">
            <h5 className="text-white font-bold text-lg">Clientes Selecionados</h5>
            <p className="text-white font-light">
              {selectedClients.length > 0
                ?
                selectedClients.map((c) => c.nome).join(", ")
                :
                "Nenhum cliente selecionado."}
            </p>
          </div>

          <ButtonCadaster
            title="Enviar"
          />
        </div>
      </div>
    </Layout>
  )
}