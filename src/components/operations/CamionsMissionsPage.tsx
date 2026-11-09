"use client";

import { useState } from "react";
import { AnnouncementsBoard } from "@/components/operations/AnnouncementsBoard";
import { EmptyRow, FilterTabs, SearchInput, matchesSearch } from "@/components/ui/FilterControls";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { StatusPill } from "@/components/ui/StatusPill";
import { TOKEN_PRICE_FCFA } from "@/lib/constants";
import { formatFcfa, formatNumber } from "@/lib/format";
import { missions, truckAnnouncements } from "@/lib/mock-data/operations";
import type { Mission } from "@/types";

type MissionFilter = "all" | Mission["status"];

const availableTrucks = truckAnnouncements.filter((truck) => truck.status === "Disponible").length;
const delivered = missions.filter((mission) => mission.status === "Livrée").length;
const rated = missions.filter((mission) => mission.rating !== undefined);
const averageRating = rated.reduce((sum, mission) => sum + (mission.rating ?? 0), 0) / rated.length;
const tokensUsed = missions.reduce((sum, mission) => sum + mission.tokensUsed, 0);

const statuses: Mission["status"][] = ["Livrée", "Avis en attente", "Rompue"];

export function CamionsMissionsPage() {
  const [filter, setFilter] = useState<MissionFilter>("all");
  const [search, setSearch] = useState("");

  const tabs = [
    { value: "all" as MissionFilter, label: "Toutes", count: missions.length },
    ...statuses.map((status) => ({
      value: status as MissionFilter,
      label: status,
      count: missions.filter((mission) => mission.status === status).length,
    })),
  ];

  const rows = missions.filter(
    (mission) =>
      (filter === "all" || mission.status === filter) &&
      matchesSearch(search, [mission.id, mission.carrier, mission.shipper, mission.origin, mission.destination]),
  );

  return (
    <>
      <PageHeader
        breadcrumb={["Opérations", "Camions & Missions"]}
        title="Camions disponibles & Missions effectuées"
        description="Offre de camions sur la bourse et historique des accords conclus"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Camions disponibles" value={formatNumber(availableTrucks)} icon="truck" subtext="Annonces ouvertes" />
        <StatCard label="Missions livrées" value={formatNumber(delivered)} icon="shield" subtext={`Sur ${missions.length} accords`} />
        <StatCard label="Note moyenne" value={`${averageRating.toFixed(1).replace(".", ",")} / 5`} icon="users" subtext={`${rated.length} avis chargeurs`} />
        <StatCard label="Jetons consommés" value={formatNumber(tokensUsed)} icon="gift" subtext={formatFcfa(tokensUsed * TOKEN_PRICE_FCFA)} />
      </div>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-ink">Camions disponibles</h2>
        <AnnouncementsBoard
          items={truckAnnouncements}
          initialFilter="Disponible"
          searchPlaceholder="ID, ville, transporteur..."
          ownerLabel="Transporteur"
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-ink">Missions effectuées</h2>
        <div className="bg-surface border border-line rounded-card overflow-hidden shadow-card">
          <div className="p-4 px-6 border-b border-line flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <FilterTabs tabs={tabs} active={filter} onChange={setFilter} />
            <SearchInput value={search} onChange={setSearch} placeholder="ID, ville, transporteur, chargeur..." />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[960px]">
              <thead>
                <tr className="bg-dark-card text-white font-semibold">
                  <th scope="col" className="py-3.5 px-5">Mission</th>
                  <th scope="col" className="py-3.5 px-5">Trajet</th>
                  <th scope="col" className="py-3.5 px-5">Transporteur / Chargeur</th>
                  <th scope="col" className="py-3.5 px-5">Accord → Clôture</th>
                  <th scope="col" className="py-3.5 px-5 text-right">Mise en relation</th>
                  <th scope="col" className="py-3.5 px-5 text-right">Note</th>
                  <th scope="col" className="py-3.5 px-5">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/70">
                {rows.length === 0 && <EmptyRow colSpan={7} label="Aucune mission pour ces filtres." />}
                {rows.map((mission) => (
                  <tr key={mission.id} className="hover:bg-sand/70 transition-colors">
                    <td className="py-4 px-5 whitespace-nowrap">
                      <div className="font-bold text-ink">{mission.id}</div>
                      <div className="text-[11px] text-muted">{mission.cargo}</div>
                    </td>
                    <td className="py-4 px-5 whitespace-nowrap font-bold text-ink">
                      {mission.origin} <span className="text-accent">→</span> {mission.destination}
                    </td>
                    <td className="py-4 px-5">
                      <div className="font-bold text-ink">{mission.carrier}</div>
                      <div className="text-[11px] text-muted">{mission.shipper}</div>
                    </td>
                    <td className="py-4 px-5 whitespace-nowrap text-ink">
                      {mission.agreedDate} → {mission.closedDate}
                    </td>
                    <td className="py-4 px-5 text-right whitespace-nowrap">
                      <div className="font-bold text-ink tabular-nums">{formatFcfa(mission.tokensUsed * TOKEN_PRICE_FCFA)}</div>
                      <div className="text-[11px] text-muted">{mission.tokensUsed} jetons</div>
                    </td>
                    <td className="py-4 px-5 text-right whitespace-nowrap font-bold text-ink tabular-nums">
                      {mission.rating ? `${mission.rating} / 5` : "—"}
                    </td>
                    <td className="py-4 px-5 whitespace-nowrap">
                      <StatusPill label={mission.status} tone={mission.statusTone} size="sm" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
