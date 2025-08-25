import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

export interface Client {
  id: number;
  nome: string;
  phone: string;
}

export interface SenWhatsappI {
  selectedClients: Client[];
  setSelectedClients: Dispatch<SetStateAction<Client[]>>;
  selectClientsId: number[];
  setSelectClientsId: Dispatch<SetStateAction<number[]>>;
}

const SendWhatsappContext = createContext<SenWhatsappI>({} as SenWhatsappI);

export const SendWhatsappProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedClients, setSelectedClients] = useState<Client[]>([]);
  const [selectClientsId, setSelectClientsId] = useState<number[]>([]);

  return (
    <SendWhatsappContext.Provider
      value={{
        selectedClients,
        setSelectedClients,
        selectClientsId,
        setSelectClientsId
      }}
    >
      {children}
    </SendWhatsappContext.Provider>
  );
};

export default function useSendWhatsapp() {
  const context = useContext(SendWhatsappContext);

  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return context;
}
