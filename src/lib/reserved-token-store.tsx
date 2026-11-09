"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

interface ReservedTokenStore {
  releasedIds: string[];
  release: (id: string) => void;
}

const ReservedTokenContext = createContext<ReservedTokenStore | null>(null);

/** Libérations manuelles conservées pendant la navigation ; à remplacer par l'API au branchement backend. */
export function ReservedTokenProvider({ children }: { children: ReactNode }) {
  const [releasedIds, setReleasedIds] = useState<string[]>([]);

  const release = useCallback((id: string) => {
    setReleasedIds((current) => (current.includes(id) ? current : [...current, id]));
  }, []);

  const value = useMemo(() => ({ releasedIds, release }), [releasedIds, release]);

  return <ReservedTokenContext.Provider value={value}>{children}</ReservedTokenContext.Provider>;
}

export function useReservedTokens(): ReservedTokenStore {
  const store = useContext(ReservedTokenContext);
  if (!store) throw new Error("useReservedTokens doit être utilisé dans ReservedTokenProvider");
  return store;
}
