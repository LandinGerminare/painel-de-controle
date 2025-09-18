import Image from 'next/image'
import GerminareImage from '@/../public/images/germinare_logo.png'
import { Roboto } from 'next/font/google'
import InputPrimary from '@/components/FormComponents/InputPrimary';
import ButtonCadaster from '@/components/FormComponents/ButtonCadaster';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { User } from '@/types/User';
import { useState } from 'react';
import { message, notification } from 'antd';
import { toast } from 'react-toastify';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700'],
})

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [messageApi, contextHolder] = message.useMessage();
  const [api, contextNotification] = notification.useNotification();
  const key = 'updatable';
  const users: User[] = [
    { mail: 'jose@germinareagro.com.br', password: 'a33rdc#', name: 'José Jorge' },
    { mail: 'conrado@germinareagro.com.br', password: 'pltre@', name: 'Conrado Zanon' },
    { mail: 'admin@germinareagro.com.br', password: 's8gst#', name: 'Administrador' },
    { mail: 'leandro@germinareagro.com.br', password: 'L3v9Qz', name: 'Leandro' },
    { mail: 'landin@germinareagro.com.br', password: '123123', name: 'Landin' },
  ];

  async function validLogin() {
    if (users) {
      const authenticatedUser = users.find(
        (user) => user.mail === email && user.password === password
      );

      if (authenticatedUser) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', authenticatedUser.name)
        localStorage.setItem('userMail', authenticatedUser.mail)
        openMessage();
      } else {
        openNotification();
      }
    }
  };

  const openNotification = () => {
    toast.error("Usuário ou senha inválidos.");
  };

  const openMessage = () => {
    setTimeout(() => {
      toast.success("Login realizado com sucesso!");
      setTimeout(() => {
        router.push('/send-ia');
      }, 990);
    }, 1000);
  };


  return (
    <main className="h-screen w-screen bg-primary-700 flex items-center justify-center">
      {contextHolder}
      {contextNotification}
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
                <InputPrimary
                  placeholder='Digite seu email...'
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <InputPrimary
                  placeholder='Digite sua senha...'
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                {/*                 <Link
                  href="/esqueci-minha-senha"
                  className="w-full block text-end text-primary-500 hover:underline"
                >
                  Esqueci minha senha
                </Link> */}
                <ButtonCadaster
                  title='Acessar'
                  onClick={validLogin}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
