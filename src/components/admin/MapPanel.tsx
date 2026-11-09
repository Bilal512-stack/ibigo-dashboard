"use client";

import dynamic from "next/dynamic";

const MapViewer = dynamic(() => import("@/components/admin/MapViewer"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[300px] items-center justify-center rounded-2xl border border-[#E8E2D8] bg-[#F8F6F2] text-sm text-[#665F55]">
      Chargement de la carte…
    </div>
  ),
});

export function MapPanel() {
  return (
    <div className="rounded-3xl border border-[#E8E2D8] bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-[#665F55]">Cartographie</p>
          <h3 className="text-xl font-bold text-[#191E24]">Corridors actifs</h3>
        </div>
        <button className="rounded-full border border-[#E8E2D8] px-3 py-1.5 text-xs font-semibold text-[#665F55]">
          OpenStreetMap
        </button>
      </div>

      <MapViewer />
    </div>
  );
}
