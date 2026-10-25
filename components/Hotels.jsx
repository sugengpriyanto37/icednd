"use client";
import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react';
import Reveal from '@/components/Reveal';
import HotelCard from '@/components/HotelCard';
import { hotels, regions, prettyDate } from '@/data/catalog';
import { useCurrency } from '@/lib/CurrencyContext';
import { PRICE_BANDS } from '@/lib/bookingRules.mjs';

const FEATURE_POOL = Array.from(new Set(hotels.flatMap((h) => h.features)));

export default function Hotels() {
  const { fmt } = useCurrency();
  const searchParams = useSearchParams();
  const [region, setRegion] = useState(searchParams.get('region') || 'Anywhere');
  const [priceBand, setPriceBand] = useState('any');
  const [features, setFeatures] = useState([]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const travelDate = searchParams.get('date');

  const toggleFeature = (f) =>
    setFeatures((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]));

  const filtered = useMemo(() => {
    const band = PRICE_BANDS.find((b) => b.id === priceBand) || PRICE_BANDS[0];
    return hotels.filter(
      (h) =>
        (region === 'Anywhere' || h.region === region) &&
        band.test(h.priceFrom) &&
        (features.length === 0 || features.some((f) => h.features.includes(f)))
    );
  }, [region, priceBand, features]);

  const hasFilters = region !== 'Anywhere' || priceBand !== 'any' || features.length > 0;

  return (
    <div className="pb-16">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#7EE8FA]">The Observatory</p>
        <h1 className="font-display font-light text-4xl sm:text-6xl mt-3">Choose where the sky performs</h1>
        <p className="text-[#94A3B8] mt-4 max-w-2xl leading-relaxed">
          Five independently owned addresses across the Norwegian Arctic, each rated on the Lume scale —
          the darkness of its sky and its historical aurora visibility.
        </p>
      </div>

      {/* Lens settings */}
      <div className="md:sticky md:top-16 z-30 border-y border-white/[0.06] bg-[#080B12]/95 md:bg-[#080B12]/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-3.5">
          <div className="flex items-center gap-3 md:hidden">
            <button
              type="button"
              onClick={() => setFiltersOpen((open) => !open)}
              aria-expanded={filtersOpen}
              className="flex items-center gap-2 text-sm text-[#F8FAFC]"
            >
              <SlidersHorizontal size={16} className="text-[#4DFFB5]" />
              Filters
              {hasFilters && (
                <span className="rounded-full bg-[#4DFFB5]/10 px-2 py-0.5 text-xs text-[#4DFFB5]">Active</span>
              )}
              <ChevronDown size={15} className={`text-[#94A3B8] transition-transform ${filtersOpen ? 'rotate-180' : ''}`} />
            </button>
            <span className="ml-auto text-xs text-[#94A3B8]">
              {filtered.length} {filtered.length === 1 ? 'hotel' : 'hotels'}
            </span>
          </div>

          <div className={`${filtersOpen ? 'flex' : 'hidden'} md:flex flex-wrap items-center gap-3 mt-4 pt-4 border-t border-white/[0.06] md:mt-0 md:pt-0 md:border-t-0`}>
          {travelDate && (
            <span className="text-xs text-[#4DFFB5] border border-[#4DFFB5]/40 rounded-full px-3 py-1.5">
              Travelling around {prettyDate(travelDate)}
            </span>
          )}
          <div className="relative">
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="appearance-none bg-white/[0.05] border border-white/10 rounded-full text-sm text-[#F8FAFC] pl-4 pr-9 py-2 outline-none hover:border-white/25 cursor-pointer"
            >
              <option className="bg-[#111622]">Anywhere</option>
              {regions.map((r) => (
                <option key={r} className="bg-[#111622]">{r}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none" />
          </div>
          <div className="relative">
            <select
              value={priceBand}
              onChange={(e) => setPriceBand(e.target.value)}
              className="appearance-none bg-white/[0.05] border border-white/10 rounded-full text-sm text-[#F8FAFC] pl-4 pr-9 py-2 outline-none hover:border-white/25 cursor-pointer"
            >
              {PRICE_BANDS.map((b) => (
                <option key={b.id} value={b.id} className="bg-[#111622]">{b.label(fmt)}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none" />
          </div>
          {FEATURE_POOL.map((f) => (
            <button
              key={f}
              onClick={() => toggleFeature(f)}
              className={`text-xs rounded-full px-3.5 py-2 border transition-colors ${
                features.includes(f)
                  ? 'bg-[#4DFFB5]/10 border-[#4DFFB5]/60 text-[#4DFFB5]'
                  : 'border-white/10 text-[#94A3B8] hover:border-white/25 hover:text-[#F8FAFC]'
              }`}
            >
              {f}
            </button>
          ))}
          {hasFilters && (
            <button
              onClick={() => { setRegion('Anywhere'); setPriceBand('any'); setFeatures([]); }}
              className="flex items-center gap-1.5 text-xs text-[#94A3B8] hover:text-[#F8FAFC] px-2"
            >
              <X size={13} /> Clear
            </button>
          )}
          <span className="ml-auto text-xs text-[#94A3B8]">
            {filtered.length} {filtered.length === 1 ? 'hotel' : 'hotels'}
          </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-12">
        {filtered.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-display text-2xl text-[#94A3B8]">No hotels match these lens settings.</p>
            <button
              onClick={() => { setRegion('Anywhere'); setPriceBand('any'); setFeatures([]); }}
              className="mt-6 text-sm text-[#4DFFB5] hover:text-[#7EE8FA]"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((hotel, i) => (
              <Reveal key={hotel.id} delay={(i % 3) * 0.1}>
                <HotelCard hotel={hotel} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
