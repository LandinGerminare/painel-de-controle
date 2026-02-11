import ButtonLogin from '@/components/FormComponents/ButtonLogin';
import Input from '@/components/FormComponents/Input';
import useAuth from '@/context/Auth';
import { AuthModel } from '@/context/Auth/types';
import { useTripleRequest } from '@/hooks/triple/useTripleRequest';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaPhone } from 'react-icons/fa';
import { PatternFormat } from "react-number-format";
import { toast } from 'react-toastify';

export default function Home() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const { setCredentials, getAccessToken } = useAuth();

  const [result, doLogin] = useTripleRequest<AuthModel>("POST", {
    onSuccess(data) {
      toast.success("Login realizado com sucesso!");
      setCredentials(data);
      navigate();
    },
    onError(errorMessage) {
      toast.error(errorMessage);
    },
  });

  function navigate() {
    const from = router.query["from"];
    if (from) {
      router.push(`/${from}`);
      return;
    }
    router.push("/send-ia");
  }

  useEffect(() => {
    if (getAccessToken() !== null) {
      navigate();
    }
  }, [getAccessToken]);

  const handleLogin = () => {
    if (phone && password) {
      const formData = new FormData();
      formData.append("username", `${phone}`);
      formData.append("password", password);
      doLogin({
        url: "/login",
        body: formData,
        config: {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      });
    } else {
      toast.warning("Preencha os campos corretamente");
    }
  };

  return (
    <main className="flex h-screen flex-col md:flex-row items-center md:items-start">
      <div className="flex flex-col xl:w-1/3 md:w-3/6 sm:w-3/4 w-full h-full md:justify-center items-center md:items-start gap-6 xl:px-20 px-8 order-2 md:order-1 mt-12 md:mt-0">
        <Image
          src="/images/logo_germinare.png"
          alt="Logo Germinare"
          width={200}
          height={60}
          priority
          className="hidden md:block "
        />
        <h2 className="font-extrabold xl:text-4xl lg:text-3xl md:text-2xl text-3xl text-center md:text-start text-[#181411]">Painel de Controle</h2>
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

        <Input
          label="Senha"
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          componentstyle={"w-full"}
          variant="white"
        />

        <ButtonLogin title="Entrar" onClick={handleLogin} loading={result.state === "Loading"} />

        <Link
          href="/forgot-password"
          className="font-semibold text-primary-500 w-full text-end cursor-pointer"
        >
          Esqueci a Senha
        </Link>
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
  );
}
