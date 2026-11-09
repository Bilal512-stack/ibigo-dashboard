"use client";

import { useState, type ReactNode } from "react";
import type { RankedTotal, WeekTotal } from "@/lib/finance";
import { formatCompactFcfa, formatFcfa, formatNumber, formatShortDate } from "@/lib/format";

function ChartCard({ title, subtitle, className, children }: { title: string; subtitle: string; className: string; children: ReactNode }) {
  return (
    <section className={`bg-surface border border-line rounded-card p-5 shadow-card ${className}`}>
      <h2 className="text-sm font-bold text-ink">{title}</h2>
      <p className="text-[11px] text-muted mt-0.5 mb-4">{subtitle}</p>
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
  const max = Math.max(1, ...items.map((item) => item.amountFcfa));

  return (
    <ChartCard title={title} subtitle={subtitle} className={className}>
      {items.length === 0 && <p className="text-xs text-muted">Aucun paiement réussi sur cette sélection.</p>}
      <ul className="space-y-3.5">
        {items.map((item) => (
          <li key={item.label}>
            <div className="flex items-baseline justify-between gap-2 text-[11px]">
              <span className="font-semibold text-ink truncate">{item.label}</span>
              <span className="text-muted tabular-nums shrink-0">{formatCompactFcfa(item.amountFcfa)} F</span>
            </div>
            <div
              className="mt-1 h-2 rounded-r bg-accent"
              style={{ width: `${Math.max(1, (item.amountFcfa / max) * 100)}%` }}
              title={`${formatFcfa(item.amountFcfa)} · ${formatNumber(item.count)} paiements`}
            />
          </li>
        ))}
      </ul>
    </ChartCard>
  );
}
