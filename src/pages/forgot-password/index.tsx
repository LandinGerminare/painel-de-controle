import NewPassword from "@/components/ForgotPasswordComponent/NewPassword";
import SendToken from "@/components/ForgotPasswordComponent/SendToken";
import VerifyToken from "@/components/ForgotPasswordComponent/VerifyToken/intex";
import Image from "next/image";
import { useState } from "react";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [resetToken, setResetToken] = useState("");

  return (
    <main className="flex h-screen flex-col md:flex-row items-center md:items-start">
      <div className="flex flex-col xl:w-1/3 md:w-3/6 sm:w-3/4 w-full h-full">
        <div className="flex flex-col gap-6 xl:px-20 px-8 order-2 md:order-1 pt-12">
          <div className="flex gap-1 items-center justify-center max-w-40">
            <span className={`w-full h-1 rounded-full ${step === 1 ? "bg-primary-500" : "bg-[#E2E8F0]"}`}></span>
            <span className={`w-full h-1 rounded-full ${step === 2 ? "bg-primary-500" : "bg-[#E2E8F0]"}`}></span>
            <span className={`w-full h-1 rounded-full ${step === 3 ? "bg-primary-500" : "bg-[#E2E8F0]"}`}></span>
          </div>
          <Image
            src="/images/logo_germinare.png"
            alt="Logo Germinare"
            width={200}
            height={60}
            priority
            className="hidden md:block "
          />

        </div>
        {step === 1 && (
          <SendToken step={step} setStep={setStep} setPhone={setPhone} phone={phone} />
        )}

        {step === 2 && (
          <VerifyToken setStep={setStep} phone={phone} setResetToken={setResetToken} />
        )}

        {step === 3 && (
          <NewPassword step={step} setStep={setStep} resetToken={resetToken} />
        )}

      </div>

      <div className="relative w-full h-[40vh] md:h-full overflow-hidden order-1 md:order-2">
        <video
          src="/images/bg-login.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 flex items-center justify-center md:h-3/6 h-full">
          <Image
            src="/images/germinare_logo.png"
            alt="Logo Germinare"
            width={500}
            height={90}
            priority
            className="w-80 md:w-125 h-auto"
          />
        </div>

        <div className="relative z-10 hidden md:flex items-center justify-start w-full h-4/6 pl-12">
          <div className="flex gap-6 items-center">
            <span className="w-px h-40 bg-linear-to-b via-[#FEF3C7] shadow-[0_0_15px_rgba(254,243,199,0.5)] opacity-80"></span>

            <span className="text-white max-w-96 font-bold text-lg shadow-xl">
              Germano IA gives admins full control over clients, subscriptions, and financial performance through intelligent automation.
            </span>
          </div>
        </div>
      </div>
    </main>
  )
}