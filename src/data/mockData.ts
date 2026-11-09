export type StatusTone = "success" | "warning" | "danger" | "info" | "neutral";

// ==========================================
// 1. TABLEAU DE BORD GLOBAL (Overview)
// ==========================================

export const overviewStats = [
  {
    label: "Cargaisons Actives",
    value: "142",
    delta: "+12%",
    tone: "success" as StatusTone,
    icon: "box",
    subtext: "cette semaine sur l'axe Bangui-Moundou",
  },
  {
    label: "Camions en Rotation",
    value: "86",
    delta: "FLOTTE ACTIVE",
    tone: "neutral" as StatusTone,
    icon: "truck",
    subtext: "42 semis lourds, 44 porteurs bâchés",
  },
  {
    label: "Missions Sécurisées",
    value: "1,280",
    delta: "99.4%",
    tone: "success" as StatusTone,
    icon: "shield",
    subtext: "convois tracés et déchargés sans litige",
  },
  {
    label: "Vérifications KYC",
    value: "14",
    delta: "En attente",
    tone: "warning" as StatusTone,
    icon: "users",
    subtext: "8 transporteurs tchadiens, 6 centrafricains",
  },
];

// ==========================================
// CUSTOMER BY COUNTRIES (CMR • RCA • TCHAD)
// Style Isomorphic Furyroad CRM
// ==========================================

export interface CountryStat {
  code: string;
  name: string;
  flag: string;
  sharePercent: number;
  totalActors: number;
  carriersCount: number;
  shippersCount: number;
  volumeTonnage: string;
  growth: string;
  primaryHub: string;
  status: "Optimisé" | "En tension" | "En croissance";
  statusColor: string;
}

export const customersByCountry: CountryStat[] = [
  {
    code: "CMR",
    name: "Cameroun",
    flag: "🇨🇲",
    sharePercent: 48,
    totalActors: 412,
    carriersCount: 248,
    shippersCount: 164,
    volumeTonnage: "4 820 T / sem.",
    growth: "+14.2%",
    primaryHub: "Port de Douala • Axe Yaoundé-Garoua",
    status: "Optimisé",
    statusColor: "#2E7D32",
  },
  {
    code: "RCA",
    name: "Centrafrique",
    flag: "🇨🇫",
    sharePercent: 34,
    totalActors: 286,
    carriersCount: 172,
    shippersCount: 114,
    volumeTonnage: "3 140 T / sem.",
    growth: "+8.7%",
    primaryHub: "Hub Bangui (PK12) • Axe Sibut-Damara",
    status: "En croissance",
    statusColor: "#FD4F49",
  },
  {
    code: "TCHAD",
    name: "Tchad",
    flag: "🇹🇩",
    sharePercent: 18,
    totalActors: 144,
    carriersCount: 92,
    shippersCount: 52,
    volumeTonnage: "1 890 T / sem.",
    growth: "+11.5%",
    primaryHub: "N'Djamena (Farcha) • Douane Sarh",
    status: "En tension",
    statusColor: "#F57C00",
  },
];

// ==========================================
// DOCUMENTS TRANSPORTEURS EN ATTENTE D'ANALYSE
// ==========================================

export interface CarrierDocument {
  id: string;
  carrierName: string;
  company: string;
  carrierAvatar: string;
  phone: string;
  country: "CMR" | "RCA" | "TCHAD";
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

export const carrierDocumentsQueue: CarrierDocument[] = [
  {
    id: "DOC-2024-891",
    carrierName: "Mahamat Idriss Al-Hadj",
    company: "Trans-Sahel Express (18 camions)",
    carrierAvatar: "MI",
    phone: "+23566183321",
    country: "TCHAD",
    countryFlag: "🇹🇩",
    documentType: "Carte Grise CEMAC & Jauge Essieu",
    documentCategory: "Véhicule",
    documentNumber: "CG-TCD-4820-BG",
    uploadedDate: "Aujourd'hui, 11:20 UTC",
    expiryDate: "14/09/2028",
    fileSize: "2.4 MB (PDF Haute Résolution)",
    status: "En cours d'analyse",
    statusTone: "warning",
    riskScore: "Faible",
    matchNotes: "Plaque RC 4820-BG conforme au châssis Volvo FH16. Attestation CEMAC vérifiée.",
  },
  {
    id: "DOC-2024-892",
    carrierName: "Faustin Damboucha",
    company: "Transport Indépendant Semi-Mercedes",
    carrierAvatar: "FD",
    phone: "+23675449810",
    country: "RCA",
    countryFlag: "🇨🇫",
    documentType: "Assurance Inter-États Carte Rose",
    documentCategory: "Assurance",
    documentNumber: "CR-CEMAC-88901",
    uploadedDate: "Aujourd'hui, 09:15 UTC",
    expiryDate: "20/10/2024 (Expiré)",
    fileSize: "1.8 MB (Photo numérisée)",
    status: "En attente",
    statusTone: "danger",
    riskScore: "Critique",
    matchNotes: "Quittance de paiement expirée depuis 9 jours. Absence de cachet humide de la compagnie Sanlam.",
  },
  {
    id: "DOC-2024-893",
    carrierName: "Samuel Ndiba",
    company: "CamTrans Inter-Corridor SARL",
    carrierAvatar: "SN",
    phone: "+23767890123",
    country: "CMR",
    countryFlag: "🇨🇲",
    documentType: "Agrément Transporteur TIPAC & Fret Lourd",
    documentCategory: "Agrément Fiscal",
    documentNumber: "TIPAC-DLA-2024-992",
    uploadedDate: "Hier, 16:40 UTC",
    expiryDate: "31/12/2026",
    fileSize: "3.1 MB (Document Scanné Officiel)",
    status: "En attente",
    statusTone: "warning",
    riskScore: "Faible",
    matchNotes: "Licence internationale valide pour corridors Cameroun-RCA et Cameroun-Tchad.",
  },
  {
    id: "DOC-2024-894",
    carrierName: "Brahim Oumar",
    company: "Logone Trans & Transit (7 citernes)",
    carrierAvatar: "BO",
    phone: "+23599204412",
    country: "TCHAD",
    countryFlag: "🇹🇩",
    documentType: "Autorisation Spéciale TMD Hydrocarbures",
    documentCategory: "Véhicule",
    documentNumber: "TMD-NDJ-55102",
    uploadedDate: "Hier, 14:10 UTC",
    expiryDate: "18/06/2025",
    fileSize: "4.2 MB (Dossier Technique)",
    status: "Validé",
    statusTone: "success",
    riskScore: "Faible",
    matchNotes: "Contrôle d'étanchéité citerne certifié conforme aux normes de sécurité corridor pétrolier.",
  },
  {
    id: "DOC-2024-895",
    carrierName: "Christian Touadera",
    company: "Flotte Plateau Centrafrique",
    carrierAvatar: "CT",
    phone: "+23672311988",
    country: "RCA",
    countryFlag: "🇨🇫",
    documentType: "Permis Conduire Poids Lourd Cat. C/E",
    documentCategory: "Identité",
    documentNumber: "PL-RCA-2019-3312",
    uploadedDate: "Hier, 10:05 UTC",
    expiryDate: "12/03/2029",
    fileSize: "1.2 MB (Carte Plastifiée Recto/Verso)",
    status: "Validé",
    statusTone: "success",
    riskScore: "Faible",
    matchNotes: "Numéro de permis vérifié auprès de la Direction des Transports Terrestres de Bangui.",
  },
  {
    id: "DOC-2024-896",
    carrierName: "Jean-Paul Ndoum",
    company: "NdoumExpress Douala",
    carrierAvatar: "JN",
    phone: "+237699441122",
    country: "CMR",
    countryFlag: "🇨🇲",
    documentType: "Visite Technique & Contrôle Polluant CEMAC",
    documentCategory: "Véhicule",
    documentNumber: "VT-CMR-778810",
    uploadedDate: "27 Oct 2024",
    expiryDate: "15/11/2024",
    fileSize: "2.0 MB (Rapport d'expertise)",
    status: "En attente",
    statusTone: "warning",
    riskScore: "Moyen",
    matchNotes: "Validité arrive à échéance sous 18 jours. Avertissement automatique envoyé.",
  },
];

export const weeklyFreightFlow = [
  { day: "Lun", rn1: 42, rn2: 30 },
  { day: "Mar", rn1: 68, rn2: 45, annotation: "Pic Pesée Sibut (840T)" },
  { day: "Mer", rn1: 52, rn2: 38 },
  { day: "Jeu", rn1: 85, rn2: 58, annotation: "Pic Sarh Douane (920T)" },
  { day: "Ven", rn1: 64, rn2: 48 },
  { day: "Sam", rn1: 48, rn2: 35 },
  { day: "Dim", rn1: 32, rn2: 24 },
];

export const corridorCities = [
  { name: "Bangui (PK0)", highlight: false },
  { name: "Damara", highlight: false },
  { name: "Sibut (PK186)", highlight: true },
  { name: "Kaga-Bandoro", highlight: false },
  { name: "Sarh (PK710)", highlight: true },
  { name: "Guelendeng", highlight: false },
  { name: "N'Djamena (PK1240)", highlight: false },
];

export const keyCheckpoints = [
  {
    name: "Beloko (Frontière RCA/Cameroun)",
    status: "Fluide",
    tone: "success" as StatusTone,
    description: "Transit fluide • Temps d'attente estimé : 45 min",
  },
  {
    name: "Poste de Pesée Sibut",
    status: "Normale",
    tone: "success" as StatusTone,
    description: "Bascule opérationnelle • 14 convois en file",
  },
  {
    name: "Touboro / Sarh (RCA-Tchad)",
    status: "Ouverte",
    tone: "success" as StatusTone,
    description: "Poste frontière ouvert • Escortes douanières prêtes",
  },
  {
    name: "Déviation Pont de Moundou",
    status: "Vigilance",
    tone: "warning" as StatusTone,
    description: "Ralentissement travaux RN2 • Gabarit limité 40T",
  },
];

export const auditEvents = [
  {
    timestamp: "Aujourd'hui, 11:42",
    type: "Validation déblocage",
    entity: "Trans-Logistics Bangui SARL",
    entitySub: "(Escrow #KP-8921)",
    corridor: "Bangui → Sibut (RN1)",
    status: "Succès(Normal)",
    tone: "success" as StatusTone,
    action: "Détails",
  },
  {
    timestamp: "Aujourd'hui, 10:15",
    type: "Nouveau dossier transporteur",
    entity: "Ets Mahamat & Frères",
    entitySub: "(N'Djamena)",
    corridor: "Corridor Global CEMAC",
    status: "KYC en attente",
    tone: "warning" as StatusTone,
    action: "Vérifier",
    actionHighlight: true,
  },
  {
    timestamp: "Aujourd'hui, 09:28",
    type: "Alerte litige prix signalé",
    typeAlert: true,
    entity: "Fret Coton Sarh - Lot #4028",
    entitySub: "(Chargeur: Cotontchad)",
    corridor: "Sarh → N'Djamena (RN2)",
    status: "Priorité Haute",
    tone: "danger" as StatusTone,
    action: "Médiation",
  },
  {
    timestamp: "Aujourd'hui, 08:50",
    type: "Passage frontière Sarh",
    entity: "Convoi #CV-104 (5 Camions Remorques)",
    entitySub: "",
    corridor: "Poste Frontière Tchad-RCA",
    status: "Tamponné Douane",
    tone: "info" as StatusTone,
    action: "Bordereau",
  },
  {
    timestamp: "Hier, 23:40",
    type: "Balise GPS reconnectée",
    entity: "Véhicule TR-884-RCA",
    entitySub: "(Chauffeur: A. Touadera)",
    corridor: "Tronçon Kaga-Bandoro",
    status: "Signal Rétabli",
    tone: "neutral" as StatusTone,
    action: "Trajectoire",
  },
];

// ==========================================
// 2. GESTION DES UTILISATEURS & KYC
// ==========================================

export interface KycDocument {
  name: string;
  verified: boolean;
  alert?: boolean;
}

export interface KycUser {
  initials: string;
  name: string;
  company: string;
  phone: string;
  countryFlag: string;
  countryLabel: string;
  tokensAvailable: number;
  tokensReserved: number;
  role: string;
  documents: KycDocument[];
  submissionDate: string;
  status: string;
  statusTone: StatusTone;
  canValidate?: boolean;
  certified?: boolean;
  active?: boolean;
}

export const activitySeries = [42, 54, 46, 68, 60, 76, 82, 88, 90, 74, 82, 96];

export const mapPins = [
  { name: "Bangui", lat: 4.3612, lng: 18.555 },
  { name: "Sarh", lat: 9.1429, lng: 18.3923 },
  { name: "N'Djamena", lat: 12.1348, lng: 15.0557 },
  { name: "Douala", lat: 4.0511, lng: 9.7679 },
];

export const kycUsers: KycUser[] = [
  {
    initials: "JN",
    name: "Jean-Paul Ngakoutou",
    company: "Socatraf BTP & Logistique",
    phone: "+23670123456",
    countryFlag: "🇨🇫",
    countryLabel: "Bangui (PK12)",
    tokensAvailable: 5,
    tokensReserved: 1,
    role: "Chargeur B2B",
    documents: [
      { name: "CNI biométrique", verified: true },
      { name: "Agrément TIPAC", verified: true },
      { name: "Registre RCCM", verified: true },
    ],
    submissionDate: "Aujourd'hui 09:40 UTC",
    status: "En attente d'audit",
    statusTone: "warning" as StatusTone,
    canValidate: true,
  },
  {
    initials: "MI",
    name: "Mahamat Idriss Al-Hadj",
    company: "Trans-Sahel Express (18 camions)",
    phone: "+23566183321",
    countryFlag: "🇹🇩",
    countryLabel: "N'Djamena (Farcha)",
    tokensAvailable: 14,
    tokensReserved: 0,
    role: "Transporteur Flotte",
    documents: [
      { name: "CNI Tchad", verified: true },
      { name: "Carte grise CEMAC", verified: true },
      { name: "Permis lourd", verified: true },
    ],
    submissionDate: "Hier 16:15 UTC",
    status: "En attente d'audit",
    statusTone: "warning" as StatusTone,
    canValidate: true,
  },
  {
    initials: "FD",
    name: "Faustin Damboucha",
    company: "Indépendant (Semi-remorque Mercedes)",
    phone: "+23675449810",
    countryFlag: "🇨🇫",
    countryLabel: "Bossangoa / Kaga-Bandoro",
    tokensAvailable: 2,
    tokensReserved: 0,
    role: "Chauffeur Indépendant",
    documents: [
      { name: "CNI biométrique", verified: true },
      { name: "Permis lourd", verified: true },
      { name: "Assurance expirée", verified: false, alert: true },
    ],
    submissionDate: "Hier 11:05 UTC",
    status: "Incomplet",
    statusTone: "danger" as StatusTone,
    canValidate: false,
  },
  {
    initials: "SN",
    name: "Samuel Ndiba",
    company: "CamTrans Inter-Corridor SARL",
    phone: "+23767890123",
    countryFlag: "🇨🇲",
    countryLabel: "Douala / Garoua - Boulaï",
    tokensAvailable: 8,
    tokensReserved: 2,
    role: "Chargeur B2B",
    documents: [
      { name: "Passeport CEMAC", verified: true },
      { name: "Agrément TIPAC", verified: true },
      { name: "Attestation Fiscale", verified: true },
    ],
    submissionDate: "22 Oct 2024 18:40 UTC",
    status: "Validé",
    statusTone: "success" as StatusTone,
    certified: true,
  },
  {
    initials: "BO",
    name: "Brahim Oumar",
    company: "Logone Trans & Transit (7 citernes)",
    phone: "+23599204412",
    countryFlag: "🇹🇩",
    countryLabel: "Moundou / Sarh",
    tokensAvailable: 2,
    tokensReserved: 0,
    role: "Transporteur Flotte",
    documents: [
      { name: "CNI biométrique", verified: true },
      { name: "Carte grise CEMAC", verified: true },
      { name: "Autorisation hydrocarbure", verified: true },
    ],
    submissionDate: "21 Oct 2024 14:10 UTC",
    status: "En attente d'audit",
    statusTone: "warning" as StatusTone,
    canValidate: true,
  },
  {
    initials: "CT",
    name: "Christian Touadera",
    company: "Transporteur Plateau RCA",
    phone: "+23672311988",
    countryFlag: "🇨🇫",
    countryLabel: "Bimbo / Mbaïki",
    tokensAvailable: 32,
    tokensReserved: 4,
    role: "Chauffeur Indépendant",
    documents: [
      { name: "CNI biométrique", verified: true },
      { name: "Permis lourd", verified: true },
    ],
    submissionDate: "20 Oct 2024 08:22 UTC",
    status: "Validé",
    statusTone: "success" as StatusTone,
    active: true,
  },
];

// ==========================================
// 3. GESTION DES JETONS & MISES EN RELATION
// ==========================================

export const tokenStats = [
  {
    title: "DOTATIONS CRÉATION",
    value: "4 210",
    subtitle: "Jetons Gratuits Distribués",
    tagline: "5 jetons offerts par nouveau compte créé",
    statRight: "842 inscrits",
    icon: "gift",
  },
  {
    title: "EN COURS DE NÉGOCIATION",
    value: "74",
    subtitle: "Jetons Actuellement Réservés",
    tagline: "En attente d'acceptation par l'autre partie",
    statRight: "37 pourparlers",
    icon: "lock",
  },
  {
    title: "MISES EN RELATION RÉUSSIES",
    value: "2 480",
    subtitle: "Jetons Définitivement Utilisés",
    tagline: "Discussions ouvertes et accords bilatéraux conclus",
    statRight: "1 240 contrats",
    icon: "handshake",
  },
];

export const tokenRequests = [
  {
    id: "TR-01",
    initiator: {
      name: "Mamadou Doumbia",
      role: "Transporteur",
      tokens: "Solde: 4 jetons",
    },
    target: {
      name: "Socatraf BTP",
      role: "Chargeur",
      tokens: "Solde: 12 jetons",
      initials: "SB",
    },
    announcement: {
      tag: "FRET / CARGO",
      title: "30T Ciment CPJ-45",
      corridor: "Douala → N'Djamena (Corridor CEMAC)",
    },
    status: {
      label: "Intérêt envoyé • 1 jeton réservé",
      desc: "Solde initiateur bloqué temporairement",
      type: "reserved",
    },
    timer: "Expire dans 14h 20min",
    timeSent: "Envoyé à 08:42 UTC+1",
    actions: ["Voir détail", "Libérer le jeton réservé"],
  },
  {
    id: "TR-02",
    initiator: {
      name: "Ibrahim Touré",
      role: "Transporteur",
      tokens: "Solde: 2 jetons",
    },
    target: {
      name: "CotonTchad Agro",
      role: "Chargeur",
      tokens: "Solde: 9 jetons",
      initials: "SB",
    },
    announcement: {
      tag: "CAMION DISPONIBLE",
      title: "Scania R500 35T Plateau",
      corridor: "Bangui → Bossangoa → Sarh",
    },
    status: {
      label: "Discussion confirmée • 2 jetons utilisés",
      desc: "1 débité à l'initiateur + 1 débité au destinataire",
      type: "confirmed",
    },
    timer: "Conclu il y a 2h",
    timeSent: "Canal de messagerie ouvert",
    actions: ["Voir le détail du match"],
  },
  {
    id: "TR-03",
    initiator: {
      name: "Mahamat Saleh",
      role: "Transporteur",
      tokens: "Solde: 5 jetons (restitué)",
    },
    target: {
      name: "Grands Moulins Bangui",
      role: "Chargeur",
      tokens: "Solde: 18 jetons",
      initials: "GR",
    },
    announcement: {
      tag: "FRET FARINE 25T",
      title: "Blé Tendre Vrac",
      corridor: "Bangui → Sibut → Kaga-Bandoro",
    },
    status: {
      label: "Refusé • Jeton libéré",
      desc: "Jeton restitué au solde de l'initiateur",
      type: "rejected",
    },
    timer: "Refusé à 11:20",
    timeSent: "Motif: Planning complet",
    actions: ["Historique audit"],
  },
  {
    id: "TR-04",
    initiator: {
      name: "Dieudonné Kotto",
      role: "Chargeur",
      tokens: "Solde: 3 jetons",
    },
    target: {
      name: "Trans-Equateur SA",
      role: "Transporteur",
      tokens: "Solde: 7 jetons",
      initials: "TE",
    },
    announcement: {
      tag: "FRET CACAO 18T",
      title: "Sacs Jute Export",
      corridor: "Berbérati → Bangui Port",
    },
    status: {
      label: "Expiré (48h sans réponse)",
      desc: "Jeton en attente de libération manuelle",
      type: "expired",
    },
    timer: "Expiré il y a 3h",
    timeSent: "Réseau déconnecté (Zone Damara)",
    actions: ["Libérer le jeton réservé"],
    isPriority: true,
  },
];

// ==========================================
// 4. CENTRE DE MODÉRATION & LITIGES
// ==========================================

export const moderationStats = [
  {
    label: "Litiges ouverts",
    value: "8",
    subtext: "Sur 242 convois actifs aujourd'hui",
    badge: "CEMAC",
    tone: "neutral" as StatusTone,
  },
  {
    label: "Priorité haute",
    value: "2",
    subtext: "(Séquestre bloqué)",
    badge: "Action req.",
    tone: "danger" as StatusTone,
  },
  {
    label: "Délai moyen de résolution",
    value: "2h 15m",
    subtext: "",
    badge: "-18% vs m-1",
    tone: "success" as StatusTone,
  },
];

export const disputesList = [
  {
    id: "#DISPUTE-9402",
    lot: "#CARGO-9402",
    route: "Douala → N'Djamena",
    tag: "URGENT",
    title: "Cimencam B2B (Chargeur) vs Mamadou Doumbia (Transporteur)",
    reason: "Litige sur le prix / renégociation hors Ibigo",
    timeAgo: "Il y a 25 min",
    amountLocked: "2 100 000 FCFA bloqués",
    isActive: true,
  },
  {
    id: "#DISPUTE-8802",
    lot: "Mamadou Doumbia vs Socatraf BTP",
    route: "Bangui → N'Djamena",
    tag: "Signalé il y a 35 min",
    title: "#MISSION-8802",
    reason: "Litige sur prix (Tarif non respecté)",
    detail: "Discussion ouverte • 1 jeton utilisé par partie",
    quote: "« Le transporteur exige un supplément non prévu... »",
    amountLocked: "1 750 000 FCFA",
    isActive: false,
  },
  {
    id: "#DISPUTE-8815",
    lot: "#CARGO-8815",
    route: "Bangui → Moundou",
    tag: "Modéré",
    title: "Centrabois vs Alhadji T.",
    reason: "Retard de mise à quai supérieur à 24h",
    timeAgo: "Il y a 2h",
    amountLocked: "Poste frontière: Paoua",
    isActive: false,
  },
  {
    id: "#DISPUTE-7720",
    lot: "#CARGO-7720",
    route: "Béloko → Bangui",
    tag: "Fraude potentielle",
    title: "Import-Export RCA vs Socatraf",
    reason: "Comportement suspect / demande de paiement direct en espèces",
    timeAgo: "Hier à 18:40",
    amountLocked: "Axe RN1 sécurisé",
    isActive: false,
  },
];

export const disputeChatMessages = [
  {
    id: "m1",
    sender: "Mamadou Doumbia",
    senderType: "carrier",
    time: "09:14",
    text: "Bonjour chef. Le camion plateau 35T est prêt à la base logistique de Douala. On charge le clinker pour N'Djamena dès validation de l'ordre Ibigo.",
  },
  {
    id: "m2",
    sender: "Cimencam B2B",
    senderType: "shipper",
    time: "09:18",
    text: "Parfait Mamadou. L'ordre de mission est émis. L'argent est sécurisé en séquestre jusqu'à déchargement à l'usine de Farcha.",
  },
  {
    id: "m3",
    sender: "Mamadou Doumbia",
    senderType: "carrier",
    time: "09:35",
    isFlagged: true,
    flagReason: "SIGNALÉ PAR LE CHARGEUR - DÉTECTION MOTS-CLÉS : PAIEMENT EXTERNE",
    violation: "Violation: Article 14 (Contournement séquestre & tentative d'extorsion)",
    text: "Mon frère, le carburant a augmenté à la frontière de Touboro. Annulons le contrat pour éviter les frais de plateforme. Verse-moi plutôt par transfert direct Orange Money maintenant et le solde en liquide à N'Djamena, sinon je ne démarre pas.",
  },
  {
    id: "m4",
    sender: "Cimencam B2B",
    senderType: "shipper",
    time: "09:41",
    text: "Refus catégorique. Le contrat est scellé sur Ibigo avec le bon de chargement officiel. J'alerte immédiatement la modération CEMAC.",
  },
];

// ==========================================
// 5. SUPERVISION GLOBALE DES ANNONCES
// ==========================================

export const announcementsStats = [
  {
    label: "DEMANDE FRET",
    value: "88",
    delta: "+8%",
    tone: "success" as StatusTone,
    subtitle: "Cargaisons en Recherche de Camion",
    subtext: "Départ Bangui: 54   Départ Douala: 34",
  },
  {
    label: "OFFRE ROULANTE",
    value: "42",
    delta: "camions prêts",
    tone: "neutral" as StatusTone,
    subtitle: "Camions Disponibles sans Fret",
    subtext: "Capacité: 1 380 T   Attente moy.: 1.4 jour",
  },
  {
    label: "PERFORMANCE ALGORITHMIQUE",
    value: "78.4%",
    delta: "Sous 24h",
    tone: "success" as StatusTone,
    subtitle: "Taux d'Appariement Réussi",
    subtext: "Compatibilité Tonnage / Carrosserie / Sécurité",
  },
  {
    label: "VÉLOCITÉ BOURSE",
    value: "3h 45m",
    delta: "-28m vs S-1",
    tone: "warning" as StatusTone,
    subtitle: "Temps Moyen de Concrétisation",
    subtext: "De la publication au déblocage du jeton",
  },
];

export const announcementsList = [
  {
    id: "#CARGO-9402",
    type: "FRET SEC",
    isCargo: true,
    timeAgo: "Il y a 22 min",
    origin: "Bangui",
    destination: "N'Djamena",
    distance: "1,215 km",
    via: "Via Sarh & Guelendeng",
    tonnage: "25T Ciment CPJ-35",
    details: "Sacs 50kg palettisés • Semi-remorque",
    owner: "Brahim Mahamat",
    ownerSub: "Socatrans CEMAC (Certifié A)",
    createdDate: "12 Oct 2025",
    expiry: "Expire dans 48h",
    status: "Disponible",
    statusTone: "success" as StatusTone,
  },
  {
    id: "#TRUCK-8820",
    type: "PLATEAU RIDELLES",
    isCargo: false,
    timeAgo: "Il y a 29 min",
    origin: "Douala",
    destination: "N'Djamena",
    distance: "1,874 km",
    via: "Via Yaoundé & Garoua",
    tonnage: "35T Plateau nu",
    details: "Véhicule vide prêt chargement",
    owner: "Jean-Paul Ndoum",
    ownerSub: "Flotte NdoumExpress (4 Véhicules)",
    createdDate: "11 Oct 2025",
    expiry: "Expire dans 12h",
    status: "En discussion",
    statusTone: "warning" as StatusTone,
  },
  {
    id: "#CARGO-9388",
    type: "HUMANITAIRE",
    isCargo: true,
    timeAgo: "Il y a 35 min",
    origin: "Douala",
    destination: "Bangui",
    distance: "1,430 km",
    via: "Corridor Sud (Béloko)",
    tonnage: "18T Vivres PAM",
    details: "Farine enrichie, huile • Bâché scellé",
    owner: "Logistique UN-PAM",
    ownerSub: "Compte Institutionnel Vérifié",
    createdDate: "09 Oct 2025",
    expiry: "LV #CEMAC-44109",
    status: "Conclu / Lettre de voiture émise",
    statusTone: "info" as StatusTone,
  },
  {
    id: "#TRUCK-8799",
    type: "CITERNE CARBURANT",
    isCargo: false,
    timeAgo: "Il y a 44 min",
    origin: "Bangui",
    destination: "Moundou",
    distance: "780 km",
    via: "Axe Sud Tchadien",
    tonnage: "32,000L Hydrocarbures",
    details: "Agrément CEMAC TMD valide",
    owner: "Société Pétrolière Tchad",
    ownerSub: "Compte Flotte Pro",
    createdDate: "05 Oct 2025",
    expiry: "Délai dépassé",
    status: "Expiré",
    statusTone: "neutral" as StatusTone,
  },
  {
    id: "#CARGO-9372",
    type: "AGROALIMENTAIRE",
    isCargo: true,
    timeAgo: "Il y a 50 min",
    origin: "N'Djamena",
    destination: "Douala",
    distance: "1,874 km",
    via: "Retour Portuaire",
    tonnage: "30T Coton Fibre",
    details: "Balles cerclées • Nécessite bâche étanche",
    owner: "Cotontchad SN",
    ownerSub: "Exportateur Agréé",
    createdDate: "13 Oct 2025",
    expiry: "Expire dans 72h",
    status: "Disponible",
    statusTone: "success" as StatusTone,
  },
  {
    id: "#TRUCK-8740",
    type: "FRIGORIFIQUE",
    isCargo: false,
    timeAgo: "Il y a 1h min",
    origin: "Douala",
    destination: "Bangui",
    distance: "1,430 km",
    via: "Température dirigée (-20°C)",
    tonnage: "22T Thermo King",
    details: "Sonde télématique Ibigo connectée",
    owner: "Trans-Froid Afrique",
    ownerSub: "Chambre Froide Mobile",
    createdDate: "12 Oct 2025",
    expiry: "Négociation tarif",
    status: "En discussion",
    statusTone: "warning" as StatusTone,
  },
  {
    id: "#CARGO-9351",
    type: "MATÉRIAUX BTP",
    isCargo: true,
    timeAgo: "Il y a 2j",
    origin: "Bangui",
    destination: "Bossangoa",
    distance: "305 km",
    via: "Tronçon National RN1",
    tonnage: "20T Fers à béton & Tôles",
    details: "Longueurs 12m • Camion plateau requis",
    owner: "Centrafrique Construction",
    ownerSub: "PME Partenaire",
    createdDate: "14 Oct 2025",
    expiry: "Expire dans 96h",
    status: "Disponible",
    statusTone: "success" as StatusTone,
  },
];
