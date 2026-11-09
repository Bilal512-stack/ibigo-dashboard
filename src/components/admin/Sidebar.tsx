"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
  badge?: number | string;
  badgeColor?: string;
  icon: (active: boolean) => React.ReactNode;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

interface SidebarProps {
  currentPath?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ currentPath, isOpen, onClose }: SidebarProps) {
  const pathname = usePathname() || currentPath || "/";

  const navSections: NavSection[] = [
    {
      title: "SUPERVISION",
      items: [
        {
          label: "Vue d'ensemble",
          href: "/",
          icon: (active) => (
            <svg className={`w-4 h-4 ${active ? "text-white" : "text-[#94A3B8]"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect width="7" height="7" x="3" y="3" rx="1.5" />
              <rect width="7" height="7" x="14" y="3" rx="1.5" />
              <rect width="7" height="7" x="14" y="14" rx="1.5" />
              <rect width="7" height="7" x="3" y="14" rx="1.5" />
            </svg>
          ),
        },
      ],
    },
    {
      title: "CORRIDORS & OPÉRATIONS",
      items: [
        {
          label: "Utilisateurs & KYC",
          href: "/users",
          badge: 14,
          badgeColor: "bg-[#FD4F49]/20 text-[#FD4F49]",
          icon: (active) => (
            <svg className={`w-4 h-4 ${active ? "text-white" : "text-[#94A3B8]"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          ),
        },
        {
          label: "Validation Documents",
          href: "/documents",
          badge: 12,
          badgeColor: "bg-[#F57C00]/20 text-[#FFB74D]",
          icon: (active) => (
            <svg className={`w-4 h-4 ${active ? "text-white" : "text-[#94A3B8]"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="9" x2="15" y1="15" y2="15" />
              <line x1="12" x2="12" y1="12" y2="18" />
            </svg>
          ),
        },
        {
          label: "Annonces & Flux",
          href: "/announcements",
          icon: (active) => (
            <svg className={`w-4 h-4 ${active ? "text-white" : "text-[#94A3B8]"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="1" y="3" width="15" height="13" rx="1" />
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
              <circle cx="5.5" cy="18.5" r="2.5" />
              <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
          ),
        },
        {
          label: "Gestions des Jetons",
          href: "/tokens",
          icon: (active) => (
            <svg className={`w-4 h-4 ${active ? "text-white" : "text-[#94A3B8]"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="8" cy="8" r="6" />
              <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
              <path d="m7 6 5 5" />
            </svg>
          ),
        },
      ],
    },
    {
      title: "SÉCURITÉ & LITIGES",
      items: [
        {
          label: "Modération & Alertes",
          href: "/moderation",
          badge: 8,
          badgeColor: "bg-[#D32F2F]/20 text-[#FF8A80]",
          icon: (active) => (
            <svg className={`w-4 h-4 ${active ? "text-white" : "text-[#94A3B8]"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          ),
        },
        {
          label: "Paramètres Système",
          href: "/settings",
          icon: (active) => (
            <svg className={`w-4 h-4 ${active ? "text-white" : "text-[#94A3B8]"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          ),
        },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar container with independent height and scroll */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[240px] shrink-0 h-screen overflow-y-auto bg-[#1E242B] text-white flex flex-col border-r border-[#2A323D] transition-transform duration-300 lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="h-[70px] shrink-0 px-6 flex items-center justify-between border-b border-[#2A323D] sticky top-0 bg-[#1E242B] z-10">
          <Link href="/" className="flex items-center gap-3 group">
            {/* Logo icon */}
            <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-gradient-to-tr from-[#FD4F49] to-[#FF706B] shadow-[0_4px_14px_rgba(253,79,73,0.35)] ring-1 ring-white/20">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="8" cy="8" r="3" />
                <circle cx="16" cy="8" r="3" />
                <circle cx="8" cy="16" r="3" />
                <circle cx="16" cy="16" r="3" />
              </svg>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-tight text-white block leading-none">
                  Ibigo
                </span>
                <span className="px-1.5 py-0.2 rounded-full text-[8.5px] font-black uppercase tracking-wider bg-[#FD4F49] text-white">
                  CEMAC
                </span>
              </div>
              <span className="text-[9.5px] uppercase tracking-wider text-[#94A3B8] font-bold block mt-0.5">
                Transit & Cargo
              </span>
            </div>
          </Link>

          {/* Close button on mobile */}
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-[#94A3B8] hover:text-white lg:hidden"
            aria-label="Fermer le menu"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Navigation Sections */}
        <div className="p-3.5 space-y-6 flex-1">
          {navSections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-1">
              <p className="px-3 text-[10px] font-bold tracking-wider uppercase text-[#666F7A]">
                {section.title}
              </p>
              <div className="space-y-1 pt-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group ${
                        isActive
                          ? "bg-[#FD4F49] text-white shadow-[0_4px_16px_rgba(253,79,73,0.3)]"
                          : "text-[#94A3B8] hover:text-white hover:bg-[#2A323D]/60"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="transition-transform group-hover:scale-110">
                          {item.icon(isActive)}
                        </span>
                        <span>{item.label}</span>
                      </div>

                      {item.badge !== undefined && (
                        <span
                          className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                            isActive
                              ? "bg-white/20 text-white"
                              : item.badgeColor || "bg-[#2A323D] text-[#94A3B8]"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Live Node / Infrastructure Status Box */}
        <div className="p-3.5 border-t border-[#2A323D] space-y-3 shrink-0">
          <div className="p-3 rounded-xl bg-[#171C22] border border-[#2A323D] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">
                Passerelle Douane
              </span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#43A05B] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#43A05B]"></span>
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px]">
              <span className="font-semibold text-white">Hub Sarh / Sibut</span>
              <span className="text-[#43A05B] font-mono text-[10px] font-bold">18 ms</span>
            </div>

            <div className="w-full bg-[#232A33] rounded-full h-1 overflow-hidden">
              <div className="bg-[#43A05B] h-1 rounded-full w-[94%]" />
            </div>
          </div>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-[#3A4553] bg-[#232A33] hover:bg-[#2A323D] text-xs font-semibold text-white transition-all shadow-2xs"
          >
            <svg className="w-3.5 h-3.5 text-[#94A3B8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" x2="12" y1="15" y2="3" />
            </svg>
            Exporter Rapport
          </button>
        </div>
      </aside>
    </>
  );
}
