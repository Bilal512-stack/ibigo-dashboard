"use client";

import { useState } from "react";
import { ContactCell, IdentityCell, TokenCell } from "@/components/users/UserCells";
import { CountrySelect, EmptyRow, SearchInput, matchesSearch } from "@/components/ui/FilterControls";
import { HeaderChip, PageHeader } from "@/components/ui/PageHeader";
import { formatNumber } from "@/lib/format";
import { countryTotals } from "@/lib/mock-data/overview";
import { shippers } from "@/lib/mock-data/users";

export function ChargeursPage() {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("all");

  const rows = shippers.filter(
    (shipper) =>
      (country === "all" || shipper.country === country) &&
      matchesSearch(search, [shipper.name, shipper.company, shipper.phone]),
  );

  return (
    <>
      <PageHeader
        breadcrumb={["Utilisateurs", "Chargeurs"]}
        title="Chargeurs"
        description="Comptes chargeurs, soldes de jetons et activité de publication"
      >
        <HeaderChip label="Chargeurs inscrits" value={formatNumber(countryTotals.shippers)} valueClassName="text-accent" />
      </PageHeader>

      <div className="bg-surface border border-line rounded-card p-3 sm:p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-card [&_select]:w-full md:[&_select]:w-auto">
        <SearchInput value={search} onChange={setSearch} placeholder="Filtrer par nom, téléphone, société..." />
        <CountrySelect value={country} onChange={setCountry} />
      </div>

      {/* Mobile : une fiche par chargeur */}
      <div className="space-y-3 md:hidden">
        {rows.length === 0 && (
          <p className="rounded-card border border-line bg-surface p-8 text-center text-xs text-muted">Aucun chargeur pour ces filtres.</p>
        )}
        {rows.map((shipper) => (
          <article key={shipper.id} className="overflow-hidden rounded-card border border-line bg-surface shadow-card">
            <div className="flex items-start justify-between gap-3 p-4">
              <div className="min-w-0">
                <IdentityCell initials={shipper.initials} name={shipper.name} company={shipper.company} />
              </div>
              <span className="shrink-0 rounded-full border border-line bg-sand px-2.5 py-0.5 text-[10px] font-bold text-ink">{shipper.segment}</span>
            </div>
            <dl className="grid grid-cols-2 gap-px border-t border-line-subtle bg-line-subtle text-[11px]">
              <div className="bg-surface p-3">
                <dt className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted">Contact</dt>
                <dd><ContactCell flag={shipper.countryFlag} phone={shipper.phone} location={shipper.countryLabel} /></dd>
              </div>
              <div className="bg-surface p-3">
                <dt className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted">Jetons</dt>
                <dd><TokenCell available={shipper.tokensAvailable} reserved={shipper.tokensReserved} /></dd>
              </div>
              <div className="bg-surface p-3">
                <dt className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted">Cargaisons</dt>
                <dd>
                  <div className="font-bold text-ink">{shipper.cargosPublished} publiées</div>
                  <div className="text-muted">{shipper.cargosActive} en cours</div>
                </dd>
              </div>
              <div className="bg-surface p-3">
                <dt className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted">Activité</dt>
                <dd>
                  <div className="font-semibold text-ink">Inscrit {shipper.joinedDate}</div>
                  <div className="text-muted">{shipper.lastActivity}</div>
                </dd>
              </div>
            </dl>
          </article>
        ))}
        <p className="px-1 text-center text-xs text-muted">{rows.length} sur {shippers.length} fiches affichées</p>
      </div>

      <div className="hidden overflow-hidden rounded-card border border-line bg-surface shadow-card md:block">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[900px]">
            <thead>
              <tr className="bg-dark-card text-[11px] font-semibold uppercase tracking-wider text-white/90">
                <th scope="col" className="py-3.5 px-5">Chargeur</th>
                <th scope="col" className="py-3.5 px-5">Téléphone & Zone</th>
                <th scope="col" className="py-3.5 px-5">Segment</th>
                <th scope="col" className="py-3.5 px-5">Jetons</th>
                <th scope="col" className="py-3.5 px-5">Cargaisons</th>
                <th scope="col" className="py-3.5 px-5">Inscription</th>
                <th scope="col" className="py-3.5 px-5">Dernière activité</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/70">
              {rows.length === 0 && <EmptyRow colSpan={7} label="Aucun chargeur pour ces filtres." />}
              {rows.map((shipper) => (
                <tr key={shipper.id} className="hover:bg-sand/70 transition-colors">
                  <td className="py-4 px-5">
                    <IdentityCell initials={shipper.initials} name={shipper.name} company={shipper.company} />
                  </td>
                  <td className="py-4 px-5 whitespace-nowrap">
                    <ContactCell flag={shipper.countryFlag} phone={shipper.phone} location={shipper.countryLabel} />
                  </td>
                  <td className="py-4 px-5 whitespace-nowrap font-bold text-ink">{shipper.segment}</td>
                  <td className="py-4 px-5 whitespace-nowrap">
                    <TokenCell available={shipper.tokensAvailable} reserved={shipper.tokensReserved} />
                  </td>
                  <td className="py-4 px-5 whitespace-nowrap">
                    <div className="font-bold text-ink">{shipper.cargosPublished} publiées</div>
                    <div className="text-[11px] text-muted">{shipper.cargosActive} en cours</div>
                  </td>
                  <td className="py-4 px-5 whitespace-nowrap font-semibold text-ink">{shipper.joinedDate}</td>
                  <td className="py-4 px-5 whitespace-nowrap text-muted">{shipper.lastActivity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="p-4 px-6 border-t border-line text-xs text-muted">
          {rows.length} sur {shippers.length} fiches affichées
        </p>
      </div>
    </>
  );
}
