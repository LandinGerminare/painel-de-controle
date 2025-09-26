import useFetchData from "@/hooks/swr/useFetchData";
import { TripleState } from "@/hooks/triple/tripleState";
import { useTripleRequest } from "@/hooks/triple/useTripleRequest";
import { IUser } from "@/types/User";
import {
  createContext,
  useContext
} from "react";

export interface ClientRegistrationType {
  users: TripleState<IUser[]>;
  refreshUsers: () => void;
}

const ClientRegistrationContext = createContext<ClientRegistrationType>({} as ClientRegistrationType);

export const ClientRegistrationProvider = ({ children }: { children: React.ReactNode }) => {

  const { tripleState: users, mutateData: mutateUsers } = useFetchData<IUser[]>(`/all-users`);

  function refreshUsers() {
    mutateUsers();
  }

  return (
    <ClientRegistrationContext.Provider
      value={{
        users,
        refreshUsers
      }}
    >
      {children}
    </ClientRegistrationContext.Provider>
  );
};

export default function useClientRegistration() {
  const context = useContext(ClientRegistrationContext);

  if (!context) {
    throw new Error("useClientRegistration must be used within a ClientRegistrationProvider");
  }

  return context;
}
