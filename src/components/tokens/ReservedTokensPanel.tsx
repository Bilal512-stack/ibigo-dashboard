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

      <ul className="divide-y divide-line-subtle md:hidden">
        {rows.map((token) => {
          const released = releasedIds.includes(token.id);
          const expired = token.expiresAt <= PAYMENTS_NOW;
          const status: { label: string; tone: StatusTone } = released
            ? { label: "Libéré", tone: "success" }
            : expired
              ? { label: "Expiré", tone: "danger" }
              : { label: "Bloqué", tone: "warning" };
          return (
            <li key={token.id} className="space-y-3 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate text-xs font-bold text-ink">{token.holderName}</div>
                  <div className="truncate text-[11px] text-muted">{token.holderRole} · {token.holderPhone}</div>
                </div>
                <StatusPill label={status.label} tone={status.tone} size="sm" />
              </div>
              <div className="rounded-xl border border-line-subtle bg-sand/50 p-3 text-[11px]">
                <div className="font-bold text-ink">{token.counterpart}</div>
                <div className="text-muted">{token.listing} · {token.corridor}</div>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className={`font-semibold ${expired && !released ? "text-danger" : "text-ink"}`}>
                  {released ? "Rendu au solde" : deadlineLabel(token.expiresAt)}
                </span>
                <span className="font-bold text-ink tabular-nums">{formatFcfa(TOKEN_PRICE_FCFA)}</span>
              </div>
              {!released && (
                confirmingId === token.id ? (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        release(token.id);
                        setConfirmingId(null);
                      }}
                      className="flex-1 rounded-lg bg-accent py-2.5 text-xs font-bold text-white transition-colors hover:bg-accent-strong"
                    >
                      Confirmer
                    </button>
                    <button type="button" onClick={() => setConfirmingId(null)} className="flex-1 rounded-lg border border-line py-2.5 text-xs font-bold text-muted transition-colors hover:bg-line-subtle">
                      Annuler
                    </button>
                  </div>
                ) : (
                  <button type="button" onClick={() => setConfirmingId(token.id)} className="w-full rounded-lg bg-ink py-2.5 text-xs font-bold text-surface transition-opacity hover:opacity-85">
                    Libérer le jeton
                  </button>
                )
              )}
            </li>
          );
        })}
      </ul>

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-left text-xs min-w-[880px]">
          <thead>
            <tr className="bg-dark-card text-[11px] font-semibold uppercase tracking-wider text-white/90">
              <th scope="col" className="py-3.5 px-5">Détenteur</th>
              <th scope="col" className="py-3.5 px-5">Mise en relation</th>
              <th scope="col" className="py-3.5 px-5 text-right">Valeur</th>
              <th scope="col" className="py-3.5 px-5">Échéance</th>
              <th scope="col" className="py-3.5 px-5">Statut</th>
              <th scope="col" className="py-3.5 px-5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line-subtle">
            {rows.map((token) => {
              const released = releasedIds.includes(token.id);
              const expired = token.expiresAt <= PAYMENTS_NOW;
              const status: { label: string; tone: StatusTone } = released
                ? { label: "Libéré", tone: "success" }
                : expired
                  ? { label: "Expiré", tone: "danger" }
                  : { label: "Bloqué", tone: "warning" };

              return (
                <tr key={token.id} className="group transition-colors hover:bg-accent-soft/40 even:bg-sand/30">
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
