import Button from "@/components/FormComponents/Button";
import ButtonLogin from "@/components/FormComponents/ButtonLogin";
import Input from "@/components/FormComponents/Input";
import { useTripleRequest } from "@/hooks/triple/useTripleRequest";
import { validatePassword } from "@/utils/ValidatePassword";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import { FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";

interface INewPassword {
  step: number;
  resetToken: string;
  setStep: Dispatch<SetStateAction<number>>;
}

export default function NewPassword({ step, setStep, resetToken }: INewPassword) {
  const [result, sendNewPassowrd] = useTripleRequest<any>("POST", {
    onSuccess(data) {
      toast.success("Senha atualizada com sucesso!");
      setStep(2)
    },
    onError(errorMessage) {
      toast.error(errorMessage);
    },
  });

  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const router = useRouter()
  const passwordRules = validatePassword(password);

  const saveNewPassword = () => {
    if (!password) return;
    if (!passwordRules.hasNumber && passwordRules.hasSpecialChar && passwordRules.minLength) return;

    sendNewPassowrd({
      url: "/auth/reset-password",
      body: {
        reset_token: resetToken,
        new_password: password,
        confirm_password: confirmpassword
      },
      headers: {
        "Content-Type": "application/json"
      }
    })

    router.push("/")
  }

  const isPasswordValid =
    passwordRules.minLength &&
    passwordRules.hasNumber &&
    passwordRules.hasSpecialChar &&
    password === confirmpassword;

  return (
    <div className="flex flex-col w-full h-full md:justify-center items-center md:items-start gap-6 xl:px-20 px-8 order-2 md:order-1 mt-12 md:mt-0">
      <div>
        <h2 className="font-extrabold xl:text-4xl lg:text-3xl md:text-2xl text-3xl text-center md:text-start text-[#181411]">Nova Senha</h2>
        <span className="font-medium xl:text-lg lg:text-3xl md:text-2xl text-3xl text-center md:text-start text-[#64748B]">
          Crie uma senha forte para proteger sua conta no GAC.
        </span>
      </div>

      <Input
        label="Nova Senha"
        type="password"
        placeholder="Digite sua senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        componentstyle={"w-full"}
        variant="white"
      />
      <Input
        label="Confirmar Senha"
        type="password"
        placeholder="Digite sua senha"
        value={confirmpassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        componentstyle={"w-full"}
        variant="white"
      />

      <div className="flex flex-col gap-2">
        <span
          className={`text-xs font-medium flex items-center gap-2 ${passwordRules.minLength ? "text-secondary-500" : "text-[#64748B]"
            }`}
        >
          <FaCheckCircle size={14} />
          No mínimo 8 caracteres
        </span>

        <span
          className={`text-xs font-medium flex items-center gap-2 ${passwordRules.hasNumber ? "text-secondary-500" : "text-[#64748B]"
            }`}
        >
          <FaCheckCircle size={14} />
          Pelo menos um número
        </span>

        <span
          className={`text-xs font-medium flex items-center gap-2 ${passwordRules.hasSpecialChar ? "text-secondary-500" : "text-[#64748B]"
            }`}
        >
          <FaCheckCircle size={14} />
          Pelo menos um caractere especial (!@#$%^&*)
        </span>
      </div>

      <ButtonLogin
        title="Salvar Nova Senha"
        onClick={saveNewPassword}
        disabled={!isPasswordValid}
      />

      <Link
        href="/"
        className="font-semibold text-[#64748B] cursor-pointer flex items-center gap-2"
      >
        <FaArrowLeft /> Voltar para Login
      </Link>
    </div>
  )
}