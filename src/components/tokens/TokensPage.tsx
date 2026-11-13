"use client";

import { useState } from "react";
import { PolarFlowsChart, WeeklyRevenueChart } from "@/components/tokens/FinanceCharts";
import { PaymentsTable } from "@/components/tokens/PaymentsTable";
import { ReservedTokensPanel } from "@/components/tokens/ReservedTokensPanel";
import { CountrySelect, FilterTabs } from "@/components/ui/FilterControls";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { OPERATOR_COLORS } from "@/lib/constants";
import { rankedTotals, totalsFor, weeklyTotals } from "@/lib/finance";
import { formatFcfa, formatNumber, formatPercent } from "@/lib/format";
import { PAYMENTS_NOW, payments } from "@/lib/mock-data/payments";
import type { Payment } from "@/types";

type Period = "30" | "90" | "190";

const PERIODS: { value: Period; label: string }[] = [
  { value: "30", label: "30 jours" },
  { value: "90", label: "90 jours" },
  { value: "190", label: "Tout" },
];

const DAY_MS = 86_400_000;
const OPERATORS = Object.keys(OPERATOR_COLORS);

export function TokensPage() {
  const [period, setPeriod] = useState<Period>("190");
  const [country, setCountry] = useState("all");
  const [operator, setOperator] = useState("all");

  const days = Number(period);
  const selection: Payment[] = payments.filter(
    (payment) =>
      PAYMENTS_NOW - payment.timestamp <= days * DAY_MS &&
      (country === "all" || payment.country === country) &&
      (operator === "all" || payment.operator === operator),
  );

  const succeeded = totalsFor(selection, "Réussi");
  const pending = totalsFor(selection, "En attente");
  const failed = totalsFor(selection, "Échoué");
  const successRate = selection.length ? (succeeded.count / selection.length) * 100 : 0;
  const weeks = weeklyTotals(selection, PAYMENTS_NOW, days);
  const halfWeeks = Math.floor(weeks.length / 2);
  const sumOf = (list: typeof weeks, key: "amountFcfa" | "count") => list.reduce((sum, week) => sum + week[key], 0);
  const revenueTrend = sumOf(weeks.slice(0, halfWeeks), "amountFcfa") > 0
    ? ((sumOf(weeks.slice(halfWeeks), "amountFcfa") - sumOf(weeks.slice(0, halfWeeks), "amountFcfa")) / sumOf(weeks.slice(0, halfWeeks), "amountFcfa")) * 100
    : null;
  const share = (count: number) => (selection.length ? (count / selection.length) * 100 : 0);
  const averageTicket = succeeded.count ? Math.round(succeeded.amountFcfa / succeeded.count) : 0;

  return (
    <>
      <PageHeader
        breadcrumb={["Jetons & Finances"]}
        title="Commande financière"
        description="Paiements de jetons, statuts et opérateurs Mobile Money"
      >
        <div className="flex flex-wrap items-center gap-2.5">
          <FilterTabs tabs={PERIODS} active={period} onChange={setPeriod} />
          <CountrySelect value={country} onChange={setCountry} />
          <select
            value={operator}
            onChange={(event) => setOperator(event.target.value)}
            aria-label="Filtrer par opérateur"
            className="cursor-pointer rounded-xl border border-line bg-surface px-3.5 py-2 text-xs font-semibold text-ink shadow-sm transition-colors hover:border-accent/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          >
            <option value="all">Tous les opérateurs</option>
            {OPERATORS.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          label="Encaissé"
          value={formatFcfa(succeeded.amountFcfa)}
          icon="shield"
          delta={revenueTrend === null ? undefined : `${revenueTrend >= 0 ? "▲" : "▼"} ${Math.abs(revenueTrend).toFixed(0)} %`}
          tone={revenueTrend !== null && revenueTrend < 0 ? "danger" : "success"}
          sparkline={weeks.map((week) => week.amountFcfa)}
          sparkColor="#4F6BED"
          subtext={`${formatNumber(succeeded.count)} paiements`}
          extraRight={`${formatPercent(successRate)} de réussite`}
        />
        <StatCard
          label="Jetons vendus"
          value={formatNumber(succeeded.tokens)}
          icon="gift"
          sparkline={weeks.map((week) => week.count)}
          sparkColor="#10B981"
          subtext={`Panier moyen : ${formatFcfa(averageTicket)}`}
          extraRight={`${formatFcfa(succeeded.tokens ? Math.round(succeeded.amountFcfa / succeeded.tokens) : 0)} / jeton`}
        />
        <StatCard
          label="En attente"
          value={formatFcfa(pending.amountFcfa)}
          icon="clock"
          progressPercent={share(pending.count)}
          sparkColor="#F59E0B"
          subtext={`${formatNumber(pending.count)} paiements à confirmer`}
          extraRight={`${formatPercent(share(pending.count))} du flux`}
        />
        <StatCard
          label="Échoués"
          value={formatFcfa(failed.amountFcfa)}
          icon="alert"
          progressPercent={share(failed.count)}
          sparkColor="#E11D48"
          subtext={`${formatNumber(failed.count)} paiements non aboutis`}
          extraRight={`${formatPercent(share(failed.count))} du flux`}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <WeeklyRevenueChart weeks={weeks} className="" />
        <PolarFlowsChart
          operators={rankedTotals(selection, (payment) => payment.operator)}
          services={rankedTotals(selection, (payment) => payment.packName)}
          className=""
        />
      </div>

      <PaymentsTable payments={selection} />

      <ReservedTokensPanel />
    </>
  );
}
