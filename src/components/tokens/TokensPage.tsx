"use client";

import { useState } from "react";
import { RankedBarsChart, WeeklyRevenueChart } from "@/components/tokens/FinanceCharts";
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
            className="px-3.5 py-2 bg-surface border border-line rounded-xl text-xs text-ink font-semibold focus:outline-none focus:border-accent"
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
          subtext={`${formatNumber(succeeded.count)} paiements, ${formatPercent(successRate)} de réussite`}
        />
        <StatCard
          label="Jetons vendus"
          value={formatNumber(succeeded.tokens)}
          icon="gift"
          subtext={`Panier moyen : ${formatFcfa(averageTicket)}`}
        />
        <StatCard
          label="En attente"
          value={formatFcfa(pending.amountFcfa)}
          icon="clock"
          subtext={`${formatNumber(pending.count)} paiements à confirmer`}
        />
        <StatCard
          label="Échoués"
          value={formatFcfa(failed.amountFcfa)}
          icon="alert"
          subtext={`${formatNumber(failed.count)} paiements non aboutis`}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-12 gap-4">
        <WeeklyRevenueChart weeks={weeklyTotals(selection, PAYMENTS_NOW, days)} className="lg:col-span-2 xl:col-span-6" />
        <RankedBarsChart
          title="Par opérateur"
          subtitle="Montants encaissés"
          items={rankedTotals(selection, (payment) => payment.operator)}
          className="xl:col-span-3"
        />
        <RankedBarsChart
          title="Par pack"
          subtitle="Montants encaissés"
          items={rankedTotals(selection, (payment) => payment.packName)}
          className="xl:col-span-3"
        />
      </div>

      <PaymentsTable payments={selection} />

      <ReservedTokensPanel />
    </>
  );
}
