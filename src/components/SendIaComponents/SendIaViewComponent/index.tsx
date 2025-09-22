import ButtonCadaster from "@/components/FormComponents/ButtonCadaster";
import InputSecondary from "@/components/FormComponents/InputSecondary";
import TextArea from "@/components/FormComponents/TextArea";
import { useTripleRequest } from "@/hooks/triple/useTripleRequest";
import { useState } from "react";
import { toast } from "react-toastify";

interface SendIaProps {
  title: string;
  message: string;
}

export default function SendIaViewComponent() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const [sendIa, setSendIa] = useTripleRequest<SendIaProps>("POST", {
    onSuccess: (data) => {
      toast.success("Mensagem enviada com sucesso!");
      console.log("Success", data);
      setTitle("")
      setText("")
      setLoading(false);
    },
    onLoading() {
      console.log("Loading");
      setLoading(true);
    },
    onError(errorMessage) {
      toast.error(errorMessage);
      setLoading(false);
    },
  });

  return (
    <div className="w-full flex-1 gap-4 flex flex-col">
      <div className="gap-4 flex flex-col h-full">
        <p className="text-white">Neste campo, você pode digitar textos relacionados à área de commodities para contribuir com a melhoria da eficiência e da inteligência da I.A. Germinare. Dessa forma, conseguiremos entregar respostas com maior precisão e eficácia aos nossos clientes.</p>

        <div className="flex flex-col gap-1 h-full">
          <InputSecondary
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Digite o Titulo da Mensagem"
          />
          <TextArea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Digite o texto..."
            containerStyle="h-full"
            componentStyle="h-full"
          />
        </div>

        <ButtonCadaster
          title={`${loading ? "Carregando..." : "Enviar"}`}
          onClick={() => {
            if (!title || !text) {
              toast.error("Por favor, preencha todos os campos.");
              return;
            }
            setSendIa({
              url: "/knowledge-base",
              body: { title, text },
            });
          }}
        />
      </div>
    </div>
  )
}