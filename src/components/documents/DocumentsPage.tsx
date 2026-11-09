"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { useState } from "react";
import { StatusPill } from "@/components/ui/StatusPill";
import { carrierDocumentsQueue } from "@/lib/mock-data/documents";
import type { CarrierDocument } from "@/types";

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
    <>
      {/* Header */}
      <PageHeader
        breadcrumb={["Conformité & Registre", "Validation Documentaire"]}
        title="Analyse & Validation des Documents Transporteurs"
        description="Contrôle biométrique, cartes grises CEMAC, permis lourds et assurances inter-états (RCA • Cameroun • Tchad)"
      >
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-xl border border-line bg-surface text-xs font-semibold text-ink shadow-2xs">
            En attente : <span className="font-bold text-accent">12 pièces</span>
          </div>
          <div className="px-3.5 py-2 rounded-xl border border-line bg-surface text-xs font-semibold text-ink shadow-2xs">
            Conformité globale : <span className="font-bold text-success">94.2%</span>
          </div>
        </div>
      </PageHeader>

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
                  ? "bg-dark-card text-white shadow-xs font-bold"
                  : "bg-surface border border-line text-muted hover:bg-sand"
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
            className="px-3 py-1.5 bg-surface border border-line rounded-xl text-xs font-bold text-ink focus:outline-none focus:border-accent"
          >
            <option value="Tous">Tous les pays (CMR • RCA • TCHAD)</option>
            <option value="CMR">🇨🇲 Cameroun (CMR)</option>
            <option value="RCA">🇨🇫 Centrafrique (RCA)</option>
            <option value="TCHAD">🇹🇩 Tchad (TCHAD)</option>
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1.5 bg-surface border border-line rounded-xl text-xs font-bold text-ink focus:outline-none focus:border-accent"
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
                ? "bg-accent text-white border-accent"
                : "bg-surface text-ink border-line hover:bg-sand"
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
          <div className="bg-surface border border-line/90 rounded-card overflow-hidden shadow-card">
            <div className="p-4 px-6 border-b border-line bg-sand/30 flex items-center justify-between">
              <div className="relative flex-1 max-w-sm">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-faint">
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
                  className="w-full pl-9 pr-3 py-1.5 bg-surface border border-line rounded-xl text-xs text-ink placeholder-faint focus:outline-none focus:border-accent"
                />
              </div>

              <span className="text-xs font-bold text-muted">
                {filteredDocs.length} documents répertoriés
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-dark-card text-white font-semibold">
                    <th className="py-3.5 px-5">Transporteur</th>
                    <th className="py-3.5 px-5">Pièce & Catégorie</th>
                    <th className="py-3.5 px-5">Numéro & Validité</th>
                    <th className="py-3.5 px-5">Statut</th>
                    <th className="py-3.5 px-5 text-right">Inspecter</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line/70">
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
                            ? "bg-accent-soft/50 border-l-4 border-l-accent"
                            : "hover:bg-sand/70"
                        }`}
                      >
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-xl bg-dark-card text-white font-bold flex items-center justify-center text-xs shrink-0 ring-1 ring-line">
                              {doc.carrierAvatar}
                            </div>
                            <div>
                              <div className="font-bold text-ink flex items-center gap-1.5">
                                <span>{doc.carrierName}</span>
                                <span>{doc.countryFlag}</span>
                              </div>
                              <div className="text-[10.5px] text-muted line-clamp-1">
                                {doc.company}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-5">
                          <div className="font-bold text-ink">{doc.documentType}</div>
                          <span className="inline-block mt-0.5 px-2 py-0.5 rounded bg-sand border border-line text-[9.5px] font-bold text-muted">
                            {doc.documentCategory}
                          </span>
                        </td>

                        <td className="py-4 px-5 whitespace-nowrap">
                          <div className="font-mono text-[11px] font-bold text-ink">
                            {doc.documentNumber}
                          </div>
                          <div
                            className={`text-[10px] font-bold mt-0.5 ${
                              doc.expiryDate.includes("Expiré")
                                ? "text-danger"
                                : "text-muted"
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
                            className="px-3 py-1 rounded-lg border border-line bg-surface hover:bg-accent hover:text-white hover:border-accent text-xs font-bold transition shadow-2xs"
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
          <div className="lg:col-span-5 bg-surface border border-line/90 rounded-card p-6 shadow-card space-y-6 sticky top-24">
            <div className="flex items-center justify-between pb-3 border-b border-line-subtle">
              <div>
                <span className="text-[10px] font-bold text-accent uppercase tracking-wider">
                  Module d’Inspection CEMAC
                </span>
                <h2 className="text-base font-bold text-ink">
                  Dossier #{activeDoc.id}
                </h2>
              </div>
              <StatusPill label={activeDoc.status} tone={activeDoc.statusTone} />
            </div>

            {/* Simulated Document Preview Viewer */}
            <div className="relative rounded-2xl border-2 border-dashed border-line bg-sand/70 p-6 flex flex-col items-center justify-center text-center overflow-hidden min-h-[220px]">
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md border border-success bg-success-soft text-success text-[10px] font-bold uppercase tracking-wider rotate-6">
                CEMAC • VALIDE 2024
              </div>

              <div className="w-14 h-14 rounded-2xl bg-surface shadow-xs border border-line flex items-center justify-center text-2xl text-accent mb-3">
                📄
              </div>

              <h3 className="text-xs font-bold text-ink">
                {activeDoc.documentType}
              </h3>
              <p className="text-[11px] text-muted mt-1 font-mono">
                Ref: {activeDoc.documentNumber}
              </p>
              <p className="text-[10px] text-faint mt-0.5">
                {activeDoc.fileSize}
              </p>

              <div className="mt-4 flex items-center gap-2">
                <button
                  type="button"
                  className="px-3 py-1 rounded-lg bg-surface border border-line hover:bg-sand text-xs font-bold text-ink shadow-2xs transition"
                >
                  Plein écran ⛶
                </button>
                <button
                  type="button"
                  className="px-3 py-1 rounded-lg bg-surface border border-line hover:bg-sand text-xs font-bold text-ink shadow-2xs transition"
                >
                  Télécharger original ⬇
                </button>
              </div>
            </div>

            {/* Carrier & Document Checklist */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-ink uppercase tracking-wider">
                Vérifications de Conformité
              </h4>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-sand/50 border border-line-subtle">
                  <span className="font-semibold text-ink">Plaque & Jauge Essieu</span>
                  <span className="font-bold text-success">✓ Certifié conforme</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-sand/50 border border-line-subtle">
                  <span className="font-semibold text-ink">Filigrane CEMAC & Sceau Sécurité</span>
                  <span className="font-bold text-success">✓ Authentique</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-sand/50 border border-line-subtle">
                  <span className="font-semibold text-ink">Police d’Assurance Frontalière</span>
                  <span className={activeDoc.expiryDate.includes("Expiré") ? "font-bold text-danger" : "font-bold text-success"}>
                    {activeDoc.expiryDate.includes("Expiré") ? "✕ Date dépassée" : "✓ Active"}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-warning-soft/70 border border-warning-line text-[11px] text-warning leading-relaxed">
                <span className="font-bold">Observation audit :</span> {activeDoc.matchNotes}
              </div>
            </div>

            {/* Validation Actions Console */}
            <div className="pt-3 border-t border-line-subtle space-y-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="flex-1 py-2.5 px-3 rounded-xl bg-success hover:brightness-95 text-white text-xs font-bold shadow-xs transition active:scale-95"
                >
                  ✓ Valider & Activer sur le Corridor
                </button>
                <button
                  type="button"
                  className="py-2.5 px-3 rounded-xl border border-danger text-danger hover:bg-danger-soft text-xs font-bold transition"
                >
                  ✕ Rejeter
                </button>
              </div>

              <button
                type="button"
                className="w-full py-2 px-3 rounded-xl border border-line bg-sand hover:bg-surface text-xs font-semibold text-muted transition"
              >
                Demander une quittance complémentaire par SMS/WhatsApp
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
