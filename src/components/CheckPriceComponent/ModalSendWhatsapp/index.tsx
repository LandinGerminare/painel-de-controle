import Button from "@/components/FormComponents/Button";
import BaseModal from "@/components/Lib/BaseModal";
import useModal from "@/context/Modal";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";

export default function ModalSendWhatsapp({ sendPdf }: { sendPdf: ArrayBuffer | undefined }) {
  const [loading, setLoading] = useState(false);
  const { setModalContent } = useModal();

  const handleSendWpp = async () => {
    try {
      setLoading(true);
      if (!sendPdf) {
        toast.error("Nenhum PDF disponível. Gere o PDF primeiro.");
        return;
      }

      const formData = new FormData();
      const pdfBlob = new Blob([sendPdf], { type: 'application/pdf' });
      formData.append('pdf', pdfBlob, `precos-${new Date().toISOString().split('T')[0]}.pdf`);

      const response = await fetch('https://n8n-germinare-4227ea669bbb.herokuapp.com/webhook/pdf', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        toast.success("PDF enviado com sucesso!");
      } else {
        toast.error("Erro ao enviar PDF");
      }
    } catch (error: any) {
      toast.error("Erro ao enviar PDF");
      console.error(error);
    } finally {
      setLoading(false);
      setModalContent(null);
    }
  }

  return (
    <BaseModal title="Enviar Preços por WhatsApp" containerStyle="min-w-[1000px] w-full">
      <div className="flex flex-col gap-4">
        <h1>Enviar planilha abaixo para - (34) 99999-9999</h1>
        {sendPdf && (
          <iframe
            src={URL.createObjectURL(new Blob([sendPdf], { type: "application/pdf" }))}
            width="100%"
            height="600px"
          />
        )}
        <Button title="Confirmar" onClick={handleSendWpp} loading={loading} ><FaCheck /></Button>
      </div>
    </BaseModal>
  )
}