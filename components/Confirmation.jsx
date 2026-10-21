"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { getHotel, getPackage, getActivity, prettyDate } from '@/data/catalog';
import { useBooking } from '@/lib/BookingContext';
import { useCurrency } from '@/lib/CurrencyContext';

export default function Confirmation() {
  const router = useRouter();
  const { lastBooking, ready } = useBooking();
  const { fmt } = useCurrency();

  useEffect(() => {
    if (ready && !lastBooking) router.push('/', { replace: true });
  }, [lastBooking, ready, router]);

  if (!ready || !lastBooking) return null;

  const hotel = getHotel(lastBooking.hotelId);
  const pkg = lastBooking.packageId ? getPackage(lastBooking.packageId) : null;
  const room = hotel && lastBooking.roomId ? hotel.rooms.find((r) => r.id === lastBooking.roomId) : null;
  const acts = (lastBooking.activities || []).map(getActivity).filter(Boolean);

  return (
    <div className="min-h-screen bg-[#080B12] text-[#F8FAFC] flex flex-col items-center justify-center px-6 py-20">
      <div className="max-w-2xl w-full text-center">
        <div className="mx-auto h-16 w-16 rounded-full border-2 border-[#4DFFB5] flex items-center justify-center animate-aurora-glow">
          <Check size={28} className="text-[#4DFFB5]" />
        </div>
        <p className="text-[11px] uppercase tracking-[0.35em] text-[#7EE8FA] mt-8">Booking Confirmed</p>
        <h1 className="font-display font-light text-4xl sm:text-6xl mt-4">
          The lights are <span className="italic text-[#4DFFB5]">expecting you.</span>
        </h1>
        <p className="text-[#94A3B8] mt-5 leading-relaxed">
          Thank you, {lastBooking.name}. Your journey is reserved — keep this reference for any
          correspondence with our concierge.
        </p>
        <p className="mt-6 inline-block rounded-full border border-[#4DFFB5]/40 bg-[#4DFFB5]/[0.08] px-6 py-2.5 font-mono tracking-[0.2em] text-[#4DFFB5]">
          {lastBooking.reference}
        </p>

        <div className="mt-10 rounded-3xl border border-white/10 bg-[#111622] p-6 sm:p-8 text-left">
          <div className="grid sm:grid-cols-2 gap-5 text-sm">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#94A3B8]">Arrival</p>
              <p className="mt-1.5">{lastBooking.checkIn ? prettyDate(lastBooking.checkIn) : '—'}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#94A3B8]">Departure</p>
              <p className="mt-1.5">{lastBooking.checkOut ? prettyDate(lastBooking.checkOut) : '—'}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#94A3B8]">Stay</p>
              <p className="mt-1.5">{pkg ? pkg.name : room ? room.name : '—'}</p>
              {hotel && <p className="text-[#94A3B8] mt-0.5">{hotel.name} · {hotel.region}</p>}
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#94A3B8]">Guests</p>
              <p className="mt-1.5">{lastBooking.guests}</p>
            </div>
          </div>
          {acts.length > 0 && (
            <div className="mt-6 pt-5 border-t border-white/10">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#94A3B8] mb-3">Included experiences</p>
              <div className="space-y-2">
                {acts.map((a) => (
                  <p key={a.id} className="text-sm text-[#F8FAFC] flex items-center gap-2.5">
                    <Check size={14} className="text-[#4DFFB5] shrink-0" /> {a.name}
                    <span className="text-[#94A3B8]">· {a.duration}</span>
                  </p>
                ))}
              </div>
            </div>
          )}
          <div className="mt-6 pt-5 border-t border-white/10 flex justify-between text-base">
            <span className="font-display">Total paid</span>
            <span className="font-medium text-[#4DFFB5]">{fmt(lastBooking.total)}</span>
          </div>
          <p className="text-xs text-[#94A3B8] mt-4">
            Payment simulated for demonstration — no card was charged.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/" className="px-8 py-3.5 rounded-md bg-[#4DFFB5] text-[#080B12] text-sm font-semibold hover:bg-[#7EE8FA] transition-colors">
            Back to Home
          </Link>
          <Link href="/destination" className="px-8 py-3.5 rounded-md border border-white/20 text-sm hover:border-[#4DFFB5] hover:text-[#4DFFB5] transition-colors">
            Prepare for the Arctic
          </Link>
        </div>
      </div>
    </div>
  );
}
