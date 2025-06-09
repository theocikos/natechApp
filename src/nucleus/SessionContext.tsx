
import { useSession, UseSessionType } from "@/state/hooks/useSession";
import React, { createContext, ReactNode, useContext } from "react";


const SessionContext = createContext<UseSessionType | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
  const session = useSession();

  return (
    <SessionContext.Provider value={session}>{children}</SessionContext.Provider>
  );
}

export function useSessionContext() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSessionContext must be used within an SessionProvider");
  }
  
  return context;
}
