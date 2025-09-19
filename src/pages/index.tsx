import GerminareImage from '@/../public/images/germinare_logo.png';
import ButtonCadaster from '@/components/FormComponents/ButtonCadaster';
import InputPrimary from '@/components/FormComponents/InputPrimary';
import useAuth from '@/context/Auth';
import { AuthModel } from '@/context/Auth/types';
import { useTripleRequest } from '@/hooks/triple/useTripleRequest';
import { Roboto } from 'next/font/google';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Eye, EyeSlash } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { PatternFormat } from "react-number-format";
import { toast } from 'react-toastify';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700'],
})

export default function Home() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [viewPassword, setViewPassword] = useState(false)
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
      formData.append("username", `55${phone}`);
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
    <main className="h-screen w-screen bg-primary-700 flex items-center justify-center">
      <div className="flex flex-row bg-neutral-900 h-[82%] w-[70%] rounded-xl shadow-[30px_50px_8px_rgba(0,0,0,0.25)]">
        <div
          className="hidden tablet:flex w-[60%] h-full bg-primary-400 rounded-l-xl bg-[url('/images/image_dados.png')] bg-cover bg-center"
        >
          <div className='flex justify-center w-full pt-56'>
            <div className="relative w-[60%] h-[100px]">
              <Image
                src={GerminareImage}
                alt="Logo Germinare"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        <div className='flex flex-col tablet:w-[40%] w-full'>
          <div className='flex flex-col pt-14 pl-8'>
            <span className={`${roboto.className} text-5xl text-primary-500 font-extralight`}>Painel</span>
            <span className='text-5xl text-primary-500 font-bold'>De Controle</span>
          </div>

          <div className='flex flex-col w-full h-full items-center'>
            <div className='flex flex-col gap-8 tablet:w-[68%] w-[90%] h-[75%] items-center justify-center'>
              <h1 className='text-3xl font-bold text-white'><span className='text-primary-500'>Entre</span> com sua conta</h1>
              <div className='w-full flex flex-col gap-4'>
                <PatternFormat
                  format="+55 (##) #####-####"
                  allowEmptyFormatting
                  mask="_"
                  value={phone}
                  onValueChange={(values) => setPhone(values.value)}
                  customInput={InputPrimary}
                  placeholder="+55 (99) 99999-9999"
                />
                <div className="relative w-full">
                  <InputPrimary
                    placeholder='Digite sua senha...'
                    type={viewPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  <button
                    onClick={() => setViewPassword(viewPassword ? false : true)}
                    className="absolute top-2/4 -translate-y-1/2 right-0 p-3 text-gray-500 hover:text-gray-700"
                    title={viewPassword ? "Ocultar" : "Mostrar"}
                  >
                    {viewPassword ? <EyeSlash size={32} /> : <Eye size={32} />}
                  </button>
                </div>
                <ButtonCadaster
                  title='Entrar'
                  loading={result.state === "Loading"}
                  onClick={handleLogin}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
