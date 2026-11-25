"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export interface DateRange {
  start: Date;
  end: Date;
}

const DAY_MS = 86_400_000;
const MONTHS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
const WEEKDAYS = ["L", "M", "M", "J", "V", "S", "D"];

export const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());
export const endOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
const sameDay = (a: Date, b: Date) => startOfDay(a).getTime() === startOfDay(b).getTime();

const shortFormat = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short", year: "numeric" });

export function formatRange({ start, end }: DateRange) {
  return sameDay(start, end) ? shortFormat.format(start) : `${shortFormat.format(start)} - ${shortFormat.format(end)}`;
}

/** Période se terminant à `today` et couvrant `days` jours (aujourd'hui compris). */
export function presetRange(today: Date, days: number): DateRange {
  return { start: startOfDay(new Date(today.getTime() - (days - 1) * DAY_MS)), end: endOfDay(today) };
}

/** Calendrier déroulant : un premier clic fixe le début, un second la fin de la période. */
export function DateRangePicker({
  value,
  max,
  onChange,
}: {
  value: DateRange;
  max: Date;
  onChange: (range: DateRange) => void;
}) {
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState(() => new Date(value.end.getFullYear(), value.end.getMonth(), 1));
  const [anchor, setAnchor] = useState<Date | null>(null);
  const [hover, setHover] = useState<Date | null>(null);
  const [popupStyle, setPopupStyle] = useState<React.CSSProperties>({});
  const rootRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  /* Calcule la position du popover en tenant compte des bords du viewport */
  const computePosition = () => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const popupWidth = Math.min(304, window.innerWidth - 16); // 19rem = 304px, 8px margin each side
    const spaceRight = window.innerWidth - rect.right;
    const spaceLeft = rect.left;

    let left: number;
    if (spaceRight >= popupWidth) {
      // Aligner à droite du bouton
      left = rect.right - popupWidth;
    } else if (spaceLeft >= popupWidth) {
      // Aligner à gauche du bouton
      left = rect.left;
    } else {
      // Centrer dans le viewport
      left = Math.max(8, (window.innerWidth - popupWidth) / 2);
    }

    const top = rect.bottom + 8 + window.scrollY;

    setPopupStyle({ position: "absolute", top, left, width: popupWidth });
  };

  useEffect(() => {
    if (!open) return;
    computePosition();
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("resize", computePosition);
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("resize", computePosition);
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const toggle = () => {
    if (!open) {
      setMonth(new Date(value.end.getFullYear(), value.end.getMonth(), 1));
      setAnchor(null);
    }
    setOpen(!open);
  };

  const firstWeekday = (new Date(month.getFullYear(), month.getMonth(), 1).getDay() + 6) % 7;
  const days = Array.from({ length: 42 }, (_, i) => new Date(month.getFullYear(), month.getMonth(), i - firstWeekday + 1));

  const pick = (day: Date) => {
    if (!anchor) {
      setAnchor(day);
      return;
    }
    const [from, to] = day < anchor ? [day, anchor] : [anchor, day];
    onChange({ start: startOfDay(from), end: endOfDay(to) });
    setAnchor(null);
    setOpen(false);
  };

  const preview = anchor ? (hover && hover < anchor ? { start: hover, end: anchor } : { start: anchor, end: hover ?? anchor }) : value;
  const inRange = (day: Date) => day >= startOfDay(preview.start) && day <= endOfDay(preview.end);
  const isEdge = (day: Date) => sameDay(day, preview.start) || sameDay(day, preview.end);

  const popup = open ? (
    <div
      role="dialog"
      aria-label="Choisir une période"
      style={popupStyle}
      className="z-[9999] rounded-card border border-line bg-surface p-4 shadow-card"
    >
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          aria-label="Mois précédent"
          onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}
          className="rounded-lg p-1.5 text-muted hover:bg-sand hover:text-ink"
        >
          ‹
        </button>
        <span className="text-xs font-bold capitalize text-ink">
          {MONTHS[month.getMonth()]} {month.getFullYear()}
        </span>
        <button
          type="button"
          aria-label="Mois suivant"
          onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}
          className="rounded-lg p-1.5 text-muted hover:bg-sand hover:text-ink"
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 gap-y-1 text-center text-[11px]">
        {WEEKDAYS.map((label, index) => (
          <span key={index} className="py-1 font-semibold text-faint">{label}</span>
        ))}
        {days.map((day) => {
          const outside = day.getMonth() !== month.getMonth();
          const disabled = day > endOfDay(max);
          const edge = !outside && isEdge(day);
          const middle = !outside && inRange(day);
          return (
            <button
              key={day.toISOString()}
              type="button"
              disabled={disabled || outside}
              onClick={() => pick(day)}
              onMouseEnter={() => setHover(day)}
              className={`h-8 text-xs font-semibold transition-colors disabled:cursor-default ${
                edge
                  ? "rounded-lg bg-accent text-white"
                  : middle
                    ? "bg-accent-soft text-accent"
                    : outside
                      ? "text-transparent"
                      : disabled
                        ? "text-faint/50"
                        : "rounded-lg text-ink hover:bg-sand"
              }`}
            >
              {outside ? "" : day.getDate()}
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-[11px] text-muted">
        {anchor ? "Choisissez la date de fin." : "Choisissez la date de début, puis celle de fin."}
      </p>
    </div>
  ) : null;

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={btnRef}
        type="button"
        onClick={toggle}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-line bg-surface text-xs font-semibold text-ink hover:bg-sand hover:border-faint shadow-2xs transition-all"
      >
        <svg className="w-3.5 h-3.5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <span>{formatRange(value)}</span>
      </button>

      {typeof document !== "undefined" && popup ? createPortal(popup, document.body) : null}
    </div>
  );
}
