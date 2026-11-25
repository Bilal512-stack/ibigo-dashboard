import { PAYMENTS_NOW } from "@/lib/mock-data/payments";
import type { StatusTone } from "@/types";

/** Date de référence utilisée pour l'ensemble des données de démo. */
const NOW = PAYMENTS_NOW; // ms UTC

/** Crée un timestamp ms à `hoursAgo` heures avant NOW. */
function hAgo(hoursAgo: number) {
  return NOW - hoursAgo * 3_600_000;
}

/** Format court pour l'affichage dans la table (ex: "Aujourd'hui, 11:42"). */
function fmtTs(ms: number): string {
  const d = new Date(ms);
  const ref = new Date(NOW);
  const refDate = new Date(ref.getFullYear(), ref.getMonth(), ref.getDate()).getTime();
  const dDate = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const diffDays = Math.round((refDate - dDate) / 86_400_000);
  const hhmm = d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
  if (diffDays === 0) return `Aujourd'hui, ${hhmm}`;
  if (diffDays === 1) return `Hier, ${hhmm}`;
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short" }) + `, ${hhmm}`;
}

export interface AuditEvent {
  ts: number;
  timestamp: string;
  type: string;
  typeAlert?: boolean;
  entity: string;
  entitySub: string;
  corridor: string;
  status: string;
  tone: StatusTone;
  action: string;
  actionHighlight?: boolean;
}

function mkEvent(
  hoursAgo: number,
  rest: Omit<AuditEvent, "ts" | "timestamp">,
): AuditEvent {
  const ts = hAgo(hoursAgo);
  return { ts, timestamp: fmtTs(ts), ...rest };
}

export const auditEventsAll: AuditEvent[] = [
  mkEvent(0.3, {
    type: "Validation déblocage",
    entity: "Trans-Logistics Bangui SARL",
    entitySub: "(Escrow #KP-8921)",
    corridor: "Bangui → Sibut (RN1)",
    status: "Succès",
    tone: "success",
    action: "Détails",
  }),
  mkEvent(1.75, {
    type: "Nouveau dossier transporteur",
    entity: "Ets Mahamat & Frères",
    entitySub: "(N'Djamena)",
    corridor: "Corridor Global CEMAC",
    status: "KYC en attente",
    tone: "warning",
    action: "Vérifier",
    actionHighlight: true,
  }),
  mkEvent(2.53, {
    type: "Alerte litige prix signalé",
    typeAlert: true,
    entity: "Fret Coton Sarh - Lot #4028",
    entitySub: "(Chargeur: Cotontchad)",
    corridor: "Sarh → N'Djamena (RN2)",
    status: "Priorité Haute",
    tone: "danger",
    action: "Médiation",
  }),
  mkEvent(3.17, {
    type: "Passage frontière Sarh",
    entity: "Convoi #CV-104 (5 Camions Remorques)",
    entitySub: "",
    corridor: "Poste Frontière Tchad-RCA",
    status: "Tamponné Douane",
    tone: "info",
    action: "Bordereau",
  }),
  mkEvent(10.33, {
    type: "Balise GPS reconnectée",
    entity: "Véhicule TR-884-RCA",
    entitySub: "(Chauffeur: A. Touadera)",
    corridor: "Tronçon Kaga-Bandoro",
    status: "Signal Rétabli",
    tone: "neutral",
    action: "Trajectoire",
  }),
  mkEvent(26, {
    type: "Paiement reçu",
    entity: "Samuel Ndiba",
    entitySub: "(Pack Standard – 100 jetons)",
    corridor: "Cameroun / Douala",
    status: "Réussi",
    tone: "success",
    action: "Reçu",
  }),
  mkEvent(30, {
    type: "Contrôle KYC validé",
    entity: "Faustin Damboucha",
    entitySub: "(Chauffeur – RCA)",
    corridor: "Corridor Bangui-Moundou",
    status: "Approuvé",
    tone: "success",
    action: "Dossier",
  }),
  mkEvent(48, {
    type: "Mission démarrée",
    entity: "Convoi #CV-99 (3 camions)",
    entitySub: "(Chargeur: AgroTchad)",
    corridor: "N'Djamena → Sarh (RN2)",
    status: "En route",
    tone: "info",
    action: "Suivi GPS",
  }),
  mkEvent(72, {
    type: "Paiement échoué",
    entity: "Ibrahim Oumar",
    entitySub: "(Pack Starter – 20 jetons)",
    corridor: "Tchad / N'Djamena",
    status: "Échoué",
    tone: "danger",
    action: "Réessayer",
  }),
  mkEvent(96, {
    type: "Litige résolu",
    entity: "Fret Bétail Lot #3301",
    entitySub: "(Transporteur: Convoi-RCA)",
    corridor: "Bouar → Baboua (RN6)",
    status: "Clôturé",
    tone: "success",
    action: "Rapport",
  }),
];
