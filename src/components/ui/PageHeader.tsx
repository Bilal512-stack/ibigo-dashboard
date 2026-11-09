import type { ReactNode } from "react";

interface PageHeaderProps {
  breadcrumb: string[];
  title: string;
  description: string;
  children?: ReactNode;
}

export function PageHeader({ breadcrumb, title, description, children }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <div className="flex items-center gap-2 text-[11px] font-semibold text-muted uppercase tracking-wider mb-1">
          <span>Dashboard</span>
          {breadcrumb.map((crumb, index) => (
            <span key={crumb} className="flex items-center gap-2">
              <span>/</span>
              <span className={index === 0 ? "text-accent" : "text-ink"}>{crumb}</span>
            </span>
          ))}
        </div>
        <h1 className="text-2xl font-bold text-ink tracking-tight">{title}</h1>
        <p className="text-xs sm:text-sm text-muted mt-0.5">{description}</p>
      </div>
      {children}
    </div>
  );
}

export function HeaderChip({ label, value, valueClassName }: { label: string; value: string; valueClassName: string }) {
  return (
    <div className="px-3.5 py-2 rounded-xl border border-line bg-surface text-xs font-semibold text-ink whitespace-nowrap">
      {label} : <span className={`font-bold ${valueClassName}`}>{value}</span>
    </div>
  );
}
