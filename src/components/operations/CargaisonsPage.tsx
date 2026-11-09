import { AnnouncementsBoard } from "@/components/operations/AnnouncementsBoard";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { announcementsStats, cargoAnnouncements } from "@/lib/mock-data/operations";

const [demand, , matching, velocity] = announcementsStats;

export function CargaisonsPage() {
  return (
    <>
      <PageHeader
        breadcrumb={["Opérations", "Cargaisons"]}
        title="Cargaisons"
        description="Cargaisons publiées par les chargeurs sur la bourse de fret"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard {...demand} icon="box" subtext={demand.subtitle} />
        <StatCard {...matching} icon="shield" subtext={matching.subtitle} progressPercent={78} />
        <StatCard {...velocity} icon="truck" subtext={velocity.subtitle} />
      </div>

      <AnnouncementsBoard
        items={cargoAnnouncements}
        searchPlaceholder="ID, ville, chargeur, marchandise..."
        ownerLabel="Chargeur"
      />
    </>
  );
}
