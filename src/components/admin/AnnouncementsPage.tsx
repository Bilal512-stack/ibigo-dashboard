"use client";

import React, { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { StatCard } from "@/components/admin/StatCard";
import { StatusPill } from "@/components/admin/StatusPill";
import { announcementsStats, announcementsList } from "@/data/mockData";

export function AnnouncementsPage() {
  const [filterTab, setFilterTab] = useState("Toutes les annonces");
  const [selectedAnnouncements, setSelectedAnnouncements] = useState<string[]>([]);

  const toggleSelectAll = () => {
    if (selectedAnnouncements.length === announcementsList.length) {
      setSelectedAnnouncements([]);
    } else {
      setSelectedAnnouncements(announcementsList.map((a) => a.id));
    }
  };

  const toggleSelect = (id: string) => {
    if (selectedAnnouncements.includes(id)) {
      setSelectedAnnouncements(selectedAnnouncements.filter((i) => i !== id));
    } else {
      setSelectedAnnouncements([...selectedAnnouncements, id]);
    }
  };

  return (
    <AdminLayout currentPath="/announcements">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-semibold text-[#666F7A] uppercase tracking-wider mb-1">
            <span>Dashboard</span>
            <span>/</span>
            <span className="text-[#FD4F49]">Bourse de Fret</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#1E242B] tracking-tight">
            Supervision des flux de fret
          </h1>
          <p className="text-xs sm:text-sm text-[#666F7A] mt-0.5">
            Contrôle en direct des annonces de cargaisons et disponibilités de camions
          </p>
        </div>

        <button
          type="button"
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#E5E0D8] bg-white text-xs font-bold text-[#1E242B] hover:bg-[#F7F4EF] shadow-2xs self-start sm:self-auto transition"
        >
          <svg className="w-3.5 h-3.5 text-[#FD4F49]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" x2="12" y1="15" y2="3" />
          </svg>
          Exporter la bourse (CSV)
        </button>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {announcementsStats.map((st, idx) => (
          <StatCard
            key={idx}
            label={st.label}
            value={st.value}
            delta={st.delta}
            tone={st.tone}
            icon={idx === 0 ? "box" : idx === 1 ? "truck" : idx === 2 ? "shield" : "gift"}
            subtext={st.subtitle}
            extraRight={st.subtext}
            progressPercent={idx === 2 ? 78 : undefined}
          />
        ))}
      </div>

      {/* Table Container */}
      <div className="bg-white border border-[#E5E0D8]/90 rounded-[22px] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02),0_4px_16px_rgba(30,36,43,0.03)]">
        {/* Top Toolbar: Tabs and Actions */}
        <div className="p-4 px-6 border-b border-[#E5E0D8] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {[
              { label: "Toutes les annonces", count: 228 },
              { label: "Cargaisons publiées", count: 142 },
              { label: "Camions en attente", count: 86 },
            ].map((tb) => (
              <button
                key={tb.label}
                type="button"
                onClick={() => setFilterTab(tb.label)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  filterTab === tb.label
                    ? "bg-[#1E242B] text-white shadow-xs"
                    : "bg-[#F7F4EF]/70 text-[#666F7A] hover:bg-[#F7F4EF]"
                }`}
              >
                {tb.label} <span className={filterTab === tb.label ? "text-[#FD4F49]" : "opacity-80 font-normal"}>({tb.count})</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E5E0D8] text-xs font-semibold text-[#1E242B] hover:bg-[#F7F4EF] transition"
            >
              <svg className="w-3.5 h-3.5 text-[#2E7D32]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
              </svg>
              Actualisé à l'instant
            </button>
            <button
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E5E0D8] text-xs font-semibold text-[#1E242B] hover:bg-[#F7F4EF] transition"
            >
              <svg className="w-3.5 h-3.5 text-[#666F7A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="18" rx="1" />
                <rect x="14" y="3" width="7" height="18" rx="1" />
              </svg>
              Colonnes
            </button>
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="p-4 px-6 bg-[#F7F4EF]/30 border-b border-[#E5E0D8] flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#94A3B8]">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="ID Annonce (#CARGO, #TRUCK)..."
              className="w-full pl-9 pr-3 py-2 bg-white border border-[#E5E0D8] rounded-xl text-xs text-[#1E242B] placeholder-[#94A3B8] focus:outline-none focus:border-[#FD4F49]"
            />
          </div>

          <select className="px-3.5 py-2 bg-white border border-[#E5E0D8] rounded-xl text-xs text-[#1E242B] font-semibold focus:outline-none focus:border-[#FD4F49]">
            <option>Tous les corridors</option>
            <option>Bangui → N'Djamena</option>
            <option>Douala → Bangui</option>
            <option>N'Djamena → Douala</option>
          </select>

          <select className="px-3.5 py-2 bg-white border border-[#E5E0D8] rounded-xl text-xs text-[#1E242B] font-semibold focus:outline-none focus:border-[#FD4F49]">
            <option>Tous les statuts</option>
            <option>Disponible</option>
            <option>En discussion</option>
            <option>Conclu</option>
            <option>Expiré</option>
          </select>

          <div className="flex items-center gap-2 px-3.5 py-2 bg-white border border-[#E5E0D8] rounded-xl text-xs text-[#1E242B] font-semibold">
            <svg className="w-3.5 h-3.5 text-[#FD4F49]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>01 Oct 2025 - 15 Oct 2025</span>
          </div>

          <button
            type="button"
            className="p-2 bg-white border border-[#E5E0D8] rounded-xl text-[#666F7A] hover:bg-[#F7F4EF] transition"
            title="Filtres avancés"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#1E242B] text-white font-semibold">
                <th className="py-3.5 px-5 w-10">
                  <input
                    type="checkbox"
                    checked={selectedAnnouncements.length === announcementsList.length}
                    onChange={toggleSelectAll}
                    className="rounded accent-[#FD4F49]"
                  />
                </th>
                <th className="py-3.5 px-5">ID & Type</th>
                <th className="py-3.5 px-5">Trajet & Corridor</th>
                <th className="py-3.5 px-5">Tonnage & Marchandise</th>
                <th className="py-3.5 px-5">Dépositaire / Propriétaire</th>
                <th className="py-3.5 px-5">Création & Validité</th>
                <th className="py-3.5 px-5">Statut Logistique</th>
                <th className="py-3.5 px-5 text-right">Actions Superviseur</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E0D8]/70">
              {announcementsList.map((item, idx) => {
                const isSelected = selectedAnnouncements.includes(item.id);
                return (
                  <tr
                    key={idx}
                    className={`transition-colors group ${
                      isSelected ? "bg-[#FFF0EB]/40" : "hover:bg-[#F7F4EF]/70"
                    }`}
                  >
                    <td className="py-4 px-5">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelect(item.id)}
                        className="rounded accent-[#FD4F49]"
                      />
                    </td>

                    <td className="py-4 px-5 whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs shadow-2xs ${
                            item.isCargo
                              ? "bg-[#FFF0EB] text-[#FD4F49] border border-[#FD4F49]/20"
                              : "bg-[#E8F5E9] text-[#2E7D32] border border-[#2E7D32]/20"
                          }`}
                        >
                          {item.isCargo ? "📦" : "🚛"}
                        </div>
                        <div>
                          <div className="font-black text-[#1E242B]">{item.id}</div>
                          <div className="text-[10px] font-bold text-[#666F7A] uppercase tracking-wide">
                            {item.type}
                          </div>
                          <div className="text-[9.5px] text-[#94A3B8] font-medium">{item.timeAgo}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-5 whitespace-nowrap">
                      <div className="font-extrabold text-[#1E242B] flex items-center gap-1.5">
                        <span>{item.origin}</span>
                        <span className="text-[#FD4F49] font-black">→</span>
                        <span>{item.destination}</span>
                      </div>
                      <div className="text-[11px] text-[#666F7A] mt-0.5 font-medium">
                        {item.distance} • {item.via}
                      </div>
                    </td>

                    <td className="py-4 px-5">
                      <div className="font-bold text-[#1E242B]">{item.tonnage}</div>
                      <div className="text-[11px] text-[#666F7A] mt-0.5 font-medium">{item.details}</div>
                    </td>

                    <td className="py-4 px-5">
                      <div className="font-bold text-[#1E242B]">{item.owner}</div>
                      <div className="text-[11px] text-[#666F7A] mt-0.5">{item.ownerSub}</div>
                    </td>

                    <td className="py-4 px-5 whitespace-nowrap">
                      <div className="text-[#1E242B] font-semibold">{item.createdDate}</div>
                      <div
                        className={`text-[11px] font-bold mt-0.5 ${
                          item.expiry.includes("Expire dans 12h") || item.expiry.includes("Délai")
                            ? "text-[#D32F2F]"
                            : item.expiry.includes("Négociation")
                            ? "text-[#F57C00]"
                            : "text-[#666F7A]"
                        }`}
                      >
                        {item.expiry}
                      </div>
                    </td>

                    <td className="py-4 px-5 whitespace-nowrap">
                      <StatusPill label={item.status} tone={item.statusTone} size="sm" />
                    </td>

                    <td className="py-4 px-5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5 text-[#666F7A]">
                        <button type="button" className="p-1.5 rounded-lg hover:bg-[#EFEBE4] hover:text-[#1E242B] transition" title="Voir">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        </button>
                        <button type="button" className="p-1.5 rounded-lg hover:bg-[#EFEBE4] hover:text-[#FD4F49] transition" title="Apparier">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="16 3 21 3 21 8" />
                            <line x1="4" y1="20" x2="21" y2="3" />
                            <polyline points="21 16 21 21 16 21" />
                            <line x1="15" y1="15" x2="21" y2="21" />
                          </svg>
                        </button>
                        <button type="button" className="p-1.5 rounded-lg hover:bg-[#EFEBE4] hover:text-[#1E242B] transition" title="Arbitrage">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="m14 13 5 5" />
                            <path d="m3 3 7 7" />
                            <path d="m7.5 10.5 4-4" />
                          </svg>
                        </button>
                        <button type="button" className="p-1.5 rounded-lg hover:bg-[#FFEBEE] hover:text-[#D32F2F] transition" title="Supprimer">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 6h18" />
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
export default AnnouncementsPage;
