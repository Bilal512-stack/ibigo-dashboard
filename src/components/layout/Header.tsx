"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { signOut } from "@/lib/auth";
import { ADMIN_ROLE_LABELS } from "@/lib/constants";
import type { AdminRole } from "@/types";

// À remplacer par la session authentifiée quand l'authentification sera branchée.
const CURRENT_ROLE: AdminRole = "super_admin";

export function Header({ onMenuToggle }: { onMenuToggle: () => void }) {
  const router = useRouter();
  const logout = () => {
    signOut();
    router.replace("/login");
  };

  return (
    <header className="h-[70px] shrink-0 sticky top-0 z-30 bg-surface/90 backdrop-blur-md border-b border-line px-4 sm:px-8 flex items-center justify-between">
      <div className="flex items-center gap-3 lg:hidden">
        <button
          type="button"
          onClick={onMenuToggle}
          className="p-2 rounded-xl text-ink hover:bg-sand border border-line"
          aria-label="Ouvrir le menu"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <span className="w-7 h-7 rounded-lg flex items-center justify-center bg-accent">
          <Image src="/logo-icon.png" alt="" width={16} height={16} />
        </span>
        <span className="text-base font-bold tracking-tight text-ink">IBIGO</span>
      </div>

      <div className="relative w-full max-w-md hidden lg:block">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-faint">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>
        <input
          type="text"
          placeholder="Rechercher conteneur, convoi, chauffeur..."
          className="w-full pl-10 pr-4 py-2 bg-sand/60 border border-line rounded-xl text-xs text-ink placeholder-faint focus:outline-none focus:border-accent focus:bg-surface focus:ring-2 focus:ring-accent/10 transition-all"
        />
      </div>

      <div className="flex items-center gap-2.5 sm:gap-4 ml-auto">
        <ThemeToggle />
        <button
          type="button"
          className="relative p-2 rounded-xl text-muted hover:bg-sand hover:text-ink transition-colors"
          aria-label="Notifications"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-accent" />
        </button>

        <div className="flex items-center gap-2.5 border-l border-line pl-3 sm:pl-4">
          <span className="w-8 h-8 rounded-full bg-dark-card text-white font-bold flex items-center justify-center text-xs">
            SA
          </span>
          <span className="text-left hidden sm:block">
            <span className="block text-xs font-bold text-ink leading-tight">{ADMIN_ROLE_LABELS[CURRENT_ROLE]}</span>
            <span className="block text-[10px] text-muted font-medium leading-tight mt-0.5">Back-office IBIGO</span>
          </span>
        </div>

        <button
          type="button"
          onClick={logout}
          aria-label="Se déconnecter"
          title="Se déconnecter"
          className="p-2 rounded-xl text-muted hover:bg-sand hover:text-danger transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </button>
      </div>
    </header>
  );
}
