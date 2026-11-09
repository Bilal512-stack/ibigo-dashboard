import type {
  AdminRole,
  CountryCode,
  PaymentOperator,
  PaymentStatus,
  StatusTone,
  VerificationStatus,
} from "@/types";

/** Prix fixe d'un jeton, identique à TOKEN_PRICE_CFA dans l'application mobile. */
export const TOKEN_PRICE_FCFA = 50_000;

/** Packs identiques à TOKEN_PACKS de l'application mobile. */
export const TOKEN_PACKS = [
  { id: "pack_single", name: "Jeton à l'unité", tokenCount: 1 },
  { id: "pack_starter", name: "Pack Découverte", tokenCount: 5 },
  { id: "pack_standard", name: "Pack Standard", tokenCount: 15 },
  { id: "pack_pro", name: "Pack Flotte Pro", tokenCount: 35 },
  { id: "pack_enterprise", name: "Pack Grand Compte", tokenCount: 100 },
];

/** Opérateurs et couleurs de marque repris de l'écran portefeuille mobile. */
export const OPERATOR_COLORS: Record<PaymentOperator, string> = {
  "Orange Money": "#FF6600",
  "MTN MoMo": "#EAB308",
  "Airtel Money": "#E40000",
  "Moov Money": "#0A6EBD",
};

export const OPERATORS_BY_COUNTRY: Record<CountryCode, PaymentOperator[]> = {
  CMR: ["Orange Money", "MTN MoMo"],
  RCA: ["Orange Money", "Moov Money"],
  TCHAD: ["Airtel Money", "Moov Money"],
};

export const PAYMENT_STATUS_TONES: Record<PaymentStatus, StatusTone> = {
  Réussi: "success",
  "En attente": "warning",
  Échoué: "danger",
};

export const ADMIN_ROLE_LABELS: Record<AdminRole, string> = {
  super_admin: "Super Admin",
  admin: "Admin",
};

export const COUNTRY_OPTIONS: { code: CountryCode; label: string }[] = [
  { code: "CMR", label: "Cameroun" },
  { code: "RCA", label: "Centrafrique" },
  { code: "TCHAD", label: "Tchad" },
];

export const VERIFICATION_META: Record<VerificationStatus, { label: string; tone: StatusTone }> = {
  pending: { label: "En attente d'audit", tone: "warning" },
  incomplete: { label: "Incomplet", tone: "danger" },
  verified: { label: "Vérifié", tone: "success" },
  rejected: { label: "Rejeté", tone: "danger" },
  suspended: { label: "Suspendu", tone: "neutral" },
};
