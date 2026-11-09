"use client";

import React, { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { StatusPill } from "@/components/admin/StatusPill";
import { kycUsers } from "@/data/mockData";

export function UsersKYCPage() {
  const [filterTab, setFilterTab] = useState("En attente de validation");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const filterTabs = [
    { label: "Tous", count: 480 },
    { label: "En attente de validation", count: 14 },
    { label: "Vérifiés", count: 412 },
    { label: "Bloqués", count: 54 },
  ];

  const toggleSelectAll = () => {
    if (selectedUsers.length === kycUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(kycUsers.map((u) => u.name));
    }
  };

  const toggleSelectUser = (name: string) => {
    if (selectedUsers.includes(name)) {
      setSelectedUsers(selectedUsers.filter((n) => n !== name));
    } else {
      setSelectedUsers([...selectedUsers, name]);
    }
  };

  return (
    <AdminLayout currentPath="/users">
      {/* Header & Badges */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-semibold text-[#666F7A] uppercase tracking-wider mb-1">
            <span>Dashboard</span>
            <span>/</span>
            <span className="text-[#FD4F49]">Conformité & Registre</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#1E242B] tracking-tight">
            Validation KYC & Utilisateurs
          </h1>
          <p className="text-xs sm:text-sm text-[#666F7A] mt-0.5">
            Contrôle de conformité et agréments pour l'accès aux bourses de fret transfrontalières
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-xl border border-[#E5E0D8] bg-white text-xs font-semibold text-[#1E242B] shadow-2xs">
            Priorité 24h: <span className="font-extrabold text-[#FD4F49]">14 dossiers</span>
          </div>
          <div className="px-3.5 py-2 rounded-xl border border-[#E5E0D8] bg-white text-xs font-semibold text-[#1E242B] shadow-2xs">
            Taux conformité: <span className="font-extrabold text-[#2E7D32]">96.4%</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-semibold">
        {filterTabs.map((tab) => {
          const isActive = filterTab === tab.label;
          return (
            <button
              key={tab.label}
              type="button"
              onClick={() => setFilterTab(tab.label)}
              className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
                isActive
                  ? "bg-[#1E242B] text-white shadow-xs font-bold"
                  : "bg-white border border-[#E5E0D8] text-[#666F7A] hover:bg-[#F7F4EF]"
              }`}
            >
              {tab.label} <span className={isActive ? "text-[#FD4F49]" : "text-[#94A3B8]"}>({tab.count})</span>
            </button>
          );
        })}
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white border border-[#E5E0D8]/90 rounded-[20px] p-4 flex flex-col md:flex-row items-center justify-between gap-3 shadow-[0_1px_3px_rgba(0,0,0,0.02),0_4px_16px_rgba(30,36,43,0.03)]">
        <div className="relative w-full md:w-96">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#94A3B8]">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Filtrer par nom, téléphone, société..."
            className="w-full pl-9 pr-3 py-2 bg-[#F7F4EF]/50 border border-[#E5E0D8] rounded-xl text-xs text-[#1E242B] placeholder-[#94A3B8] focus:outline-none focus:border-[#FD4F49] focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto flex-wrap">
          <select className="px-3.5 py-2 bg-white border border-[#E5E0D8] rounded-xl text-xs text-[#1E242B] font-semibold focus:outline-none focus:border-[#FD4F49]">
            <option>Tous les rôles</option>
            <option>Chargeur B2B</option>
            <option>Transporteur Flotte</option>
            <option>Chauffeur Indépendant</option>
          </select>

          <select className="px-3.5 py-2 bg-white border border-[#E5E0D8] rounded-xl text-xs text-[#1E242B] font-semibold focus:outline-none focus:border-[#FD4F49]">
            <option>Tous les documents</option>
            <option>CNI biométrique</option>
            <option>Carte grise CEMAC</option>
            <option>Permis lourd</option>
          </select>

          <button
            type="button"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#E5E0D8] bg-white text-xs font-semibold text-[#1E242B] hover:bg-[#F7F4EF] transition shadow-2xs"
          >
            <svg className="w-3.5 h-3.5 text-[#666F7A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" x2="12" y1="15" y2="3" />
            </svg>
            Exporter le registre
          </button>
        </div>
      </div>

      {/* Main KYC Users Table */}
      <div className="bg-white border border-[#E5E0D8]/90 rounded-[22px] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02),0_4px_16px_rgba(30,36,43,0.03)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#1E242B] text-white font-semibold">
                <th className="py-3.5 px-5 w-10">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === kycUsers.length}
                    onChange={toggleSelectAll}
                    className="rounded accent-[#FD4F49]"
                  />
                </th>
                <th className="py-3.5 px-5">Utilisateur & Société</th>
                <th className="py-3.5 px-5">Téléphone & Pays</th>
                <th className="py-3.5 px-5">Solde de Jetons</th>
                <th className="py-3.5 px-5">Rôle / Type</th>
                <th className="py-3.5 px-5">Documents soumis</th>
                <th className="py-3.5 px-5">Date soumission</th>
                <th className="py-3.5 px-5">Statut</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E0D8]/70">
              {kycUsers.map((user, idx) => {
                const isSelected = selectedUsers.includes(user.name);
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
                        onChange={() => toggleSelectUser(user.name)}
                        className="rounded accent-[#FD4F49]"
                      />
                    </td>

                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#1E242B] text-white font-bold flex items-center justify-center text-xs shrink-0 ring-2 ring-[#E5E0D8]">
                          {user.initials}
                        </div>
                        <div>
                          <div className="font-bold text-[#1E242B]">{user.name}</div>
                          <div className="text-[11px] text-[#666F7A] font-medium">{user.company}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-5 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 font-bold text-[#1E242B]">
                        <span>{user.countryFlag}</span>
                        <span>{user.phone}</span>
                      </div>
                      <div className="text-[11px] text-[#666F7A]">{user.countryLabel}</div>
                    </td>

                    <td className="py-4 px-5 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 font-black text-[#1E242B]">
                        <span className="w-2 h-2 rounded-full bg-[#FD4F49]" />
                        <span>{user.tokensAvailable} disponibles</span>
                      </div>
                      <div className="text-[11px] text-[#666F7A]">
                        {user.tokensReserved} réservé
                      </div>
                    </td>

                    <td className="py-4 px-5 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-lg bg-[#F7F4EF] border border-[#E5E0D8] text-[11px] font-bold text-[#1E242B]">
                        {user.role}
                      </span>
                    </td>

                    <td className="py-4 px-5">
                      <div className="flex flex-col gap-1 max-w-[170px]">
                        {user.documents.map((doc, dIdx) => (
                          <span
                            key={dIdx}
                            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-semibold border ${
                              doc.alert
                                ? "bg-[#FFEBEE] text-[#D32F2F] border-[#FFCDD2]"
                                : "bg-white text-[#1E242B] border-[#E5E0D8]"
                            }`}
                          >
                            <span>{doc.alert ? "⚠️" : "📄"}</span>
                            <span className="truncate">{doc.name}</span>
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="py-4 px-5 whitespace-nowrap text-[#1E242B]">
                      <div className="font-semibold">{user.submissionDate.split(" ")[0]}</div>
                      <div className="text-[11px] text-[#666F7A]">
                        {user.submissionDate.split(" ").slice(1).join(" ")}
                      </div>
                    </td>

                    <td className="py-4 px-5 whitespace-nowrap">
                      <StatusPill label={user.status} tone={user.statusTone} size="sm" />
                    </td>

                    <td className="py-4 px-5 text-right whitespace-nowrap">
                      {user.status === "Validé" ? (
                        <div className="flex items-center justify-end gap-1.5 text-xs text-[#2E7D32] font-bold">
                          <span>{user.certified ? "Certifié CEMAC" : "Actif"}</span>
                          <svg className="w-4 h-4 text-[#2E7D32]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            disabled={!user.canValidate}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 shadow-2xs transition active:scale-95 ${
                              user.canValidate
                                ? "bg-[#1E242B] hover:bg-[#2A323D] text-white"
                                : "bg-[#EFEBE4] text-[#94A3B8] cursor-not-allowed"
                            }`}
                          >
                            ✓ Valider
                          </button>
                          <button
                            type="button"
                            className="px-2.5 py-1.5 rounded-lg text-xs font-bold border border-[#D32F2F] text-[#D32F2F] hover:bg-[#FFEBEE] transition"
                          >
                            ✕ Rejeter
                          </button>
                          <button
                            type="button"
                            className="p-1.5 rounded-lg text-[#666F7A] hover:bg-[#EFEBE4] transition"
                          >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                              <circle cx="12" cy="12" r="3" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="p-4 px-6 border-t border-[#E5E0D8] flex items-center justify-between text-xs text-[#666F7A] bg-[#F7F4EF]/20">
          <span>Affichage 1-5 sur 842 utilisateurs | Lignes par page: 10</span>
          <div className="flex items-center gap-1.5 font-bold">
            <button type="button" className="px-2.5 py-1 rounded-lg border border-[#E5E0D8] text-[#94A3B8]" disabled>
              &lt;
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
              85
            </button>
            <button type="button" className="px-2.5 py-1 rounded-lg border border-[#E5E0D8] hover:bg-white transition">
              &gt;
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Card: Contrôles Douaniers & Postes Frontaliers Actifs */}
      <div className="bg-white border border-[#E5E0D8]/90 rounded-[22px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02),0_4px_16px_rgba(30,36,43,0.03)] space-y-6">
        <div>
          <h2 className="text-base font-extrabold text-[#1E242B]">
            Contrôles Douaniers & Postes Frontaliers Actifs
          </h2>
          <p className="text-xs text-[#666F7A] mt-0.5">
            Intégrité du corridor d'approvisionnement Bangui - Moundou - N'Djamena
          </p>
        </div>

        <div className="relative py-4 px-2">
          <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-[#FD4F49] -translate-y-1/2 rounded-full" />
          <div className="relative flex justify-between">
            {[
              { name: "Bangui (RCA)", sub: "Départ Fret", active: true },
              { name: "Sibut", sub: "Poste de pesage", active: true },
              { name: "Kaga-Bandoro", sub: "Poste mixte", active: true },
              { name: "Sarh (Frontière)", sub: "Douane CEMAC", active: false },
              { name: "N'Djamena (Tchad)", sub: "Terminus Fret", active: false },
            ].map((pt, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div
                  className={`w-5 h-5 rounded-full border-3 border-white shadow-md z-10 flex items-center justify-center ${
                    pt.active ? "bg-[#FD4F49]" : "bg-[#94A3B8]"
                  }`}
                >
                  {pt.active && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
                <span className="text-xs font-bold text-[#1E242B] mt-2 whitespace-nowrap">
                  {pt.name}
                </span>
                <span className="text-[10px] text-[#666F7A] whitespace-nowrap font-medium">
                  {pt.sub}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#F7F4EF]/50 border border-[#E5E0D8] rounded-2xl p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#FFF0EB] text-[#FD4F49] flex items-center justify-center shrink-0 border border-[#FD4F49]/20 shadow-2xs">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-[#1E242B]">
                  Dossier actif en attente de décision: Socatraf BTP SARL
                </h3>
                <p className="text-xs text-[#666F7A]">
                  Examen express du camion RC 4820-BG et conformité corridor Centrafrique-Tchad
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-[#666F7A]">
                CONTRÔLE BIOMÉTRIQUE: <span className="text-[#2E7D32] font-black">OK</span>
              </span>
              <button
                type="button"
                className="px-4 py-2 bg-gradient-to-r from-[#FD4F49] to-[#E53E38] hover:brightness-110 text-white text-xs font-bold rounded-xl shadow-[0_4px_12px_rgba(253,79,73,0.25)] transition active:scale-95"
              >
                Ouvrir inspection complète (Split-screen)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="bg-white p-3.5 rounded-xl border border-[#E5E0D8] shadow-2xs">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#1E242B]">
                <span className="text-[#2E7D32]">✓</span> CNI Transporteur
              </div>
              <div className="text-[11px] text-[#666F7A] mt-1 font-medium">Valide jusqu'au 14/09/2028</div>
              <div className="text-[10px] text-[#2E7D32] font-bold mt-0.5">Vérifiée via Police Frontière</div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-[#E5E0D8] shadow-2xs">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#1E242B]">
                <span className="text-[#2E7D32]">✓</span> Carte Grise & PTAC
              </div>
              <div className="text-[11px] text-[#666F7A] mt-1 font-medium">Plateau 40T - RC 4820-BG</div>
              <div className="text-[10px] text-[#2E7D32] font-bold mt-0.5">Jauge essieu conforme</div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-[#E5E0D8] shadow-2xs">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#1E242B]">
                <span className="text-[#F57C00]">⏳</span> Assurance Inter-États
              </div>
              <div className="text-[11px] text-[#666F7A] mt-1 font-medium">Carte Rose CEMAC #44901</div>
              <div className="text-[10px] text-[#F57C00] font-bold mt-0.5">En attente quittance courtier</div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-[#E5E0D8] shadow-2xs">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#1E242B]">
                <span className="text-[#2E7D32]">✓</span> Solde Garantie Caution
              </div>
              <div className="text-[11px] text-[#666F7A] mt-1 font-medium">Dépôt séquestre 5 000 000 FCFA</div>
              <div className="text-[10px] text-[#2E7D32] font-bold mt-0.5">Couverture active corridor</div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
export default UsersKYCPage;
