"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { readSession, signIn } from "@/lib/auth";
import { CEMAC_MAP_SHAPES, CEMAC_MAP_VIEWBOX } from "@/lib/geo/cemac-map";
import type { CountryCode } from "@/types";

const fieldClass =
  "w-full rounded-xl border border-line bg-sand/60 py-3 pl-11 pr-4 text-sm text-ink placeholder-faint transition-all focus:border-accent focus:bg-surface focus:outline-none focus:ring-4 focus:ring-accent/10";

const COUNTRIES: { code: CountryCode; name: string; city: string; color: string }[] = [
  { code: "CMR", name: "Cameroun", city: "Douala", color: "#10B981" },
  { code: "TCHAD", name: "Tchad", city: "N'Djamena", color: "#F5B301" },
  { code: "RCA", name: "Centrafrique", city: "Bangui", color: "#6B82F0" },
];

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeCountry, setActiveCountry] = useState<CountryCode | null>(null);

  useEffect(() => {
    if (readSession()) router.replace("/");
  }, [router]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    window.setTimeout(() => {
      if (signIn(email, password)) {
        router.replace("/");
      } else {
        setError("Identifiants incorrects. Vérifiez votre e-mail et votre mot de passe.");
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="relative grid min-h-dvh overflow-hidden bg-sand lg:grid-cols-[1.05fr_1fr]">
      {/* Panneau de marque */}
      <aside className="relative hidden overflow-hidden bg-dark-card p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div aria-hidden="true" className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-accent/30 blur-3xl" />
        <div aria-hidden="true" className="absolute -bottom-32 right-0 h-[28rem] w-[28rem] rounded-full bg-[#4F6BED]/25 blur-3xl" />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />

        <div className="relative flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent shadow-lg shadow-accent/30">
            <Image src="/logo-icon.png" alt="" width={22} height={22} />
          </span>
          <span className="text-xl font-extrabold tracking-tight">IBIGO</span>
        </div>

        <div className="relative flex min-h-0 flex-col">
          <h2 className="max-w-md text-4xl font-extrabold leading-[1.15] tracking-tight">
            Pilotez la logistique d&apos;<span className="text-accent">IBIGO</span> depuis un seul écran.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60">
            Transporteurs, cargaisons, jetons et paiements : toute l&apos;activité de la plateforme, en temps réel.
          </p>

          <div className="relative mx-auto mt-8 w-full max-w-[240px]">
            <div aria-hidden="true" className="absolute inset-0 rounded-full bg-white/[0.04] blur-2xl" />
            <svg
              viewBox={CEMAC_MAP_VIEWBOX}
              className="relative max-h-[32vh] w-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)]"
              role="img"
              aria-label="Carte du Cameroun, du Tchad et de la Centrafrique"
            >
              {COUNTRIES.map((country) => {
                const shape = CEMAC_MAP_SHAPES[country.code];
                const isActive = activeCountry === country.code;
                const isDimmed = activeCountry !== null && !isActive;
                return (
                  <g
                    key={country.code}
                    onMouseEnter={() => setActiveCountry(country.code)}
                    onMouseLeave={() => setActiveCountry(null)}
                    className="cursor-pointer"
                  >
                    <path
                      d={shape.d}
                      fill={country.color}
                      fillOpacity={isActive ? 0.95 : 0.72}
                      stroke="#1e242b"
                      strokeWidth={isActive ? 4 : 2.5}
                      strokeLinejoin="round"
                      className="transition-all duration-300"
                      style={{
                        opacity: isDimmed ? 0.4 : 1,
                        filter: isActive ? `drop-shadow(0 0 18px ${country.color})` : "none",
                      }}
                    />
                    <circle cx={shape.labelX} cy={shape.labelY} r={isActive ? 13 : 9} fill="#fff" className="transition-all duration-300" />
                    <circle cx={shape.labelX} cy={shape.labelY} r={isActive ? 26 : 20} fill="none" stroke="#fff" strokeOpacity="0.5" strokeWidth="2" className="transition-all duration-300" />
                  </g>
                );
              })}
            </svg>
          </div>

          <h3 className="mt-6 max-w-md self-center text-center text-lg font-extrabold leading-snug tracking-tight">
            Trois pays, une route.
            <br />
            <span className="text-accent">Chaque convoi arrive à bon port.</span>
          </h3>
        </div>

        <p className="relative text-[11px] text-white/40">© 2026 IBIGO · Back-office d&apos;administration</p>
      </aside>

      {/* Formulaire */}
      <main className="relative flex items-center justify-center px-5 py-12 sm:px-10">
        <ThemeToggle className="absolute right-5 top-5 border border-line bg-surface" />
        <div aria-hidden="true" className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-accent/10 blur-3xl lg:hidden" />

        <div className="relative w-full max-w-[400px]">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent">
              <Image src="/logo-icon.png" alt="" width={22} height={22} />
            </span>
            <span className="text-xl font-extrabold tracking-tight text-ink">IBIGO</span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-ink">Bon retour 👋</h1>
          <p className="mt-2 text-sm text-muted">Connectez-vous pour accéder au back-office.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-xs font-bold text-ink">Adresse e-mail</label>
              <div className="relative">
                <svg className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="4" width="20" height="16" rx="3" />
                  <path d="m22 7-10 6L2 7" />
                </svg>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="vous@exemple.com"
                  className={fieldClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-xs font-bold text-ink">Mot de passe</label>
              <div className="relative">
                <svg className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="11" width="18" height="11" rx="3" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••"
                  className={`${fieldClass} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-faint transition-colors hover:text-ink"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
                    <circle cx="12" cy="12" r="3" />
                    {showPassword && <line x1="3" y1="3" x2="21" y2="21" />}
                  </svg>
                </button>
              </div>
            </div>

            {error && (
              <p role="alert" className="rounded-xl border border-danger-line bg-danger-soft px-4 py-3 text-xs font-semibold text-danger">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3.5 text-sm font-bold text-white shadow-lg shadow-accent/25 transition-all hover:bg-accent-strong hover:shadow-accent/40 active:scale-[0.99] disabled:opacity-70"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Connexion…
                </>
              ) : (
                "Se connecter"
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-[11px] text-faint">
            Accès réservé aux administrateurs IBIGO.
          </p>
        </div>
      </main>
    </div>
  );
}
