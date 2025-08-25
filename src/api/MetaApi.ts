import axios from "axios";

const META_URL = "https://graph.facebook.com/v22.0/774723089049048/messages";
const TOKEN = process.env.NEXT_PUBLIC_WHATSAPP_TOKEN;

interface SendWhatsappProps {
  to: string;
  message?: string;
  type?: "text" | "image" | "document";
  url?: string; // URL pública da imagem ou arquivo
  filename?: string; // usado para documento
}

const MetaApi = {
  sendWhatsapp: async ({ to, message, type = "text", url, filename }: SendWhatsappProps) => {
    let body: any;

    if (type === "text") {
      body = { messaging_product: "whatsapp", to, type: "text", text: { body: message } };
    } else if (type === "image") {
      body = {
        messaging_product: "whatsapp",
        to,
        type: "image",
        image: { link: url, caption: message },
      };
    } else if (type === "document") {
      body = {
        messaging_product: "whatsapp",
        to,
        type: "document",
        document: { link: url, filename, caption: message },
      };
    }

    const response = await axios.post(META_URL, body, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  },
};


export default MetaApi;
