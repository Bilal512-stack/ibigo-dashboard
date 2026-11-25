"use client";

import Link from "next/link";
import { useState } from "react";
import { StatusPill } from "@/components/ui/StatusPill";
import { useCarriers } from "@/lib/carrier-store";
import { PAYMENT_STATUS_TONES, VERIFICATION_META } from "@/lib/constants";
import { formatDateTime, formatFcfa } from "@/lib/format";
import { carrierDocumentsQueue } from "@/lib/mock-data/documents";
import { missions } from "@/lib/mock-data/operations";
import { payments } from "@/lib/mock-data/payments";
import type { StatusTone } from "@/types";

type QueueTab = "kyc" | "documents" | "payments" | "missions";

const RISK_TONES: Record<"Faible" | "Moyen" | "Critique", StatusTone> = {
  Faible: "success",
  Moyen: "warning",
  Critique: "danger",
};

const TAB_LINKS: Record<QueueTab, { href: string; label: string }> = {
  kyc: { href: "/users/transporteurs", label: "Tous les transporteurs" },
  documents: { href: "/documents", label: "Tous les documents" },
  payments: { href: "/tokens", label: "Tous les paiements" },
  missions: { href: "/operations/camions-missions", label: "Toutes les missions" },
};

export function ActionCenter() {
  const { carriers, setVerification } = useCarriers();
  const [activeTab, setActiveTab] = useState<QueueTab>("kyc");

  const pendingCarriers = carriers.filter(
    (c) => c.verification === "pending" || c.verification === "incomplete",
  );
  const pendingDocs = carrierDocumentsQueue.filter(
    (d) => d.status === "En attente" || d.status === "En cours d'analyse",
  );
  const pendingPayments = payments.filter((p) => p.status === "En attente").slice(0, 6);
  const totalPendingPayments = payments.filter((p) => p.status === "En attente").length;
  const flaggedMissions = missions.filter(
    (m) => m.status === "Rompue" || m.status === "Avis en attente",
  );

  const totalPending =
    pendingCarriers.length + pendingDocs.length + totalPendingPayments + flaggedMissions.length;

  const tabs: { id: QueueTab; label: string; count: number }[] = [
    { id: "kyc", label: "KYC Transporteurs", count: pendingCarriers.length },
    { id: "documents", label: "Documents", count: pendingDocs.length },
    { id: "payments", label: "Paiements en attente", count: totalPendingPayments },
    { id: "missions", label: "Missions & Litiges", count: flaggedMissions.length },
  ];

  const footerLink = TAB_LINKS[activeTab];

  return (
    <section className="bg-surface border border-line rounded-card overflow-hidden">
      {/* En-tête */}
      <div className="p-4 sm:px-6 sm:py-5 border-b border-line space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h2 className="text-base font-bold text-ink">À traiter maintenant</h2>
            <p className="text-xs text-muted mt-0.5">
              Dossiers KYC, pièces justificatives, paiements en attente et incidents de mission
            </p>
          </div>

          {totalPending === 0 ? (
            <StatusPill label="Tout est à jour" tone="success" size="sm" />
          ) : (
            <StatusPill label={`${totalPending} en attente`} tone="warning" size="sm" />
          )}
        </div>

        {/* Onglets */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 text-xs font-semibold">
          {tabs.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                aria-pressed={active}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl transition-colors whitespace-nowrap ${
                  active
                    ? "bg-dark-card text-white font-bold"
                    : "bg-sand/70 border border-line-subtle text-muted hover:text-ink"
                }`}
              >
                {tab.label}
                <span className={`ml-1.5 tabular-nums ${active ? "text-accent" : "text-faint"}`}>
                  ({tab.count})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Contenu par onglet */}
      {activeTab === "kyc" && (
        pendingCarriers.length === 0 ? (
          <EmptyState text="Aucun dossier transporteur en attente de validation." />
        ) : (
          <>
            <ul className="divide-y divide-line-subtle md:hidden">
              {pendingCarriers.map((carrier) => {
                const verifiedDocs = carrier.documents.filter((d) => d.verified).length;
                const meta = VERIFICATION_META[carrier.verification];
                return (
                  <li key={carrier.id} className="p-4 space-y-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-ink truncate">
                          {carrier.countryFlag} {carrier.name}
                        </p>
                        <p className="text-[11px] text-muted truncate">{carrier.company}</p>
                      </div>
                      <StatusPill label={meta.label} tone={meta.tone} size="sm" />
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-muted">
                      <span>{carrier.trucks} camion{carrier.trucks > 1 ? "s" : ""} · {verifiedDocs}/{carrier.documents.length} pièces</span>
                      <span>{carrier.submissionDate}</span>
                    </div>
                    <div className="flex gap-2">
                      {carrier.verification === "pending" && (
                        <button
                          type="button"
                          onClick={() => setVerification(carrier.id, "verified")}
                          className="flex-1 py-2 rounded-lg bg-ink text-surface text-xs font-bold hover:opacity-85 transition-opacity"
                        >
                          Valider
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setVerification(carrier.id, "rejected")}
                        className="flex-1 py-2 rounded-lg border border-danger text-danger text-xs font-bold hover:bg-danger-soft transition-colors"
                      >
                        Rejeter
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-sand/50 border-b border-line text-[11px] font-semibold uppercase tracking-wider text-muted">
                    <th className="py-3 px-6">Transporteur</th>
                    <th className="py-3 px-6">Flotte</th>
                    <th className="py-3 px-6">Pièces KYC</th>
                    <th className="py-3 px-6">Soumission</th>
                    <th className="py-3 px-6">Statut</th>
                    <th className="py-3 px-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line-subtle">
                  {pendingCarriers.map((carrier) => {
                    const verifiedDocs = carrier.documents.filter((d) => d.verified).length;
                    const meta = VERIFICATION_META[carrier.verification];
                    return (
                      <tr key={carrier.id} className="hover:bg-sand/30 transition-colors">
                        <td className="py-3.5 px-6">
                          <div className="font-bold text-ink">{carrier.countryFlag} {carrier.name}</div>
                          <div className="text-[11px] text-muted">{carrier.company}</div>
                        </td>
                        <td className="py-3.5 px-6 text-muted whitespace-nowrap">
                          {carrier.trucks} camion{carrier.trucks > 1 ? "s" : ""} · {carrier.kind}
                        </td>
                        <td className="py-3.5 px-6 font-semibold text-ink tabular-nums whitespace-nowrap">
                          {verifiedDocs} / {carrier.documents.length} vérifiées
                        </td>
                        <td className="py-3.5 px-6 text-muted whitespace-nowrap">{carrier.submissionDate}</td>
                        <td className="py-3.5 px-6">
                          <StatusPill label={meta.label} tone={meta.tone} size="sm" />
                        </td>
                        <td className="py-3.5 px-6 text-right whitespace-nowrap space-x-2">
                          {carrier.verification === "pending" && (
                            <button
                              type="button"
                              onClick={() => setVerification(carrier.id, "verified")}
                              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-ink text-surface hover:opacity-85 transition-opacity"
                            >
                              Valider
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => setVerification(carrier.id, "rejected")}
                            className="px-2.5 py-1.5 rounded-lg text-xs font-bold border border-danger text-danger hover:bg-danger-soft transition-colors"
                          >
                            Rejeter
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )
      )}

      {activeTab === "documents" && (
        pendingDocs.length === 0 ? (
          <EmptyState text="Tous les documents en attente ont été traités." />
        ) : (
          <>
            <ul className="divide-y divide-line-subtle md:hidden">
              {pendingDocs.map((doc) => (
                <li key={doc.id} className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-ink truncate">{doc.documentType}</p>
                      <p className="text-[11px] text-muted truncate">{doc.countryFlag} {doc.carrierName}</p>
                    </div>
                    <StatusPill label={`Risque ${doc.riskScore}`} tone={RISK_TONES[doc.riskScore]} size="sm" />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-muted">
                    <span>Expire : {doc.expiryDate}</span>
                    <Link href="/documents" className="font-bold text-accent hover:underline">
                      Examiner →
                    </Link>
                  </div>
                </li>
              ))}
            </ul>

            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-sand/50 border-b border-line text-[11px] font-semibold uppercase tracking-wider text-muted">
                    <th className="py-3 px-6">Document</th>
                    <th className="py-3 px-6">Transporteur</th>
                    <th className="py-3 px-6">Expiration</th>
                    <th className="py-3 px-6">Risque</th>
                    <th className="py-3 px-6">Statut</th>
                    <th className="py-3 px-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line-subtle">
                  {pendingDocs.map((doc) => (
                    <tr key={doc.id} className="hover:bg-sand/30 transition-colors">
                      <td className="py-3.5 px-6">
                        <div className="font-bold text-ink">{doc.documentType}</div>
                        <div className="text-[11px] text-muted">{doc.documentNumber} · {doc.uploadedDate}</div>
                      </td>
                      <td className="py-3.5 px-6">
                        <div className="font-semibold text-ink">{doc.countryFlag} {doc.carrierName}</div>
                        <div className="text-[11px] text-muted">{doc.company}</div>
                      </td>
                      <td className="py-3.5 px-6 text-muted whitespace-nowrap">{doc.expiryDate}</td>
                      <td className="py-3.5 px-6">
                        <StatusPill label={doc.riskScore} tone={RISK_TONES[doc.riskScore]} size="sm" />
                      </td>
                      <td className="py-3.5 px-6">
                        <StatusPill label={doc.status} tone={doc.statusTone} size="sm" />
                      </td>
                      <td className="py-3.5 px-6 text-right whitespace-nowrap">
                        <Link href="/documents" className="font-bold text-accent hover:underline">
                          Examiner →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )
      )}

      {activeTab === "payments" && (
        pendingPayments.length === 0 ? (
          <EmptyState text="Aucun paiement Mobile Money en attente." />
        ) : (
          <>
            <ul className="divide-y divide-line-subtle md:hidden">
              {pendingPayments.map((payment) => (
                <li key={payment.id} className="p-4 space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-ink truncate">{payment.payerName}</p>
                      <p className="text-[11px] text-muted">{payment.operator} · {payment.packName}</p>
                    </div>
                    <span className="text-xs font-bold text-ink tabular-nums shrink-0">
                      {formatFcfa(payment.amountFcfa)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-muted">
                    <span>{formatDateTime(payment.timestamp)}</span>
                    <Link href="/tokens" className="font-bold text-accent hover:underline">
                      Voir →
                    </Link>
                  </div>
                </li>
              ))}
            </ul>

            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-sand/50 border-b border-line text-[11px] font-semibold uppercase tracking-wider text-muted">
                    <th className="py-3 px-6">Référence</th>
                    <th className="py-3 px-6">Payeur</th>
                    <th className="py-3 px-6">Opérateur</th>
                    <th className="py-3 px-6">Pack</th>
                    <th className="py-3 px-6">Montant</th>
                    <th className="py-3 px-6">Statut</th>
                    <th className="py-3 px-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line-subtle">
                  {pendingPayments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-sand/30 transition-colors">
                      <td className="py-3.5 px-6">
                        <div className="font-bold text-ink">{payment.id}</div>
                        <div className="text-[11px] text-muted">{formatDateTime(payment.timestamp)}</div>
                      </td>
                      <td className="py-3.5 px-6">
                        <div className="font-semibold text-ink">{payment.payerName}</div>
                        <div className="text-[11px] text-muted">{payment.payerRole}</div>
                      </td>
                      <td className="py-3.5 px-6 text-muted whitespace-nowrap">{payment.operator}</td>
                      <td className="py-3.5 px-6 text-ink whitespace-nowrap">
                        {payment.packName} ({payment.tokens} j.)
                      </td>
                      <td className="py-3.5 px-6 font-bold text-ink tabular-nums whitespace-nowrap">
                        {formatFcfa(payment.amountFcfa)}
                      </td>
                      <td className="py-3.5 px-6">
                        <StatusPill label={payment.status} tone={PAYMENT_STATUS_TONES[payment.status]} size="sm" />
                      </td>
                      <td className="py-3.5 px-6 text-right whitespace-nowrap">
                        <Link href="/tokens" className="font-bold text-accent hover:underline">
                          Voir →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )
      )}

      {activeTab === "missions" && (
        flaggedMissions.length === 0 ? (
          <EmptyState text="Aucune mission rompue ni avis en attente." />
        ) : (
          <>
            <ul className="divide-y divide-line-subtle md:hidden">
              {flaggedMissions.map((mission) => (
                <li key={mission.id} className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-ink truncate">
                        {mission.id} · {mission.origin} → {mission.destination}
                      </p>
                      <p className="text-[11px] text-muted truncate">{mission.carrier} · {mission.cargo}</p>
                    </div>
                    <StatusPill label={mission.status} tone={mission.statusTone} size="sm" />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-muted">
                    <span>Clôture : {mission.closedDate}</span>
                    <Link href="/operations/camions-missions" className="font-bold text-accent hover:underline">
                      Ouvrir →
                    </Link>
                  </div>
                </li>
              ))}
            </ul>

            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-sand/50 border-b border-line text-[11px] font-semibold uppercase tracking-wider text-muted">
                    <th className="py-3 px-6">Mission</th>
                    <th className="py-3 px-6">Corridor</th>
                    <th className="py-3 px-6">Transporteur / Chargeur</th>
                    <th className="py-3 px-6">Date</th>
                    <th className="py-3 px-6">Statut</th>
                    <th className="py-3 px-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line-subtle">
                  {flaggedMissions.map((mission) => (
                    <tr key={mission.id} className="hover:bg-sand/30 transition-colors">
                      <td className="py-3.5 px-6">
                        <div className="font-bold text-ink">{mission.id}</div>
                        <div className="text-[11px] text-muted">{mission.cargo}</div>
                      </td>
                      <td className="py-3.5 px-6 font-semibold text-ink whitespace-nowrap">
                        {mission.origin} → {mission.destination}
                      </td>
                      <td className="py-3.5 px-6">
                        <div className="font-semibold text-ink">{mission.carrier}</div>
                        <div className="text-[11px] text-muted">{mission.shipper}</div>
                      </td>
                      <td className="py-3.5 px-6 text-muted whitespace-nowrap">{mission.closedDate}</td>
                      <td className="py-3.5 px-6">
                        <StatusPill label={mission.status} tone={mission.statusTone} size="sm" />
                      </td>
                      <td className="py-3.5 px-6 text-right whitespace-nowrap">
                        <Link href="/operations/camions-missions" className="font-bold text-accent hover:underline">
                          Ouvrir →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )
      )}

      {/* Pied */}
      <div className="px-4 sm:px-6 py-3 border-t border-line bg-sand/20 flex items-center justify-between text-xs text-muted">
        <span>Traitement direct depuis la vue d&apos;ensemble</span>
        <Link href={footerLink.href} className="font-bold text-accent hover:underline">
          {footerLink.label} →
        </Link>
      </div>
    </section>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="py-10 px-6 text-center text-xs text-muted">
      {text}
    </div>
  );
}
