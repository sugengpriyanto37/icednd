"use client";
export default function LumeRating({ level, className = '' }) {
  return (
    <div
      className={`flex items-center gap-1.5 ${className}`}
      title={`Lume ${level} of 5 — darkness and historical aurora visibility`}
    >
      <span className="text-[11px] uppercase tracking-[0.2em] text-[#94A3B8] mr-1">Lume</span>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`h-1.5 w-1.5 rounded-full ${i < level ? 'bg-[#4DFFB5]' : 'bg-white/20'}`}
        />
      ))}
      <span className="text-[11px] text-[#94A3B8] ml-1">{level}/5</span>
    </div>
  );
}