import { activitySeries } from "@/data/mockData";

export function ActivityChart() {
  const max = Math.max(...activitySeries);

  return (
    <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-surface)] p-5 shadow-[0_12px_24px_rgba(25,30,36,0.04)]">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm text-[var(--text-secondary)]">Activité 2026</p>
          <h3 className="text-xl font-bold text-[var(--text-primary)]">
            Missions validées
          </h3>
        </div>
        <span className="rounded-full bg-[var(--accent-soft)] px-2 py-1 text-xs font-semibold text-[var(--accent)]">
          +17.2%
        </span>
      </div>

      <div className="flex h-48 items-end gap-3">
        {activitySeries.map((value: number, index: number) => (
          <div
            key={`${value}-${index}`}
            className="flex h-full flex-1 items-end justify-center"
          >
            <div
              className="w-full rounded-t-2xl bg-gradient-to-t from-[var(--accent)] to-[#F7B98A]"
              style={{ height: `${(value / max) * 100}%`, minHeight: 18 }}
            />
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-6 gap-2 text-[10px] font-medium text-[var(--text-muted)]">
        {Array.from(
          { length: 12 },
          (_, index) =>
            ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"][index],
        ).map((month, index) => (
          <span key={`${month}-${index}`} className="text-center">
            {month}
          </span>
        ))}
      </div>
    </div>
  );
}
