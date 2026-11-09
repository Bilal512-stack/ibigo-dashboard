"use client";

import React, { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { StatusPill } from "@/components/admin/StatusPill";
import { carrierDocumentsQueue, type CarrierDocument } from "@/data/mockData";

export function DocumentsPage() {
  const [filterTab, setFilterTab] = useState("Tous");
  const [selectedCountry, setSelectedCountry] = useState("Tous");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [activeDoc, setActiveDoc] = useState<CarrierDocument>(carrierDocumentsQueue[0]);
  const [isInspectorOpen, setIsInspectorOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDocs = carrierDocumentsQueue.filter((doc) => {
    if (filterTab === "En attente" && doc.status !== "En attente" && doc.status !== "En cours d'analyse") {
      return false;
    }
    if (filterTab === "Validés" && doc.status !== "Validé") return false;
    if (filterTab === "Rejetés" && doc.status !== "Rejeté" && doc.status !== "Expiré") return false;

    if (selectedCountry !== "Tous" && doc.country !== selectedCountry) return false;
    if (selectedCategory !== "Tous" && doc.documentCategory !== selectedCategory) return false;

    if (
      searchTerm &&
      !doc.carrierName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !doc.documentType.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !doc.documentNumber.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  return (
    <AdminLayout currentPath="/documents">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-semibold text-[#666F7A] uppercase tracking-wider mb-1">
            <span>Dashboard</span>
            <span>/</span>
            <span className="text-[#FD4F49]">Conformité & Registre</span>
            <span>/</span>
            <span className="text-[#1E242B]">Validation Documentaire</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#1E242B] tracking-tight">
            Analyse & Validation des Documents Transporteurs
          </h1>
          <p className="text-xs sm:text-sm text-[#666F7A] mt-0.5">
            Contrôle biométrique, cartes grises CEMAC, permis lourds et assurances inter-états (RCA • Cameroun • Tchad)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-xl border border-[#E5E0D8] bg-white text-xs font-semibold text-[#1E242B] shadow-2xs">
            En attente : <span className="font-black text-[#FD4F49]">12 pièces</span>
          </div>
          <div className="px-3.5 py-2 rounded-xl border border-[#E5E0D8] bg-white text-xs font-semibold text-[#1E242B] shadow-2xs">
            Conformité globale : <span className="font-black text-[#2E7D32]">94.2%</span>
          </div>
        </div>
      </div>

      {/* Quick Filter Tabs & Categories */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold">
          {["Tous", "En attente", "Validés", "Rejetés"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilterTab(tab)}
              className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
                filterTab === tab
                  ? "bg-[#1E242B] text-white shadow-xs font-bold"
                  : "bg-white border border-[#E5E0D8] text-[#666F7A] hover:bg-[#F7F4EF]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="px-3 py-1.5 bg-white border border-[#E5E0D8] rounded-xl text-xs font-bold text-[#1E242B] focus:outline-none focus:border-[#FD4F49]"
          >
            <option value="Tous">Tous les pays (CMR • RCA • TCHAD)</option>
            <option value="CMR">🇨🇲 Cameroun (CMR)</option>
            <option value="RCA">🇨🇫 Centrafrique (RCA)</option>
            <option value="TCHAD">🇹🇩 Tchad (TCHAD)</option>
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1.5 bg-white border border-[#E5E0D8] rounded-xl text-xs font-bold text-[#1E242B] focus:outline-none focus:border-[#FD4F49]"
          >
            <option value="Tous">Toutes les catégories</option>
            <option value="Véhicule">Véhicule (Carte grise, PTAC)</option>
            <option value="Assurance">Assurance (Carte Rose)</option>
            <option value="Identité">Identité (Permis, CNI)</option>
            <option value="Agrément Fiscal">Agrément & TIPAC</option>
          </select>

          <button
            type="button"
            onClick={() => setIsInspectorOpen(!isInspectorOpen)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 ${
              isInspectorOpen
                ? "bg-[#FD4F49] text-white border-[#FD4F49]"
                : "bg-white text-[#1E242B] border-[#E5E0D8] hover:bg-[#F7F4EF]"
            }`}
          >
            <span>🔍</span> {isInspectorOpen ? "Masquer Inspecteur" : "Afficher Inspecteur"}
          </button>
        </div>
      </div>

      {/* Main Grid: Document List (Left) + Split-Screen Inspector (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Documents Table */}
        <div className={isInspectorOpen ? "lg:col-span-7 space-y-4" : "lg:col-span-12 space-y-4"}>
          <div className="bg-white border border-[#E5E0D8]/90 rounded-[22px] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02),0_4px_16px_rgba(30,36,43,0.03)]">
            <div className="p-4 px-6 border-b border-[#E5E0D8] bg-[#F7F4EF]/30 flex items-center justify-between">
              <div className="relative flex-1 max-w-sm">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#94A3B8]">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Chercher par chauffeur, n° document, plaque..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-white border border-[#E5E0D8] rounded-xl text-xs text-[#1E242B] placeholder-[#94A3B8] focus:outline-none focus:border-[#FD4F49]"
                />
              </div>

              <span className="text-xs font-bold text-[#666F7A]">
                {filteredDocs.length} documents répertoriés
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#1E242B] text-white font-semibold">
                    <th className="py-3.5 px-5">Transporteur</th>
                    <th className="py-3.5 px-5">Pièce & Catégorie</th>
                    <th className="py-3.5 px-5">Numéro & Validité</th>
                    <th className="py-3.5 px-5">Statut</th>
                    <th className="py-3.5 px-5 text-right">Inspecter</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E0D8]/70">
                  {filteredDocs.map((doc) => {
                    const isSelected = activeDoc.id === doc.id;
                    return (
                      <tr
                        key={doc.id}
                        onClick={() => {
                          setActiveDoc(doc);
                          setIsInspectorOpen(true);
                        }}
                        className={`cursor-pointer transition-colors ${
                          isSelected
                            ? "bg-[#FFF0EB]/50 border-l-4 border-l-[#FD4F49]"
                            : "hover:bg-[#F7F4EF]/70"
                        }`}
                      >
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-xl bg-[#1E242B] text-white font-bold flex items-center justify-center text-xs shrink-0 ring-1 ring-[#E5E0D8]">
                              {doc.carrierAvatar}
                            </div>
                            <div>
                              <div className="font-extrabold text-[#1E242B] flex items-center gap-1.5">
                                <span>{doc.carrierName}</span>
                                <span>{doc.countryFlag}</span>
                              </div>
                              <div className="text-[10.5px] text-[#666F7A] line-clamp-1">
                                {doc.company}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-5">
                          <div className="font-bold text-[#1E242B]">{doc.documentType}</div>
                          <span className="inline-block mt-0.5 px-2 py-0.5 rounded bg-[#F7F4EF] border border-[#E5E0D8] text-[9.5px] font-bold text-[#666F7A]">
                            {doc.documentCategory}
                          </span>
                        </td>

                        <td className="py-4 px-5 whitespace-nowrap">
                          <div className="font-mono text-[11px] font-bold text-[#1E242B]">
                            {doc.documentNumber}
                          </div>
                          <div
                            className={`text-[10px] font-bold mt-0.5 ${
                              doc.expiryDate.includes("Expiré")
                                ? "text-[#D32F2F]"
                                : "text-[#666F7A]"
                            }`}
                          >
                            Expire le {doc.expiryDate}
                          </div>
                        </td>

                        <td className="py-4 px-5 whitespace-nowrap">
                          <StatusPill label={doc.status} tone={doc.statusTone} size="sm" />
                        </td>

                        <td className="py-4 px-5 text-right whitespace-nowrap">
                          <button
                            type="button"
                            className="px-3 py-1 rounded-lg border border-[#E5E0D8] bg-white hover:bg-[#FD4F49] hover:text-white hover:border-[#FD4F49] text-xs font-bold transition shadow-2xs"
                          >
                            Examen →
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right: Split-Screen Inspector */}
        {isInspectorOpen && (
          <div className="lg:col-span-5 bg-white border border-[#E5E0D8]/90 rounded-[22px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02),0_4px_16px_rgba(30,36,43,0.03)] space-y-6 sticky top-24">
            <div className="flex items-center justify-between pb-3 border-b border-[#EFEBE4]">
              <div>
                <span className="text-[10px] font-bold text-[#FD4F49] uppercase tracking-wider">
                  Module d'Inspection CEMAC
                </span>
                <h2 className="text-base font-black text-[#1E242B]">
                  Dossier #{activeDoc.id}
                </h2>
              </div>
              <StatusPill label={activeDoc.status} tone={activeDoc.statusTone} />
            </div>

            {/* Simulated Document Preview Viewer */}
            <div className="relative rounded-2xl border-2 border-dashed border-[#E5E0D8] bg-[#F7F4EF]/70 p-6 flex flex-col items-center justify-center text-center overflow-hidden min-h-[220px]">
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md border border-[#2E7D32] bg-[#E8F5E9] text-[#2E7D32] text-[10px] font-black uppercase tracking-wider rotate-6">
                CEMAC • VALIDE 2024
              </div>

              <div className="w-14 h-14 rounded-2xl bg-white shadow-xs border border-[#E5E0D8] flex items-center justify-center text-2xl text-[#FD4F49] mb-3">
                📄
              </div>

              <h3 className="text-xs font-black text-[#1E242B]">
                {activeDoc.documentType}
              </h3>
              <p className="text-[11px] text-[#666F7A] mt-1 font-mono">
                Ref: {activeDoc.documentNumber}
              </p>
              <p className="text-[10px] text-[#94A3B8] mt-0.5">
                {activeDoc.fileSize}
              </p>

              <div className="mt-4 flex items-center gap-2">
                <button
                  type="button"
                  className="px-3 py-1 rounded-lg bg-white border border-[#E5E0D8] hover:bg-[#F7F4EF] text-xs font-bold text-[#1E242B] shadow-2xs transition"
                >
                  Plein écran ⛶
                </button>
                <button
                  type="button"
                  className="px-3 py-1 rounded-lg bg-white border border-[#E5E0D8] hover:bg-[#F7F4EF] text-xs font-bold text-[#1E242B] shadow-2xs transition"
                >
                  Télécharger original ⬇
                </button>
              </div>
            </div>

            {/* Carrier & Document Checklist */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold text-[#1E242B] uppercase tracking-wider">
                Vérifications de Conformité
              </h4>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#F7F4EF]/50 border border-[#EFEBE4]">
                  <span className="font-semibold text-[#1E242B]">Plaque & Jauge Essieu</span>
                  <span className="font-bold text-[#2E7D32]">✓ Certifié conforme</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#F7F4EF]/50 border border-[#EFEBE4]">
                  <span className="font-semibold text-[#1E242B]">Filigrane CEMAC & Sceau Sécurité</span>
                  <span className="font-bold text-[#2E7D32]">✓ Authentique</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#F7F4EF]/50 border border-[#EFEBE4]">
                  <span className="font-semibold text-[#1E242B]">Police d'Assurance Frontalière</span>
                  <span className={activeDoc.expiryDate.includes("Expiré") ? "font-bold text-[#D32F2F]" : "font-bold text-[#2E7D32]"}>
                    {activeDoc.expiryDate.includes("Expiré") ? "✕ Date dépassée" : "✓ Active"}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#FFF3E0]/70 border border-[#FFE0B2] text-[11px] text-[#F57C00] leading-relaxed">
                <span className="font-bold">Observation audit :</span> {activeDoc.matchNotes}
              </div>
            </div>

            {/* Validation Actions Console */}
            <div className="pt-3 border-t border-[#EFEBE4] space-y-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="flex-1 py-2.5 px-3 rounded-xl bg-[#2E7D32] hover:bg-[#256629] text-white text-xs font-bold shadow-xs transition active:scale-95"
                >
                  ✓ Valider & Activer sur le Corridor
                </button>
                <button
                  type="button"
                  className="py-2.5 px-3 rounded-xl border border-[#D32F2F] text-[#D32F2F] hover:bg-[#FFEBEE] text-xs font-bold transition"
                >
                  ✕ Rejeter
                </button>
              </div>

              <button
                type="button"
                className="w-full py-2 px-3 rounded-xl border border-[#E5E0D8] bg-[#F7F4EF] hover:bg-white text-xs font-semibold text-[#666F7A] transition"
              >
                Demander une quittance complémentaire par SMS/WhatsApp
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
export default DocumentsPage;
