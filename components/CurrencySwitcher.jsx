"use client";
import { useCurrency } from '@/lib/CurrencyContext';
import { ChevronDown } from 'lucide-react';

export default function CurrencySwitcher({ className = '' }) {
  const { code, setCode, list } = useCurrency();
  return (
    <div className={`relative ${className}`}>
      <select
        value={code}
        onChange={(e) => setCode(e.target.value)}
        title="Display currency — indicative rates, charged in NOK"
        aria-label="Currency"
        className="appearance-none bg-white/[0.05] border border-white/10 rounded-full text-sm text-[#F8FAFC] pl-4 pr-8 py-2 outline-none hover:border-white/25 cursor-pointer"
      >
        {list.map((c) => (
          <option key={c} className="bg-[#111622]">{c}</option>
        ))}
      </select>
      <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none" />
    </div>
  );
}