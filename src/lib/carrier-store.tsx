"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { initialCarriers } from "@/lib/mock-data/users";
import type { Carrier, VerificationStatus } from "@/types";

interface CarrierStore {
  carriers: Carrier[];
  pendingCount: number;
  setVerification: (id: string, status: VerificationStatus) => void;
}

const CarrierContext = createContext<CarrierStore | null>(null);

/**
 * État partagé des vérifications. Il vit dans le layout admin pour survivre à la
 * navigation et alimenter le badge de la Sidebar ; à remplacer par l'API au branchement backend.
 */
export function CarrierProvider({ children }: { children: ReactNode }) {
  const [carriers, setCarriers] = useState(initialCarriers);

  const setVerification = useCallback((id: string, status: VerificationStatus) => {
    setCarriers((current) =>
      current.map((carrier) => (carrier.id === id ? { ...carrier, verification: status } : carrier)),
    );
  }, []);

  const value = useMemo(
    () => ({
      carriers,
      setVerification,
      pendingCount: carriers.filter((c) => c.verification === "pending" || c.verification === "incomplete").length,
    }),
    [carriers, setVerification],
  );

  return <CarrierContext.Provider value={value}>{children}</CarrierContext.Provider>;
}

export function useCarriers(): CarrierStore {
  const store = useContext(CarrierContext);
  if (!store) throw new Error("useCarriers doit être utilisé dans CarrierProvider");
  return store;
}
