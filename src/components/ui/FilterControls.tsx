import { COUNTRY_OPTIONS } from "@/lib/constants";

export interface FilterTab<T extends string> {
  value: T;
  label: string;
  count?: number;
}

export function FilterTabs<T extends string>({
  tabs,
  active,
  onChange,
}: {
  tabs: FilterTab<T>[];
  active: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-semibold">
      {tabs.map((tab) => {
        const isActive = tab.value === active;
        return (
          <button
            key={tab.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(tab.value)}
            className={`px-4 py-2 rounded-xl transition-colors whitespace-nowrap ${
              isActive ? "bg-dark-card text-white font-bold" : "bg-surface border border-line text-muted hover:bg-sand"
            }`}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span className={isActive ? "text-accent" : "text-faint"}> ({tab.count})</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export function SearchInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div className="relative w-full md:w-96">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-faint">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="w-full pl-9 pr-3 py-2 bg-sand/50 border border-line rounded-xl text-xs text-ink placeholder-faint focus:outline-none focus:border-accent focus:bg-surface"
      />
    </div>
  );
}

export function CountrySelect({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      aria-label="Filtrer par pays"
      className="px-3.5 py-2 bg-surface border border-line rounded-xl text-xs text-ink font-semibold focus:outline-none focus:border-accent"
    >
      <option value="all">Tous les pays</option>
      {COUNTRY_OPTIONS.map((country) => (
        <option key={country.code} value={country.code}>
          {country.label}
        </option>
      ))}
    </select>
  );
}

export function EmptyRow({ colSpan, label }: { colSpan: number; label: string }) {
  return (
    <tr>
      <td colSpan={colSpan} className="py-10 px-6 text-center text-xs text-muted">
        {label}
      </td>
    </tr>
  );
}

export function matchesSearch(query: string, fields: string[]) {
  const needle = query.trim().toLowerCase();
  return !needle || fields.some((field) => field.toLowerCase().includes(needle));
}
