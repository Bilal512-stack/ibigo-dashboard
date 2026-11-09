import React from "react";
import type { StatusTone } from "@/data/mockData";

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

export function StatCard({
  label,
  value,
  delta,
  icon,
  subtext,
  extraRight,
  progressPercent,
}: StatCardProps) {
  const getIcon = () => {
    switch (icon) {
      case "box":
        return (
          <div className="w-10 h-10 rounded-2xl bg-[#FFF0EB] text-[#FD4F49] flex items-center justify-center shadow-xs border border-[#FD4F49]/10">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
              <path d="m3.3 7 8.7 5 8.7-5" />
              <path d="M12 22V12" />
            </svg>
          </div>
        );
      case "truck":
        return (
          <div className="w-10 h-10 rounded-2xl bg-[#1E242B]/5 text-[#1E242B] flex items-center justify-center shadow-xs border border-[#1E242B]/10">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="1" y="3" width="15" height="13" />
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
              <circle cx="5.5" cy="18.5" r="2.5" />
              <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
          </div>
        );
      case "shield":
        return (
          <div className="w-10 h-10 rounded-2xl bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center shadow-xs border border-[#2E7D32]/10">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
        );
      case "users":
        return (
          <div className="w-10 h-10 rounded-2xl bg-[#FFF3E0] text-[#F57C00] flex items-center justify-center shadow-xs border border-[#F57C00]/10">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
        );
      case "gift":
        return (
          <div className="w-10 h-10 rounded-2xl bg-[#FFF0EB] text-[#FD4F49] flex items-center justify-center shadow-xs border border-[#FD4F49]/10">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="8" width="18" height="4" rx="1" />
              <path d="M12 8v13" />
              <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
              <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 4.8 0 0 1 12 8a4.8 4.8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  const getDeltaBadge = () => {
    if (!delta) return null;
    if (delta.startsWith("+") || delta.includes("%")) {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#E8F5E9] text-[#2E7D32] border border-[#C8E6C9]">
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="18 15 12 9 6 15" />
          </svg>
          {delta}
        </span>
      );
    }
    if (delta.includes("En attente") || delta.includes("Action") || delta.includes("Sous 24h")) {
      return (
        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#FFF3E0] text-[#F57C00] border border-[#FFE0B2]">
          {delta}
        </span>
      );
    }
    return (
      <span className="text-[10px] font-bold text-[#666F7A] tracking-wider uppercase px-2 py-0.5 bg-[#F7F4EF] rounded-md border border-[#E5E0D8]">
        {delta}
      </span>
    );
  };

  return (
    <div className="group relative bg-white border border-[#E5E0D8]/90 rounded-[20px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02),0_4px_16px_rgba(30,36,43,0.03)] hover:shadow-[0_8px_30px_rgba(30,36,43,0.07)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between overflow-hidden">
      {/* Decorative top accent line on hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-transparent group-hover:bg-[#FD4F49] transition-all duration-300" />

      <div>
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-[#666F7A] uppercase tracking-wider">
            {label}
          </span>
          {icon && getIcon()}
        </div>

        <div className="my-3 flex items-baseline gap-3">
          <span className="text-3xl font-black text-[#1E242B] tracking-tight font-sans">
            {value}
          </span>
          {getDeltaBadge()}
        </div>
      </div>

      <div className="space-y-2 pt-2 border-t border-[#EFEBE4]">
        {progressPercent !== undefined && (
          <div className="w-full bg-[#EFEBE4] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#FD4F49] h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}

        <div className="flex items-center justify-between text-[11px] text-[#666F7A]">
          {subtext && <span className="line-clamp-1">{subtext}</span>}
          {extraRight && <span className="font-bold text-[#1E242B] shrink-0 ml-1">{extraRight}</span>}
        </div>
      </div>
    </div>
  );
}
