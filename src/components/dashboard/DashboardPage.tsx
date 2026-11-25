"use client";

import { useMemo, useState } from "react";
import { ActionCenter } from "@/components/dashboard/ActionCenter";
import { CountryDistribution } from "@/components/dashboard/CountryDistribution";
import { DateRangePicker, presetRange, type DateRange } from "@/components/ui/DateRangePicker";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { useCarriers } from "@/lib/carrier-store";
import { formatFcfa, formatNumber } from "@/lib/format";
import { TOKEN_PRICE_FCFA } from "@/lib/constants";
import { countryTotals, overviewStats } from "@/lib/mock-data/overview";
import { PAYMENTS_NOW, payments } from "@/lib/mock-data/payments";

// Les données de démonstration sont ancrées à cette date, qui joue le rôle d'« aujourd'hui ».
const TODAY = new Date(PAYMENTS_NOW);

const PERIOD_TABS = [
  { label: "Aujourd'hui", days: 1 },
  { label: "7J", days: 7 },
  { label: "30J", days: 30 },
  { label: "Trimestre", days: 90 },
];

export function DashboardPage() {
  const [activeTab, setActiveTab] = useState<string | null>("Aujourd'hui");
  const [range, setRange] = useState<DateRange>(() => presetRange(TODAY, 1));
  const { pendingCount } = useCarriers();

  // Achats de jetons réussis sur la période choisie.
  const period = useMemo(() => {
    const sales = payments.filter(
      (p) => p.status === "Réussi" && p.timestamp >= range.start.getTime() && p.timestamp <= range.end.getTime(),
    );
    return {
      tokens: sales.reduce((sum, p) => sum + p.tokens, 0),
      amountFcfa: sales.reduce((sum, p) => sum + p.amountFcfa, 0),
      count: sales.length,
    };
  }, [range]);

  const kpis = [
    {
      label: "Utilisateurs",
      value: formatNumber(countryTotals.users),
      delta: `${pendingCount} à vérifier`,
      tone: "warning" as const,
      icon: "users",
      subtext: `${formatNumber(countryTotals.carriers)} transporteurs, ${formatNumber(countryTotals.shippers)} chargeurs`,
      extraRight: `${Math.round((countryTotals.carriers / countryTotals.users) * 100)} % transp.`,
      progressPercent: (countryTotals.carriers / countryTotals.users) * 100,
      sparkColor: "#F59E0B",
    },
    ...overviewStats.map((stat, index) => ({ ...stat, sparkColor: ["#4F6BED", "#8B5CF6", "#10B981"][index] })),
    {
      label: "Jetons achetés",
      value: formatNumber(period.tokens),
      icon: "gift",
      subtext: `Sur la période • 1 jeton = ${formatFcfa(TOKEN_PRICE_FCFA)}`,
      extraRight: `${formatNumber(period.count)} achat${period.count > 1 ? "s" : ""}`,
      progressPercent: (period.tokens / countryTotals.tokensPurchased) * 100,
      sparkColor: "#FD4F49",
    },
    {
      label: "Montant des achats",
      value: formatFcfa(period.amountFcfa),
      icon: "shield",
      subtext: "Packs de jetons sur la période",
      extraRight: `${formatFcfa(period.count ? Math.round(period.amountFcfa / period.count) : 0)} / achat`,
      sparkColor: "#06B6D4",
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
            {PERIOD_TABS.map((tab) => (
              <button
                key={tab.label}
                type="button"
                aria-pressed={activeTab === tab.label}
                onClick={() => {
                  setActiveTab(tab.label);
                  setRange(presetRange(TODAY, tab.days));
                }}
                className={`px-3 sm:px-3.5 py-1.5 rounded-lg transition-all duration-200 ${
                  activeTab === tab.label
                    ? "bg-dark-card text-white shadow-xs font-bold"
                    : "text-muted hover:text-ink"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <DateRangePicker
            value={range}
            max={TODAY}
            onChange={(next) => {
              setRange(next);
              setActiveTab(null);
            }}
          />
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

      {/* Centre d'actions prioritaires */}
      <ActionCenter />
    </>
  );
}
