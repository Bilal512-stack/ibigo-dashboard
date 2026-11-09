"use client";

import { useState, type ReactNode } from "react";
import type { RankedTotal, WeekTotal } from "@/lib/finance";
import { formatCompactFcfa, formatFcfa, formatNumber, formatShortDate } from "@/lib/format";

function ChartCard({ title, subtitle, className, children }: { title: string; subtitle: string; className: string; children: ReactNode }) {
  return (
    <section className={`min-w-0 overflow-hidden bg-surface border border-line rounded-card p-4 sm:p-5 shadow-card ${className}`}>
      <h2 className="text-sm font-bold text-ink truncate">{title}</h2>
      <p className="text-[11px] text-muted mt-0.5 mb-4 truncate">{subtitle}</p>
      {children}
    </section>
  );
}

const CHART_HEIGHT = 208;

function niceMaximum(value: number) {
  if (value <= 0) return 1_000_000;
  const magnitude = 10 ** Math.floor(Math.log10(value));
  const step = [1, 2, 2.5, 5, 10].find((candidate) => candidate * magnitude >= value) ?? 10;
  return step * magnitude;
}

export function WeeklyRevenueChart({ weeks, className }: { weeks: WeekTotal[]; className: string }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const axisMax = niceMaximum(Math.max(...weeks.map((week) => week.amountFcfa)));
  const labelEvery = Math.max(1, Math.ceil(weeks.length / 6));

  return (
    <ChartCard title="Encaissements par semaine" subtitle="Paiements réussis, en FCFA" className={className}>
      <div className="flex gap-2">
        <div className="relative w-9 shrink-0 text-[10px] text-faint tabular-nums" style={{ height: CHART_HEIGHT }}>
          {[1, 0.5, 0].map((ratio) => (
            <span key={ratio} className="absolute right-0 -translate-y-1/2" style={{ top: `${(1 - ratio) * 100}%` }}>
              {ratio === 0 ? "0" : formatCompactFcfa(axisMax * ratio)}
            </span>
          ))}
        </div>

        <div className="flex-1 min-w-0">
          <div className="relative" style={{ height: CHART_HEIGHT }}>
            {[0, 50].map((top) => (
              <div key={top} className="absolute inset-x-0 border-t border-line-subtle" style={{ top: `${top}%` }} />
            ))}
            <div className="absolute inset-x-0 bottom-0 border-t border-line" />

            <div className="absolute inset-0 flex items-end">
              {weeks.map((week, index) => (
                <div
                  key={week.start}
                  tabIndex={0}
                  role="img"
                  aria-label={`Semaine du ${formatShortDate(week.start)} : ${formatFcfa(week.amountFcfa)}, ${week.count} paiements`}
                  onMouseEnter={() => setHovered(index)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(index)}
                  onBlur={() => setHovered(null)}
                  className="relative flex-1 h-full flex items-end justify-center px-px focus:outline-none"
                >
                  <div
                    className={`w-full max-w-5 rounded-t transition-colors ${hovered === index ? "bg-accent-strong" : "bg-accent"}`}
                    style={{ height: `${(week.amountFcfa / axisMax) * 100}%` }}
                  />
                  {hovered === index && (
                    <div
                      className={`absolute bottom-full mb-[-40px] z-10 bg-dark-card text-white text-[10px] py-1.5 px-2.5 rounded-lg whitespace-nowrap pointer-events-none ${
                        index > weeks.length * 0.65 ? "right-0" : index < weeks.length * 0.3 ? "left-0" : "left-1/2 -translate-x-1/2"
                      }`}
                    >
                      <div className="font-semibold">Semaine du {formatShortDate(week.start)}</div>
                      <div>{formatFcfa(week.amountFcfa)} · {week.count} paiements</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex mt-1.5 text-[10px] text-faint">
            {weeks.map((week, index) => (
              <span key={week.start} className="flex-1 min-w-0 overflow-visible whitespace-nowrap">
                {index % labelEvery === 0 ? formatShortDate(week.start) : ""}
              </span>
            ))}
          </div>
        </div>
      </div>
    </ChartCard>
  );
}

// Couleurs de marque des opérateurs Mobile Money ; palette de repli pour les autres libellés (forfaits…)
const BRAND_COLORS: { match: RegExp; color: string }[] = [
  { match: /orange/i, color: "#FF6600" },
  { match: /mtn/i, color: "#EAB308" },
  { match: /airtel/i, color: "#E40000" },
  { match: /moov/i, color: "#0A6EBD" },
];
const PALETTE = ["#FD4F49", "#3B82F6", "#10B981", "#8B5CF6", "#F59E0B", "#06B6D4", "#EC4899", "#64748B"];

function colorFor(label: string, index: number) {
  return BRAND_COLORS.find((brand) => brand.match.test(label))?.color ?? PALETTE[index % PALETTE.length];
}

export function RankedBarsChart({
  title,
  subtitle,
  items,
  className,
}: {
  title: string;
  subtitle: string;
  items: RankedTotal[];
  className: string;
}) {
  const [hovered, setHovered] = useState<string | null>(null);
  const total = items.reduce((sum, item) => sum + item.amountFcfa, 0);
  const colored = items.map((item, index) => ({ ...item, color: colorFor(item.label, index) }));
  const active = colored.find((item) => item.label === hovered) ?? null;

  // Anneau SVG : circonférence normalisée à 100 (r = 100 / 2π)
  const RADIUS = 15.9155;
  const GAP = colored.length > 1 ? 0.8 : 0;
  let cumulative = 0;
  const segments = colored.map((item) => {
    const percent = total > 0 ? (item.amountFcfa / total) * 100 : 0;
    const segment = { ...item, percent, offset: cumulative };
    // eslint-disable-next-line react-hooks/immutability
    cumulative += percent;
    return segment;
  });

  return (
    <ChartCard title={title} subtitle={subtitle} className={className}>
      {items.length === 0 && <p className="text-xs text-muted">Aucun paiement réussi sur cette sélection.</p>}

      {total > 0 && (
        <div className="flex min-w-0 flex-col items-center gap-5">
          {/* Diagramme circulaire (s'adapte à la largeur de la carte) */}
          <div
            className="relative aspect-square w-full max-w-[168px]"
            role="img"
            aria-label={`Répartition : ${colored
              .map((item) => `${item.label} ${Math.round((item.amountFcfa / total) * 100)} %`)
              .join(", ")}`}
          >
            <svg viewBox="0 0 42 42" className="h-full w-full -rotate-90">
              <circle cx="21" cy="21" r={RADIUS} fill="none" stroke="currentColor" strokeWidth="4.6" className="text-line-subtle" />
              {segments.map((segment) => (
                <circle
                  key={segment.label}
                  cx="21"
                  cy="21"
                  r={RADIUS}
                  fill="none"
                  stroke={segment.color}
                  strokeWidth={hovered === segment.label ? 5.6 : 4.6}
                  strokeDasharray={`${Math.max(0, segment.percent - GAP)} ${100 - Math.max(0, segment.percent - GAP)}`}
                  strokeDashoffset={-segment.offset}
                  className="cursor-pointer transition-all duration-200"
                  style={{ opacity: hovered && hovered !== segment.label ? 0.35 : 1 }}
                  onMouseEnter={() => setHovered(segment.label)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <title>{`${segment.label} · ${formatFcfa(segment.amountFcfa)} · ${formatNumber(segment.count)} paiements`}</title>
                </circle>
              ))}
            </svg>

            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-[22%] text-center">
              <span className="w-full truncate text-[10px] text-muted">{active ? active.label : "Total"}</span>
              <span className="w-full truncate text-[15px] font-bold leading-tight text-ink tabular-nums">
                {formatCompactFcfa(active ? active.amountFcfa : total)} F
              </span>
              {active && (
                <span className="text-[10px] font-semibold tabular-nums" style={{ color: active.color }}>
                  {Math.round((active.amountFcfa / total) * 100)} %
                </span>
              )}
            </div>
          </div>

          {/* Légende : toujours sous l'anneau, rien ne déborde */}
          <ul className="w-full min-w-0 divide-y divide-line-subtle">
            {colored.map((item) => {
              const share = Math.round((item.amountFcfa / total) * 100);
              return (
                <li
                  key={item.label}
                  onMouseEnter={() => setHovered(item.label)}
                  onMouseLeave={() => setHovered(null)}
                  className="grid min-w-0 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-2.5 py-2 transition-opacity first:pt-0 last:pb-0"
                  style={{ opacity: hovered && hovered !== item.label ? 0.45 : 1 }}
                  title={`${formatFcfa(item.amountFcfa)} · ${formatNumber(item.count)} paiements`}
                >
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <div className="min-w-0">
                    <p className="truncate text-[11px] font-semibold text-ink">{item.label}</p>
                    <p className="truncate text-[10px] text-muted">{formatNumber(item.count)} paiements</p>
                  </div>
                  <div className="text-right">
                    <p className="whitespace-nowrap text-[11px] font-semibold text-ink tabular-nums">
                      {formatCompactFcfa(item.amountFcfa)} F
                    </p>
                    <p className="whitespace-nowrap text-[10px] font-semibold tabular-nums" style={{ color: item.color }}>
                      {share} %
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </ChartCard>
  );
}