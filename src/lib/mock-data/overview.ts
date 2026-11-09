import { TOKEN_PRICE_FCFA } from "@/lib/constants";
import type { CountryStat, StatusTone } from "@/types";

export const overviewStats = [
  {
    label: "Cargaisons Actives",
    value: "142",
    delta: "+12%",
    tone: "success" as StatusTone,
    icon: "box",
    subtext: "cette semaine sur l'axe Bangui-Moundou",
    progressPercent: 78,
  },
  {
    label: "Camions en Rotation",
    value: "86",
    delta: "Flotte active",
    tone: "neutral" as StatusTone,
    icon: "truck",
    subtext: "42 semis lourds, 44 porteurs bâchés",
  },
  {
    label: "Missions Sécurisées",
    value: "1 280",
    delta: "99.4%",
    tone: "success" as StatusTone,
    icon: "shield",
    subtext: "convois tracés et déchargés sans litige",
    progressPercent: 99,
  },
];

export const customersByCountry: CountryStat[] = [
  {
    code: "CMR",
    name: "Cameroun",
    flag: "🇨🇲",
    carriersCount: 248,
    shippersCount: 164,
    tokensPurchased: 1180,
  },
  {
    code: "RCA",
    name: "Centrafrique",
    flag: "🇨🇫",
    carriersCount: 172,
    shippersCount: 114,
    tokensPurchased: 690,
  },
  {
    code: "TCHAD",
    name: "Tchad",
    flag: "🇹🇩",
    carriersCount: 92,
    shippersCount: 52,
    tokensPurchased: 410,
  },
];

const carriers = customersByCountry.reduce((sum, c) => sum + c.carriersCount, 0);
const shippers = customersByCountry.reduce((sum, c) => sum + c.shippersCount, 0);
const tokensPurchased = customersByCountry.reduce((sum, c) => sum + c.tokensPurchased, 0);

export const countryTotals = {
  carriers,
  shippers,
  users: carriers + shippers,
  tokensPurchased,
  amountFcfa: tokensPurchased * TOKEN_PRICE_FCFA,
};
