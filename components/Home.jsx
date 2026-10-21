"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Reveal from '@/components/Reveal';
import HotelCard from '@/components/HotelCard';
import {
  hotels, packages, regions, IMG_HERO, IMG_POLAR_NIGHT, IMG_AURORA_HUNT,
} from '@/data/catalog';
import { useCurrency } from '@/lib/CurrencyContext';

export default function Home() {
  const router = useRouter();
  const { fmt } = useCurrency();
  const [date, setDate] = useState('');
  const [region, setRegion] = useState('Anywhere');

  const search = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (date) params.set('date', date);
    if (region !== 'Anywhere') params.set('region', region);
    router.push(`/hotels${params.toString() ? '?' + params.toString() : ''}`);
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[92vh] min-h-[600px] overflow-hidden">
        <Image
          src={IMG_HERO}
          alt="Glass igloo beneath the aurora borealis"
          className="absolute inset-0 h-full w-full object-cover animate-kenburns"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080B12]/60 via-[#080B12]/20 to-[#080B12]" />

        <div className="relative z-10 flex flex-col items-center justify-center h-[70%] text-center px-6">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.35em] text-[#7EE8FA]">
              Norway · The Polar Night Season
            </p>
            <h1 className="font-display font-light text-5xl sm:text-7xl lg:text-8xl mt-6 leading-[1.05]">
              The Night That <span className="italic text-[#4DFFB5]">Glows</span>
            </h1>
            <p className="text-[#94A3B8] max-w-xl mx-auto mt-6 leading-relaxed">
              Luxury winter stays beneath the Aurora Borealis — glass igloos, fjord manors and polar
              expeditions, curated for travellers from abroad.
            </p>
          </Reveal>
        </div>

        {/* Vanishing search */}
        <div className="relative z-10 pb-14 px-6">
          <Reveal delay={0.2}>
            <form
              onSubmit={search}
              className="max-w-3xl mx-auto rounded-2xl border border-white/15 bg-[#111622]/80 backdrop-blur-xl p-2.5 flex flex-col sm:flex-row gap-2.5"
            >
              <label className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] transition-colors">
                <span className="text-xs text-[#94A3B8] whitespace-nowrap">When the lights dance</span>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="bg-transparent text-sm text-[#F8FAFC] w-full outline-none [color-scheme:dark]"
                />
              </label>
              <label className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] transition-colors relative">
                <span className="text-xs text-[#94A3B8] whitespace-nowrap">Where you’ll watch</span>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="bg-transparent text-sm text-[#F8FAFC] w-full outline-none appearance-none pr-6"
                >
                  <option className="bg-[#111622]">Anywhere</option>
                  {regions.map((r) => (
                    <option key={r} className="bg-[#111622]">{r}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 text-[#94A3B8] pointer-events-none" />
              </label>
              <button
                type="submit"
                className="sm:w-auto px-7 py-3 rounded-xl bg-[#4DFFB5] text-[#080B12] text-sm font-semibold hover:bg-[#7EE8FA] transition-colors"
              >
                Seek the Lights
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      {/* Statement */}
      <section className="max-w-4xl mx-auto px-6 py-28 text-center">
        <Reveal>
          <h2 className="font-display font-light text-3xl sm:text-5xl leading-[1.2]">
            From late November the sun never rises above the Arctic Circle —
            and the sky becomes <span className="italic text-[#7EE8FA]">the main attraction.</span>
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/hotels"
              className="px-8 py-3.5 rounded-full bg-[#4DFFB5] text-[#080B12] text-sm font-semibold hover:bg-[#7EE8FA] transition-colors"
            >
              Browse the Hotels
            </Link>
            <Link
              href="/packages"
              className="px-8 py-3.5 rounded-full border border-white/20 text-sm hover:border-[#4DFFB5] hover:text-[#4DFFB5] transition-colors"
            >
              View Curated Packages
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Featured hotels */}
      <section className="max-w-7xl mx-auto px-6 pb-28">
        <Reveal>
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#7EE8FA]">The Observatory</p>
              <h2 className="font-display font-light text-4xl sm:text-5xl mt-3">Houses of the long dark</h2>
            </div>
            <Link href="/hotels" className="hidden sm:flex items-center gap-2 text-sm text-[#4DFFB5] hover:text-[#7EE8FA]">
              All five hotels <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>
        <div className="grid gap-8 md:grid-cols-3">
          {hotels.slice(0, 3).map((hotel, i) => (
            <Reveal key={hotel.id} delay={i * 0.12}>
              <HotelCard hotel={hotel} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Packages */}
      <section className="max-w-7xl mx-auto px-6 pb-28">
        <Reveal>
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#7EE8FA]">Signature Journeys</p>
              <h2 className="font-display font-light text-4xl sm:text-5xl mt-3">Curated packages</h2>
            </div>
            <Link href="/packages" className="hidden sm:flex items-center gap-2 text-sm text-[#4DFFB5] hover:text-[#7EE8FA]">
              All packages <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>
        <div className="grid gap-8 md:grid-cols-3">
          {packages.map((pkg, i) => (
            <Reveal key={pkg.id} delay={i * 0.12}>
              <Link href={`/packages/${pkg.id}`} className="group block h-full">
                <div className="aurora-frame opacity-70 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl h-full">
                  <div className="rounded-3xl overflow-hidden bg-[#111622] h-full flex flex-col">
                    <div className="relative overflow-hidden aspect-[16/10]">
                      <Image src={pkg.image} alt={pkg.name} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111622] to-transparent" />
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-display text-2xl">{pkg.name}</h3>
                      <p className="text-xs text-[#94A3B8] mt-1.5">
                        {pkg.nights} nights · {pkg.region} · {pkg.season}
                      </p>
                      <p className="text-sm text-[#94A3B8] mt-3 flex-1 leading-relaxed">{pkg.summary}</p>
                      <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                        <p className="text-sm"><span className="text-[#94A3B8]">from </span><span className="font-medium">{fmt(pkg.pricePerPerson)}</span><span className="text-[#94A3B8]"> pp</span></p>
                        <span className="text-sm text-[#4DFFB5] flex items-center gap-1.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                          View <ArrowRight size={15} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Experience band */}
      <section className="max-w-7xl mx-auto px-6 pb-28">
        <div className="grid md:grid-cols-2 gap-12 items-center rounded-3xl bg-[#111622] p-6 sm:p-12">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#7EE8FA]">Beyond the Room Key</p>
            <h2 className="font-display font-light text-4xl sm:text-5xl mt-4 leading-tight">
              The Arctic, <span className="italic text-[#4DFFB5]">added to your stay</span>
            </h2>
            <p className="text-[#94A3B8] mt-6 leading-relaxed max-w-md">
              Every stay can grow into a journey. Dog sled through birch forest, chase the lights with a
              meteorologist, or drift among orcas on a heated expedition boat — each added to your booking
              in a single step.
            </p>
            <Link
              href="/hotels"
              className="inline-flex items-center gap-2 mt-8 text-sm text-[#4DFFB5] hover:text-[#7EE8FA] transition-colors"
            >
              Start with a hotel <ArrowRight size={16} />
            </Link>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="rounded-2xl overflow-hidden aspect-[4/3]">
              <Image src={IMG_AURORA_HUNT} alt="Aurora hunt" className="h-full w-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Destination teaser */}
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <Image
          src={IMG_POLAR_NIGHT}
          alt="Polar night in Svalbard"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080B12] via-[#080B12]/30 to-[#080B12]/40" />
        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col items-start justify-end pb-16">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#7EE8FA]">Know Before You Go</p>
            <h2 className="font-display font-light text-4xl sm:text-6xl mt-4 max-w-2xl leading-tight">
              Everything a first visitor to the polar night should know.
            </h2>
            <Link
              href="/destination"
              className="inline-flex items-center gap-2 mt-8 px-7 py-3 rounded-full border border-white/25 text-sm hover:border-[#4DFFB5] hover:text-[#4DFFB5] transition-colors"
            >
              Explore the guide <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}