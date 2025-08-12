import { createContext, useContext, useState } from "react";

export interface LayoutContextI {
  collapsed: boolean | null;
  setCollapsed: (p: boolean) => void;
}

const LayoutContext = createContext<LayoutContextI>({} as LayoutContextI);

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState<boolean | null>(false);

  return (
    <LayoutContext.Provider
      value={{
        collapsed,
        setCollapsed,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

export default function useLayout() {
  const context = useContext(LayoutContext);

  if (!context) {
    throw new Error("useBranch must be used within a BranchProvider");
  }

  return context;
}