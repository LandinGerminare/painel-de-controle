import ButtonCadaster from "@/components/FormComponents/ButtonCadaster";
import InputSecondary from "@/components/FormComponents/InputSecondary";
import TextArea from "@/components/FormComponents/TextArea";
import Toggle from "@/components/FormComponents/Toggle";
import { useTripleRequest } from "@/hooks/triple/useTripleRequest";
import { FileArrowUp, FilePdf, Trash } from "phosphor-react";
import { useState } from "react";
import { FaFilePdf, FaRegFilePdf } from "react-icons/fa";
import { MdDriveFileMove, MdOutlineFileUpload } from "react-icons/md";
import { toast } from "react-toastify";

interface SendIaProps {
  title: string;
  message: string;
}

export default function SendIaViewComponent() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [typeSend, setTypeSend] = useState(false)
  const [file, setFile] = useState<File | null>(null);

  const [sendIa, setSendIa] = useTripleRequest<SendIaProps>("POST", {
    onSuccess: (data) => {
      typeSend
        ? toast.success("PDF enviado com sucesso!")
        : toast.success("Mensagem enviada com sucesso!");

      setTitle("")
      setText("")
      setFile(null)
      setLoading(false);
    },
    onLoading() {
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

        <div className="flex flex-col gap-4 h-full bg-neutral-800 p-4 rounded-xl">
          <InputSecondary
            label="Titulo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Digite o Titulo da Mensagem"
          />
          <Toggle
            label="Tipo de Envio"
            option1="Texto"
            option2="PDF"
            value={typeSend}
            onChange={(val) => setTypeSend(val)}
          />
          {typeSend ? (
            <div className="w-full h-full flex flex-col gap-4">
              <button className={`relative w-full rounded-xl border border-neutral-700 flex justify-center items-center cursor-pointer overflow-hidden ${file ? "h-[90%]" : "h-full"}`}>
                <div className="flex flex-col gap-6 justify-center items-center">
                  <FaRegFilePdf size={80} className="text-primary-600" />
                  <span className="text-white font-bold text-3xl">Toque para selecionar</span>
                  <span className="text-slate-300 font-medium text-2xl">Ou arraste e solte o arquivo aqui</span>
                  <span className="text-slate-300 font-normal text-2xl">Apenas arquivos .PDF são aceitos</span>
                </div>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setFile(e.target.files[0]);
                    }
                    e.target.value = "";
                  }}
                  className="absolute inset-0 h-full w-full opacity-0 cursor-pointer"
                />
              </button>
              {file && (
                <div className="w-full h-[10%] border border-neutral-700 rounded-xl flex items-center justify-between pl-6">
                  <div className="flex items-center gap-4">
                    <MdDriveFileMove size={36} className="text-primary-500" />
                    <span className="text-white font-medium text-xl mt-1">{file.name}</span>
                  </div>

                  <button onClick={() => setFile(null)} className="flex justify-center items-center bg-primary-500 h-full rounded-r-xl rounded-l-full w-20">
                    <Trash size={28} className="text-white" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <TextArea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Digite o texto..."
              containerStyle="h-full"
              componentStyle="h-full"
            />
          )}
        </div>

        <ButtonCadaster
          title={`${loading ? "Carregando..." : "Enviar"}`}
          onClick={() => {
            if (!typeSend) {
              if (!title || !text) {
                toast.error("Por favor, preencha todos os campos.");
                return;
              }
              setSendIa({
                url: "/knowledge-base",
                body: { title, text },
              });
            } else {
              if (!title || !file) {
                toast.error("Por favor, preencha todos os campos.");
                return;
              }

              const formData = new FormData();
              formData.append("title", title);
              formData.append("file", file);

              setSendIa({
                url: "/knowledge-base/upload",
                body: formData
              });
            }
          }}
        />
      </div>
    </div>
  )
}