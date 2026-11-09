import type { Payment, PaymentStatus } from "@/types";

const DAY_MS = 86_400_000;
const WEEK_MS = 7 * DAY_MS;

export function totalsFor(payments: Payment[], status: PaymentStatus) {
  const matching = payments.filter((payment) => payment.status === status);
  return {
    count: matching.length,
    amountFcfa: matching.reduce((sum, payment) => sum + payment.amountFcfa, 0),
    tokens: matching.reduce((sum, payment) => sum + payment.tokens, 0),
  };
}

export interface WeekTotal {
  start: number;
  amountFcfa: number;
  count: number;
}

/** Montants réussis par semaine, de la plus ancienne à la plus récente. */
export function weeklyTotals(payments: Payment[], now: number, days: number): WeekTotal[] {
  const weekCount = Math.ceil(days / 7);
  const weeks: WeekTotal[] = Array.from({ length: weekCount }, (_, index) => ({
    start: now - (weekCount - index) * WEEK_MS,
    amountFcfa: 0,
    count: 0,
  }));

  for (const payment of payments) {
    if (payment.status !== "Réussi") continue;
    const index = weekCount - 1 - Math.floor((now - payment.timestamp) / WEEK_MS);
    if (index < 0 || index >= weekCount) continue;
    weeks[index].amountFcfa += payment.amountFcfa;
    weeks[index].count += 1;
  }

  return weeks;
}

export interface RankedTotal {
  label: string;
  amountFcfa: number;
  count: number;
}

/** Montants réussis regroupés par libellé, du plus élevé au plus faible. */
export function rankedTotals(payments: Payment[], labelOf: (payment: Payment) => string): RankedTotal[] {
  const totals = new Map<string, RankedTotal>();
  for (const payment of payments) {
    if (payment.status !== "Réussi") continue;
    const label = labelOf(payment);
    const entry = totals.get(label) ?? { label, amountFcfa: 0, count: 0 };
    entry.amountFcfa += payment.amountFcfa;
    entry.count += 1;
    totals.set(label, entry);
  }
  return [...totals.values()].sort((a, b) => b.amountFcfa - a.amountFcfa);
}
