"use client";

import { useEffect, useState, type ReactNode } from "react";
import type { RankedTotal, WeekTotal } from "@/lib/finance";
import { formatCompactFcfa, formatFcfa, formatNumber, formatShortDate } from "@/lib/format";

function ChartCard({
  title,
  subtitle,
  className,
  aside,
  children,
}: {
  title: string;
  subtitle: string;
  className: string;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section
      className={`group/card relative min-w-0 overflow-hidden rounded-card border border-line bg-surface p-4 shadow-card transition-shadow duration-300 hover:shadow-lg sm:p-5 ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/5 blur-2xl"
      />
      <header className="relative mb-5 flex flex-col items-start gap-3 sm:flex-row sm:justify-between">
        <div className="min-w-0">
          <h2 className="text-sm font-bold text-ink sm:truncate">{title}</h2>
          <p className="mt-0.5 text-[11px] text-muted sm:truncate">{subtitle}</p>
        </div>
        {aside}
      </header>
      <div className="relative">{children}</div>
    </section>
  );
}

const CHART_HEIGHT = 240;

function niceMaximum(value: number) {
  if (value <= 0) return 1_000_000;
  const magnitude = 10 ** Math.floor(Math.log10(value));
  const step = [1, 2, 2.5, 5, 10].find((candidate) => candidate * magnitude >= value) ?? 10;
  return step * magnitude;
}

const BAR_COLOR = "#ED914F";
const BAR_COLOR_SOFT = "#FFC49D";

function Kpi({ label, value, tone }: { label: string; value: string; tone?: "up" | "down" }) {
  return (
    <div className="min-w-0 rounded-xl border border-line-subtle bg-sand/60 px-3 py-2">
      <p className="truncate text-[10px] font-semibold uppercase tracking-wider text-muted">{label}</p>
      <p
        className={`mt-0.5 truncate text-sm font-extrabold tabular-nums ${
          tone === "up" ? "text-success" : tone === "down" ? "text-danger" : "text-ink"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

export function WeeklyRevenueChart({ weeks, className }: { weeks: WeekTotal[]; className: string }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const peak = Math.max(0, ...weeks.map((week) => week.amountFcfa));
  const axisMax = niceMaximum(peak);
  const total = weeks.reduce((sum, week) => sum + week.amountFcfa, 0);
  const average = weeks.length ? total / weeks.length : 0;
  const peakIndex = weeks.findIndex((week) => week.amountFcfa === peak);
  const labelEvery = Math.max(1, Math.ceil(weeks.length / 7));

  const half = Math.floor(weeks.length / 2);
  const recent = weeks.slice(half).reduce((sum, week) => sum + week.amountFcfa, 0);
  const previous = weeks.slice(0, half).reduce((sum, week) => sum + week.amountFcfa, 0);
  const trend = previous > 0 ? ((recent - previous) / previous) * 100 : null;

  return (
    <ChartCard title="Encaissements par semaine" subtitle="Paiements réussis, en FCFA" className={className}>
      <div className="mb-6 grid grid-cols-3 gap-2.5">
        <Kpi label="Total" value={`${formatCompactFcfa(total)} F`} />
        <Kpi label="Moyenne / sem." value={`${formatCompactFcfa(average)} F`} />
        <Kpi
          label="Tendance"
          value={trend === null ? "—" : `${trend >= 0 ? "+" : "−"}${Math.abs(trend).toFixed(0)} %`}
          tone={trend === null ? undefined : trend >= 0 ? "up" : "down"}
        />
      </div>

      <div className="flex gap-3">
        <div className="relative w-10 shrink-0 text-[10px] text-faint tabular-nums" style={{ height: CHART_HEIGHT }}>
          {[1, 0.5, 0].map((ratio) => (
            <span key={ratio} className="absolute right-0 -translate-y-1/2" style={{ top: `${(1 - ratio) * 100}%` }}>
              {ratio === 0 ? "0" : formatCompactFcfa(axisMax * ratio)}
            </span>
          ))}
        </div>

        <div className="min-w-0 flex-1">
          <div className="relative" style={{ height: CHART_HEIGHT }}>
            {[0, 50].map((top) => (
              <div key={top} className="absolute inset-x-0 border-t border-line-subtle" style={{ top: `${top}%` }} />
            ))}
            <div className="absolute inset-x-0 bottom-0 border-t border-line" />

            {average > 0 && (
              <div
                className="pointer-events-none absolute inset-x-0 z-[1] border-t-2 border-dotted border-ink/30"
                style={{ bottom: `${(average / axisMax) * 100}%` }}
              />
            )}

            <div className="absolute inset-0 flex items-end">
              {weeks.map((week, index) => {
                const isActive = hovered === index;
                const dimmed = hovered !== null && !isActive;
                const heightPct = (week.amountFcfa / axisMax) * 100;
                return (
                  <div
                    key={week.start}
                    tabIndex={0}
                    role="img"
                    aria-label={`Semaine du ${formatShortDate(week.start)} : ${formatFcfa(week.amountFcfa)}, ${week.count} paiements`}
                    onMouseEnter={() => setHovered(index)}
                    onMouseLeave={() => setHovered(null)}
                    onFocus={() => setHovered(index)}
                    onBlur={() => setHovered(null)}
                    className="relative flex h-full flex-1 cursor-pointer items-end justify-center focus:outline-none"
                  >
                    <div
                      className="w-full max-w-[14px] rounded-full transition-[height,opacity] duration-700 ease-out"
                      style={{
                        height: ready ? `max(${heightPct}%, 4px)` : "0%",
                        transitionDelay: ready && hovered === null ? `${Math.min(index * 15, 450)}ms` : "0ms",
                        opacity: dimmed ? 0.35 : 1,
                        background: isActive || index === peakIndex
                          ? `linear-gradient(to top, ${BAR_COLOR}, ${BAR_COLOR_SOFT})`
                          : `linear-gradient(to top, color-mix(in srgb, ${BAR_COLOR} 70%, transparent), color-mix(in srgb, ${BAR_COLOR_SOFT} 70%, transparent))`,
                      }}
                    />
                    {isActive && (
                      <div
                        className={`pointer-events-none absolute z-10 whitespace-nowrap rounded-xl bg-dark-card px-3 py-2 text-[10px] text-white shadow-xl ${
                          index > weeks.length * 0.65 ? "right-0" : index < weeks.length * 0.3 ? "left-0" : "left-1/2 -translate-x-1/2"
                        }`}
                        style={{ bottom: `min(calc(${heightPct}% + 12px), calc(100% - 50px))` }}
                      >
                        <div className="font-semibold text-white/70">Semaine du {formatShortDate(week.start)}</div>
                        <div className="mt-0.5 text-xs font-bold tabular-nums">{formatFcfa(week.amountFcfa)}</div>
                        <div className="text-white/70">{formatNumber(week.count)} paiements</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-2.5 flex text-[10px] text-faint">
            {weeks.map((week, index) => (
              <span key={week.start} className="min-w-0 flex-1 overflow-visible whitespace-nowrap">
                {index % labelEvery === 0 ? formatShortDate(week.start) : ""}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-4 text-[10px] text-muted">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: BAR_COLOR }} /> Encaissé
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-4 border-t-2 border-dotted border-ink/40" /> Moyenne
        </span>
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

type PolarMode = "operator" | "service";
type PolarMetric = "revenue" | "volume";

// Teinte de la grille polaire selon l'axe d'analyse et la métrique choisis
const POLAR_TINTS: Record<PolarMode, Record<PolarMetric, string>> = {
  operator: { revenue: "#4F6BED", volume: "#06B6D4" },
  service: { revenue: "#8B5CF6", volume: "#10B981" },
};

export function PolarFlowsChart({
  operators,
  services,
  className,
}: {
  operators: RankedTotal[];
  services: RankedTotal[];
  className: string;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [metric, setMetric] = useState<PolarMetric>("revenue");
  const [mode, setMode] = useState<PolarMode>("operator");

  const items = mode === "operator" ? operators : services;
  const tint = POLAR_TINTS[mode][metric];
  const title = "Cartographie Polaire des Flux Financiers";
  const subtitle = "Visualisation radiale par opérateur et par service";

  const colored = items.map((item, index) => ({
    ...item,
    color: colorFor(item.label, index),
    value: metric === "revenue" ? item.amountFcfa : item.count,
  }));
  const total = colored.reduce((sum, item) => sum + item.value, 0);
  const max = Math.max(...colored.map((item) => item.value), 1);
  const active = hovered === null ? null : colored[hovered];
  const format = (value: number) => (metric === "revenue" ? `${formatCompactFcfa(value)} F` : `${formatNumber(value)} tx`);

  // Géométrie polaire : rayon de chaque pétale proportionnel à sa valeur
  const SIZE = 300;
  const C = SIZE / 2;
  const R_MIN = 38;
  const R_MAX = 124;
  const N = colored.length;
  const slice = 360 / Math.max(N, 1);
  const gap = N > 2 ? 3 : N > 1 ? 2 : 0;
  const rad = (deg: number) => ((deg - 90) * Math.PI) / 180;
  const at = (angle: number, radius: number) => ({ x: C + radius * Math.cos(rad(angle)), y: C + radius * Math.sin(rad(angle)) });

  const sectors = colored.map((item, index) => {
    const radius = R_MIN + Math.max((item.value / max) * (R_MAX - R_MIN), item.value > 0 ? 12 : 4);
    const start = index * slice + gap / 2;
    const end = start + slice - gap;
    const p1 = at(start, radius);
    const p2 = at(end, radius);
    const p3 = at(end, R_MIN);
    const p4 = at(start, R_MIN);
    const large = end - start > 180 ? 1 : 0;
    return {
      ...item,
      path: `M${p1.x} ${p1.y} A${radius} ${radius} 0 ${large} 1 ${p2.x} ${p2.y} L${p3.x} ${p3.y} A${R_MIN} ${R_MIN} 0 ${large} 0 ${p4.x} ${p4.y}Z`,
      peak: at((start + end) / 2, radius),
      share: total > 0 ? Math.round((item.value / total) * 100) : 0,
    };
  });

  const segmented = <T extends string>(options: { value: T; label: string }[], current: T, onChange: (value: T) => void, color: (value: T) => string) => (
    <div className="flex items-center rounded-xl border border-line bg-sand p-0.5">
      {options.map((option) => {
        const isActive = current === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => {
              setHovered(null);
              onChange(option.value);
            }}
            aria-pressed={isActive}
            className={`rounded-lg px-2.5 py-1 text-[10px] font-semibold transition-all ${isActive ? "text-white shadow-sm" : "text-muted hover:text-ink"}`}
            style={isActive ? { backgroundColor: color(option.value) } : undefined}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );

  return (
    <ChartCard
      title={title}
      subtitle={subtitle}
      className={className}
      aside={
        <div className="flex shrink-0 flex-wrap items-center gap-2 sm:justify-end">
          {segmented<PolarMetric>(
            [
              { value: "revenue", label: "CA" },
              { value: "volume", label: "Volume" },
            ],
            metric,
            setMetric,
            (value) => POLAR_TINTS[mode][value],
          )}
          {segmented<PolarMode>(
            [
              { value: "operator", label: "Opérateurs" },
              { value: "service", label: "Services" },
            ],
            mode,
            setMode,
            (value) => POLAR_TINTS[value][metric],
          )}
        </div>
      }
    >
      {total === 0 ? (
        <p className="text-xs text-muted">Aucun paiement réussi sur cette sélection.</p>
      ) : (
        <div className="flex min-w-0 flex-col items-center gap-6 sm:flex-row">
          <div
            className="relative aspect-square w-full max-w-[250px] shrink-0 sm:w-[250px]"
            role="img"
            aria-label={`Cartographie polaire : ${sectors.map((s) => `${s.label} ${s.share} %`).join(", ")}`}
          >
            <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="h-full w-full select-none overflow-visible">
              <defs>
                {sectors.map((sector, index) => (
                  <radialGradient key={sector.label} id={`polar-petal-${index}`} cx="50%" cy="50%" r="65%">
                    <stop offset="0%" stopColor={sector.color} stopOpacity="0.4" />
                    <stop offset="70%" stopColor={sector.color} stopOpacity="0.75" />
                    <stop offset="100%" stopColor={sector.color} stopOpacity="0.95" />
                  </radialGradient>
                ))}
              </defs>

              {[0.25, 0.5, 0.75, 1].map((ratio) => (
                <circle
                  key={ratio}
                  cx={C}
                  cy={C}
                  r={R_MIN + ratio * (R_MAX - R_MIN)}
                  fill="none"
                  strokeWidth="1"
                  strokeDasharray={ratio === 1 ? undefined : "3 3"}
                  stroke={tint}
                  opacity={ratio === 1 ? 0.55 : 0.3}
                />
              ))}
              {sectors.map((_, index) => {
                const end = at(index * slice, R_MAX);
                return <line key={index} x1={C} y1={C} x2={end.x} y2={end.y} strokeWidth="1" stroke={tint} opacity="0.25" />;
              })}

              {sectors.map((sector, index) => {
                const isHovered = hovered === index;
                const isDimmed = hovered !== null && !isHovered;
                return (
                  <g
                    key={sector.label}
                    onMouseEnter={() => setHovered(index)}
                    onMouseLeave={() => setHovered(null)}
                    className="cursor-pointer"
                  >
                    <path
                      d={sector.path}
                      fill={`url(#polar-petal-${index})`}
                      stroke={sector.color}
                      strokeWidth={isHovered ? 2.5 : 1.2}
                      className="transition-all duration-300"
                      style={{
                        opacity: isDimmed ? 0.3 : isHovered ? 1 : 0.9,
                        filter: isHovered ? `drop-shadow(0 0 8px ${sector.color}88)` : "none",
                      }}
                    >
                      <title>{`${sector.label} · ${formatFcfa(sector.amountFcfa)} · ${formatNumber(sector.count)} paiements`}</title>
                    </path>
                    {sector.value > 0 && (
                      <circle
                        cx={sector.peak.x}
                        cy={sector.peak.y}
                        r={isHovered ? 4.5 : 3}
                        fill={sector.color}
                        strokeWidth={isHovered ? 2 : 1.2}
                        className="stroke-surface transition-all duration-200"
                      />
                    )}
                  </g>
                );
              })}

              <circle cx={C} cy={C} r={R_MIN - 2} strokeWidth="2" stroke={tint} className="fill-surface" />
            </svg>

            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-[28%] text-center">
              {active ? (
                <>
                  <span className="w-full truncate text-[9px] font-bold uppercase tracking-wider" style={{ color: active.color }}>
                    {active.label}
                  </span>
                  <span className="text-[11px] font-extrabold leading-tight text-ink tabular-nums">{format(active.value)}</span>
                </>
              ) : (
                <>
                  <span className="text-[8px] font-semibold uppercase tracking-wider" style={{ color: tint }}>Total</span>
                  <span className="text-[11px] font-bold leading-tight text-ink tabular-nums">{format(total)}</span>
                </>
              )}
            </div>
          </div>

          <ul className="w-full min-w-0 flex-1 space-y-1.5">
            {sectors.map((sector, index) => {
              const isHovered = hovered === index;
              return (
                <li
                  key={sector.label}
                  onMouseEnter={() => setHovered(index)}
                  onMouseLeave={() => setHovered(null)}
                  className={`cursor-default rounded-xl border px-3 py-2 transition-all ${
                    isHovered ? "border-line bg-sand" : "border-transparent hover:bg-sand/70"
                  }`}
                  style={{ opacity: hovered !== null && !isHovered ? 0.45 : 1 }}
                >
                  <div className="mb-1.5 flex items-center justify-between gap-3">
                    <span className="flex min-w-0 items-center gap-2">
                      <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: sector.color }} />
                      <span className="truncate text-[11px] font-semibold text-ink">{sector.label}</span>
                    </span>
                    <span className="flex shrink-0 items-center gap-2">
                      <span className="text-[11px] font-bold text-ink tabular-nums">{format(sector.value)}</span>
                      <span
                        className="rounded-md px-1.5 py-0.5 text-[10px] font-bold tabular-nums"
                        style={{ backgroundColor: `color-mix(in srgb, ${sector.color} 14%, transparent)`, color: sector.color }}
                      >
                        {sector.share} %
                      </span>
                    </span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-line-subtle">
                    <div className="h-full rounded-full transition-all duration-700" style={{ width: `${sector.share}%`, backgroundColor: sector.color }} />
                  </div>
                  <p className="mt-1 text-[10px] text-muted">
                    {formatNumber(sector.count)} paiements · panier {formatFcfa(Math.round(sector.amountFcfa / Math.max(sector.count, 1)))}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </ChartCard>
  );
}
