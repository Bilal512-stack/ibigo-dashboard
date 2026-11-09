"use client";

import React from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { tokenStats, tokenRequests } from "@/data/mockData";

export function TokensPage() {
  return (
    <AdminLayout currentPath="/tokens">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-semibold text-[#666F7A] uppercase tracking-wider mb-1">
            <span>Dashboard</span>
            <span>/</span>
            <span className="text-[#FD4F49]">Tokenomics & Mises en Relation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#1E242B] tracking-tight">
            Suivi des Jetons & Mises en relation
          </h1>
          <p className="text-xs sm:text-sm text-[#666F7A] mt-0.5">
            Supervision des attributions gratuites à l'inscription et déblocage bilatéral lors des manifestations d'intérêt sur le corridor
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[#E5E0D8] bg-white text-xs font-bold text-[#1E242B] hover:bg-[#F7F4EF] shadow-2xs transition"
          >
            <svg className="w-3.5 h-3.5 text-[#666F7A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" x2="12" y1="15" y2="3" />
            </svg>
            Rapport d'Audit CSV
          </button>

          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1E242B] text-white text-xs font-bold hover:bg-[#2A323D] shadow-xs transition"
          >
            <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
            Paramètres de Rétention
          </button>
        </div>
      </div>

      {/* 3 Large Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {tokenStats.map((st, idx) => (
          <div
            key={idx}
            className="bg-white border border-[#E5E0D8]/90 rounded-[22px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02),0_4px_16px_rgba(30,36,43,0.03)] hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#666F7A] uppercase tracking-wider">
                {st.title}
              </span>
              <div className="w-9 h-9 rounded-xl bg-[#FFF0EB] border border-[#FD4F49]/20 flex items-center justify-center text-[#FD4F49]">
                <span className="text-base">🪙</span>
              </div>
            </div>

            <div className="my-4">
              <span className="text-3xl font-black text-[#1E242B] tracking-tight">
                {st.value}
              </span>
              <div className="text-xs font-bold text-[#1E242B] mt-1">
                {st.subtitle}
              </div>
            </div>

            <div className="pt-3 border-t border-[#EFEBE4] flex items-center justify-between text-[11px] text-[#666F7A]">
              <span className="line-clamp-1">{st.tagline}</span>
              <span className="font-extrabold text-[#1E242B] shrink-0 ml-2">{st.statRight}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Corridor Matching Activity Line */}
      <div className="bg-white border border-[#E5E0D8]/90 rounded-[22px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02),0_4px_16px_rgba(30,36,43,0.03)] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-3 border-b border-[#EFEBE4]">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-[#FFF0EB] text-[#FD4F49] flex items-center justify-center text-xs font-bold">
              ⚡
            </span>
            <h2 className="text-sm font-extrabold text-[#1E242B]">
              Activité de Matching le long de l'Axe Fret
            </h2>
          </div>
          <span className="text-xs font-bold text-[#666F7A] bg-[#F7F4EF] px-3 py-1 rounded-full border border-[#E5E0D8]">
            1 520 km • Bangui (RCA) → N'Djamena (Tchad)
          </span>
        </div>

        {/* Steps Track */}
        <div className="relative py-6 px-4">
          <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-[#FD4F49] -translate-y-1/2 rounded-full" />
          <div className="relative flex justify-between">
            {[
              { name: "Bangui", sub: "Origine Sud", num: "1", active: true },
              { name: "Sibut", sub: "Poste PK186", active: true },
              { name: "Bossangoa", sub: "Contrôle Fret", active: true },
              { name: "Sarh", sub: "Frontière Tchad", active: true },
              { name: "Guelendeng", sub: "Péage Transit", active: false },
              { name: "N'Djamena", sub: "Hub Nord", num: "2", active: false },
            ].map((pt, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div
                  className={`w-7 h-7 rounded-full border-3 border-white shadow-md z-10 flex items-center justify-center text-[10px] font-black text-white ${
                    pt.active ? "bg-[#FD4F49]" : "bg-[#1E242B]"
                  }`}
                >
                  {pt.num || "•"}
                </div>
                <span className="text-xs font-extrabold text-[#1E242B] mt-2 whitespace-nowrap">
                  {pt.name}
                </span>
                <span className="text-[10px] text-[#666F7A] whitespace-nowrap font-medium">
                  {pt.sub}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Table: Requêtes & Cycles de Vie Récents */}
      <div className="bg-white border border-[#E5E0D8]/90 rounded-[22px] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02),0_4px_16px_rgba(30,36,43,0.03)]">
        <div className="p-5 px-6 border-b border-[#E5E0D8] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <h2 className="text-base font-extrabold text-[#1E242B]">
              Requêtes & Cycles de Vie Récents
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-[#FFF0EB] text-[#FD4F49] text-[11px] font-bold border border-[#FD4F49]/20">
              4 requêtes prioritaires
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E5E0D8] text-xs font-medium text-[#1E242B] bg-[#F7F4EF]/50">
              <span className="text-[#666F7A]">Filtrer par état:</span>
              <select className="bg-transparent font-bold focus:outline-none">
                <option>Tous les états</option>
                <option>En négociation</option>
                <option>Confirmé</option>
                <option>Expiré</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#1E242B] text-white font-semibold">
                <th className="py-3.5 px-6">Initiateur de la demande</th>
                <th className="py-3.5 px-6">Destinataire cible</th>
                <th className="py-3.5 px-6">Annonce associée</th>
                <th className="py-3.5 px-6">Statut du jeton & requête</th>
                <th className="py-3.5 px-6">Horodatage & Timer</th>
                <th className="py-3.5 px-6 text-right">Action administrateur</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E0D8]/70">
              {tokenRequests.map((req, idx) => (
                <tr key={idx} className="hover:bg-[#F7F4EF]/70 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#1E242B] text-white font-bold flex items-center justify-center text-xs shrink-0 ring-2 ring-[#E5E0D8]">
                        {req.initiator.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-extrabold text-[#1E242B]">{req.initiator.name}</div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="px-1.5 py-0.5 rounded bg-[#F7F4EF] border border-[#E5E0D8] text-[9.5px] font-bold text-[#1E242B]">
                            {req.initiator.role}
                          </span>
                          <span className="text-[10px] text-[#666F7A] font-medium">{req.initiator.tokens}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#FFF0EB] text-[#FD4F49] font-bold flex items-center justify-center text-xs shrink-0 border border-[#FD4F49]/20">
                        {req.target.initials}
                      </div>
                      <div>
                        <div className="font-extrabold text-[#1E242B]">{req.target.name}</div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="px-1.5 py-0.5 rounded bg-[#F7F4EF] border border-[#E5E0D8] text-[9.5px] font-bold text-[#1E242B]">
                            {req.target.role}
                          </span>
                          <span className="text-[10px] text-[#666F7A] font-medium">{req.target.tokens}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1.5">
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#FFF3E0] text-[#F57C00] border border-[#FFE0B2]">
                        {req.announcement.tag}
                      </span>
                      <span className="font-bold text-[#1E242B]">{req.announcement.title}</span>
                    </div>
                    <div className="text-[11px] text-[#666F7A] mt-0.5 flex items-center gap-1 font-medium">
                      <span>📍</span> {req.announcement.corridor}
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    <div
                      className={`p-2.5 rounded-xl border text-xs ${
                        req.status.type === "confirmed"
                          ? "bg-[#E8F5E9] text-[#2E7D32] border-[#C8E6C9]"
                          : req.status.type === "reserved"
                          ? "bg-[#FFF3E0] text-[#F57C00] border-[#FFE0B2]"
                          : req.status.type === "expired"
                          ? "bg-[#FFEBEE] text-[#D32F2F] border-[#FFCDD2]"
                          : "bg-[#F7F4EF] text-[#666F7A] border-[#E5E0D8]"
                      }`}
                    >
                      <div className="font-bold flex items-center gap-1">
                        {req.status.type === "confirmed" && "✓"}
                        {req.status.type === "reserved" && "⏱"}
                        {req.status.type === "expired" && "⚠️"}
                        {req.status.label}
                      </div>
                      <div className="text-[10px] opacity-80 mt-0.5 font-medium">{req.status.desc}</div>
                    </div>
                  </td>

                  <td className="py-4 px-6 whitespace-nowrap">
                    <div
                      className={`font-black ${
                        req.status.type === "expired"
                          ? "text-[#D32F2F]"
                          : req.status.type === "reserved"
                          ? "text-[#F57C00]"
                          : "text-[#1E242B]"
                      }`}
                    >
                      {req.timer}
                    </div>
                    <div className="text-[11px] text-[#666F7A] mt-0.5">{req.timeSent}</div>
                  </td>

                  <td className="py-4 px-6 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      {req.isPriority ? (
                        <button
                          type="button"
                          className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#FD4F49] to-[#E53E38] hover:brightness-110 text-white font-bold text-xs flex items-center gap-1.5 shadow-[0_4px_12px_rgba(253,79,73,0.25)] transition active:scale-95"
                        >
                          <span>🔄</span> Libérer le jeton réservé
                        </button>
                      ) : (
                        <>
                          {req.actions.map((act, aIdx) => (
                            <button
                              key={aIdx}
                              type="button"
                              className="px-3 py-1.5 rounded-xl border border-[#E5E0D8] bg-white text-[#1E242B] font-bold text-xs hover:bg-[#F7F4EF] shadow-2xs transition"
                            >
                              {act}
                            </button>
                          ))}
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 px-6 border-t border-[#E5E0D8] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#666F7A] bg-[#F7F4EF]/20">
          <div className="flex items-center gap-2 font-medium">
            <span>Affichage de 1 à 4 sur 74 transactions actives</span>
            <span className="text-[#FD4F49] font-bold">• Priorité de déblocage manuel activée pour incidents réseau</span>
          </div>

          <div className="flex items-center gap-1.5 font-bold">
            <button type="button" className="px-2.5 py-1 rounded-lg border border-[#E5E0D8] text-[#94A3B8]" disabled>
              Précédent
            </button>
            <button type="button" className="px-3 py-1 rounded-lg bg-[#1E242B] text-white">
              1
            </button>
            <button type="button" className="px-3 py-1 rounded-lg border border-[#E5E0D8] hover:bg-white transition">
              2
            </button>
            <button type="button" className="px-3 py-1 rounded-lg border border-[#E5E0D8] hover:bg-white transition">
              3
            </button>
            <span className="px-1 text-[#94A3B8]">...</span>
            <button type="button" className="px-3 py-1 rounded-lg border border-[#E5E0D8] hover:bg-white transition">
              8
            </button>
            <button type="button" className="px-2.5 py-1 rounded-lg border border-[#E5E0D8] hover:bg-white transition">
              Suivant
            </button>
          </div>
        </div>
      </div>

      {/* Protocol & Override */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-[#E5E0D8]/90 rounded-[22px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02),0_4px_16px_rgba(30,36,43,0.03)] flex flex-col justify-between space-y-5">
          <div>
            <h3 className="text-base font-extrabold text-[#1E242B]">
              Protocole de Séquestre Bilatéral (Smart Hold)
            </h3>
            <p className="text-xs text-[#666F7A] mt-1 leading-relaxed">
              Pour éliminer le spam et responsabiliser les acteurs du transit transfrontalier, le moteur d'appariement applique un séquestre strict sur les jetons :
            </p>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-xl border border-[#EFEBE4] bg-[#F7F4EF]/50 flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-lg bg-[#FD4F49] text-white font-black text-xs flex items-center justify-center shrink-0 shadow-2xs">
                A
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#1E242B]">
                  Étape 1 : Réservation Unilatérale (Hold Initiateur)
                </h4>
                <p className="text-[11px] text-[#666F7A] mt-0.5 leading-relaxed">
                  L'initiateur clique sur « Contacter ». 1 jeton passe instantanément du solde « Disponible » au solde « Réservé ». Le compte à rebours de 48h démarre.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-[#EFEBE4] bg-[#F7F4EF]/50 flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-lg bg-[#2E7D32] text-white font-black text-xs flex items-center justify-center shrink-0 shadow-2xs">
                B
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#1E242B]">
                  Étape 2 : Validation Réciproque (Hold Destinataire & Burn)
                </h4>
                <p className="text-[11px] text-[#666F7A] mt-0.5 leading-relaxed">
                  Le destinataire accepte : 1 jeton lui est débité en miroir. Les 2 jetons sont consommés définitivement. Le numéro de téléphone direct et le waybill WhatsApp s'affichent.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#EFEBE4] flex items-center justify-between text-[11px] text-[#666F7A]">
            <span>Réf. Technique : RFC-CEMAC-778</span>
            <span className="text-[#2E7D32] font-bold">Conforme Réglementation CEMAC Transit</span>
          </div>
        </div>

        <div className="bg-white border border-[#E5E0D8]/90 rounded-[22px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02),0_4px_16px_rgba(30,36,43,0.03)] flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-base font-extrabold text-[#1E242B]">
              Dérogation d'Urgence Corridor (Override Manuel)
            </h3>
            <p className="text-xs text-[#666F7A] mt-1 leading-relaxed">
              En raison des coupures fréquentes de fibre optique entre Sibut et Guelendeng, les administrateurs disposent des privilèges de déblocage manuel direct :
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl border border-[#E5E0D8] bg-[#F7F4EF]/50">
              <span className="text-[10px] font-bold text-[#666F7A] uppercase">Réseau Damara / Sibut</span>
              <div className="text-xs font-bold text-[#1E242B] mt-0.5">2G / SMS Gateway actif</div>
              <div className="text-[10px] text-[#2E7D32] font-semibold mt-1">Validation automatique par code USSD</div>
            </div>

            <div className="p-3.5 rounded-xl border border-[#E5E0D8] bg-[#F7F4EF]/50">
              <span className="text-[10px] font-bold text-[#666F7A] uppercase">Frontière Sarh / Danamadji</span>
              <div className="text-xs font-bold text-[#1E242B] mt-0.5">Poste Douane Connecté</div>
              <div className="text-[10px] text-[#2E7D32] font-semibold mt-1">Débit direct sur badge chauffeur</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-[#FFE0B2] bg-[#FFF3E0]/70 text-[11px] text-[#F57C00] leading-relaxed">
            <span className="font-bold">Traçabilité administrative :</span> Chaque clic sur « Libérer le jeton réservé » inscrit une signature cryptographique dans les journaux d'audit du corridor pour prévenir les dérives d'agents.
          </div>

          <div className="pt-3 border-t border-[#EFEBE4] flex items-center justify-between text-xs">
            <span className="text-[#666F7A] font-medium">Poste Superviseur : Bangui Central</span>
            <button type="button" className="text-[#FD4F49] font-bold hover:underline">
              Consulter le registre de conformité →
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
export default TokensPage;
