"use client";

import { useState } from "react";
import Link from "next/link";
import { ContactCell, IdentityCell } from "@/components/users/UserCells";
import { CountrySelect, EmptyRow, FilterTabs, SearchInput, matchesSearch } from "@/components/ui/FilterControls";
import { HeaderChip, PageHeader } from "@/components/ui/PageHeader";
import { StatusPill } from "@/components/ui/StatusPill";
import { useCarriers } from "@/lib/carrier-store";
import { VERIFICATION_META } from "@/lib/constants";
import { formatPercent } from "@/lib/format";
import type { Carrier, VerificationStatus } from "@/types";

type Tab = "all" | "pending" | "verified" | "blocked";

const TAB_STATUSES: Record<Exclude<Tab, "all">, VerificationStatus[]> = {
  pending: ["pending", "incomplete"],
  verified: ["verified"],
  blocked: ["rejected", "suspended"],
};

const primaryButton = "px-3 py-1.5 rounded-lg text-xs font-bold bg-ink text-surface hover:opacity-85 transition-opacity";
const dangerButton = "px-2.5 py-1.5 rounded-lg text-xs font-bold border border-danger text-danger hover:bg-danger-soft transition-colors";

function VerificationActions({ carrier }: { carrier: Carrier }) {
  const { setVerification } = useCarriers();
  const set = (status: VerificationStatus) => setVerification(carrier.id, status);

  switch (carrier.verification) {
    case "pending":
      return (
        <>
          <button type="button" className={primaryButton} onClick={() => set("verified")}>Valider</button>
          <button type="button" className={dangerButton} onClick={() => set("rejected")}>Rejeter</button>
        </>
      );
    case "incomplete":
      return (
        <button type="button" className={dangerButton} onClick={() => set("rejected")}>Rejeter</button>
      );
    case "verified":
      return (
        <button type="button" className={dangerButton} onClick={() => set("suspended")}>Suspendre</button>
      );
    case "rejected":
      return (
        <button type="button" className={primaryButton} onClick={() => set("pending")}>Réexaminer</button>
      );
    case "suspended":
      return (
        <button type="button" className={primaryButton} onClick={() => set("verified")}>Réactiver</button>
      );
  }
}

export function TransporteursPage() {
  const { carriers, pendingCount } = useCarriers();
  const [tab, setTab] = useState<Tab>("pending");
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("all");

  const countFor = (statuses: VerificationStatus[]) =>
    carriers.filter((carrier) => statuses.includes(carrier.verification)).length;

  const tabs = [
    { value: "all" as const, label: "Tous", count: carriers.length },
    { value: "pending" as const, label: "À vérifier", count: pendingCount },
    { value: "verified" as const, label: "Vérifiés", count: countFor(TAB_STATUSES.verified) },
    { value: "blocked" as const, label: "Rejetés / Suspendus", count: countFor(TAB_STATUSES.blocked) },
  ];

  const rows = carriers.filter(
    (carrier) =>
      (tab === "all" || TAB_STATUSES[tab].includes(carrier.verification)) &&
      (country === "all" || carrier.country === country) &&
      matchesSearch(search, [carrier.name, carrier.company, carrier.phone]),
  );

  const verifiedRate = carriers.length ? (countFor(TAB_STATUSES.verified) / carriers.length) * 100 : 0;

  return (
    <>
      <PageHeader
        breadcrumb={["Utilisateurs", "Transporteurs"]}
        title="Transporteurs"
        description="Dossiers de vérification et accès des transporteurs à la bourse de fret"
      >
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <HeaderChip label="À vérifier" value={`${pendingCount} dossiers`} valueClassName="text-accent" />
          <HeaderChip label="Taux vérifié" value={formatPercent(verifiedRate)} valueClassName="text-success" />
        </div>
      </PageHeader>

      <FilterTabs tabs={tabs} active={tab} onChange={setTab} />

      <div className="bg-surface border border-line rounded-card p-3 sm:p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-card [&_select]:w-full md:[&_select]:w-auto">
        <SearchInput value={search} onChange={setSearch} placeholder="Filtrer par nom, téléphone, société..." />
        <CountrySelect value={country} onChange={setCountry} />
      </div>

      {/* Mobile : une fiche par transporteur, aucune table à faire défiler */}
      <div className="space-y-3 md:hidden">
        {rows.length === 0 && (
          <p className="rounded-card border border-line bg-surface p-8 text-center text-xs text-muted">Aucun transporteur pour ces filtres.</p>
        )}
        {rows.map((carrier) => {
          const meta = VERIFICATION_META[carrier.verification];
          return (
            <article key={carrier.id} className="overflow-hidden rounded-card border border-line bg-surface shadow-card">
              <div className="flex items-start justify-between gap-3 p-4">
                <div className="min-w-0">
                  <IdentityCell initials={carrier.initials} name={carrier.name} company={carrier.company} />
                </div>
                <div className="shrink-0 text-right">
                  <StatusPill label={meta.label} tone={meta.tone} size="sm" />
                  <div className="mt-1 text-[10px] text-muted">{carrier.submissionDate}</div>
                </div>
              </div>

              <dl className="grid grid-cols-2 gap-px border-y border-line-subtle bg-line-subtle text-[11px]">
                <div className="bg-surface p-3">
                  <dt className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted">Contact</dt>
                  <dd><ContactCell flag={carrier.countryFlag} phone={carrier.phone} location={carrier.countryLabel} /></dd>
                </div>
                <div className="bg-surface p-3">
                  <dt className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted">Profil</dt>
                  <dd>
                    <div className="font-bold text-ink">{carrier.kind}</div>
                    <div className="text-muted">{carrier.trucks} camion{carrier.trucks > 1 ? "s" : ""}</div>
                    <div className="text-muted">{carrier.tokensAvailable} jetons · {carrier.tokensReserved} réservé{carrier.tokensReserved > 1 ? "s" : ""}</div>
                  </dd>
                </div>
              </dl>

              <div className="p-4 pb-3">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted">Documents soumis</p>
                <div className="flex flex-wrap gap-1.5">
                  {carrier.documents.map((doc) => (
                    <span
                      key={doc.name}
                      className={`max-w-full truncate rounded-md border px-2 py-0.5 text-[10px] font-semibold ${
                        doc.alert ? "border-danger-line bg-danger-soft text-danger" : "border-line bg-surface text-ink"
                      }`}
                    >
                      {doc.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 border-t border-line-subtle bg-sand/40 p-3 [&_button]:flex-1 [&_button]:py-2.5">
                <VerificationActions carrier={carrier} />
                <Link href="/documents" className="flex-1 rounded-lg border border-line bg-surface px-2.5 py-2.5 text-center text-xs font-bold text-ink transition-colors hover:bg-sand">
                  Documents
                </Link>
              </div>
            </article>
          );
        })}
        <p className="px-1 text-center text-xs text-muted">{rows.length} sur {carriers.length} fiches affichées</p>
      </div>

      <div className="hidden overflow-hidden rounded-card border border-line bg-surface shadow-card md:block">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[960px]">
            <thead>
              <tr className="bg-dark-card text-[11px] font-semibold uppercase tracking-wider text-white/90">
                <th scope="col" className="py-3.5 px-5">Transporteur</th>
                <th scope="col" className="py-3.5 px-5">Téléphone & Zone</th>
                <th scope="col" className="py-3.5 px-5">Profil & Jetons</th>
                <th scope="col" className="py-3.5 px-5">Documents soumis</th>
                <th scope="col" className="py-3.5 px-5">Statut</th>
                <th scope="col" className="py-3.5 px-5 text-right sticky right-0 bg-dark-card">Vérification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/70">
              {rows.length === 0 && <EmptyRow colSpan={6} label="Aucun transporteur pour ces filtres." />}
              {rows.map((carrier) => {
                const meta = VERIFICATION_META[carrier.verification];
                return (
                  <tr key={carrier.id} className="hover:bg-sand/70 transition-colors">
                    <td className="py-4 px-5">
                      <IdentityCell initials={carrier.initials} name={carrier.name} company={carrier.company} />
                    </td>
                    <td className="py-4 px-5 whitespace-nowrap">
                      <ContactCell flag={carrier.countryFlag} phone={carrier.phone} location={carrier.countryLabel} />
                    </td>
                    <td className="py-4 px-5 whitespace-nowrap">
                      <div className="font-bold text-ink">{carrier.kind}</div>
                      <div className="text-[11px] text-muted">
                        {carrier.trucks} camion{carrier.trucks > 1 ? "s" : ""}
                      </div>
                      <div className="text-[11px] text-muted">
                        {carrier.tokensAvailable} jetons disponibles, {carrier.tokensReserved} réservé{carrier.tokensReserved > 1 ? "s" : ""}
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      <div className="flex flex-col gap-1 max-w-[170px]">
                        {carrier.documents.map((doc) => (
                          <span
                            key={doc.name}
                            className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border truncate ${
                              doc.alert ? "bg-danger-soft text-danger border-danger-line" : "bg-surface text-ink border-line"
                            }`}
                          >
                            {doc.name}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-5 whitespace-nowrap">
                      <StatusPill label={meta.label} tone={meta.tone} size="sm" />
                      <div className="text-[11px] text-muted mt-1">{carrier.submissionDate}</div>
                    </td>
                    <td className="py-4 px-5 sticky right-0 bg-surface">
                      <div className="flex items-center justify-end gap-1.5">
                        <VerificationActions carrier={carrier} />
                        <Link href="/documents" className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-muted hover:bg-line-subtle transition-colors">
                          Documents
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="p-4 px-6 border-t border-line text-xs text-muted">
          {rows.length} sur {carriers.length} fiches affichées
        </p>
      </div>
    </>
  );
}
