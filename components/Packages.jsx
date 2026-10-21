"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Reveal from '@/components/Reveal';
import { packages, getHotel, getActivity } from '@/data/catalog';
import { useCurrency } from '@/lib/CurrencyContext';

export default function Packages() {
  const { fmt } = useCurrency();
  return (
    <div className="max-w-6xl mx-auto px-6 pt-16 pb-16">
      <p className="text-[11px] uppercase tracking-[0.3em] text-[#7EE8FA]">Signature Journeys</p>
      <h1 className="font-display font-light text-4xl sm:text-6xl mt-3">Curated packages</h1>
      <p className="text-[#94A3B8] mt-4 max-w-2xl leading-relaxed">
        Three journeys, designed end-to-end: the right house, the right nights, and the signature
        experiences already woven in. Prices are per person, double occupancy.
      </p>

      <div className="mt-16 space-y-16">
        {packages.map((pkg, i) => {
          const hotel = getHotel(pkg.hotelId);
          const acts = pkg.includedActivities.map(getActivity).filter(Boolean);
          const reversed = i % 2 === 1;
          return (
            <Reveal key={pkg.id}>
              <div className={`grid md:grid-cols-2 gap-10 items-center ${reversed ? 'md:[&>*:first-child]:order-2' : ''}`}>
                <Link href={`/packages/${pkg.id}`} className="group block">
                  <div className="aurora-frame opacity-70 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl">
                    <div className="rounded-3xl overflow-hidden aspect-[4/3]">
                      <Image src={pkg.image} alt={pkg.name} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                    </div>
                  </div>
                </Link>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.25em] text-[#7EE8FA]">
                    {pkg.nights} nights · {pkg.region} · {pkg.season}
                  </p>
                  <h2 className="font-display font-light text-3xl sm:text-5xl mt-3">{pkg.name}</h2>
                  <p className="text-[#94A3B8] mt-5 leading-relaxed">{pkg.summary}</p>
                  <div className="mt-6 space-y-2">
                    <p className="text-sm text-[#94A3B8]">Staying at <span className="text-[#F8FAFC]">{hotel.name}</span></p>
                    {acts.map((a) => (
                      <p key={a.id} className="text-sm text-[#94A3B8]">
                        <span className="text-[#4DFFB5] mr-2">+</span>{a.name}
                      </p>
                    ))}
                  </div>
                  <div className="mt-8 flex items-center gap-6">
                    <p className="text-lg">
                      <span className="text-[#94A3B8] text-sm">from </span>
                      <span className="font-medium">{fmt(pkg.pricePerPerson)}</span>
                      <span className="text-[#94A3B8] text-sm"> pp</span>
                    </p>
                    <Link
                      href={`/packages/${pkg.id}`}
                      className="flex items-center gap-2 text-sm text-[#4DFFB5] hover:text-[#7EE8FA] transition-colors"
                    >
                      View the journey <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}