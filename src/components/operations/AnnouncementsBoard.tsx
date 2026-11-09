"use client";

import { useState, type ReactNode } from "react";
import { EmptyRow, FilterTabs, SearchInput, matchesSearch } from "@/components/ui/FilterControls";
import { StatusPill } from "@/components/ui/StatusPill";
import type { Announcement } from "@/types";

type StatusFilter = "all" | "Disponible" | "En discussion" | "Conclu" | "Expiré";

const STATUS_TABS: { value: Exclude<StatusFilter, "all">; label: string }[] = [
  { value: "Disponible", label: "Disponibles" },
  { value: "En discussion", label: "En discussion" },
  { value: "Conclu", label: "Conclues" },
  { value: "Expiré", label: "Expirées" },
];

function RowAction({ title, hoverClassName, children }: { title: string; hoverClassName: string; children: ReactNode }) {
  return (
    <button type="button" title={title} aria-label={title} className={`p-1.5 rounded-lg transition-colors ${hoverClassName}`}>
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        {children}
      </svg>
    </button>
  );
}

function expiryClassName(expiry: string) {
  if (expiry.includes("12h") || expiry.includes("Délai")) return "text-danger";
  if (expiry.includes("Négociation")) return "text-warning";
  return "text-muted";
}

export function AnnouncementsBoard({
  items,
  initialFilter = "all",
  searchPlaceholder,
  ownerLabel,
}: {
  items: Announcement[];
  initialFilter?: StatusFilter;
  searchPlaceholder: string;
  ownerLabel: string;
}) {
  const [filter, setFilter] = useState<StatusFilter>(initialFilter);
  const [search, setSearch] = useState("");

  const tabs = [
    { value: "all" as StatusFilter, label: "Toutes", count: items.length },
    ...STATUS_TABS.map((tab) => ({
      ...tab,
      count: items.filter((item) => item.status.startsWith(tab.value)).length,
    })).filter((tab) => tab.count > 0),
  ];

  const rows = items.filter(
    (item) =>
      (filter === "all" || item.status.startsWith(filter)) &&
      matchesSearch(search, [item.id, item.origin, item.destination, item.owner, item.tonnage]),
  );

  return (
    <div className="bg-surface border border-line rounded-card overflow-hidden shadow-card">
      <div className="p-4 px-6 border-b border-line flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <FilterTabs tabs={tabs} active={filter} onChange={setFilter} />
        <SearchInput value={search} onChange={setSearch} placeholder={searchPlaceholder} />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs min-w-[1040px]">
          <thead>
            <tr className="bg-dark-card text-white font-semibold">
              <th scope="col" className="py-3.5 px-5">ID & Type</th>
              <th scope="col" className="py-3.5 px-5">Trajet & Corridor</th>
              <th scope="col" className="py-3.5 px-5">Tonnage & Détails</th>
              <th scope="col" className="py-3.5 px-5">{ownerLabel}</th>
              <th scope="col" className="py-3.5 px-5">Création & Validité</th>
              <th scope="col" className="py-3.5 px-5">Statut</th>
              <th scope="col" className="py-3.5 px-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line/70">
            {rows.length === 0 && <EmptyRow colSpan={7} label="Aucune annonce pour ces filtres." />}
            {rows.map((item) => (
              <tr key={item.id} className="hover:bg-sand/70 transition-colors">
                <td className="py-4 px-5 whitespace-nowrap">
                  <div className="font-bold text-ink">{item.id}</div>
                  <div className="text-[10px] font-semibold text-muted uppercase tracking-wide">{item.type}</div>
                  <div className="text-[10px] text-faint font-medium">{item.timeAgo}</div>
                </td>
                <td className="py-4 px-5 whitespace-nowrap">
                  <div className="font-bold text-ink flex items-center gap-1.5">
                    <span>{item.origin}</span>
                    <span className="text-accent">→</span>
                    <span>{item.destination}</span>
                  </div>
                  <div className="text-[11px] text-muted mt-0.5 font-medium">
                    {item.distance} • {item.via}
                  </div>
                </td>
                <td className="py-4 px-5">
                  <div className="font-bold text-ink">{item.tonnage}</div>
                  <div className="text-[11px] text-muted mt-0.5 font-medium">{item.details}</div>
                </td>
                <td className="py-4 px-5">
                  <div className="font-bold text-ink">{item.owner}</div>
                  <div className="text-[11px] text-muted mt-0.5">{item.ownerSub}</div>
                </td>
                <td className="py-4 px-5 whitespace-nowrap">
                  <div className="text-ink font-semibold">{item.createdDate}</div>
                  <div className={`text-[11px] font-bold mt-0.5 ${expiryClassName(item.expiry)}`}>{item.expiry}</div>
                </td>
                <td className="py-4 px-5 whitespace-nowrap">
                  <StatusPill label={item.status} tone={item.statusTone} size="sm" />
                </td>
                <td className="py-4 px-5">
                  <div className="flex items-center justify-end gap-1.5 text-muted">
                    <RowAction title="Voir" hoverClassName="hover:bg-line-subtle hover:text-ink">
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </RowAction>
                    <RowAction title="Apparier" hoverClassName="hover:bg-line-subtle hover:text-accent">
                      <polyline points="16 3 21 3 21 8" />
                      <line x1="4" y1="20" x2="21" y2="3" />
                      <polyline points="21 16 21 21 16 21" />
                      <line x1="15" y1="15" x2="21" y2="21" />
                    </RowAction>
                    <RowAction title="Supprimer" hoverClassName="hover:bg-danger-soft hover:text-danger">
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    </RowAction>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="p-4 px-6 border-t border-line text-xs text-muted">
        {rows.length} sur {items.length} annonces affichées
      </p>
    </div>
  );
}
