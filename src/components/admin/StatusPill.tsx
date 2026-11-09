import type { StatusTone } from "@/data/mockData";

const toneMap: Record<StatusTone, string> = {
  success: "bg-[#E8F5E9] text-[#2E7D32] border border-[#C8E6C9]",
  warning: "bg-[#FFF3E0] text-[#F57C00] border border-[#FFE0B2]",
  danger: "bg-[#FFEBEE] text-[#D32F2F] border border-[#FFCDD2]",
  info: "bg-[#E3F2FD] text-[#1976D2] border border-[#BBDEFB]",
  neutral: "bg-[#EFEBE4] text-[#666F7A] border border-[#E5E0D8]",
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
