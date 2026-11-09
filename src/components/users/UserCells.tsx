export function IdentityCell({ initials, name, company }: { initials: string; name: string; company: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-9 h-9 rounded-full bg-dark-card text-white font-bold flex items-center justify-center text-xs shrink-0">
        {initials}
      </span>
      <div>
        <div className="font-bold text-ink">{name}</div>
        <div className="text-[11px] text-muted font-medium">{company}</div>
      </div>
    </div>
  );
}

export function ContactCell({ flag, phone, location }: { flag: string; phone: string; location: string }) {
  return (
    <>
      <div className="flex items-center gap-1.5 font-bold text-ink">
        <span aria-hidden="true">{flag}</span>
        <span>{phone}</span>
      </div>
      <div className="text-[11px] text-muted">{location}</div>
    </>
  );
}

export function TokenCell({ available, reserved }: { available: number; reserved: number }) {
  return (
    <>
      <div className="font-bold text-ink">{available} disponibles</div>
      <div className="text-[11px] text-muted">{reserved} réservé{reserved > 1 ? "s" : ""}</div>
    </>
  );
}
