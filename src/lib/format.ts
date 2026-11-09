const integerFormat = new Intl.NumberFormat("fr-FR");
const percentFormat = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 1 });

export function formatNumber(value: number): string {
  return integerFormat.format(value);
}

export function formatFcfa(value: number): string {
  return `${integerFormat.format(value)} FCFA`;
}

export function formatPercent(value: number): string {
  return `${percentFormat.format(value)} %`;
}

/** Montant abrégé pour les axes de graphiques : « 2,5 M ». */
export function formatCompactFcfa(value: number): string {
  return value >= 1_000_000 ? `${percentFormat.format(value / 1_000_000)} M` : formatNumber(value);
}

// Fuseau fixe : même rendu côté serveur et navigateur, quel que soit le poste.
const dateTimeFormat = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Africa/Douala",
});
const shortDateFormat = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "short",
  timeZone: "Africa/Douala",
});

export function formatDateTime(timestamp: number): string {
  return dateTimeFormat.format(timestamp);
}

export function formatShortDate(timestamp: number): string {
  return shortDateFormat.format(timestamp);
}
