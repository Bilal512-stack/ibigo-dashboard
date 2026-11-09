import type { ReactNode } from "react";
import { AdminShell } from "@/components/layout/AdminShell";
import { CarrierProvider } from "@/lib/carrier-store";
import { ReservedTokenProvider } from "@/lib/reserved-token-store";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <CarrierProvider>
      <ReservedTokenProvider>
        <AdminShell>{children}</AdminShell>
      </ReservedTokenProvider>
    </CarrierProvider>
  );
}
