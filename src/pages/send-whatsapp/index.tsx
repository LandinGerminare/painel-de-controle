import SendWhatsappView from "@/components/SendWhatsappComponent";
import { SendWhatsappProvider } from "@/context/SendWhatsapp";

export default function SendWhatsapp() {
  return (
    <SendWhatsappProvider>
      <SendWhatsappView />
    </SendWhatsappProvider>
  )
}