import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ibigo - Plateforme de Transit & Fret Transfrontalier",
  description:
    "Tableau de bord administrateur & supervision logistique pour le corridor RCA - Cameroun - Tchad.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="antialiased min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)]">
        {children}
      </body>
    </html>
  );
}
