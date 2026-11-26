"use client";

import { motion } from "framer-motion";
import { useEffect, type ReactNode } from "react";
import { StatusPill } from "@/components/ui/StatusPill";
import type { StatusTone } from "@/types";

export interface DetailRow {
  label: string;
  value: ReactNode;
}

export interface DetailGroup {
  title: string;
  rows: DetailRow[];
}

/** Fenêtre modale de détails : fermeture par Échap, clic sur le fond ou bouton. */
export function DetailsDialog({
  title,
  subtitle,
  status,
  groups,
  onClose,
}: {
  title: string;
  subtitle?: string;
  status?: { label: string; tone: StatusTone };
  groups: DetailGroup[];
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.16 }}
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/45 p-0 sm:items-center sm:p-4"
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        onClick={(event) => event.stopPropagation()}
        className="max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-t-card border border-line bg-surface shadow-card sm:rounded-card"
      >
        <div className="sticky top-0 flex items-start justify-between gap-3 border-b border-line bg-surface p-4 sm:p-5">
          <div className="min-w-0">
            <h2 className="text-base font-bold text-ink">{title}</h2>
            {subtitle && <p className="mt-0.5 text-xs text-muted">{subtitle}</p>}
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {status && <StatusPill label={status.label} tone={status.tone} size="sm" />}
            <button
              type="button"
              onClick={onClose}
              aria-label="Fermer"
              className="rounded-lg p-1.5 text-muted transition-colors hover:bg-sand hover:text-ink"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        <div className="space-y-5 p-4 sm:p-5">
          {groups.map((group) => (
            <section key={group.title}>
              <h3 className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted">{group.title}</h3>
              <dl className="divide-y divide-line-subtle rounded-xl border border-line-subtle bg-sand/40 text-xs">
                {group.rows.map((row) => (
                  <div key={row.label} className="flex items-start justify-between gap-4 px-3 py-2.5">
                    <dt className="shrink-0 text-muted">{row.label}</dt>
                    <dd className="text-right font-semibold text-ink">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
