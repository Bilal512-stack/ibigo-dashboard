"use client";

import { useState } from "react";
import { StatusPill } from "@/components/ui/StatusPill";
import { TOKEN_PRICE_FCFA } from "@/lib/constants";
import { formatFcfa } from "@/lib/format";
import { PAYMENTS_NOW } from "@/lib/mock-data/payments";
import { reservedTokens } from "@/lib/mock-data/reserved-tokens";
import { useReservedTokens } from "@/lib/reserved-token-store";
import type { StatusTone } from "@/types";

const HOUR_MS = 3_600_000;

const rows = [...reservedTokens].sort((a, b) => a.expiresAt - b.expiresAt);

function deadlineLabel(expiresAt: number) {
  const hours = Math.round(Math.abs(expiresAt - PAYMENTS_NOW) / HOUR_MS);
  return expiresAt <= PAYMENTS_NOW ? `Expiré depuis ${hours} h` : `Expire dans ${hours} h`;
}

export function ReservedTokensPanel() {
  const { releasedIds, release } = useReservedTokens();
  const [confirmingId, setConfirmingId] = useState<string | null>(null);

  const overdueCount = rows.filter(
    (token) => token.expiresAt <= PAYMENTS_NOW && !releasedIds.includes(token.id),
  ).length;

  return (
    <section className="bg-surface border border-line rounded-card overflow-hidden shadow-card">
      <div className="p-5 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-base font-bold text-ink">Jetons réservés</h2>
          <p className="text-xs text-muted mt-0.5">
            Un jeton non confirmé sous 48 h est rendu à son détenteur. Libération manuelle si ce retour n&apos;a pas eu lieu.
          </p>
        </div>
        {overdueCount > 0 && (
          <span className="self-start sm:self-auto">
            <StatusPill label={`${overdueCount} à libérer`} tone="danger" />
          </span>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs min-w-[880px]">
          <thead>
            <tr className="bg-dark-card text-white font-semibold">
              <th scope="col" className="py-3.5 px-5">Détenteur</th>
              <th scope="col" className="py-3.5 px-5">Mise en relation</th>
              <th scope="col" className="py-3.5 px-5 text-right">Valeur</th>
              <th scope="col" className="py-3.5 px-5">Échéance</th>
              <th scope="col" className="py-3.5 px-5">Statut</th>
              <th scope="col" className="py-3.5 px-5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line/70">
            {rows.map((token) => {
              const released = releasedIds.includes(token.id);
              const expired = token.expiresAt <= PAYMENTS_NOW;
              const status: { label: string; tone: StatusTone } = released
                ? { label: "Libéré", tone: "success" }
                : expired
                  ? { label: "Expiré", tone: "danger" }
                  : { label: "Bloqué", tone: "warning" };

              return (
                <tr key={token.id} className="hover:bg-sand/70 transition-colors">
                  <td className="py-3.5 px-5 whitespace-nowrap">
                    <div className="font-bold text-ink">{token.holderName}</div>
                    <div className="text-[11px] text-muted">{token.holderRole} · {token.holderPhone}</div>
                  </td>
                  <td className="py-3.5 px-5">
                    <div className="font-bold text-ink">{token.counterpart}</div>
                    <div className="text-[11px] text-muted">{token.listing} · {token.corridor}</div>
                  </td>
                  <td className="py-3.5 px-5 text-right whitespace-nowrap font-bold text-ink tabular-nums">
                    {formatFcfa(TOKEN_PRICE_FCFA)}
                  </td>
                  <td className={`py-3.5 px-5 whitespace-nowrap font-semibold ${expired && !released ? "text-danger" : "text-ink"}`}>
                    {released ? "Rendu au solde" : deadlineLabel(token.expiresAt)}
                  </td>
                  <td className="py-3.5 px-5 whitespace-nowrap">
                    <StatusPill label={status.label} tone={status.tone} size="sm" />
                  </td>
                  <td className="py-3.5 px-5">
                    <div className="flex items-center justify-end gap-1.5 whitespace-nowrap">
                      {released ? (
                        <span className="text-faint">—</span>
                      ) : confirmingId === token.id ? (
                        <>
                          <button
                            type="button"
                            onClick={() => {
                              release(token.id);
                              setConfirmingId(null);
                            }}
                            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-accent hover:bg-accent-strong text-white transition-colors"
                          >
                            Confirmer
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmingId(null)}
                            className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-muted hover:bg-line-subtle transition-colors"
                          >
                            Annuler
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setConfirmingId(token.id)}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold bg-dark-card hover:bg-dark-card-alt text-white transition-colors"
                        >
                          Libérer le jeton
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="px-6 py-3 border-t border-line-subtle text-[11px] text-muted">Données de démonstration.</p>
    </section>
  );
}
