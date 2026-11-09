"use client";

import { useMemo, useState } from "react";

type DonutSegment = {
  label: string;
  value: number;
  color: string;
  detail: string;
};

type DonutChartProps = {
  title: string;
  subtitle: string;
  segments: DonutSegment[];
  centerLabel: string;
};

export function DonutChart({
  title,
  subtitle,
  segments,
  centerLabel,
}: DonutChartProps) {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0);
  const [activeLabel, setActiveLabel] = useState(segments[0]?.label ?? "");

  const activeSegment =
    segments.find((segment) => segment.label === activeLabel) ?? segments[0];

  const gradient = useMemo(() => {
    let current = 0;
    return segments
      .map((segment) => {
        const start = current;
        const end = current + (segment.value / total) * 100;
        current = end;
        return `${segment.color} ${start}% ${end}%`;
      })
      .join(", ");
  }, [segments, total]);

  return (
    <div className="rounded-3xl border border-[#E8E2D8] bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8F877C]">
            {subtitle}
          </p>
          <h3 className="mt-1 text-xl font-bold text-[#191E24]">{title}</h3>
        </div>
        <span className="rounded-full bg-[#FDEEDA] px-2 py-1 text-[10px] font-bold text-[#D86B2E]">
          Live
        </span>
      </div>

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
        <div className="relative mx-auto h-40 w-40 shrink-0">
          <div
            className="absolute inset-0 rounded-full"
            style={{ background: `conic-gradient(${gradient})` }}
          />
          <div className="absolute inset-[16%] rounded-full border border-[#E8E2D8] bg-[#F8F6F2] shadow-inner" />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8F877C]">
              {centerLabel}
            </span>
            <span className="mt-1 text-3xl font-bold text-[#191E24]">
              {activeSegment?.value ?? 0}%
            </span>
          </div>
        </div>

        <div className="w-full space-y-2.5">
          {segments.map((segment) => {
            const isActive = segment.label === activeSegment?.label;

            return (
              <button
                key={segment.label}
                type="button"
                onMouseEnter={() => setActiveLabel(segment.label)}
                onFocus={() => setActiveLabel(segment.label)}
                className={`flex w-full items-center justify-between rounded-2xl border px-3 py-2 text-left transition-all ${
                  isActive
                    ? "border-[#E8E2D8] bg-[#F8F6F2] shadow-sm"
                    : "border-transparent bg-[#F7F3EE] hover:border-[#E8E2D8]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: segment.color }}
                  />
                  <span className="text-sm font-medium text-[#191E24]">
                    {segment.label}
                  </span>
                </div>
                <div className="text-right">
                  <span className="block text-sm font-bold text-[#191E24]">
                    {segment.value}%
                  </span>
                  <span className="text-[10px] text-[#665F55]">
                    {segment.detail}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
