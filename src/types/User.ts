export interface IUser {
    id: number;
    name: string;
    whatsapp_number: string;
    role: "ADMIN" | "USER" | string;
    status: "CONECTADO_A_IA" | "DESCONECTADO_A_IA" | string;
}

export interface IClientCadaster {
    name: string;
    whatsapp_number: string;
    password?: string;
    role: "ADMIN" | "USER" | string;
}