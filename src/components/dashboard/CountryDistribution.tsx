"use client";

import { useState } from "react";
import { TOKEN_PRICE_FCFA } from "@/lib/constants";
import { formatFcfa, formatNumber, formatPercent } from "@/lib/format";
import { CEMAC_MAP_SHAPES, CEMAC_MAP_VIEWBOX } from "@/lib/geo/cemac-map";
import { countryTotals, customersByCountry } from "@/lib/mock-data/overview";
import type { CountryCode } from "@/types";

const rows = customersByCountry.map((country) => {
  const users = country.carriersCount + country.shippersCount;
  const amountFcfa = country.tokensPurchased * TOKEN_PRICE_FCFA;
  return {
    ...country,
    users,
    amountFcfa,
    revenueShare: (amountFcfa / countryTotals.amountFcfa) * 100,
    revenuePerUser: Math.round(amountFcfa / users),
  };
});

const maxAmount = Math.max(...rows.map((row) => row.amountFcfa));

const COUNTRY_COLORS: Record<CountryCode, string> = {
  CMR: "#10B981",
  TCHAD: "#F5B301",
  RCA: "#4F6BED",
};

/** Une teinte par pays, plus intense quand le montant des achats est élevé. */
function fillOpacityFor(amountFcfa: number) {
  return 0.5 + 0.45 * (amountFcfa / maxAmount);
}

export function CountryDistribution() {
  const [active, setActive] = useState<CountryCode | null>(null);

  return (
    <section className="relative bg-surface border border-line rounded-card overflow-hidden shadow-card">
      <div className="p-5 sm:px-6 border-b border-line-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-ink">Utilisateurs & rentabilité par pays</h2>
          <p className="text-xs text-muted mt-0.5">Cameroun, Centrafrique et Tchad</p>
        </div>
        <div className="flex gap-2.5">
          <div className="rounded-xl border border-line-subtle bg-sand/60 px-3 py-2">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">Utilisateurs</p>
            <p className="text-sm font-extrabold text-ink tabular-nums">{formatNumber(countryTotals.users)}</p>
          </div>
          <div className="rounded-xl border border-line-subtle bg-sand/60 px-3 py-2">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">Achats</p>
            <p className="text-sm font-extrabold text-ink tabular-nums">{formatFcfa(countryTotals.amountFcfa)}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(280px,360px)_minmax(0,1fr)]">
        <figure className="p-5 m-0 lg:border-r border-line-subtle">
          <svg
            viewBox={CEMAC_MAP_VIEWBOX}
            role="img"
            aria-label="Carte du Cameroun, de la Centrafrique et du Tchad, détaillée dans le tableau voisin"
            className="w-full max-w-[270px] mx-auto block"
          >
            {rows.map((row) => (
              <path
                key={row.code}
                d={CEMAC_MAP_SHAPES[row.code].d}
                fill={COUNTRY_COLORS[row.code]}
                fillOpacity={Math.min(1, fillOpacityFor(row.amountFcfa) + (active === row.code ? 0.1 : 0))}
                stroke="var(--bg-surface)"
                strokeWidth={active === row.code ? 4 : 2}
                strokeLinejoin="round"
                className="cursor-pointer transition-all duration-200"
                style={{
                  opacity: active && active !== row.code ? 0.45 : 1,
                  filter: active === row.code ? `drop-shadow(0 0 12px ${COUNTRY_COLORS[row.code]}88)` : "none",
                }}
                onMouseEnter={() => setActive(row.code)}
                onMouseLeave={() => setActive(null)}
              />
            ))}
            {rows.map((row) => {
              const { labelX, labelY } = CEMAC_MAP_SHAPES[row.code];
              return (
                <text
                  key={row.code}
                  x={labelX}
                  y={labelY - 24}
                  textAnchor="middle"
                  className="fill-ink pointer-events-none"
                  stroke="var(--bg-surface)"
                  strokeWidth={5}
                  strokeLinejoin="round"
                  paintOrder="stroke"
                >
                  <tspan x={labelX} className="text-[25px] font-bold">{row.name}</tspan>
                  <tspan x={labelX} dy={26} className="text-[21px] font-medium">
                    {formatNumber(row.users)} utilisateurs
                  </tspan>
                  <tspan x={labelX} dy={25} className="text-[21px] font-medium">
                    {formatNumber(row.revenuePerUser)} F / util.
                  </tspan>
                </text>
              );
            })}
          </svg>
          <figcaption className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[11px] text-muted">
            {rows.map((row) => (
              <span key={row.code} className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COUNTRY_COLORS[row.code] }} />
                {row.name}
              </span>
            ))}
          </figcaption>
        </figure>

        <div className="md:hidden">
          <ul className="divide-y divide-line-subtle border-t border-line-subtle">
            {rows.map((row) => (
              <li key={row.code} className="space-y-2.5 p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2.5">
                    <span className="h-8 w-1 rounded-full" style={{ backgroundColor: COUNTRY_COLORS[row.code] }} aria-hidden="true" />
                    <span className="text-lg" aria-hidden="true">{row.flag}</span>
                    <span className="text-sm font-bold text-ink">{row.name}</span>
                  </span>
                  <span className="text-sm font-extrabold text-ink tabular-nums">{formatFcfa(row.amountFcfa)}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-line-subtle">
                  <div className="h-full rounded-full" style={{ width: `${row.revenueShare}%`, backgroundColor: COUNTRY_COLORS[row.code] }} />
                </div>
                <dl className="grid grid-cols-3 gap-2 text-[11px]">
                  <div><dt className="text-muted">Utilisateurs</dt><dd className="font-bold text-ink tabular-nums">{formatNumber(row.users)}</dd></div>
                  <div><dt className="text-muted">Jetons</dt><dd className="font-bold text-ink tabular-nums">{formatNumber(row.tokensPurchased)}</dd></div>
                  <div><dt className="text-muted">Part du CA</dt><dd className="font-bold text-ink tabular-nums">{formatPercent(row.revenueShare)}</dd></div>
                </dl>
              </li>
            ))}
          </ul>
          <p className="border-t border-line-subtle px-4 py-3 text-[11px] text-muted">
            Rentabilité moyenne : {formatFcfa(Math.round(countryTotals.amountFcfa / countryTotals.users))} par utilisateur. Données de démonstration.
          </p>
        </div>

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full text-left text-xs min-w-[640px]">
            <thead>
              <tr className="bg-dark-card text-[11px] font-semibold uppercase tracking-wider text-white/90">
                <th scope="col" className="py-3.5 px-5">Pays</th>
                <th scope="col" className="py-3.5 px-4 text-right">Utilisateurs</th>
                <th scope="col" className="py-3.5 px-4 text-right">Jetons achetés</th>
                <th scope="col" className="py-3.5 px-4 text-right">Montant</th>
                <th scope="col" className="py-3.5 px-4 text-right">Part du CA</th>
                <th scope="col" className="py-3.5 px-5 text-right">Rentabilité</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-subtle">
              {rows.map((row) => (
                <tr
                  key={row.code}
                  onMouseEnter={() => setActive(row.code)}
                  onMouseLeave={() => setActive(null)}
                  className={`transition-colors ${active === row.code ? "bg-sand" : ""}`}
                >
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-2.5">
                      <span className="h-8 w-1 rounded-full" style={{ backgroundColor: COUNTRY_COLORS[row.code] }} aria-hidden="true" />
                      <span className="text-lg" aria-hidden="true">{row.flag}</span>
                      <span className="font-bold text-ink">{row.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="font-bold text-ink tabular-nums">{formatNumber(row.users)}</div>
                    <div className="text-[11px] text-muted whitespace-nowrap">
                      {row.carriersCount} transp. · {row.shippersCount} charg.
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right tabular-nums text-ink">{formatNumber(row.tokensPurchased)}</td>
                  <td className="py-4 px-4 text-right tabular-nums font-bold text-ink whitespace-nowrap">{formatFcfa(row.amountFcfa)}</td>
                  <td className="py-4 px-4 text-right">
                    <div className="font-semibold tabular-nums text-ink">{formatPercent(row.revenueShare)}</div>
                    <div className="ml-auto mt-1 h-1.5 w-20 overflow-hidden rounded-full bg-line-subtle">
                      <div className="h-full rounded-full" style={{ width: `${row.revenueShare}%`, backgroundColor: COUNTRY_COLORS[row.code] }} />
                    </div>
                  </td>
                  <td className="py-4 px-5 text-right whitespace-nowrap">
                    <div className="font-bold text-ink tabular-nums">{formatFcfa(row.revenuePerUser)}</div>
                    <div className="text-[11px] text-muted">par utilisateur</div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-line bg-sand/50 font-bold text-ink">
                <th scope="row" className="py-3.5 px-5 text-left">Total</th>
                <td className="py-3.5 px-4 text-right tabular-nums">{formatNumber(countryTotals.users)}</td>
                <td className="py-3.5 px-4 text-right tabular-nums">{formatNumber(countryTotals.tokensPurchased)}</td>
                <td className="py-3.5 px-4 text-right tabular-nums whitespace-nowrap">{formatFcfa(countryTotals.amountFcfa)}</td>
                <td className="py-3.5 px-4 text-right tabular-nums">100 %</td>
                <td className="py-3.5 px-5 text-right tabular-nums whitespace-nowrap">
                  {formatFcfa(Math.round(countryTotals.amountFcfa / countryTotals.users))}
                </td>
              </tr>
            </tfoot>
          </table>
          <p className="px-5 py-3 text-[11px] text-muted">
            Rentabilité : montant des achats de jetons par utilisateur inscrit. Données de démonstration.
          </p>
        </div>
      </div>
    </section>
  );
}
