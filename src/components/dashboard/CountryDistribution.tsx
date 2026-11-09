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

/** Une seule teinte, plus intense quand le montant des achats est élevé. */
function fillOpacityFor(amountFcfa: number) {
  return 0.2 + 0.65 * (amountFcfa / maxAmount);
}

export function CountryDistribution() {
  const [active, setActive] = useState<CountryCode | null>(null);

  return (
    <section className="bg-surface border border-line rounded-card overflow-hidden shadow-card">
      <div className="p-5 sm:px-6 border-b border-line-subtle">
        <h2 className="text-base font-bold text-ink">Utilisateurs & rentabilité par pays</h2>
        <p className="text-xs text-muted mt-0.5">Cameroun, Centrafrique et Tchad</p>
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
                fill="var(--accent)"
                fillOpacity={fillOpacityFor(row.amountFcfa) + (active === row.code ? 0.15 : 0)}
                stroke="var(--bg-surface)"
                strokeWidth={2}
                strokeLinejoin="round"
                className="cursor-pointer transition-[fill-opacity] duration-150"
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
          <figcaption className="mt-3 flex items-center justify-center gap-2 text-[11px] text-muted">
            <span>Montant des achats</span>
            <span
              className="h-2 w-16 rounded-full"
              style={{ background: "linear-gradient(90deg, rgb(253 79 73 / 0.25), rgb(253 79 73 / 0.85))" }}
            />
            <span>élevé</span>
          </figcaption>
        </figure>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[640px]">
            <thead>
              <tr className="bg-dark-card text-white font-semibold">
                <th scope="col" className="py-3.5 px-5">Pays</th>
                <th scope="col" className="py-3.5 px-4 text-right">Utilisateurs</th>
                <th scope="col" className="py-3.5 px-4 text-right">Jetons achetés</th>
                <th scope="col" className="py-3.5 px-4 text-right">Montant</th>
                <th scope="col" className="py-3.5 px-4 text-right">Part du CA</th>
                <th scope="col" className="py-3.5 px-5 text-right">Rentabilité</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/70">
              {rows.map((row) => (
                <tr
                  key={row.code}
                  onMouseEnter={() => setActive(row.code)}
                  onMouseLeave={() => setActive(null)}
                  className={`transition-colors ${active === row.code ? "bg-accent-soft/60" : ""}`}
                >
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-2.5">
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
                  <td className="py-4 px-4 text-right tabular-nums text-ink">{formatPercent(row.revenueShare)}</td>
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
