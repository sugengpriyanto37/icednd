"use client";
import { Check, Plus } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { useCurrency } from '@/lib/CurrencyContext';

export default function ActivityCard({ activity, selected = false, onToggle, included = false }) {
  const { fmt } = useCurrency();
  const interactive = typeof onToggle === 'function';
  return (
    <div
      onClick={interactive ? () => onToggle(activity.id) : undefined}
      className={`w-full max-w-full rounded-2xl border p-3 flex gap-3 sm:gap-4 items-center transition-colors duration-300 min-w-0 overflow-hidden ${
        selected
          ? 'border-[#4DFFB5]/60 bg-[#4DFFB5]/[0.06]'
          : 'border-white/10 bg-white/[0.03] hover:border-white/25'
      } ${interactive ? 'cursor-pointer' : ''}`}
    >
      <div className="w-14 h-14 sm:w-24 sm:h-20 rounded-xl overflow-hidden shrink-0">
        <Image src={activity.image} alt={activity.name} className="h-full w-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-[#F8FAFC] font-medium text-sm sm:text-base truncate">{activity.name}</h4>
        <p className="text-xs text-[#94A3B8] mt-1">{activity.duration}</p>
        <p className="text-sm text-[#F8FAFC] mt-1.5 break-words">
          <span className="font-medium">{fmt(activity.price)}</span>
          <span className="text-[#94A3B8]"> · {activity.unit}</span>
        </p>
      </div>
      {!included && (
        <div
          className={`shrink-0 h-9 w-9 rounded-full flex items-center justify-center border transition-colors ${
            selected
              ? 'bg-[#4DFFB5] border-[#4DFFB5] text-[#080B12]'
              : 'border-white/25 text-[#94A3B8]'
          }`}
        >
          {selected ? <Check size={16} /> : <Plus size={16} />}
        </div>
      )}
      {included && (
        <span className="shrink-0 text-[11px] uppercase tracking-[0.18em] text-[#4DFFB5]">Included</span>
      )}
    </div>
  );
}
