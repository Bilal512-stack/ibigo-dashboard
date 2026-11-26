import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Manrope, Outfit } from "next/font/google";
import "./globals.css";

const fontBody = Manrope({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const fontHeading = Outfit({ subsets: ["latin"], variable: "--font-heading", display: "swap" });

export const metadata: Metadata = {
  title: "IBIGO - Back-office d'administration",
  description: "Panneau d'administration de la plateforme logistique IBIGO (CEMAC).",
  icons: {
    icon: "/favicon-ibigo.png?v=2",
    shortcut: "/favicon-ibigo.png?v=2",
    apple: "/favicon-ibigo.png?v=2",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="fr" className={`${fontBody.variable} ${fontHeading.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("ibigo-theme");if(!t)t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.dataset.theme=t}catch(e){}`,
          }}
        />
      </head>
      <body className="antialiased min-h-screen bg-sand font-sans text-ink">{children}</body>
    </html>
  );
}
