import type { StatusTone } from "@/types";

const toneMap: Record<StatusTone, string> = {
  success: "bg-success-soft text-success border border-success-line",
  warning: "bg-warning-soft text-warning border border-warning-line",
  danger: "bg-danger-soft text-danger border border-danger-line",
  info: "bg-info-soft text-info border border-info-line",
  neutral: "bg-line-subtle text-muted border border-line",
};

export function StatusPill({
  label,
  tone = "neutral",
  size = "md",
}: {
  label: string;
  tone?: StatusTone;
  size?: "sm" | "md";
}) {
  return (
    <span
      className={`inline-flex items-center justify-center font-semibold rounded-full ${
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs"
      } ${toneMap[tone] || toneMap.neutral}`}
    >
      {label}
    </span>
  );
}
