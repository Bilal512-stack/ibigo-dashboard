"use client";

import { useState } from "react";
import { EmptyRow, FilterTabs, SearchInput, matchesSearch } from "@/components/ui/FilterControls";
import { StatusPill } from "@/components/ui/StatusPill";
import { COUNTRY_OPTIONS, OPERATOR_COLORS, PAYMENT_STATUS_TONES } from "@/lib/constants";
import { formatDateTime, formatFcfa } from "@/lib/format";
import type { Payment, PaymentStatus } from "@/types";

const PAGE_SIZE = 12;
const STATUSES: PaymentStatus[] = ["Réussi", "En attente", "Échoué"];

type StatusFilter = "all" | PaymentStatus;

export function PaymentsTable({ payments }: { payments: Payment[] }) {
  const [status, setStatus] = useState<StatusFilter>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const tabs = [
    { value: "all" as StatusFilter, label: "Tous", count: payments.length },
    ...STATUSES.map((value) => ({
      value: value as StatusFilter,
      label: value,
      count: payments.filter((payment) => payment.status === value).length,
    })),
  ];

  const rows = payments.filter(
    (payment) =>
      (status === "all" || payment.status === status) &&
      matchesSearch(search, [payment.id, payment.payerName, payment.payerPhone, payment.operator]),
  );

  const pageCount = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const visible = rows.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const countryLabel = (code: Payment["country"]) => COUNTRY_OPTIONS.find((c) => c.code === code)?.label ?? code;

  const pagerButton = "px-3 py-1.5 rounded-lg border border-line text-xs font-bold text-ink hover:bg-sand transition-colors disabled:text-faint disabled:hover:bg-transparent disabled:cursor-not-allowed";

  return (
    <section className="bg-surface border border-line rounded-card overflow-hidden shadow-card">
      <div className="p-4 px-6 border-b border-line flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-ink mb-2">Tous les paiements</h2>
          <FilterTabs
            tabs={tabs}
            active={status}
            onChange={(value) => {
              setStatus(value);
              setPage(1);
            }}
          />
        </div>
        <SearchInput
          value={search}
          onChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
          placeholder="Référence, émetteur, téléphone..."
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs min-w-[880px]">
          <thead>
            <tr className="bg-dark-card text-white font-semibold">
              <th scope="col" className="py-3.5 px-5">Référence</th>
              <th scope="col" className="py-3.5 px-5">Émetteur</th>
              <th scope="col" className="py-3.5 px-5">Opérateur</th>
              <th scope="col" className="py-3.5 px-5">Pays</th>
              <th scope="col" className="py-3.5 px-5">Pack</th>
              <th scope="col" className="py-3.5 px-5 text-right">Montant</th>
              <th scope="col" className="py-3.5 px-5">Statut</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line/70">
            {visible.length === 0 && <EmptyRow colSpan={7} label="Aucun paiement pour ces filtres." />}
            {visible.map((payment) => (
              <tr key={payment.id} className="hover:bg-sand/70 transition-colors">
                <td className="py-3.5 px-5 whitespace-nowrap">
                  <div className="font-bold text-ink">{payment.id}</div>
                  <div className="text-[11px] text-muted">{formatDateTime(payment.timestamp)}</div>
                </td>
                <td className="py-3.5 px-5 whitespace-nowrap">
                  <div className="font-bold text-ink">{payment.payerName}</div>
                  <div className="text-[11px] text-muted">{payment.payerRole} · {payment.payerPhone}</div>
                </td>
                <td className="py-3.5 px-5 whitespace-nowrap">
                  <span className="flex items-center gap-2 font-semibold text-ink">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: OPERATOR_COLORS[payment.operator] }} aria-hidden="true" />
                    {payment.operator}
                  </span>
                </td>
                <td className="py-3.5 px-5 whitespace-nowrap text-ink">{countryLabel(payment.country)}</td>
                <td className="py-3.5 px-5 whitespace-nowrap">
                  <div className="font-semibold text-ink">{payment.packName}</div>
                  <div className="text-[11px] text-muted">{payment.tokens} jeton{payment.tokens > 1 ? "s" : ""}</div>
                </td>
                <td className="py-3.5 px-5 text-right whitespace-nowrap font-bold text-ink tabular-nums">{formatFcfa(payment.amountFcfa)}</td>
                <td className="py-3.5 px-5 whitespace-nowrap">
                  <StatusPill label={payment.status} tone={PAYMENT_STATUS_TONES[payment.status]} size="sm" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 px-6 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted">
        <span>{rows.length} paiements · Données de démonstration</span>
        <div className="flex items-center gap-2">
          <button type="button" className={pagerButton} disabled={currentPage <= 1} onClick={() => setPage(currentPage - 1)}>
            Précédent
          </button>
          <span className="tabular-nums">Page {currentPage} / {pageCount}</span>
          <button type="button" className={pagerButton} disabled={currentPage >= pageCount} onClick={() => setPage(currentPage + 1)}>
            Suivant
          </button>
        </div>
      </div>
    </section>
  );
}
