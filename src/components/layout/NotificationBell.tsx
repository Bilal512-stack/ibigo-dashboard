"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useCarriers } from "@/lib/carrier-store";
import { formatDateTime, formatFcfa } from "@/lib/format";
import { carrierDocumentsQueue } from "@/lib/mock-data/documents";
import { missions } from "@/lib/mock-data/operations";
import { payments } from "@/lib/mock-data/payments";

const MAX_BADGE = 99;

type NotifCategory = "kyc" | "document" | "payment" | "mission";
type NotifSeverity = "urgent" | "warning" | "info";
type FilterTab = "all" | "unread" | "urgent";

interface NotificationItem {
  id: string;
  category: NotifCategory;
  severity: NotifSeverity;
  title: string;
  detail: string;
  time: string;
  badge?: string;
  href: string;
}

const CATEGORY_STYLES: Record<NotifSeverity, string> = {
  urgent: "bg-danger-soft text-danger",
  warning: "bg-warning-soft text-warning",
  info: "bg-info-soft text-info",
};

const BADGE_STYLES: Record<NotifSeverity, string> = {
  urgent: "bg-danger-soft text-danger border-danger-line",
  warning: "bg-warning-soft text-warning border-warning-line",
  info: "bg-info-soft text-info border-info-line",
};

function CategoryIcon({ category }: { category: NotifCategory }) {
  switch (category) {
    case "kyc":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      );
    case "document":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
        </svg>
      );
    case "payment":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
          <line x1="1" y1="10" x2="23" y2="10" />
        </svg>
      );
    case "mission":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
          <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      );
  }
}

/** Cloche de notifications temps réel alimentée par les dossiers, documents, paiements et missions. */
export function NotificationBell() {
  const { carriers } = useCarriers();
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<FilterTab>("all");
  const [readIds, setReadIds] = useState<Set<string>>(() => new Set());
  const rootRef = useRef<HTMLDivElement>(null);

  const notifications = useMemo<NotificationItem[]>(() => {
    const list: NotificationItem[] = [];

    // 1. Documents critiques ou en attente
    for (const doc of carrierDocumentsQueue) {
      if (doc.status !== "En attente" && doc.status !== "En cours d'analyse") continue;
      const isCritical = doc.riskScore === "Critique";
      list.push({
        id: `doc-${doc.id}`,
        category: "document",
        severity: isCritical ? "urgent" : "warning",
        title: isCritical ? `Document critique · ${doc.documentType}` : `Document à valider · ${doc.documentType}`,
        detail: `${doc.countryFlag} ${doc.carrierName} (${doc.company})`,
        time: doc.uploadedDate,
        badge: isCritical ? "Critique" : doc.status,
        href: "/documents",
      });
    }

    // 2. Missions rompues ou avis en attente
    for (const mission of missions) {
      if (mission.status !== "Rompue" && mission.status !== "Avis en attente") continue;
      const isBroken = mission.status === "Rompue";
      list.push({
        id: `msn-${mission.id}`,
        category: "mission",
        severity: isBroken ? "urgent" : "warning",
        title: isBroken ? `Mission rompue ${mission.id}` : `Avis en attente ${mission.id}`,
        detail: `${mission.origin} → ${mission.destination} · ${mission.carrier}`,
        time: mission.closedDate,
        badge: mission.status,
        href: "/operations/camions-missions",
      });
    }

    // 3. Transporteurs KYC en attente ou incomplets
    for (const carrier of carriers) {
      if (carrier.verification !== "pending" && carrier.verification !== "incomplete") continue;
      const isIncomplete = carrier.verification === "incomplete";
      list.push({
        id: `kyc-${carrier.id}`,
        category: "kyc",
        severity: "warning",
        title: isIncomplete ? `Dossier KYC incomplet · ${carrier.name}` : `Nouveau dossier KYC · ${carrier.name}`,
        detail: `${carrier.countryFlag} ${carrier.company} · ${carrier.trucks} camion${carrier.trucks > 1 ? "s" : ""}`,
        time: carrier.submissionDate,
        badge: isIncomplete ? "Incomplet" : "À vérifier",
        href: "/users/transporteurs",
      });
    }

    // 4. Paiements Mobile Money en attente (les 5 plus récents)
    const pendingPayments = payments.filter((p) => p.status === "En attente").slice(0, 5);
    for (const payment of pendingPayments) {
      list.push({
        id: `pay-${payment.id}`,
        category: "payment",
        severity: "info",
        title: `Paiement en attente · ${formatFcfa(payment.amountFcfa)}`,
        detail: `${payment.payerName} · ${payment.operator} (${payment.packName})`,
        time: formatDateTime(payment.timestamp),
        badge: "En attente",
        href: "/tokens",
      });
    }

    // Trier : urgentes d'abord, puis warning, puis info
    const order: Record<NotifSeverity, number> = { urgent: 0, warning: 1, info: 2 };
    return list.sort((a, b) => order[a.severity] - order[b.severity]);
  }, [carriers]);

  const unreadCount = notifications.filter((n) => !readIds.has(n.id)).length;
  const urgentCount = notifications.filter((n) => n.severity === "urgent").length;

  const visible = notifications.filter((n) => {
    if (tab === "unread") return !readIds.has(n.id);
    if (tab === "urgent") return n.severity === "urgent";
    return true;
  });

  const markRead = (id: string) => {
    setReadIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const markAllRead = () => {
    setReadIds(new Set(notifications.map((n) => n.id)));
  };

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
        aria-haspopup="dialog"
        aria-expanded={open}
        className="relative p-2 rounded-xl text-muted hover:bg-sand hover:text-ink transition-colors"
        aria-label={unreadCount ? `Notifications : ${unreadCount} non lues` : "Notifications"}
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[9px] font-bold leading-none text-white tabular-nums">
            {unreadCount > MAX_BADGE ? `${MAX_BADGE}+` : unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Centre de notifications"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="fixed inset-x-4 top-[76px] sm:inset-x-auto sm:top-auto sm:absolute sm:right-0 z-50 sm:mt-2 sm:w-[24rem] overflow-hidden rounded-card border border-line bg-surface shadow-[0_8px_24px_rgb(30_36_43/0.08)]"
          >
          {/* En-tête */}
          <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-line">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-ink">Notifications</span>
              {unreadCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-md bg-accent-soft text-accent text-[10px] font-bold tabular-nums">
                  {unreadCount} non lue{unreadCount > 1 ? "s" : ""}
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllRead}
                className="text-[11px] font-semibold text-accent hover:underline"
              >
                Tout marquer lu
              </button>
            )}
          </div>

          {/* Onglets de filtre */}
          <div className="flex items-center gap-1 px-3 py-2 border-b border-line-subtle bg-sand/40 text-[11px] font-semibold">
            {(
              [
                { id: "all", label: "Toutes", count: notifications.length },
                { id: "unread", label: "Non lues", count: unreadCount },
                { id: "urgent", label: "Urgentes", count: urgentCount },
              ] as const
            ).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  tab === item.id ? "bg-dark-card text-white font-bold" : "text-muted hover:text-ink"
                }`}
              >
                {item.label} <span className="opacity-70">({item.count})</span>
              </button>
            ))}
          </div>

          {/* Liste des notifications */}
          {visible.length === 0 ? (
            <div className="py-10 px-4 text-center">
              <p className="text-xs font-semibold text-ink">Aucune notification</p>
              <p className="text-[11px] text-muted mt-0.5">Tout est à jour dans cette catégorie.</p>
            </div>
          ) : (
            <ul className="max-h-[22rem] overflow-y-auto divide-y divide-line-subtle">
              {visible.map((notif) => {
                const isUnread = !readIds.has(notif.id);
                return (
                  <li key={notif.id}>
                    <Link
                      href={notif.href}
                      onClick={() => {
                        markRead(notif.id);
                        setOpen(false);
                      }}
                      className={`flex items-start gap-3 px-4 py-3 transition-colors hover:bg-sand/60 ${
                        isUnread ? "bg-accent-soft/20" : ""
                      }`}
                    >
                      <span className={`mt-0.5 w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${CATEGORY_STYLES[notif.severity]}`}>
                        <CategoryIcon category={notif.category} />
                      </span>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className={`text-xs leading-snug ${isUnread ? "font-bold text-ink" : "font-semibold text-muted"}`}>
                            {notif.title}
                          </p>
                          {isUnread && <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />}
                        </div>
                        <p className="text-[11px] text-muted mt-0.5 line-clamp-1">{notif.detail}</p>
                        <div className="mt-1.5 flex items-center justify-between gap-2">
                          <span className="text-[10px] text-faint">{notif.time}</span>
                          {notif.badge && (
                            <span className={`px-1.5 py-0.5 rounded-md border text-[10px] font-semibold ${BADGE_STYLES[notif.severity]}`}>
                              {notif.badge}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}

          {/* Pied */}
          <div className="px-4 py-2.5 border-t border-line bg-sand/30 flex items-center justify-between text-[11px] text-muted">
            <span>{notifications.length} alerte{notifications.length > 1 ? "s" : ""} active{notifications.length > 1 ? "s" : ""}</span>
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="font-semibold text-accent hover:underline"
            >
              Vue d&apos;ensemble
            </Link>
          </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
