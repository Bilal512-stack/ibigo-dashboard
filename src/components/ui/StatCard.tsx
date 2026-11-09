import type { ReactNode } from "react";
import type { StatusTone } from "@/types";

interface StatCardProps {
  label: string;
  value: string;
  delta?: string;
  tone?: StatusTone;
  icon?: string;
  subtext?: string;
  extraRight?: string;
  progressPercent?: number;
}

const ICONS: Record<string, { className: string; path: ReactNode }> = {
  box: {
    className: "bg-accent-soft text-accent",
    path: (
      <>
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="m3.3 7 8.7 5 8.7-5" />
        <path d="M12 22V12" />
      </>
    ),
  },
  truck: {
    className: "bg-surface-muted text-ink",
    path: (
      <>
        <rect x="1" y="3" width="15" height="13" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </>
    ),
  },
  shield: {
    className: "bg-success-soft text-success",
    path: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  },
  users: {
    className: "bg-warning-soft text-warning",
    path: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
  },
  gift: {
    className: "bg-accent-soft text-accent",
    path: (
      <>
        <circle cx="8" cy="8" r="6" />
        <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
        <path d="m7 6 5 5" />
      </>
    ),
  },
};

ICONS.clock = {
  className: "bg-warning-soft text-warning",
  path: (
    <>
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15.5 14" />
    </>
  ),
};

ICONS.alert = {
  className: "bg-danger-soft text-danger",
  path: (
    <>
      <circle cx="12" cy="12" r="9" />
      <line x1="12" y1="8" x2="12" y2="12.5" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </>
  ),
};

const DELTA_STYLES: Record<StatusTone, string> = {
  success: "bg-success-soft text-success border-success-line",
  warning: "bg-warning-soft text-warning border-warning-line",
  danger: "bg-danger-soft text-danger border-danger-line",
  info: "bg-info-soft text-info border-info-line",
  neutral: "bg-sand text-muted border-line",
};

export function StatCard({ label, value, delta, tone = "neutral", icon, subtext, extraRight, progressPercent }: StatCardProps) {
  const iconConfig = icon ? ICONS[icon] : undefined;

  return (
    <div className="bg-surface border border-line rounded-card p-5 shadow-card flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-muted uppercase tracking-wider">{label}</span>
          {iconConfig && (
            <span className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconConfig.className}`}>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                {iconConfig.path}
              </svg>
            </span>
          )}
        </div>

        <div className="my-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="text-[26px] leading-8 font-bold text-ink tracking-tight">{value}</span>
          {delta && (
            <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${DELTA_STYLES[tone]}`}>
              {delta}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-2 pt-2 border-t border-line-subtle">
        {progressPercent !== undefined && (
          <div className="w-full bg-line-subtle h-1.5 rounded-full overflow-hidden">
            <div className="bg-accent h-full rounded-full" style={{ width: `${progressPercent}%` }} />
          </div>
        )}
        <div className="flex items-center justify-between text-[11px] text-muted">
          {subtext && <span className="line-clamp-1">{subtext}</span>}
          {extraRight && <span className="font-bold text-ink shrink-0 ml-1">{extraRight}</span>}
        </div>
      </div>
    </div>
  );
}
