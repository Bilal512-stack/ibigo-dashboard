"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { COUNTRY_OPTIONS, TOKEN_PRICE_FCFA } from "@/lib/constants";
import type { CountryCode } from "@/types";

const inputClassName = "w-28 px-3 py-1.5 bg-surface border border-line rounded-lg text-sm font-bold text-ink focus:outline-none focus:border-accent";

function NumberField({
  label,
  unit,
  value,
  onChange,
}: {
  label: string;
  unit: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block p-4 rounded-xl border border-line bg-sand/40 space-y-2">
      <span className="block text-xs font-bold text-ink">{label}</span>
      <span className="flex items-center gap-2">
        <input
          type="number"
          min={0}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className={inputClassName}
        />
        <span className="text-xs text-muted">{unit}</span>
      </span>
    </label>
  );
}

function SettingsSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="bg-surface border border-line rounded-card p-6 shadow-card space-y-4">
      <h2 className="text-base font-bold text-ink border-b border-line-subtle pb-3">{title}</h2>
      {children}
    </section>
  );
}

export function SettingsPage() {
  const [settings, setSettings] = useState({
    tokenPrice: TOKEN_PRICE_FCFA,
    signupTokens: 5,
    holdHours: 48,
    reviewDays: 14,
  });
  const [activeCountries, setActiveCountries] = useState<CountryCode[]>(COUNTRY_OPTIONS.map((c) => c.code));
  const [saved, setSaved] = useState(false);

  const update = (key: keyof typeof settings) => (value: number) => {
    setSaved(false);
    setSettings((current) => ({ ...current, [key]: value }));
  };

  const toggleCountry = (code: CountryCode) => {
    setSaved(false);
    setActiveCountries((current) =>
      current.includes(code) ? current.filter((c) => c !== code) : [...current, code],
    );
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSaved(true);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl mx-auto">
      <PageHeader
        breadcrumb={["Paramètres"]}
        title="Paramètres système"
        description="Règles des jetons, délais des accords et pays ouverts sur la plateforme"
      />

      <SettingsSection title="Jetons">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NumberField label="Prix d'un jeton" unit="FCFA" value={settings.tokenPrice} onChange={update("tokenPrice")} />
          <NumberField label="Dotation d'inscription" unit="jetons par utilisateur" value={settings.signupTokens} onChange={update("signupTokens")} />
        </div>
      </SettingsSection>

      <SettingsSection title="Délais des accords">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NumberField label="Expiration d'un jeton bloqué" unit="heures avant restitution" value={settings.holdHours} onChange={update("holdHours")} />
          <NumberField label="Demande d'avis automatique" unit="jours après l'accord" value={settings.reviewDays} onChange={update("reviewDays")} />
        </div>
      </SettingsSection>

      <SettingsSection title="Pays ouverts">
        <div className="flex flex-wrap gap-3">
          {COUNTRY_OPTIONS.map((country) => (
            <label key={country.code} className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-line bg-sand/40 text-xs font-semibold text-ink cursor-pointer">
              <input
                type="checkbox"
                checked={activeCountries.includes(country.code)}
                onChange={() => toggleCountry(country.code)}
                className="accent-accent"
              />
              {country.label}
            </label>
          ))}
        </div>
      </SettingsSection>

      <div className="flex items-center justify-end gap-4">
        {saved && (
          <p role="status" className="text-xs font-semibold text-muted">
            Conservé pour cet écran uniquement : aucun backend n&apos;est connecté.
          </p>
        )}
        <button type="submit" className="px-5 py-2.5 bg-accent hover:bg-accent-strong text-white text-xs font-bold rounded-xl transition-colors">
          Sauvegarder les modifications
        </button>
      </div>
    </form>
  );
}
