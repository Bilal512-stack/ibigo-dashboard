"use client";

import { useMemo, useState } from "react";
import { ActionCenter } from "@/components/dashboard/ActionCenter";
import { CountryDistribution } from "@/components/dashboard/CountryDistribution";
import { OverviewDonut } from "@/components/dashboard/OverviewDonut";
import { DateRangePicker, presetRange, type DateRange } from "@/components/ui/DateRangePicker";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { useCarriers } from "@/lib/carrier-store";
import { TOKEN_PRICE_FCFA } from "@/lib/constants";
import { formatFcfa, formatNumber } from "@/lib/format";
import { countryTotals, customersByCountry, overviewStats } from "@/lib/mock-data/overview";
import { PAYMENTS_NOW, payments } from "@/lib/mock-data/payments";
import type { CountryCode } from "@/types";

// Les données de démonstration sont ancrées à cette date, qui joue le rôle d'« aujourd'hui ».
const TODAY = new Date(PAYMENTS_NOW);

const PERIOD_TABS = [
  { label: "Aujourd'hui", days: 1 },
  { label: "7J", days: 7 },
  { label: "30J", days: 30 },
  { label: "Trimestre", days: 90 },
];

const COUNTRY_COLORS: Record<CountryCode, string> = {
  CMR: "#10B981",
  RCA: "#4F6BED",
  TCHAD: "#F5B301",
};

export function DashboardPage() {
  const [activeTab, setActiveTab] = useState<string | null>("Aujourd'hui");
  const [range, setRange] = useState<DateRange>(() => presetRange(TODAY, 1));
  const { pendingCount } = useCarriers();

  // Achats de jetons réussis sur la période choisie.
  const period = useMemo(() => {
    const sales = payments.filter(
      (p) => p.status === "Réussi" && p.timestamp >= range.start.getTime() && p.timestamp <= range.end.getTime(),
    );
    const byCountry = customersByCountry.map((c) => {
      const countrySales = sales.filter((s) => s.country === c.code);
      return {
        code: c.code,
        name: c.name,
        tokens: countrySales.reduce((sum, s) => sum + s.tokens, 0),
        amountFcfa: countrySales.reduce((sum, s) => sum + s.amountFcfa, 0),
        color: COUNTRY_COLORS[c.code],
      };
    });
    return {
      tokens: sales.reduce((sum, p) => sum + p.tokens, 0),
      amountFcfa: sales.reduce((sum, p) => sum + p.amountFcfa, 0),
      count: sales.length,
      byCountry,
    };
  }, [range]);

  const [cargosStat, , missionsStat] = overviewStats;

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
    { ...cargosStat, sparkColor: "#4F6BED" },
    { ...missionsStat, sparkColor: "#10B981" },
    {
      label: "Achats de jetons",
      value: formatFcfa(period.amountFcfa),
      delta: `${formatNumber(period.tokens)} jetons`,
      tone: "info" as const,
      icon: "gift",
      subtext: `${formatNumber(period.count)} achat${period.count > 1 ? "s" : ""} • 1 j. = ${formatFcfa(TOKEN_PRICE_FCFA)}`,
      progressPercent: Math.min(100, (period.tokens / countryTotals.tokensPurchased) * 100),
      sparkColor: "#FD4F49",
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

      {/* 4 KPIs principaux */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Diagrammes circulaires animés */}
      <OverviewDonut
        carriersCount={countryTotals.carriers}
        shippersCount={countryTotals.shippers}
        activeCargos={142}
        activeTrucks={86}
        periodByCountry={period.byCountry}
        periodTokens={period.tokens}
        periodAmountFcfa={period.amountFcfa}
      />

      {/* Répartition géographique */}
      <CountryDistribution />

      {/* Opérations & dossiers à traiter */}
      <ActionCenter />
    </>
  );
}
