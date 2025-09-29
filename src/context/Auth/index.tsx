import { createContext, useContext, useEffect, useState } from "react";
import { AuthModel } from "./types";
import { useRouter } from "next/router";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";

interface AuthContextI {
  getAccessToken: () => string | null;
  setCredentials: (credentials: AuthModel) => void;
  clearCredentials: () => void;
  isAdmin: () => boolean;
  getUserRoles: () => string;
}

const AuthContext = createContext<AuthContextI>({} as AuthContextI);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const isAuthenticated = useIsAuthenticated();
  const { instance } = useMsal();
  const [authModel, setAuthModel] = useState<AuthModel | null>(null);

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("access_token");
    const storedUsername = localStorage.getItem("username");
    const storedRoles = window.localStorage.getItem("role");

    setAuthModel({
      access_token: storedAccessToken ?? "",
      type: "",
      username: storedUsername ?? "",
      role: storedRoles ? JSON.parse(storedRoles) : [],
    });
  }, []);

  function setCredentials(credencials: AuthModel): void {
    localStorage.setItem("access_token", credencials.access_token);
    localStorage.setItem("username", credencials.username);
    localStorage.setItem("role", credencials.role);
    setAuthModel(credencials);
  }

  function getAccessToken(): string | null {
    if (authModel?.access_token) {
      return authModel.access_token;
    }
    const token = localStorage.getItem("access_token");
    return token;
  }

  function clearCredentials(): void {
    if (isAuthenticated) {
      instance.logoutPopup().then(() => {
        clearAuth();
      });
    } else {
      clearAuth();
    }
  }

  function clearAuth(): void {
    setAuthModel(null);
    localStorage.clear();
    const currentMainRoute = router.pathname.split("/")[1];
    router.replace({
      pathname: "/",
      query: currentMainRoute
        ? {
          from: currentMainRoute,
        }
        : {},
    });
  }


  function getUserRoles(): string {
    if (authModel?.role) {
      return authModel.role;
    }

    return "";
  }

  function isAdmin(): boolean {
    return getUserRoles().includes("ADMIN");
  }

  return (
    <AuthContext.Provider
      value={{
        getAccessToken,
        setCredentials,
        clearCredentials,
        isAdmin,
        getUserRoles,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
}
