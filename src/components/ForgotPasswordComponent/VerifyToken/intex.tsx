import ButtonLogin from "@/components/FormComponents/ButtonLogin";
import CodeInput from "@/components/FormComponents/CodeInput/intex";
import { useTripleRequest } from "@/hooks/triple/useTripleRequest";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";

interface ISendToken {
  setStep: Dispatch<SetStateAction<number>>;
  setResetToken: Dispatch<SetStateAction<string>>;
  phone: string;
}

export default function VerifyToken({ setStep, phone, setResetToken }: ISendToken) {

  const length = 6;
  const [code, setCode] = useState<string[]>(Array(length).fill(""));
  const [resultCode, sendCode] = useTripleRequest<any>("POST", {
    onSuccess(data) {
      toast.success("Código re-enviado com sucesso, verifique o seu WhatsApp!");
    },
    onError(errorMessage) {
      toast.error(errorMessage);
    },
  });

  const [result, verifyCode] = useTripleRequest<any>("POST", {
    onSuccess(data) {
      toast.success("Token validado com sucesso!");
      setResetToken(data.reset_token)
      setStep(3)
    },
    onError(errorMessage) {
      toast.error(errorMessage);
    },
  });

  const verifyToken = () => {
    if (!code) return;

    const codeString = code.join("")

    verifyCode({
      url: "/auth/verify-code",
      body: {
        phone: phone,
        code: codeString
      },
      headers: {
        "Content-Type": "application/json"
      }
    })
  }

  const resendCode = () => {
    if (!phone) return;

    const formData = new FormData();
    formData.append("phone", phone);

    sendCode({
      url: "/auth/forgot-password",
      body: formData,
    })
  }

  return (
    <div className="flex flex-col w-full h-full md:justify-center items-center md:items-start gap-6 xl:px-20 px-8 order-2 md:order-1 mt-12 md:mt-0">
      <div>
        <h2 className="font-extrabold xl:text-4xl lg:text-3xl md:text-2xl text-3xl text-center md:text-start text-[#181411]">
          Verificação do Código
        </h2>
        <span className="font-medium xl:text-lg lg:text-3xl md:text-2xl text-3xl text-center md:text-start text-[#64748B]">
          Enviamos um código de 6 dígitos para o seu WhatsApp vinculado. Por favor, insira-o abaixo.
        </span>
      </div>

      <CodeInput
        code={code}
        setCode={setCode}
        length={length}
      />

      <ButtonLogin
        title="Validar o Código"
        onClick={verifyToken}
        isDisabled={code[5] === ""}
      />

      <span className="text-[#64748B] font-semibold text-center w-full">
        Não recebeu o código?
        <span className="cursor-pointer text-primary-500" onClick={resendCode}>Reenviar código</span>
      </span>

      <Link
        href="/"
        className="font-semibold text-[#64748B] cursor-pointer flex items-center gap-2"
      >
        <FaArrowLeft /> Voltar para Login
      </Link>
    </div>
  )
}