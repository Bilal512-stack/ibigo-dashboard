"use client";

import { useMemo, useState } from "react";
import { AnnouncementsBoard } from "@/components/operations/AnnouncementsBoard";
import { startOfDay } from "@/components/ui/DateRangePicker";
import { FilterTabs } from "@/components/ui/FilterControls";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { formatNumber } from "@/lib/format";
import { cargoAnnouncements } from "@/lib/mock-data/operations";
import { PAYMENTS_NOW } from "@/lib/mock-data/payments";

type Period = "1" | "7" | "30" | "all";

const PERIODS: { value: Period; label: string }[] = [
  { value: "1", label: "Aujourd'hui" },
  { value: "7", label: "7J" },
  { value: "30", label: "30J" },
  { value: "all", label: "Tout" },
];

const DAY_MS = 86_400_000;

function parseTons(tonnage: string): number {
  const match = tonnage.match(/(\d+(?:[.,]\d+)?)\s*T/i);
  return match ? Number(match[1].replace(",", ".")) : 0;
}

export function CargaisonsPage() {
  const [period, setPeriod] = useState<Period>("all");

  const filtered = useMemo(() => {
    if (period === "all") return cargoAnnouncements;
    const from =
      period === "1"
        ? startOfDay(new Date(PAYMENTS_NOW)).getTime()
        : PAYMENTS_NOW - Number(period) * DAY_MS;
    return cargoAnnouncements.filter((item) => item.timestamp >= from && item.timestamp <= PAYMENTS_NOW);
  }, [period]);

  const available = filtered.filter((item) => item.status === "Disponible").length;
  const concluded = filtered.filter((item) => item.status.startsWith("Conclu")).length;
  const totalTons = filtered.reduce((sum, item) => sum + parseTons(item.tonnage), 0);
  const availableTons = filtered
    .filter((item) => item.status === "Disponible")
    .reduce((sum, item) => sum + parseTons(item.tonnage), 0);
  const routesCount = new Set(filtered.map((item) => `${item.origin}-${item.destination}`)).size;
  const availableShare = filtered.length ? Math.round((available / filtered.length) * 100) : 0;

  return (
    <>
      <PageHeader
        breadcrumb={["Opérations", "Cargaisons"]}
        title="Cargaisons"
        description="Cargaisons publiées par les chargeurs sur la bourse de fret"
      >
        <FilterTabs tabs={PERIODS} active={period} onChange={setPeriod} />
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          label="DEMANDE FRET"
          value={formatNumber(filtered.length)}
          delta={`${available} dispo.`}
          tone="success"
          icon="box"
          subtext={`Cargaisons publiées • ${concluded} conclue${concluded > 1 ? "s" : ""}`}
        />
        <StatCard
          label="TONNAGE PUBLIÉ"
          value={`${formatNumber(totalTons)} T`}
          delta={`${availableShare} % actif`}
          tone="info"
          icon="shield"
          subtext={`${formatNumber(availableTons)} T encore disponibles`}
          progressPercent={availableShare}
          sparkColor="#4F6BED"
        />
        <StatCard
          label="AXES ACTIFS"
          value={formatNumber(routesCount)}
          delta="Corridors CEMAC"
          tone="neutral"
          icon="truck"
          subtext="Origines-destinations distinctes sur la période"
        />
      </div>

      <AnnouncementsBoard
        items={filtered}
        searchPlaceholder="ID, ville, chargeur, marchandise..."
        ownerLabel="Chargeur"
      />
    </>
  );
}
