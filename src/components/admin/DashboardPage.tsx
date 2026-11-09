"use client";

import React, { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { StatCard } from "@/components/admin/StatCard";
import { StatusPill } from "@/components/admin/StatusPill";
import { CustomerByCountries } from "@/components/admin/CustomerByCountries";
import {
  overviewStats,
  weeklyFreightFlow,
  keyCheckpoints,
  corridorCities,
  auditEvents,
} from "@/data/mockData";

export function DashboardPage() {
  const [activeTab, setActiveTab] = useState("Aujourd'hui");
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  return (
    <AdminLayout currentPath="/">
      {/* Breadcrumb & Top Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-1">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-semibold text-[#666F7A] uppercase tracking-wider mb-1">
            <span>Dashboard</span>
            <span>/</span>
            <span className="text-[#FD4F49]">Corridor RCA • Cameroun • Tchad</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#1E242B] tracking-tight">
            Tableau de bord Général
          </h1>
          <p className="text-xs sm:text-sm text-[#666F7A] mt-0.5">
            Supervision stratégique des corridors de transit fret transfrontalier CEMAC
          </p>
        </div>

        {/* Date Filters & Calendar Picker */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex bg-[#EFEBE4]/80 p-1 rounded-xl text-xs font-semibold border border-[#E5E0D8]/60 shadow-2xs">
            {["Aujourd'hui", "7J", "30J", "Trimestre"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-3 sm:px-3.5 py-1.5 rounded-lg transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-[#1E242B] text-white shadow-xs font-bold"
                    : "text-[#666F7A] hover:text-[#1E242B]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[#E5E0D8] bg-white text-xs font-semibold text-[#1E242B] hover:bg-[#F7F4EF] hover:border-[#94A3B8] shadow-2xs transition-all"
          >
            <svg className="w-3.5 h-3.5 text-[#FD4F49]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span className="hidden xs:inline">24 Oct 2024 - 31 Oct 2024</span>
            <span className="xs:hidden">Oct 2024</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {overviewStats.map((stat, idx) => (
          <StatCard
            key={idx}
            label={stat.label}
            value={stat.value}
            delta={stat.delta}
            tone={stat.tone}
            icon={stat.icon}
            subtext={stat.subtext}
            progressPercent={idx === 0 ? 78 : idx === 2 ? 99 : undefined}
          />
        ))}
      </div>

      {/* Section 2: Weekly Freight Flow (Left 7 cols) + Customer by Countries (CMR • RCA • TCHAD) (Right 5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Weekly Freight Flow Chart */}
        <div className="lg:col-span-7 bg-white border border-[#E5E0D8]/90 rounded-[22px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02),0_4px_16px_rgba(30,36,43,0.03)] flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 pb-4 border-b border-[#EFEBE4]">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-extrabold text-[#1E242B]">
                    Flux de fret hebdomadaire
                  </h2>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FFF0EB] text-[#FD4F49] border border-[#FD4F49]/20">
                    Transit Douane
                  </span>
                </div>
                <p className="text-xs text-[#666F7A] mt-0.5">
                  Tonnage brut enregistré aux corridors de douane CEMAC
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-bold">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-md bg-[#FD4F49]" />
                  <span className="text-[#1E242B]">Tonnage RN1</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-md bg-[#1E242B]" />
                  <span className="text-[#1E242B]">Volume RN2</span>
                </span>
              </div>
            </div>

            {/* Bars Area with Annotations & Tooltips */}
            <div className="relative pt-6 pb-2">
              <div className="absolute top-0 left-[22%] -translate-x-1/2 flex items-center gap-1.5 bg-white border border-[#E5E0D8] px-3 py-1 rounded-full text-[10px] font-bold text-[#1E242B] shadow-xs hover:scale-105 transition-transform cursor-pointer">
                <span className="text-[#FD4F49]">⚡</span> Pic Pesée Sibut (840T)
              </div>
              <div className="absolute top-0 left-[51%] -translate-x-1/2 flex items-center gap-1.5 bg-white border border-[#E5E0D8] px-3 py-1 rounded-full text-[10px] font-bold text-[#1E242B] shadow-xs hover:scale-105 transition-transform cursor-pointer">
                <span className="text-[#FD4F49]">⚡</span> Pic Sarh Douane (920T)
              </div>

              <div className="h-56 flex items-end justify-between gap-2 sm:gap-6 px-2 sm:px-4 border-b border-[#E5E0D8]">
                {weeklyFreightFlow.map((item, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={() => setHoveredBar(idx)}
                    onMouseLeave={() => setHoveredBar(null)}
                    className="flex-1 flex flex-col items-center gap-2 group cursor-pointer"
                  >
                    <div className="w-full flex items-end justify-center gap-1 sm:gap-2 h-44 relative">
                      {hoveredBar === idx && (
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#1E242B] text-white text-[10px] py-1 px-2.5 rounded-lg whitespace-nowrap shadow-lg z-20 pointer-events-none">
                          RN1: {item.rn1 * 10}T • RN2: {item.rn2 * 10}T
                        </div>
                      )}

                      <div
                        className="w-3 sm:w-5 rounded-t-md bg-gradient-to-t from-[#FD4F49] to-[#FF706B] group-hover:brightness-110 transition-all duration-300"
                        style={{ height: `${(item.rn1 / 90) * 100}%` }}
                      />
                      <div
                        className="w-3 sm:w-5 rounded-t-md bg-gradient-to-t from-[#1E242B] to-[#2A323D] group-hover:brightness-110 transition-all duration-300"
                        style={{ height: `${(item.rn2 / 90) * 100}%` }}
                      />
                    </div>
                    <span
                      className={`text-xs font-bold transition-colors ${
                        item.day === "Mar" || item.day === "Jeu"
                          ? "text-[#FD4F49]"
                          : "text-[#666F7A] group-hover:text-[#1E242B]"
                      }`}
                    >
                      {item.day}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between overflow-x-auto text-[11px] gap-2">
            {corridorCities.map((city, idx) => (
              <div
                key={idx}
                className={`px-2.5 py-1 rounded-lg text-center whitespace-nowrap transition-all ${
                  city.highlight
                    ? "bg-[#FFF0EB] text-[#FD4F49] font-bold border border-[#FD4F49]/20"
                    : "text-[#666F7A] hover:bg-[#F7F4EF] font-medium"
                }`}
              >
                {city.name}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Customer by Countries (CMR • RCA • TCHAD) */}
        <div className="lg:col-span-5">
          <CustomerByCountries />
        </div>
      </div>

      {/* Section 3: État des Postes Clés & Visual Corridor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Postes Clés (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-[#E5E0D8]/90 rounded-[22px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02),0_4px_16px_rgba(30,36,43,0.03)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#EFEBE4] mb-4">
              <h2 className="text-base font-extrabold text-[#1E242B]">
                État des Postes Clés
              </h2>
              <span className="text-[10px] font-bold text-[#2E7D32] flex items-center gap-1.5 bg-[#E8F5E9] px-2.5 py-0.5 rounded-full border border-[#C8E6C9]">
                <span className="w-2 h-2 rounded-full bg-[#2E7D32] animate-pulse" />
                4 Opérationnels
              </span>
            </div>

            <div className="space-y-3">
              {keyCheckpoints.map((cp, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-[#EFEBE4] bg-[#F7F4EF]/30 hover:bg-white hover:border-[#E5E0D8] hover:shadow-xs transition-all duration-200"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xs font-bold text-[#1E242B] leading-tight">
                      {cp.name}
                    </h3>
                    <StatusPill label={cp.status} tone={cp.tone} size="sm" />
                  </div>
                  <p className="text-[11px] text-[#666F7A] mt-1.5 leading-relaxed">
                    {cp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 mt-3 border-t border-[#EFEBE4] flex items-center justify-between text-[11px] text-[#666F7A]">
            <span>Mise à jour télémétrique auto : 30s</span>
            <button type="button" className="font-bold text-[#FD4F49] hover:underline">
              Signaler ralentissement →
            </button>
          </div>
        </div>

        {/* Corridor Multimodal (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-[#E5E0D8]/90 rounded-[22px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02),0_4px_16px_rgba(30,36,43,0.03)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#EFEBE4] mb-6">
              <div>
                <h2 className="text-base font-extrabold text-[#1E242B]">
                  Axe Stratégique de Transit Inter-États
                </h2>
                <p className="text-xs text-[#666F7A] mt-0.5">
                  Corridor multimodal Douala ➔ Bangui ➔ N'Djamena (2 850 km)
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-[#1E242B] text-white text-[11px] font-black">
                CEMAC-CONVOI
              </span>
            </div>

            <div className="relative py-6 px-4">
              <div className="absolute top-1/2 left-0 right-0 h-2 bg-gradient-to-r from-[#2E7D32] via-[#FD4F49] to-[#F57C00] -translate-y-1/2 rounded-full" />
              <div className="relative flex justify-between">
                {[
                  { name: "Douala", flag: "🇨🇲", sub: "Port Principal", active: true },
                  { name: "Béloko", flag: "🇨🇫", sub: "Douane Entrée", active: true },
                  { name: "Bangui", flag: "🇨🇫", sub: "Hub Central", active: true },
                  { name: "Sibut", flag: "🇨🇫", sub: "Pesée Lourd", active: true },
                  { name: "Sarh", flag: "🇹🇩", sub: "Frontière Tchad", active: true },
                  { name: "N'Djamena", flag: "🇹🇩", sub: "Terminus Nord", active: false },
                ].map((pt, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div
                      className={`w-6 h-6 rounded-full border-3 border-white shadow-md z-10 flex items-center justify-center text-[10px] font-black text-white ${
                        pt.active ? "bg-[#1E242B]" : "bg-[#94A3B8]"
                      }`}
                    >
                      {pt.active ? "✓" : "•"}
                    </div>
                    <span className="text-xs font-black text-[#1E242B] mt-2 whitespace-nowrap flex items-center gap-1">
                      <span>{pt.flag}</span>
                      <span>{pt.name}</span>
                    </span>
                    <span className="text-[10px] text-[#666F7A] whitespace-nowrap font-medium hidden sm:block">
                      {pt.sub}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-4 border-t border-[#EFEBE4]">
              <div className="p-3 rounded-xl bg-[#F7F4EF]/50 border border-[#E5E0D8]">
                <span className="text-[10px] font-bold text-[#666F7A] uppercase">Douala ➔ Bangui</span>
                <div className="text-xs font-black text-[#1E242B] mt-0.5">1 430 km • 4.2 jours</div>
                <div className="text-[10px] text-[#2E7D32] font-semibold mt-0.5">Transit sans encombre</div>
              </div>
              <div className="p-3 rounded-xl bg-[#F7F4EF]/50 border border-[#E5E0D8]">
                <span className="text-[10px] font-bold text-[#666F7A] uppercase">Bangui ➔ N'Djamena</span>
                <div className="text-xs font-black text-[#1E242B] mt-0.5">1 215 km • 3.8 jours</div>
                <div className="text-[10px] text-[#F57C00] font-semibold mt-0.5">Ralentissement Moundou</div>
              </div>
              <div className="p-3 rounded-xl bg-[#F7F4EF]/50 border border-[#E5E0D8]">
                <span className="text-[10px] font-bold text-[#666F7A] uppercase">Douala ➔ N'Djamena</span>
                <div className="text-xs font-black text-[#1E242B] mt-0.5">1 874 km • 5.5 jours</div>
                <div className="text-[10px] text-[#2E7D32] font-semibold mt-0.5">Corridor Express Direct</div>
              </div>
            </div>
          </div>

          <div className="pt-3 mt-4 border-t border-[#EFEBE4] flex items-center justify-between text-[11px] text-[#666F7A]">
            <span>Escortes militaires & douanières prêtes à Sibut</span>
            <span className="font-bold text-[#2E7D32]">Sécurisation GPS 100% active</span>
          </div>
        </div>
      </div>

      {/* Section 4: Journal des événements & Audit */}
      <div className="bg-white border border-[#E5E0D8]/90 rounded-[22px] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02),0_4px_16px_rgba(30,36,43,0.03)]">
        <div className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#E5E0D8]">
          <div>
            <h2 className="text-base font-extrabold text-[#1E242B]">
              Journal des événements & Journal d'Audit
            </h2>
            <p className="text-xs text-[#666F7A] mt-0.5">
              Enregistrement temps réel des transactions, franchissements frontaliers et contrôles KYC
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-[#E5E0D8] text-xs font-semibold text-[#1E242B] hover:bg-[#F7F4EF] transition shadow-2xs"
            >
              <svg className="w-3.5 h-3.5 text-[#666F7A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
              Filtrer
            </button>
            <button
              type="button"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-[#E5E0D8] text-xs font-semibold text-[#1E242B] hover:bg-[#F7F4EF] transition shadow-2xs"
            >
              <svg className="w-3.5 h-3.5 text-[#666F7A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
              Exporter CSV
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#1E242B] text-white font-semibold">
                <th className="py-3.5 px-6">Horodatage</th>
                <th className="py-3.5 px-6">Type d'événement</th>
                <th className="py-3.5 px-6">Entité concernée</th>
                <th className="py-3.5 px-6">Corridor / Axe</th>
                <th className="py-3.5 px-6">Statut & Gravité</th>
                <th className="py-3.5 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E0D8]/70">
              {auditEvents.map((evt, idx) => (
                <tr key={idx} className="hover:bg-[#F7F4EF]/70 transition-colors group">
                  <td className="py-4 px-6 font-bold text-[#1E242B] whitespace-nowrap">
                    {evt.timestamp}
                  </td>
                  <td className="py-4 px-6 font-semibold">
                    <span className={evt.typeAlert ? "text-[#D32F2F] font-bold" : "text-[#1E242B]"}>
                      {evt.type}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-bold text-[#1E242B]">{evt.entity}</div>
                    {evt.entitySub && (
                      <div className="text-[11px] text-[#666F7A] mt-0.5">{evt.entitySub}</div>
                    )}
                  </td>
                  <td className="py-4 px-6 text-[#666F7A] whitespace-nowrap font-medium">
                    {evt.corridor}
                  </td>
                  <td className="py-4 px-6">
                    <StatusPill label={evt.status} tone={evt.tone} size="sm" />
                  </td>
                  <td className="py-4 px-6 text-right whitespace-nowrap">
                    {evt.actionHighlight ? (
                      <button
                        type="button"
                        className="px-3.5 py-1.5 bg-gradient-to-r from-[#FD4F49] to-[#E53E38] hover:brightness-110 text-white font-bold rounded-lg text-xs shadow-xs transition active:scale-95"
                      >
                        {evt.action}
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="font-bold text-[#FD4F49] hover:underline"
                      >
                        {evt.action}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 px-6 border-t border-[#E5E0D8] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#666F7A] bg-[#F7F4EF]/20">
          <span>Affichage de 1 à 5 sur 284 entrées de télémétrie</span>

          <div className="flex items-center gap-1.5 font-bold">
            <button type="button" className="px-3 py-1.5 rounded-lg border border-[#E5E0D8] text-[#94A3B8] hover:bg-[#F7F4EF]" disabled>
              Précédent
            </button>
            <button type="button" className="px-3.5 py-1.5 rounded-lg bg-[#1E242B] text-white font-black shadow-xs">
              1
            </button>
            <button type="button" className="px-3.5 py-1.5 rounded-lg border border-[#E5E0D8] hover:bg-white transition">
              2
            </button>
            <button type="button" className="px-3.5 py-1.5 rounded-lg border border-[#E5E0D8] hover:bg-white transition">
              3
            </button>
            <span className="px-1 text-[#94A3B8]">...</span>
            <button type="button" className="px-3.5 py-1.5 rounded-lg border border-[#E5E0D8] hover:bg-white transition">
              28
            </button>
            <button type="button" className="px-3 py-1.5 rounded-lg border border-[#E5E0D8] hover:bg-white transition">
              Suivant
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
export default DashboardPage;
