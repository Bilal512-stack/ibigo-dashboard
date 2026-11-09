export function BorderControlCard() {
  return (
      <div className="bg-surface border border-line/90 rounded-card p-6 shadow-card space-y-6">
        <div>
          <h2 className="text-base font-bold text-ink">
            Contrôles Douaniers & Postes Frontaliers Actifs
          </h2>
          <p className="text-xs text-muted mt-0.5">
            Intégrité du corridor d’approvisionnement Bangui - Moundou - N’Djamena
          </p>
        </div>

        <div className="overflow-x-auto">
<div className="relative py-4 px-2 min-w-[640px]">
          <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-accent -translate-y-1/2 rounded-full" />
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
                    pt.active ? "bg-accent" : "bg-faint"
                  }`}
                >
                  {pt.active && <span className="w-1.5 h-1.5 rounded-full bg-surface" />}
                </div>
                <span className="text-xs font-bold text-ink mt-2 whitespace-nowrap">
                  {pt.name}
                </span>
                <span className="text-[10px] text-muted whitespace-nowrap font-medium">
                  {pt.sub}
                </span>
              </div>
            ))}
          </div>
        </div>
</div>

        <div className="bg-sand/50 border border-line rounded-2xl p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-accent-soft text-accent flex items-center justify-center shrink-0 border border-accent/20 shadow-2xs">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-bold text-ink">
                  Dossier actif en attente de décision: Socatraf BTP SARL
                </h3>
                <p className="text-xs text-muted">
                  Examen express du camion RC 4820-BG et conformité corridor Centrafrique-Tchad
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-muted">
                CONTRÔLE BIOMÉTRIQUE: <span className="text-success font-bold">OK</span>
              </span>
              <button
                type="button"
                className="px-4 py-2 bg-accent hover:brightness-110 text-white text-xs font-bold rounded-xl shadow-[0_4px_12px_rgba(253,79,73,0.25)] transition active:scale-95"
              >
                Ouvrir inspection complète (Split-screen)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="bg-surface p-3.5 rounded-xl border border-line shadow-2xs">
              <div className="flex items-center gap-1.5 text-xs font-bold text-ink">
                <span className="text-success">✓</span> CNI Transporteur
              </div>
              <div className="text-[11px] text-muted mt-1 font-medium">Valide jusqu’au 14/09/2028</div>
              <div className="text-[10px] text-success font-bold mt-0.5">Vérifiée via Police Frontière</div>
            </div>

            <div className="bg-surface p-3.5 rounded-xl border border-line shadow-2xs">
              <div className="flex items-center gap-1.5 text-xs font-bold text-ink">
                <span className="text-success">✓</span> Carte Grise & PTAC
              </div>
              <div className="text-[11px] text-muted mt-1 font-medium">Plateau 40T - RC 4820-BG</div>
              <div className="text-[10px] text-success font-bold mt-0.5">Jauge essieu conforme</div>
            </div>

            <div className="bg-surface p-3.5 rounded-xl border border-line shadow-2xs">
              <div className="flex items-center gap-1.5 text-xs font-bold text-ink">
                <span className="text-warning">⏳</span> Assurance Inter-États
              </div>
              <div className="text-[11px] text-muted mt-1 font-medium">Carte Rose CEMAC #44901</div>
              <div className="text-[10px] text-warning font-bold mt-0.5">En attente quittance courtier</div>
            </div>

            <div className="bg-surface p-3.5 rounded-xl border border-line shadow-2xs">
              <div className="flex items-center gap-1.5 text-xs font-bold text-ink">
                <span className="text-success">✓</span> Solde Garantie Caution
              </div>
              <div className="text-[11px] text-muted mt-1 font-medium">Dépôt séquestre 5 000 000 FCFA</div>
              <div className="text-[10px] text-success font-bold mt-0.5">Couverture active corridor</div>
            </div>
          </div>
        </div>
      </div>
  );
}
