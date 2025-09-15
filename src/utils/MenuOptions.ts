import { FaDollarSign, FaExchangeAlt, FaHome, FaUserPlus, FaWhatsapp } from "react-icons/fa";
import { FaMoneyCheckDollar } from "react-icons/fa6";

export const menuOptions: MenuItem[] = [
    { route: "/dashboard", name: "Painel de Controle", icon: FaHome, inDevelopment: true },
    { route: "/send-ia", name: "Envios I.A", icon: FaExchangeAlt, inDevelopment: false },
    { route: "/client-registration", name: "Cadastrar Cliente", icon: FaUserPlus, inDevelopment: true },
    { route: "/send-whatsapp", name: "Enviar Mensagens", icon: FaWhatsapp, inDevelopment: true },
    { route: "/send-price", name: "Envio de Preços", icon: FaDollarSign, inDevelopment: false },
    { route: "/check-price", name: "Conferir Preços", icon: FaMoneyCheckDollar, inDevelopment: false },
];

export interface MenuItem {
    name: string;
    route: string;
    icon: React.ComponentType<{ size?: number; color?: string }>;
    inDevelopment?: boolean;
}
