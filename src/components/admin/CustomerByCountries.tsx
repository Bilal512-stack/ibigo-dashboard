"use client";

import React, { useState } from "react";
import { customersByCountry } from "@/data/mockData";

export function CustomerByCountries() {
  const [metricView, setMetricView] = useState<"percent" | "volume">("percent");

  return (
    <div className="bg-white border border-[#E5E0D8]/90 rounded-[22px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02),0_4px_16px_rgba(30,36,43,0.03)] flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-[#EFEBE4]">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-[#1E242B]">
                Acteurs & Flux par Pays
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E8F5E9] text-[#2E7D32] border border-[#C8E6C9]">
                Corridor CEMAC
              </span>
            </div>
            <p className="text-xs text-[#666F7A] mt-0.5">
              Répartition des chargeurs & transporteurs (CMR • RCA • TCHAD)
            </p>
          </div>

          {/* Toggle View */}
          <div className="flex bg-[#F7F4EF] p-0.5 rounded-lg border border-[#E5E0D8] text-[11px] font-bold">
            <button
              type="button"
              onClick={() => setMetricView("percent")}
              className={`px-2.5 py-1 rounded-md transition ${
                metricView === "percent"
                  ? "bg-[#1E242B] text-white shadow-2xs"
                  : "text-[#666F7A] hover:text-[#1E242B]"
              }`}
            >
              Part %
            </button>
            <button
              type="button"
              onClick={() => setMetricView("volume")}
              className={`px-2.5 py-1 rounded-md transition ${
                metricView === "volume"
                  ? "bg-[#1E242B] text-white shadow-2xs"
                  : "text-[#666F7A] hover:text-[#1E242B]"
              }`}
            >
              Volume (T)
            </button>
          </div>
        </div>

        {/* Total Summary Row */}
        <div className="grid grid-cols-3 gap-3 my-4 p-3 rounded-xl bg-[#F7F4EF]/40 border border-[#EFEBE4]">
          <div className="text-center">
            <span className="text-[10px] uppercase font-bold text-[#666F7A]">Acteurs Totaux</span>
            <div className="text-lg font-black text-[#1E242B]">842</div>
          </div>
          <div className="text-center border-x border-[#E5E0D8]">
            <span className="text-[10px] uppercase font-bold text-[#666F7A]">Tonnage Sem.</span>
            <div className="text-lg font-black text-[#FD4F49]">9 850 T</div>
          </div>
          <div className="text-center">
            <span className="text-[10px] uppercase font-bold text-[#666F7A]">Croissance</span>
            <div className="text-lg font-black text-[#2E7D32]">+11.8%</div>
          </div>
        </div>

        {/* Countries Progress List */}
        <div className="space-y-4">
          {customersByCountry.map((item) => (
            <div key={item.code} className="space-y-1.5 group">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{item.flag}</span>
                  <div>
                    <span className="font-extrabold text-[#1E242B] group-hover:text-[#FD4F49] transition-colors">
                      {item.name} ({item.code})
                    </span>
                    <span className="text-[10.5px] text-[#666F7A] ml-2 font-medium hidden sm:inline">
                      {item.primaryHub}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-black text-[#1E242B]">
                    {metricView === "percent" ? `${item.sharePercent}%` : item.volumeTonnage}
                  </span>
                  <span className="text-[10.5px] font-bold text-[#2E7D32] ml-2">
                    {item.growth}
                  </span>
                </div>
              </div>

              {/* Progress bar with smooth custom color */}
              <div className="w-full bg-[#EFEBE4] h-2 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${item.sharePercent}%`,
                    backgroundColor: item.statusColor,
                  }}
                />
              </div>

              {/* Breakdown detail */}
              <div className="flex items-center justify-between text-[10px] text-[#666F7A]">
                <span>
                  {item.carriersCount} transporteurs • {item.shippersCount} chargeurs
                </span>
                <span
                  className="font-bold px-1.5 py-0.2 rounded text-[9.5px]"
                  style={{
                    backgroundColor: `${item.statusColor}15`,
                    color: item.statusColor,
                  }}
                >
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Corridor Integrity Footer */}
      <div className="pt-4 mt-4 border-t border-[#EFEBE4] flex items-center justify-between text-[11px] text-[#666F7A]">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#2E7D32]" />
          Données consolidées douane CEMAC
        </span>
        <button
          type="button"
          className="font-bold text-[#FD4F49] hover:underline"
        >
          Détail par Hub →
        </button>
      </div>
    </div>
  );
}
