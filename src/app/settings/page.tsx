"use client";

import React from "react";
import { Sidebar } from "@/components/admin/Sidebar";
import { Header } from "@/components/admin/Header";

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen bg-[#F7F4EF]">
      <Sidebar currentPath="/settings" />

      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="flex-1 p-6 lg:p-8 space-y-6 max-w-5xl mx-auto w-full">
          <div>
            <h1 className="text-2xl font-extrabold text-[#1E242B] tracking-tight">
              Paramètres de la Plateforme Ibigo
            </h1>
            <p className="text-xs text-[#666F7A] mt-0.5">
              Configuration des corridors de fret, barèmes de séquestre et protocoles CEMAC
            </p>
          </div>

          <div className="bg-white border border-[#E5E0D8] rounded-[18px] p-6 shadow-xs space-y-6">
            <h2 className="text-base font-bold text-[#1E242B] border-b border-[#EFEBE4] pb-3">
              Règles d'attribution des jetons & Séquestre
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-[#E5E0D8] bg-[#F7F4EF]/40 space-y-2">
                <label className="text-xs font-bold text-[#1E242B]">
                  Dotation d'inscription gratuite
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    defaultValue={5}
                    className="w-24 px-3 py-1.5 bg-white border border-[#E5E0D8] rounded-lg text-sm font-bold text-[#1E242B]"
                  />
                  <span className="text-xs text-[#666F7A]">jetons offerts par utilisateur</span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-[#E5E0D8] bg-[#F7F4EF]/40 space-y-2">
                <label className="text-xs font-bold text-[#1E242B]">
                  Délai expiration Hold (Unilatéral)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    defaultValue={48}
                    className="w-24 px-3 py-1.5 bg-white border border-[#E5E0D8] rounded-lg text-sm font-bold text-[#1E242B]"
                  />
                  <span className="text-xs text-[#666F7A]">heures avant libération automatique</span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                className="px-5 py-2.5 bg-[#FD4F49] hover:bg-[#E53E38] text-white text-xs font-bold rounded-xl shadow-xs transition"
              >
                Sauvegarder les modifications
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
