"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { formatFcfa, formatNumber } from "@/lib/format";

export interface DonutSlice {
  id: string;
  label: string;
  value: number;
  displayValue: string;
  sublabel?: string;
  color: string;
}

function AnimatedDonut({
  title,
  subtitle,
  slices,
  centerTop,
  centerBottom,
}: {
  title: string;
  subtitle: string;
  slices: DonutSlice[];
  centerTop: string;
  centerBottom: string;
}) {
  const [hovered, setHovered] = useState<string | null>(null);

  const total = slices.reduce((sum, s) => sum + s.value, 0);
  const size = 168;
  const strokeWidth = 22;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Calcul des segments cumulés (en partant du haut : -90deg)
  let cumulative = 0;
  const segments = slices.map((slice) => {
    const ratio = total > 0 ? slice.value / total : 0;
    const length = ratio * circumference;
    const offset = -cumulative;
    cumulative += length;
    return { ...slice, ratio, length, offset };
  });

  const activeSlice = segments.find((s) => s.id === hovered);

  return (
    <div className="bg-surface border border-line rounded-card p-5 flex flex-col justify-between gap-4">
      <div>
        <h3 className="text-sm font-bold text-ink">{title}</h3>
        <p className="text-[11px] text-muted mt-0.5">{subtitle}</p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* SVG Donut animé */}
        <div className="relative shrink-0" style={{ width: size, height: size }}>
          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className="-rotate-90 overflow-visible"
            role="img"
            aria-label={title}
          >
            {/* Piste de fond */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="var(--border-subtle)"
              strokeWidth={strokeWidth}
            />

            {total > 0 &&
              segments.map((seg, index) => {
                const isActive = hovered === seg.id;
                const dimmed = hovered !== null && !isActive;
                return (
                  <motion.circle
                    key={seg.id}
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={seg.color}
                    strokeWidth={isActive ? strokeWidth + 4 : strokeWidth}
                    strokeLinecap="butt"
                    strokeDasharray={`${seg.length} ${circumference}`}
                    initial={{ strokeDashoffset: circumference, opacity: 0 }}
                    animate={{
                      strokeDashoffset: seg.offset,
                      opacity: dimmed ? 0.35 : 1,
                    }}
                    transition={{
                      strokeDashoffset: { duration: 0.7, delay: index * 0.08, ease: "easeOut" },
                      opacity: { duration: 0.2 },
                    }}
                    className="cursor-pointer transition-[stroke-width] duration-150"
                    onMouseEnter={() => setHovered(seg.id)}
                    onMouseLeave={() => setHovered(null)}
                  />
                );
              })}
          </svg>

          {/* Valeur centrale */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-4">
            <span className="text-base font-extrabold text-ink tabular-nums leading-tight">
              {activeSlice ? activeSlice.displayValue : centerTop}
            </span>
            <span className="text-[10px] font-semibold text-muted mt-0.5 line-clamp-1">
              {activeSlice ? `${activeSlice.label} (${Math.round(activeSlice.ratio * 100)} %)` : centerBottom}
            </span>
          </div>
        </div>

        {/* Légende interactive */}
        <ul className="flex-1 w-full space-y-2 text-xs">
          {segments.map((seg) => {
            const pct = total > 0 ? Math.round(seg.ratio * 100) : 0;
            const isActive = hovered === seg.id;
            return (
              <li
                key={seg.id}
                onMouseEnter={() => setHovered(seg.id)}
                onMouseLeave={() => setHovered(null)}
                className={`flex items-center justify-between gap-3 px-2.5 py-1.5 rounded-lg cursor-pointer transition-colors ${
                  isActive ? "bg-sand" : "hover:bg-sand/50"
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: seg.color }}
                  />
                  <div className="min-w-0">
                    <span className="font-semibold text-ink block truncate">{seg.label}</span>
                    {seg.sublabel && <span className="text-[10px] text-muted block truncate">{seg.sublabel}</span>}
                  </div>
                </div>
                <div className="text-right shrink-0 tabular-nums">
                  <span className="font-bold text-ink">{seg.displayValue}</span>
                  <span className="ml-1.5 text-[10px] text-muted font-semibold">{pct} %</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export function OverviewDonut({
  carriersCount,
  shippersCount,
  activeCargos,
  activeTrucks,
  periodByCountry,
  periodTokens,
  periodAmountFcfa,
}: {
  carriersCount: number;
  shippersCount: number;
  activeCargos: number;
  activeTrucks: number;
  periodByCountry: { code: string; name: string; tokens: number; amountFcfa: number; color: string }[];
  periodTokens: number;
  periodAmountFcfa: number;
}) {
  const operationsSlices: DonutSlice[] = [
    {
      id: "carriers",
      label: "Transporteurs",
      value: carriersCount,
      displayValue: formatNumber(carriersCount),
      color: "#F59E0B",
    },
    {
      id: "shippers",
      label: "Chargeurs",
      value: shippersCount,
      displayValue: formatNumber(shippersCount),
      color: "#4F6BED",
    },
    {
      id: "cargos",
      label: "Cargaisons actives",
      value: activeCargos,
      displayValue: formatNumber(activeCargos),
      color: "#10B981",
    },
    {
      id: "trucks",
      label: "Camions en rotation",
      value: activeTrucks,
      displayValue: formatNumber(activeTrucks),
      color: "#8B5CF6",
    },
  ];

  const countrySlices: DonutSlice[] = periodByCountry.map((c) => ({
    id: c.code,
    label: c.name,
    value: c.tokens,
    displayValue: `${formatNumber(c.tokens)} j.`,
    sublabel: formatFcfa(c.amountFcfa),
    color: c.color,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <AnimatedDonut
        title="Répartition Écosystème"
        subtitle="Utilisateurs et capacité active sur le corridor"
        slices={operationsSlices}
        centerTop={formatNumber(carriersCount + shippersCount + activeCargos + activeTrucks)}
        centerBottom="acteurs & unités"
      />
      <AnimatedDonut
        title="Achats de jetons par pays"
        subtitle="Répartition sur la période sélectionnée"
        slices={countrySlices}
        centerTop={`${formatNumber(periodTokens)} j.`}
        centerBottom={formatFcfa(periodAmountFcfa)}
      />
    </div>
  );
}
