"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CARRIERS_HREF, navSections } from "@/components/layout/navigation";
import { useCarriers } from "@/lib/carrier-store";

function isActivePath(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const { pendingCount } = useCarriers();

  return (
    <>
      {isOpen && (
        <div onClick={onClose} className="fixed inset-0 z-40 bg-black/40 lg:hidden" aria-hidden="true" />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[240px] shrink-0 h-dvh overflow-y-auto bg-surface flex flex-col border-r border-line transition-transform duration-300 lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-[70px] shrink-0 px-5 flex items-center justify-between border-b border-line sticky top-0 bg-surface z-10">
          <Link href="/" className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl flex items-center justify-center bg-accent">
              <Image src="/logo-icon.png" alt="" width={18} height={18} />
            </span>
            <span>
              <span className="text-base font-bold tracking-tight text-ink block leading-none">IBIGO</span>
              <span className="text-[10px] uppercase tracking-wider text-muted font-medium block mt-1">
                Administration
              </span>
            </span>
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-muted hover:text-ink lg:hidden"
            aria-label="Fermer le menu"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <nav className="p-3.5 space-y-5 flex-1">
          {navSections.map((section) => (
            <div key={section.title}>
              <p className="px-3 text-[10px] font-semibold tracking-wider uppercase text-faint">{section.title}</p>
              <div className="space-y-1 pt-2">
                {section.items.map((item) => {
                  const active = isActivePath(pathname, item.href);
                  const badge = item.href === CARRIERS_HREF ? pendingCount : item.badge;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs transition-colors ${
                        active
                          ? "bg-accent-soft text-accent font-semibold"
                          : "text-muted font-medium hover:text-ink hover:bg-sand"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        {item.icon}
                        {item.label}
                      </span>
                      {badge ? (
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            active ? "bg-accent text-white" : item.badgeClassName
                          }`}
                        >
                          {badge}
                        </span>
                      ) : null}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-3.5 border-t border-line shrink-0">
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-line bg-surface hover:bg-sand text-xs font-semibold text-ink transition-colors"
          >
            <svg className="w-3.5 h-3.5 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
