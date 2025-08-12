import { BiHome } from "react-icons/bi";
import { FaTachometerAlt, FaPaperPlane, FaUserPlus, FaWhatsapp, FaHome, FaExchangeAlt } from "react-icons/fa";

export const menuOptions: MenuItem[] = [
    { route: "/dashboard", name: "Painel de Controle", icon: FaHome },
    { route: "/send-ia", name: "Envios I.A", icon: FaExchangeAlt },
    { route: "/client-registration", name: "Cadastrar Cliente", icon: FaUserPlus },
    { route: "/send-whatsapp", name: "Enviar Mensagens", icon: FaWhatsapp },
];

export interface MenuItem {
    name: string;
    route: string;
    icon: React.ComponentType<{ size?: number; color?: string }>;
}
