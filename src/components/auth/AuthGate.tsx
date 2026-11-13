"use client";

import { useRouter } from "next/navigation";
import { useEffect, useSyncExternalStore, type ReactNode } from "react";
import { readSession } from "@/lib/auth";

export function AuthGate({ children }: { children: ReactNode }) {
  const router = useRouter();
  const allowed = useSyncExternalStore(
    () => () => {},
    () => readSession() !== null,
    () => false,
  );

  useEffect(() => {
    // Lecture directe : `allowed` vaut encore false lors du premier rendu d'hydratation.
    if (!readSession()) router.replace("/login");
  }, [router]);

  if (!allowed) {
    return (
      <div className="grid h-dvh place-items-center bg-sand">
        <span className="h-8 w-8 animate-spin rounded-full border-[3px] border-line border-t-accent" role="status" aria-label="Chargement" />
      </div>
    );
  }
  return <>{children}</>;
}
