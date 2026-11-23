import type { ReactNode } from "react";
import { AuthGate } from "@/components/auth/AuthGate";
import { AdminShell } from "@/components/layout/AdminShell";
import { CarrierProvider } from "@/lib/carrier-store";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AuthGate>
      <CarrierProvider>
        <AdminShell>{children}</AdminShell>
      </CarrierProvider>
    </AuthGate>
  );
}
