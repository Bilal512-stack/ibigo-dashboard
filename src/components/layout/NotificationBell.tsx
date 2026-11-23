"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCarriers } from "@/lib/carrier-store";
import { auditEvents } from "@/lib/mock-data/audit";
import { carrierDocumentsQueue } from "@/lib/mock-data/documents";
import { payments } from "@/lib/mock-data/payments";

const MAX_BADGE = 99;

/** Cloche d'alertes : le badge affiche le nombre total d'éléments à traiter. */
export function NotificationBell() {
  const { pendingCount } = useCarriers();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const pendingDocs = carrierDocumentsQueue.filter(
    (doc) => doc.status === "En attente" || doc.status === "En cours d'analyse",
  ).length;
  const pendingPayments = payments.filter((payment) => payment.status === "En attente").length;
  const alerts = auditEvents.filter((event) => event.tone === "danger" || event.tone === "warning").length;

  const items = [
    { label: "Transporteurs à vérifier", count: pendingCount, href: "/users/transporteurs" },
    { label: "Documents à valider", count: pendingDocs, href: "/documents" },
    { label: "Paiements en attente", count: pendingPayments, href: "/tokens" },
    { label: "Alertes du journal d'audit", count: alerts, href: "/" },
  ];
  const total = items.reduce((sum, item) => sum + item.count, 0);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="relative p-2 rounded-xl text-muted hover:bg-sand hover:text-ink transition-colors"
        aria-label={total ? `Notifications : ${total} à traiter` : "Notifications"}
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        {total > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[9px] font-bold leading-none text-white tabular-nums">
            {total > MAX_BADGE ? `${MAX_BADGE}+` : total}
          </span>
        )}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-72 max-w-[calc(100vw-2rem)] overflow-hidden rounded-card border border-line bg-surface shadow-card"
        >
          <p className="border-b border-line px-4 py-3 text-xs font-bold text-ink">
            {total} élément{total > 1 ? "s" : ""} à traiter
          </p>
          <ul className="divide-y divide-line-subtle">
            {items.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between gap-3 px-4 py-3 text-xs text-ink transition-colors hover:bg-sand"
                >
                  <span className="font-medium">{item.label}</span>
                  <span
                    className={`min-w-6 rounded-full px-2 py-0.5 text-center text-[10px] font-bold tabular-nums ${
                      item.count > 0 ? "bg-accent-soft text-accent" : "bg-line-subtle text-muted"
                    }`}
                  >
                    {item.count}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
