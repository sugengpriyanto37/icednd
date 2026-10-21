"use client";
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Minus, Plus, Check } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Reveal from '@/components/Reveal';
import ActivityCard from '@/components/ActivityCard';
import { getPackage, getHotel, getActivity, addNights, prettyDate } from '@/data/catalog';
import { useBooking } from '@/lib/BookingContext';
import { useCurrency } from '@/lib/CurrencyContext';

export default function PackageDetail() {
  const { id } = useParams();
  const router = useRouter();
  const { startBooking } = useBooking();
  const { fmt } = useCurrency();
  const pkg = getPackage(id);

  const [checkIn, setCheckIn] = useState('');
  const [guests, setGuests] = useState(2);

  if (!pkg) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-32 text-center">
        <p className="font-display text-3xl text-[#94A3B8]">This package could not be found.</p>
        <Link href="/packages" className="mt-6 inline-block text-sm text-[#4DFFB5] hover:text-[#7EE8FA]">
          Back to all packages
        </Link>
      </div>
    );
  }

  const hotel = getHotel(pkg.hotelId);
  const acts = pkg.includedActivities.map(getActivity).filter(Boolean);
  const total = pkg.pricePerPerson * guests;
  const canReserve = checkIn && checkIn >= new Date().toISOString().slice(0, 10);

  const reserve = () => {
    startBooking({
      type: 'package',
      packageId: pkg.id,
      hotelId: pkg.hotelId,
      roomId: null,
      checkIn,
      checkOut: addNights(checkIn, pkg.nights),
      nights: pkg.nights,
      guests,
      activities: pkg.includedActivities,
      total,
    });
    router.push('/checkout');
  };

  return (
    <div className="pb-24">
      <div className="relative h-[55vh] min-h-[420px] overflow-hidden">
        <Image src={pkg.image} alt={pkg.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080B12] via-[#080B12]/30 to-[#080B12]/50" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="max-w-7xl mx-auto px-6 pb-10">
            <Link href="/packages" className="flex items-center gap-2 text-sm text-[#94A3B8] hover:text-[#4DFFB5] mb-5">
              <ArrowLeft size={16} /> All packages
            </Link>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#7EE8FA]">
              {pkg.nights} nights · {pkg.region} · {pkg.season}
            </p>
            <h1 className="font-display font-light text-4xl sm:text-6xl mt-3">{pkg.name}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-14 grid lg:grid-cols-[1fr_420px] gap-12 items-start">
        <div>
          <p className="text-lg leading-relaxed text-[#F8FAFC]/90 max-w-2xl">{pkg.summary}</p>

          <h2 className="font-display text-3xl mt-12 mb-6">What’s included</h2>
          <div className="space-y-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 flex items-center justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#94A3B8]">Accommodation</p>
                <p className="text-[#F8FAFC] mt-1">{hotel.name}, {pkg.nights} nights · {hotel.location}</p>
              </div>
              <Check size={18} className="text-[#4DFFB5] shrink-0" />
            </div>
            {acts.map((a) => (
              <ActivityCard key={a.id} activity={a} included />
            ))}
          </div>

          <h2 className="font-display text-3xl mt-14 mb-6">Day by day</h2>
          <div className="relative pl-8">
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-[#4DFFB5]/60 via-white/15 to-transparent" />
            {pkg.itinerary.map((d) => (
              <Reveal key={d.day} className="relative pb-8 last:pb-0">
                <div className="absolute -left-8 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-[#4DFFB5] bg-[#080B12]" />
                <p className="text-[11px] uppercase tracking-[0.25em] text-[#7EE8FA]">{d.day}</p>
                <p className="font-display text-xl mt-1">{d.title}</p>
                <p className="text-sm text-[#94A3B8] mt-1.5 max-w-xl leading-relaxed">{d.text}</p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Book panel */}
        <div className="lg:sticky lg:top-24">
          <div className="rounded-3xl border border-white/10 bg-[#111622] p-6">
            <h3 className="font-display text-2xl">Reserve this journey</h3>
            <div className="mt-6 space-y-5">
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-[#94A3B8]">Arrival date</label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="mt-2 w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-sm text-[#F8FAFC] outline-none focus:border-[#4DFFB5]/60 [color-scheme:dark]"
                />
                {checkIn && (
                  <p className="text-xs text-[#94A3B8] mt-2">
                    Departure {prettyDate(addNights(checkIn, pkg.nights))}
                  </p>
                )}
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-[#94A3B8]">Guests</label>
                <div className="mt-2 flex items-center justify-between border border-white/10 rounded-xl px-2 py-1.5">
                  <button onClick={() => setGuests(Math.max(1, guests - 1))} className="p-2 text-[#94A3B8] hover:text-[#4DFFB5]" aria-label="Fewer guests"><Minus size={14} /></button>
                  <span className="text-sm">{guests}</span>
                  <button onClick={() => setGuests(Math.min(6, guests + 1))} className="p-2 text-[#94A3B8] hover:text-[#4DFFB5]" aria-label="More guests"><Plus size={14} /></button>
                </div>
              </div>
              <div className="border-t border-white/10 pt-5 space-y-2.5 text-sm">
                <p className="flex justify-between text-[#94A3B8]">
                  <span>{pkg.name} × {guests}</span><span className="text-[#F8FAFC]">{fmt(total)}</span>
                </p>
                <p className="flex justify-between text-base pt-3 border-t border-white/10">
                  <span className="font-display">Total</span><span className="font-medium text-[#4DFFB5]">{fmt(total)}</span>
                </p>
              </div>
              <button
                onClick={reserve}
                disabled={!canReserve}
                className="w-full py-4 rounded-xl bg-[#4DFFB5] text-[#080B12] text-sm font-semibold hover:bg-[#7EE8FA] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {canReserve ? 'Reserve & Pay' : 'Select an arrival date'}
              </button>
              <p className="text-[11px] text-[#94A3B8] text-center">
                Instant confirmation · Free cancellation up to 30 days before arrival
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}