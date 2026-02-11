import ButtonLogin from "@/components/FormComponents/ButtonLogin";
import Input from "@/components/FormComponents/Input";
import { useTripleRequest } from "@/hooks/triple/useTripleRequest";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { FaArrowLeft, FaPhone } from "react-icons/fa";
import { PatternFormat } from "react-number-format";
import { toast } from "react-toastify";

interface ISendToken {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  phone: string;
  setPhone: Dispatch<SetStateAction<string>>;
}

export default function SendToken({ step, setStep, phone, setPhone }: ISendToken) {

  const [result, sendCode] = useTripleRequest<any>("POST", {
    onSuccess(data) {
      toast.success("Código enviado com sucesso, verifique o seu WhatsApp!");
      setStep(2)
    },
    onError(errorMessage) {
      toast.error(errorMessage);
    },
  });

  const sendToken = () => {
    if (!phone) return;

    sendCode({
      url: "/auth/forgot-password",
      body: {
        phone: phone
      },
      headers: {
        "Content-Type": "application/json"
      }
    });
  };


  return (
    <div className="flex flex-col w-full h-full md:justify-center items-center md:items-start gap-6 xl:px-20 px-8 order-2 md:order-1 mt-12 md:mt-0">
      <div>
        <h2 className="font-extrabold xl:text-4xl lg:text-3xl md:text-2xl text-3xl text-center md:text-start text-[#181411]">Recuperar senha</h2>
        <span className="font-medium xl:text-lg lg:text-3xl md:text-2xl text-3xl text-center md:text-start text-[#64748B]">
          Para sua segurança, informe seu número de celular
          cadastrado. Enviaremos um código de validação por
          Whatsapp para prosseguir.
        </span>
      </div>
      <PatternFormat
        format="+55 (##) #####-####"
        allowEmptyFormatting
        mask="_"
        value={phone.replace(/^55/, "")}
        onValueChange={(values) => {
          const raw = values.value;
          setPhone(raw ? `55${raw}` : "");
        }}
        customInput={Input}
        placeholder="+55 (99) 99999-9999"
        componentstyle="w-full"
        icon={<FaPhone size={18} />}
        variant="white"
      />

      <ButtonLogin title="Enviar o Código" onClick={sendToken} isDisabled={phone.length < 13} />

      <Link
        href="/"
        className="font-semibold text-[#64748B] cursor-pointer flex items-center gap-2"
      >
        <FaArrowLeft /> Voltar para Login
      </Link>
    </div>
  )
}