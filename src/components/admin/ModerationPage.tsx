"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/admin/Sidebar";
import { Header } from "@/components/admin/Header";
import { StatusPill } from "@/components/admin/StatusPill";
import { moderationStats, disputesList, disputeChatMessages } from "@/data/mockData";

export function ModerationPage() {
  const [selectedDispute, setSelectedDispute] = useState(disputesList[0]);
  const [filterTab, setFilterTab] = useState("Tous");

  return (
    <div className="flex min-h-screen bg-[#F7F4EF]">
      <Sidebar currentPath="/moderation" />

      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="flex-1 p-6 lg:p-8 space-y-6 max-w-[1520px] mx-auto w-full">
          {/* Top Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-[11px] font-semibold text-[#666F7A] uppercase tracking-wider mb-1">
                <span>Dashboard</span>
                <span>/</span>
                <span className="text-[#FD4F49]">Médiation & Contentieux</span>
              </div>
              <h1 className="text-2xl font-black text-[#1E242B] tracking-tight">
                Centre de modération (Chats signalés)
              </h1>
              <p className="text-xs text-[#666F7A] mt-0.5">
                Médiation des litiges, sécurisation des accords et surveillance des messages non conformes
              </p>
            </div>

            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#E5E0D8] bg-white text-xs font-bold text-[#1E242B] hover:bg-[#F7F4EF] shadow-2xs self-start sm:self-auto transition"
            >
              <svg className="w-3.5 h-3.5 text-[#666F7A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
              Exporter l'historique
            </button>
          </div>

          {/* 3 Top Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {moderationStats.map((st, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#E5E0D8]/90 rounded-[22px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02),0_4px_16px_rgba(30,36,43,0.03)] flex items-center justify-between hover:-translate-y-0.5 transition-all duration-300"
              >
                <div>
                  <span className="text-xs font-bold text-[#666F7A] uppercase tracking-wider">{st.label}</span>
                  <div className="text-3xl font-black text-[#1E242B] mt-1">{st.value}</div>
                  {st.subtext && <div className="text-[11px] text-[#666F7A] mt-0.5 font-medium">{st.subtext}</div>}
                </div>
                <StatusPill label={st.badge} tone={st.tone} />
              </div>
            ))}
          </div>

          {/* Main 2-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: List of Disputes */}
            <div className="lg:col-span-5 space-y-4">
              {/* Search & Filter pills */}
              <div className="space-y-3">
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#94A3B8]">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Filtrer par acteur, litige..."
                    className="w-full pl-9 pr-3 py-2 bg-white border border-[#E5E0D8] rounded-xl text-xs text-[#1E242B] placeholder-[#94A3B8] focus:outline-none focus:border-[#FD4F49]"
                  />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-bold">
                  {[
                    { label: "Tous", count: 4 },
                    { label: "Litige Prix", count: 2 },
                    { label: "Comportement", count: 1 },
                    { label: "Surcharge", count: 1 },
                  ].map((tb) => (
                    <button
                      key={tb.label}
                      type="button"
                      onClick={() => setFilterTab(tb.label)}
                      className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                        filterTab === tb.label
                          ? "bg-[#1E242B] text-white shadow-xs"
                          : "bg-white border border-[#E5E0D8] text-[#666F7A] hover:bg-[#F7F4EF]"
                      }`}
                    >
                      {tb.label} ({tb.count})
                    </button>
                  ))}
                </div>
              </div>

              {/* Disputes Cards List */}
              <div className="space-y-3">
                {disputesList.map((dsp) => {
                  const isSelected = selectedDispute.id === dsp.id;
                  return (
                    <div
                      key={dsp.id}
                      onClick={() => setSelectedDispute(dsp)}
                      className={`p-5 rounded-[20px] border cursor-pointer transition-all duration-200 ${
                        isSelected
                          ? "bg-white border-[#FD4F49] shadow-md ring-2 ring-[#FD4F49]/20"
                          : "bg-white border-[#E5E0D8]/90 hover:border-[#94A3B8] shadow-xs"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-extrabold text-[#1E242B]">
                          {dsp.lot} • <span className="text-[#666F7A] font-medium">{dsp.route}</span>
                        </span>
                        <span
                          className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                            dsp.tag === "URGENT"
                              ? "bg-[#FFEBEE] text-[#D32F2F] border border-[#FFCDD2]"
                              : dsp.tag.includes("Signalé")
                              ? "bg-[#FFF3E0] text-[#F57C00] border border-[#FFE0B2]"
                              : "bg-[#F7F4EF] text-[#666F7A] border border-[#E5E0D8]"
                          }`}
                        >
                          {dsp.tag}
                        </span>
                      </div>

                      <h3 className="text-xs font-black text-[#1E242B] mt-2 leading-snug">
                        {dsp.title}
                      </h3>

                      <div className="text-[11px] text-[#D32F2F] font-bold mt-1.5 flex items-center gap-1.5">
                        <span>⚠️</span> {dsp.reason}
                      </div>

                      {dsp.quote && (
                        <p className="text-[11px] italic text-[#666F7A] mt-1.5 line-clamp-1 bg-[#F7F4EF]/50 p-2 rounded-lg border border-[#EFEBE4]">
                          {dsp.quote}
                        </p>
                      )}

                      <div className="mt-3 pt-2.5 border-t border-[#EFEBE4] flex items-center justify-between text-[11px] text-[#666F7A]">
                        <span className="font-medium">{dsp.timeAgo || "Aujourd'hui"}</span>
                        <span className="font-extrabold text-[#1E242B]">{dsp.amountLocked}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Active Dispute Details & Conversation */}
            <div className="lg:col-span-7 bg-white border border-[#E5E0D8]/90 rounded-[22px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02),0_4px_16px_rgba(30,36,43,0.03)] space-y-6">
              {/* Header Box */}
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-black text-[#1E242B]">
                      Incident {selectedDispute.id}
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FFEBEE] text-[#D32F2F] border border-[#FFCDD2]">
                      Alerte Fraude Frais
                    </span>
                  </div>
                </div>
                <p className="text-xs text-[#666F7A] mt-0.5 font-medium">
                  Axe Trans-CEMAC: Douala (Port) → N'Djamena (Zone Industrielle Farcha)
                </p>

                {/* 2 Participant cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                  <div className="p-3.5 rounded-xl border border-[#E5E0D8] bg-[#F7F4EF]/40 flex items-center justify-between shadow-2xs">
                    <div>
                      <div className="text-xs font-bold text-[#1E242B]">Cimencam B2B</div>
                      <div className="text-[11px] text-[#666F7A]">Chargeur Agréé CEMAC</div>
                    </div>
                    <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-[#E8F5E9] text-[#2E7D32] border border-[#C8E6C9]">
                      Score 98%
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl border border-[#E5E0D8] bg-[#F7F4EF]/40 flex items-center justify-between shadow-2xs">
                    <div>
                      <div className="text-xs font-bold text-[#1E242B]">Mamadou Doumbia</div>
                      <div className="text-[11px] text-[#666F7A]">Transporteur Indépendant</div>
                    </div>
                    <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-[#FFEBEE] text-[#D32F2F] border border-[#FFCDD2]">
                      1er Signalement
                    </span>
                  </div>
                </div>
              </div>

              {/* Chat Timeline */}
              <div className="space-y-4 pt-3 border-t border-[#EFEBE4]">
                <div className="text-center">
                  <span className="text-[11px] font-bold text-[#666F7A] bg-[#F7F4EF] px-3.5 py-1.5 rounded-full border border-[#E5E0D8]">
                    Début de la négociation • Aujourd'hui à 09:12
                  </span>
                </div>

                {/* Chat message bubbles */}
                <div className="space-y-4">
                  {disputeChatMessages.map((msg) => {
                    const isCarrier = msg.senderType === "carrier";
                    return (
                      <div key={msg.id} className="space-y-1">
                        <div className="text-[11px] text-[#666F7A] font-bold flex items-center gap-1.5 px-1">
                          <span>{msg.sender}</span>
                          <span className="font-normal text-[#94A3B8]">{msg.time}</span>
                        </div>

                        {msg.isFlagged ? (
                          <div className="space-y-2">
                            {/* Warning separator */}
                            <div className="flex items-center gap-2 my-2">
                              <div className="h-px bg-[#FFCDD2] flex-1" />
                              <span className="text-[10px] font-black text-[#D32F2F] uppercase tracking-wider flex items-center gap-1">
                                <span>⚠️</span> {msg.flagReason}
                              </span>
                              <div className="h-px bg-[#FFCDD2] flex-1" />
                            </div>

                            {/* Red flagged message box */}
                            <div className="p-4 rounded-2xl border-2 border-[#D32F2F] bg-[#FFF8F8] text-xs text-[#D32F2F] font-semibold leading-relaxed shadow-sm">
                              <p className="text-[13px]">{msg.text}</p>

                              <div className="mt-3 pt-2.5 border-t border-[#FFCDD2] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-[11px]">
                                <span className="font-black">⚠️ {msg.violation}</span>
                                <span className="text-[#666F7A] font-medium">Motif signalé: "Litige tarifaire & Cash"</span>
                              </div>
                            </div>
                          </div>
                        ) : isCarrier ? (
                          <div className="p-4 rounded-2xl border border-[#E5E0D8] bg-[#F7F4EF]/70 text-xs text-[#1E242B] max-w-lg leading-relaxed shadow-2xs">
                            {msg.text}
                          </div>
                        ) : (
                          <div className="p-4 rounded-2xl bg-[#1E242B] text-white text-xs max-w-lg ml-auto leading-relaxed shadow-xs">
                            {msg.text}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons Bar */}
              <div className="space-y-3 pt-4 border-t border-[#EFEBE4]">
                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#E5E0D8] bg-white text-xs font-bold text-[#1E242B] hover:bg-[#F7F4EF] shadow-2xs transition"
                  >
                    <span>📜</span> Discussion complète
                  </button>

                  <button
                    type="button"
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#F57C00] bg-[#FFF3E0] text-xs font-bold text-[#F57C00] hover:bg-[#FFE0B2] shadow-2xs transition"
                  >
                    <span>🔔</span> Avertir l'utilisateur
                  </button>

                  <button
                    type="button"
                    className="p-2.5 rounded-xl border border-[#D32F2F] text-[#D32F2F] hover:bg-[#FFEBEE] transition"
                    title="Sanctionner"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="px-3.5 py-2 rounded-xl border border-[#E5E0D8] text-xs font-semibold text-[#666F7A] hover:bg-[#F7F4EF] transition"
                  >
                    Clôturer sans suite
                  </button>

                  <button
                    type="button"
                    className="flex-1 min-w-[220px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FD4F49] to-[#E53E38] hover:brightness-110 text-white text-xs font-black shadow-[0_4px_14px_rgba(253,79,73,0.3)] transition active:scale-95"
                  >
                    <span>🛡️</span> Valider arbitrage séquestre (2 100 000 FCFA)
                  </button>
                </div>

                {/* Moderator Observations Textbox */}
                <div className="pt-2">
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-bold text-[#1E242B]">Observations internes du modérateur</span>
                    <span className="text-[#94A3B8]">Visibles uniquement par l'équipe d'exploitation Ibigo</span>
                  </div>
                  <div className="p-3.5 rounded-xl border border-[#E5E0D8] bg-[#F7F4EF]/50 text-xs text-[#1E242B] leading-relaxed">
                    <span className="font-bold text-[#FD4F49]">09:48 - Dispatcher Yannick N. :</span> Tentative de conciliation téléphonique initiée avec Mamadou D. Chauffeur prétexte une hausse subite des péages camerounais. Rappel fait de la charte Ibigo sous peine de radiation.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
export default ModerationPage;
