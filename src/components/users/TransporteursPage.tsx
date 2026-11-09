"use client";

import { useState } from "react";
import Link from "next/link";
import { BorderControlCard } from "@/components/users/BorderControlCard";
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

const primaryButton = "px-3 py-1.5 rounded-lg text-xs font-bold bg-dark-card hover:bg-dark-card-alt text-white transition-colors";
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
        <div className="flex items-center gap-3">
          <HeaderChip label="À vérifier" value={`${pendingCount} dossiers`} valueClassName="text-accent" />
          <HeaderChip label="Taux vérifié" value={formatPercent(verifiedRate)} valueClassName="text-success" />
        </div>
      </PageHeader>

      <FilterTabs tabs={tabs} active={tab} onChange={setTab} />

      <div className="bg-surface border border-line rounded-card p-4 flex flex-col md:flex-row items-center justify-between gap-3 shadow-card">
        <SearchInput value={search} onChange={setSearch} placeholder="Filtrer par nom, téléphone, société..." />
        <CountrySelect value={country} onChange={setCountry} />
      </div>

      <div className="bg-surface border border-line rounded-card overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[960px]">
            <thead>
              <tr className="bg-dark-card text-white font-semibold">
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

      <BorderControlCard />
    </>
  );
}
