import { PAYMENTS_NOW } from "@/lib/mock-data/payments";
import type { ReservedToken } from "@/types";

const HOUR_MS = 3_600_000;

export const reservedTokens: ReservedToken[] = [
  {
    id: "RES-2041",
    holderName: "Dieudonné Kotto",
    holderRole: "Chargeur",
    holderPhone: "+23672448031",
    counterpart: "Trans-Equateur SA",
    listing: "Fret cacao 18T",
    corridor: "Berbérati → Bangui Port",
    expiresAt: PAYMENTS_NOW - 3 * HOUR_MS,
  },
  {
    id: "RES-2038",
    holderName: "Mahamat Saleh",
    holderRole: "Transporteur",
    holderPhone: "+23566118742",
    counterpart: "Grands Moulins Bangui",
    listing: "Blé tendre vrac 25T",
    corridor: "Bangui → Kaga-Bandoro",
    expiresAt: PAYMENTS_NOW - 11 * HOUR_MS,
  },
  {
    id: "RES-2052",
    holderName: "Mamadou Doumbia",
    holderRole: "Transporteur",
    holderPhone: "+237677120954",
    counterpart: "Socatraf BTP",
    listing: "Ciment CPJ-45 30T",
    corridor: "Douala → N'Djamena",
    expiresAt: PAYMENTS_NOW + 14 * HOUR_MS,
  },
  {
    id: "RES-2057",
    holderName: "Samuel Ndiba",
    holderRole: "Chargeur",
    holderPhone: "+23767890123",
    counterpart: "NdoumExpress Douala",
    listing: "Plateau 35T",
    corridor: "Douala → Bangui",
    expiresAt: PAYMENTS_NOW + 31 * HOUR_MS,
  },
  {
    id: "RES-2060",
    holderName: "Brahim Oumar",
    holderRole: "Transporteur",
    holderPhone: "+23599204412",
    counterpart: "CotonTchad Agro",
    listing: "Coton fibre 30T",
    corridor: "Sarh → Douala",
    expiresAt: PAYMENTS_NOW + 44 * HOUR_MS,
  },
];
