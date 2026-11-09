export type StatusTone = "success" | "warning" | "danger" | "info" | "neutral";

export type AdminRole = "super_admin" | "admin";

export type CountryCode = "CMR" | "RCA" | "TCHAD";

export interface CountryStat {
  code: CountryCode;
  name: string;
  flag: string;
  carriersCount: number;
  shippersCount: number;
  tokensPurchased: number;
}

export interface CarrierDocument {
  id: string;
  carrierName: string;
  company: string;
  carrierAvatar: string;
  phone: string;
  country: CountryCode;
  countryFlag: string;
  documentType: string;
  documentCategory: "Identité" | "Véhicule" | "Assurance" | "Agrément Fiscal";
  documentNumber: string;
  uploadedDate: string;
  expiryDate: string;
  fileSize: string;
  fileUrl?: string;
  status: "En attente" | "En cours d'analyse" | "Validé" | "Rejeté" | "Expiré";
  statusTone: StatusTone;
  riskScore: "Faible" | "Moyen" | "Critique";
  matchNotes: string;
  previewImage?: string;
}

export interface KycDocument {
  name: string;
  verified: boolean;
  alert?: boolean;
}

export type VerificationStatus = "pending" | "incomplete" | "verified" | "rejected" | "suspended";

interface PlatformUser {
  id: string;
  initials: string;
  name: string;
  company: string;
  phone: string;
  country: CountryCode;
  countryFlag: string;
  countryLabel: string;
  tokensAvailable: number;
  tokensReserved: number;
}

export interface Carrier extends PlatformUser {
  kind: "Transporteur Flotte" | "Chauffeur Indépendant";
  trucks: number;
  documents: KycDocument[];
  submissionDate: string;
  verification: VerificationStatus;
}

export interface Shipper extends PlatformUser {
  segment: "Chargeur B2B" | "Chargeur Particulier";
  cargosPublished: number;
  cargosActive: number;
  joinedDate: string;
  lastActivity: string;
}

export interface Announcement {
  id: string;
  type: string;
  isCargo: boolean;
  timeAgo: string;
  origin: string;
  destination: string;
  distance: string;
  via: string;
  tonnage: string;
  details: string;
  owner: string;
  ownerSub: string;
  createdDate: string;
  expiry: string;
  status: string;
  statusTone: StatusTone;
}

export interface Mission {
  id: string;
  cargo: string;
  carrier: string;
  shipper: string;
  origin: string;
  destination: string;
  agreedDate: string;
  closedDate: string;
  tokensUsed: number;
  status: "Livrée" | "Avis en attente" | "Rompue";
  statusTone: StatusTone;
  rating?: number;
}

export type PaymentOperator = "Orange Money" | "MTN MoMo" | "Airtel Money" | "Moov Money";

export type PaymentStatus = "Réussi" | "En attente" | "Échoué";

export interface Payment {
  id: string;
  /** Horodatage en millisecondes (UTC). */
  timestamp: number;
  payerName: string;
  payerRole: "Transporteur" | "Chargeur";
  payerPhone: string;
  operator: PaymentOperator;
  country: CountryCode;
  packName: string;
  tokens: number;
  amountFcfa: number;
  status: PaymentStatus;
}

export interface ReservedToken {
  id: string;
  holderName: string;
  holderRole: "Transporteur" | "Chargeur";
  holderPhone: string;
  counterpart: string;
  listing: string;
  corridor: string;
  /** Fin du délai de 48 h, en millisecondes (UTC). */
  expiresAt: number;
}
