"use client";
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Check, Minus, Plus } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Reveal from '@/components/Reveal';
import LumeRating from '@/components/LumeRating';
import ActivityCard from '@/components/ActivityCard';
import { hotels, activities, addNights, prettyDate } from '@/data/catalog';
import { useBooking } from '@/lib/BookingContext';
import { useCurrency } from '@/lib/CurrencyContext';

export default function HotelDetail() {
  const { id } = useParams();
  const router = useRouter();
  const { startBooking } = useBooking();
  const { fmt } = useCurrency();
  const hotel = hotels.find((h) => h.id === id);

  const [roomId, setRoomId] = useState(hotel?.rooms[0].id);
  const [checkIn, setCheckIn] = useState('');
  const [nights, setNights] = useState(3);
  const [guests, setGuests] = useState(2);
  const [selected, setSelected] = useState({});

  const room = hotel?.rooms.find((r) => r.id === roomId);
  const hotelActivities = activities.filter((a) => a.regions.includes(hotel?.region));

  if (!hotel || !room) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-32 text-center">
        <p className="font-display text-3xl text-[#94A3B8]">This hotel could not be found.</p>
        <Link href="/hotels" className="mt-6 inline-block text-sm text-[#4DFFB5] hover:text-[#7EE8FA]">
          Back to all hotels
        </Link>
      </div>
    );
  }

  const roomTotal = room.price * nights;
  const chosenActivities = hotelActivities.filter((a) => selected[a.id]);
  const activitiesTotal = chosenActivities.reduce((sum, a) => sum + a.price * guests, 0);
  const total = roomTotal + activitiesTotal;
  const canReserve = checkIn && checkIn >= new Date().toISOString().slice(0, 10);

  const reserve = () => {
    startBooking({
      type: 'hotel',
      hotelId: hotel.id,
      roomId: room.id,
      checkIn,
      checkOut: addNights(checkIn, nights),
      nights,
      guests,
      activities: chosenActivities.map((a) => a.id),
      total,
    });
    router.push('/checkout');
  };

  return (
    <div className="pb-24">
      <div className="max-w-7xl mx-auto px-6 pt-10">
        <Link href="/hotels" className="flex items-center gap-2 text-sm text-[#94A3B8] hover:text-[#4DFFB5] transition-colors">
          <ArrowLeft size={16} /> All hotels
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-8 grid lg:grid-cols-[1fr_420px] gap-12 items-start">
        {/* Gallery & story */}
        <div>
          <Reveal>
            <div className="rounded-3xl overflow-hidden aspect-[16/10]">
              <Image src={hotel.image} alt={hotel.name} className="h-full w-full object-cover" />
            </div>
          </Reveal>
          <div className="mt-10">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#7EE8FA]">{hotel.location}</p>
            <h1 className="font-display font-light text-4xl sm:text-6xl mt-3">{hotel.name}</h1>
            <p className="text-[#94A3B8] mt-2 flex items-center gap-3">
              <span>Guest rating {hotel.rating} / 5</span>
              <LumeRating level={hotel.lume} />
            </p>
            <p className="mt-6 text-lg leading-relaxed text-[#F8FAFC]/90 max-w-2xl">{hotel.description}</p>

            <div className="mt-10 grid sm:grid-cols-2 gap-x-8 gap-y-3">
              {hotel.features.map((f) => (
                <p key={f} className="flex items-center gap-2.5 text-sm text-[#94A3B8]">
                  <Check size={15} className="text-[#4DFFB5] shrink-0" /> {f}
                </p>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border border-[#4DFFB5]/25 bg-[#4DFFB5]/[0.05] p-6">
              <p className="text-[11px] uppercase tracking-[0.25em] text-[#4DFFB5]">The darkness here</p>
              <p className="mt-3 text-sm leading-relaxed text-[#F8FAFC]/90">{hotel.auroraNotes}</p>
            </div>

            {/* Rooms */}
            <h2 className="font-display text-3xl mt-14 mb-6">Rooms & suites</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {hotel.rooms.map((r) => (
                <div
                  key={r.id}
                  className={`rounded-2xl border p-5 cursor-pointer transition-colors ${
                    r.id === roomId ? 'border-[#4DFFB5]/60 bg-[#4DFFB5]/[0.06]' : 'border-white/10 hover:border-white/25'
                  }`}
                  onClick={() => setRoomId(r.id)}
                >
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[#94A3B8]">Sleeps {r.capacity}</p>
                  <p className="font-display text-xl mt-2">{r.name}</p>
                  <p className="text-xs text-[#94A3B8] mt-1">{r.view}</p>
                  <p className="text-sm mt-4"><span className="font-medium">{fmt(r.price)}</span><span className="text-[#94A3B8]"> / night</span></p>
                </div>
              ))}
            </div>

            {/* Add-ons */}
            <h2 className="font-display text-3xl mt-14 mb-2">Complete the experience</h2>
            <p className="text-sm text-[#94A3B8] mb-6">Available from this property — add to your journey.</p>
            <div className="flex flex-col gap-3">
              {hotelActivities.map((a) => (
                <ActivityCard
                  key={a.id}
                  activity={a}
                  selected={!!selected[a.id]}
                  onToggle={(aid) => setSelected((prev) => ({ ...prev, [aid]: !prev[aid] }))}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Journey builder */}
        <div className="lg:sticky lg:top-24">
          <div className="rounded-3xl border border-white/10 bg-[#111622] p-6">
            <h3 className="font-display text-2xl">Build your journey</h3>

            <div className="mt-6 space-y-5">
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-[#94A3B8]">Check-in</label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="mt-2 w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-sm text-[#F8FAFC] outline-none focus:border-[#4DFFB5]/60 [color-scheme:dark]"
                />
                {checkIn && (
                  <p className="text-xs text-[#94A3B8] mt-2">
                    Check-out {prettyDate(addNights(checkIn, nights))} · {nights} {nights === 1 ? 'night' : 'nights'}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-[#94A3B8]">Nights</label>
                  <div className="mt-2 flex items-center justify-between border border-white/10 rounded-xl px-2 py-1.5">
                    <button onClick={() => setNights(Math.max(1, nights - 1))} className="p-2 text-[#94A3B8] hover:text-[#4DFFB5]" aria-label="Fewer nights"><Minus size={14} /></button>
                    <span className="text-sm">{nights}</span>
                    <button onClick={() => setNights(Math.min(14, nights + 1))} className="p-2 text-[#94A3B8] hover:text-[#4DFFB5]" aria-label="More nights"><Plus size={14} /></button>
                  </div>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-[#94A3B8]">Guests</label>
                  <div className="mt-2 flex items-center justify-between border border-white/10 rounded-xl px-2 py-1.5">
                    <button onClick={() => setGuests(Math.max(1, guests - 1))} className="p-2 text-[#94A3B8] hover:text-[#4DFFB5]" aria-label="Fewer guests"><Minus size={14} /></button>
                    <span className="text-sm">{guests}</span>
                    <button onClick={() => setGuests(Math.min(room.capacity, guests + 1))} className="p-2 text-[#94A3B8] hover:text-[#4DFFB5]" aria-label="More guests"><Plus size={14} /></button>
                  </div>
                  <p className="text-[11px] text-[#94A3B8] mt-1.5">Suite sleeps {room.capacity}</p>
                </div>
              </div>

              <div className="border-t border-white/10 pt-5 space-y-2.5 text-sm">
                <p className="flex justify-between text-[#94A3B8]">
                  <span>{room.name} × {nights}</span><span className="text-[#F8FAFC]">{fmt(roomTotal)}</span>
                </p>
                {chosenActivities.map((a) => (
                  <p key={a.id} className="flex justify-between text-[#94A3B8]">
                    <span className="truncate pr-3">{a.name} × {guests}</span>
                    <span className="text-[#F8FAFC] shrink-0">{fmt(a.price * guests)}</span>
                  </p>
                ))}
                <p className="flex justify-between text-base pt-3 border-t border-white/10">
                  <span className="font-display">Total</span><span className="font-medium text-[#4DFFB5]">{fmt(total)}</span>
                </p>
              </div>

              <button
                onClick={reserve}
                disabled={!canReserve}
                className="w-full py-4 rounded-xl bg-[#4DFFB5] text-[#080B12] text-sm font-semibold hover:bg-[#7EE8FA] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {canReserve ? 'Reserve & Pay' : 'Select a check-in date'}
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
