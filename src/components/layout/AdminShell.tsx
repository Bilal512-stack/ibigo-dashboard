"use client";

import { useState, type ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";

export function AdminShell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="h-dvh overflow-hidden flex bg-sand">
      <Sidebar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="flex-1 h-dvh overflow-y-auto flex flex-col min-w-0">
        <Header onMenuToggle={() => setMenuOpen((open) => !open)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1580px] w-full mx-auto space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}
