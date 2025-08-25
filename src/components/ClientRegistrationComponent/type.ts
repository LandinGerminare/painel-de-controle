import { StaticImageData } from "next/image";

export interface IClientCadaster {
    id?: number;
    name: string;
    email: string;
    company: string;
    role: string;
    area?: string;
    produto?: string;
    phone: string;
    city?: string;
    image: string | null | StaticImageData;
}