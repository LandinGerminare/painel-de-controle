import ButtonCadaster from "@/components/FormComponents/ButtonCadaster";
import InputSecondary from "@/components/FormComponents/InputSecondary";
import TextArea from "@/components/FormComponents/TextArea";
import Layout from "@/components/Layout";
import { useTripleRequest } from "@/hooks/triple/useTripleRequest";
import { useState } from "react";
import { toast } from "react-toastify";

interface SendIaProps {
  title: string;
  message: string;
}

export default function SendIa() {
  const username = "5538999108052";
  const password = "adm123";
  const token = btoa(`${username}:${password}`);

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const [sendIa, setSendIa] = useTripleRequest<SendIaProps>("POST", {
    onSuccess: (data) => {
      toast.success("Mensagem enviada com sucesso!");
      console.log("Success", data);
      setTitle("")
      setText("")
    },
    onError(errorMessage) {
      toast.error(errorMessage);
    },
  });

  console.log(btoa("5538999108052:adm123"))

  return (
    <Layout>
      <div className="w-full flex justify-center">
        <div className="gap-4 max-w-6xl flex flex-col">
          <h1 className="text-white text-center text-4xl font-bold">Inteligência I.A</h1>
          <p className="text-white">Neste campo, você pode digitar textos relacionados à área de commodities para contribuir com a melhoria da eficiência e da inteligência da I.A. Germinare. Dessa forma, conseguiremos entregar respostas com maior precisão e eficácia aos nossos clientes.</p>

          <div className="flex flex-col gap-1">
            <InputSecondary
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Digite o Titulo da Mensagem"
            />
            <TextArea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Digite o texto..."
            />
          </div>

          <ButtonCadaster
            title="Enviar"
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
    </Layout>
  )
}