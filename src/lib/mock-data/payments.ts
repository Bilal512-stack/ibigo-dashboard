import { OPERATORS_BY_COUNTRY, TOKEN_PACKS, TOKEN_PRICE_FCFA } from "@/lib/constants";
import { customersByCountry } from "@/lib/mock-data/overview";
import type { CountryCode, Payment, PaymentStatus } from "@/types";

/**
 * Historique de démonstration, généré de façon déterministe : les paiements réussis
 * totalisent exactement les jetons achetés par pays affichés sur la Vue d'ensemble.
 * À remplacer par l'API de paiement.
 */

/** Date de référence figée des données de démonstration. */
export const PAYMENTS_NOW = Date.UTC(2026, 10, 9, 10, 0);

const DAY_MS = 86_400_000;
const HISTORY_DAYS = 190;

const SUCCESSFUL_SALES: Record<string, number> = {
  pack_single: 160,
  pack_starter: 60,
  pack_standard: 40,
  pack_pro: 12,
  pack_enterprise: 8,
};

const IDENTITIES: Record<CountryCode, { first: string[]; last: string[]; phonePrefix: string }> = {
  CMR: {
    first: ["Samuel", "Jean-Paul", "Mireille", "Hervé", "Alain", "Clarisse", "Bertrand", "Sandrine"],
    last: ["Ndiba", "Ndoum", "Fotso", "Mbarga", "Tchoupo", "Essomba", "Nkeng", "Bello"],
    phonePrefix: "+2376",
  },
  RCA: {
    first: ["Faustin", "Christian", "Dieudonné", "Prisca", "Rodrigue", "Nadège", "Gervais", "Sylvain"],
    last: ["Damboucha", "Touadera", "Kotto", "Ngakoutou", "Yakoma", "Sango", "Mokpem", "Bangui-Kette"],
    phonePrefix: "+23672",
  },
  TCHAD: {
    first: ["Mahamat", "Brahim", "Ibrahim", "Achta", "Hassan", "Zara", "Oumar", "Khadija"],
    last: ["Idriss", "Oumar", "Saleh", "Abakar", "Djimet", "Hissein", "Moussa", "Tahir"],
    phonePrefix: "+23566",
  },
};

function createRandom(seed: number) {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let mixed = Math.imul(state ^ (state >>> 15), 1 | state);
    mixed = (mixed + Math.imul(mixed ^ (mixed >>> 7), 61 | mixed)) ^ mixed;
    return ((mixed ^ (mixed >>> 14)) >>> 0) / 4_294_967_296;
  };
}

const random = createRandom(20261109);
const pick = <T,>(items: T[]): T => items[Math.floor(random() * items.length)];

function createPayment(
  country: CountryCode,
  pack: (typeof TOKEN_PACKS)[number],
  status: PaymentStatus,
): Omit<Payment, "id"> {
  const identity = IDENTITIES[country];
  const phoneDigits = String(Math.floor(random() * 90_000_000) + 10_000_000);
  const age = status === "En attente" ? random() * 3 : random() ** 1.5 * HISTORY_DAYS;
  return {
    timestamp: PAYMENTS_NOW - Math.floor(age * DAY_MS),
    payerName: `${pick(identity.first)} ${pick(identity.last)}`,
    payerRole: random() < 0.6 ? "Transporteur" : "Chargeur",
    payerPhone: `${identity.phonePrefix}${phoneDigits.slice(0, 12 - identity.phonePrefix.length)}`,
    operator: pick(OPERATORS_BY_COUNTRY[country]),
    country,
    packName: pack.name,
    tokens: pack.tokenCount,
    amountFcfa: pack.tokenCount * TOKEN_PRICE_FCFA,
    status,
  };
}

function generatePayments(): Payment[] {
  const remaining = new Map(customersByCountry.map((c) => [c.code, c.tokensPurchased]));
  const generated: Omit<Payment, "id">[] = [];

  // Les plus gros packs d'abord, attribués au pays le plus loin de son total.
  for (const pack of [...TOKEN_PACKS].sort((a, b) => b.tokenCount - a.tokenCount)) {
    for (let sale = 0; sale < SUCCESSFUL_SALES[pack.id]; sale += 1) {
      const [country, tokensLeft] = [...remaining].sort((a, b) => b[1] - a[1])[0];
      remaining.set(country, tokensLeft - pack.tokenCount);
      generated.push(createPayment(country, pack, "Réussi"));
    }
  }

  const countries = customersByCountry.map((c) => c.code);
  const smallPacks = TOKEN_PACKS.slice(0, 3);
  for (let index = 0; index < 12; index += 1) {
    generated.push(createPayment(pick(countries), pick(smallPacks), "En attente"));
  }
  for (let index = 0; index < 34; index += 1) {
    generated.push(createPayment(pick(countries), pick(smallPacks), "Échoué"));
  }

  return generated
    .sort((a, b) => a.timestamp - b.timestamp)
    .map((payment, index) => ({ ...payment, id: `PAY-${String(index + 10001)}` }))
    .reverse();
}

export const payments: Payment[] = generatePayments();
