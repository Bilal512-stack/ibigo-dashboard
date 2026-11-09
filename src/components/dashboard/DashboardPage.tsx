"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { useState } from "react";
import { StatCard } from "@/components/ui/StatCard";
import { StatusPill } from "@/components/ui/StatusPill";
import { CountryDistribution } from "@/components/dashboard/CountryDistribution";
import { useCarriers } from "@/lib/carrier-store";
import { formatFcfa, formatNumber } from "@/lib/format";
import { TOKEN_PRICE_FCFA } from "@/lib/constants";
import { countryTotals, overviewStats } from "@/lib/mock-data/overview";
import { auditEvents } from "@/lib/mock-data/audit";

export function DashboardPage() {
  const [activeTab, setActiveTab] = useState("Aujourd'hui");
  const { pendingCount } = useCarriers();

  const kpis = [
    {
      label: "Utilisateurs",
      value: formatNumber(countryTotals.users),
      delta: `${pendingCount} à vérifier`,
      tone: "warning" as const,
      icon: "users",
      subtext: `${formatNumber(countryTotals.carriers)} transporteurs, ${formatNumber(countryTotals.shippers)} chargeurs`,
    },
    ...overviewStats,
    {
      label: "Jetons achetés",
      value: formatNumber(countryTotals.tokensPurchased),
      icon: "gift",
      subtext: `1 jeton = ${formatFcfa(TOKEN_PRICE_FCFA)}`,
    },
    {
      label: "Montant des achats",
      value: formatFcfa(countryTotals.amountFcfa),
      icon: "shield",
      subtext: "Cumul des packs de jetons",
    },
  ];

  return (
    <>
      {/* Breadcrumb & Top Page Header */}
      <PageHeader
        breadcrumb={["Corridor RCA • Cameroun • Tchad"]}
        title="Tableau de bord Général"
        description="Supervision stratégique des corridors de transit fret transfrontalier CEMAC"
      >
        {/* Date Filters & Calendar Picker */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex bg-line-subtle/80 p-1 rounded-xl text-xs font-semibold border border-line/60 shadow-2xs">
            {["Aujourd'hui", "7J", "30J", "Trimestre"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-3 sm:px-3.5 py-1.5 rounded-lg transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-dark-card text-white shadow-xs font-bold"
                    : "text-muted hover:text-ink"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-line bg-surface text-xs font-semibold text-ink hover:bg-sand hover:border-faint shadow-2xs transition-all"
          >
            <svg className="w-3.5 h-3.5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span className="hidden xs:inline">24 Oct 2024 - 31 Oct 2024</span>
            <span className="xs:hidden">Oct 2024</span>
          </button>
        </div>
      </PageHeader>

      {/* KPIs globaux */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {kpis.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Répartition géographique */}
      <CountryDistribution />

      {/* Section 4: Journal des événements & Audit */}
      <div className="bg-surface border border-line/90 rounded-card overflow-hidden shadow-card">
        <div className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-line">
          <div>
            <h2 className="text-base font-bold text-ink">
              Journal des événements & Journal d’Audit
            </h2>
            <p className="text-xs text-muted mt-0.5">
              Enregistrement temps réel des transactions, franchissements frontaliers et contrôles KYC
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-line text-xs font-semibold text-ink hover:bg-sand transition shadow-2xs"
            >
              <svg className="w-3.5 h-3.5 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
              Filtrer
            </button>
            <button
              type="button"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-line text-xs font-semibold text-ink hover:bg-sand transition shadow-2xs"
            >
              <svg className="w-3.5 h-3.5 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
              Exporter CSV
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-dark-card text-white font-semibold">
                <th className="py-3.5 px-6">Horodatage</th>
                <th className="py-3.5 px-6">Type d’événement</th>
                <th className="py-3.5 px-6">Entité concernée</th>
                <th className="py-3.5 px-6">Corridor / Axe</th>
                <th className="py-3.5 px-6">Statut & Gravité</th>
                <th className="py-3.5 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/70">
              {auditEvents.map((evt, idx) => (
                <tr key={idx} className="hover:bg-sand/70 transition-colors group">
                  <td className="py-4 px-6 font-bold text-ink whitespace-nowrap">
                    {evt.timestamp}
                  </td>
                  <td className="py-4 px-6 font-semibold">
                    <span className={evt.typeAlert ? "text-danger font-bold" : "text-ink"}>
                      {evt.type}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-bold text-ink">{evt.entity}</div>
                    {evt.entitySub && (
                      <div className="text-[11px] text-muted mt-0.5">{evt.entitySub}</div>
                    )}
                  </td>
                  <td className="py-4 px-6 text-muted whitespace-nowrap font-medium">
                    {evt.corridor}
                  </td>
                  <td className="py-4 px-6">
                    <StatusPill label={evt.status} tone={evt.tone} size="sm" />
                  </td>
                  <td className="py-4 px-6 text-right whitespace-nowrap">
                    {evt.actionHighlight ? (
                      <button
                        type="button"
                        className="px-3.5 py-1.5 bg-accent hover:brightness-110 text-white font-bold rounded-lg text-xs shadow-xs transition active:scale-95"
                      >
                        {evt.action}
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="font-bold text-accent hover:underline"
                      >
                        {evt.action}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 px-6 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted bg-sand/20">
          <span>Affichage de 1 à 5 sur 284 entrées de télémétrie</span>

          <div className="flex items-center gap-1.5 font-bold">
            <button type="button" className="px-3 py-1.5 rounded-lg border border-line text-faint hover:bg-sand" disabled>
              Précédent
            </button>
            <button type="button" className="px-3.5 py-1.5 rounded-lg bg-dark-card text-white font-bold shadow-xs">
              1
            </button>
            <button type="button" className="px-3.5 py-1.5 rounded-lg border border-line hover:bg-surface transition">
              2
            </button>
            <button type="button" className="px-3.5 py-1.5 rounded-lg border border-line hover:bg-surface transition">
              3
            </button>
            <span className="px-1 text-faint">...</span>
            <button type="button" className="px-3.5 py-1.5 rounded-lg border border-line hover:bg-surface transition">
              28
            </button>
            <button type="button" className="px-3 py-1.5 rounded-lg border border-line hover:bg-surface transition">
              Suivant
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
