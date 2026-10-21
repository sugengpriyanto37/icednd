"use client";
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, ShieldCheck } from 'lucide-react';
import { getHotel, getPackage, getActivity, prettyDate } from '@/data/catalog';
import { useBooking } from '@/lib/BookingContext';
import { useCurrency } from '@/lib/CurrencyContext';

export default function Checkout() {
  const router = useRouter();
  const { draft, confirmBooking } = useBooking();
  const { fmt, code } = useCurrency();
  const submittedRef = useRef(false);
  const [snapshot] = useState(() => (draft ? { ...draft, activities: [...(draft.activities || [])] } : null));

  const [form, setForm] = useState({ name: '', email: '', card: '', expiry: '', cvc: '', country: '' });
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!draft && !submittedRef.current) router.push('/hotels', { replace: true });
  }, [draft]);

  if (!snapshot) return null;

  const hotel = getHotel(snapshot.hotelId);
  const pkg = snapshot.packageId ? getPackage(snapshot.packageId) : null;
  const room = hotel && snapshot.roomId ? hotel.rooms.find((r) => r.id === snapshot.roomId) : null;
  const acts = (snapshot.activities || []).map(getActivity).filter(Boolean);

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return setError('Please enter your full name and email.');
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) return setError('Please enter a valid email address.');
    const digits = form.card.replace(/\s/g, '');
    if (!/^\d{15,16}$/.test(digits)) return setError('Please enter a valid card number.');
    if (!/^\d{2}\/\d{2}$/.test(form.expiry)) return setError('Card expiry must be MM/YY.');
    if (!/^\d{3,4}$/.test(form.cvc)) return setError('Please enter the card security code.');
    if (!form.country.trim()) return setError('Please enter your billing country.');
    setError('');
    setProcessing(true);
    setTimeout(() => {
      submittedRef.current = true;
      confirmBooking({ name: form.name.trim(), email: form.email.trim(), cardLast4: digits.slice(-4) });
      router.push('/confirmation');
    }, 1400);
  };

  const timeline = [
    { label: 'Arrival', title: hotel ? `Check in · ${hotel.name}` : 'Arrival', detail: snapshot.checkIn ? prettyDate(snapshot.checkIn) : '' },
    ...acts.map((a) => ({ label: 'Experience', title: a.name, detail: a.duration })),
    { label: 'Departure', title: 'Check out', detail: snapshot.checkOut ? prettyDate(snapshot.checkOut) : '' },
  ];

  const inputCls =
    'w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-sm text-[#F8FAFC] placeholder-[#94A3B8] outline-none focus:border-[#4DFFB5]/60 transition-colors';

  return (
    <div className="min-h-screen bg-[#080B12] text-[#F8FAFC] py-14 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[11px] uppercase tracking-[0.35em] text-[#7EE8FA]">The Final Ascent</p>
          <h1 className="font-display font-light text-4xl sm:text-5xl mt-3">Secure your journey</h1>
        </div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-start">
          {/* Payment */}
          <form onSubmit={submit} className="rounded-3xl border border-white/10 bg-[#111622] p-6 sm:p-8">
            <h2 className="font-display text-2xl mb-6">Your details</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <input className={inputCls} placeholder="Full name" value={form.name} onChange={set('name')} />
              <input className={inputCls} placeholder="Email address" type="email" value={form.email} onChange={set('email')} />
            </div>

            <h2 className="font-display text-2xl mt-10 mb-2 flex items-center gap-3">
              Payment <span className="text-[11px] font-body uppercase tracking-[0.2em] text-[#94A3B8] font-normal">Design preview — no card is charged</span>
            </h2>
            <div className="space-y-4 mt-4">
              <div className="relative">
                <input
                  className={inputCls + ' pr-12'}
                  placeholder="Card number"
                  inputMode="numeric"
                  value={form.card}
                  onChange={(e) =>
                    setForm({ ...form, card: e.target.value.replace(/[^\d]/g, '').slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ') })
                  }
                />
                <Lock size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input className={inputCls} placeholder="MM/YY" value={form.expiry} onChange={set('expiry')} inputMode="numeric" />
                <input className={inputCls} placeholder="CVC" value={form.cvc} onChange={set('cvc')} inputMode="numeric" />
              </div>
              <input className={inputCls} placeholder="Country of residence" value={form.country} onChange={set('country')} />
            </div>

            {error && <p className="mt-5 text-sm text-[#FF8A8A]">{error}</p>}

            <button
              type="submit"
              disabled={processing}
              className="animate-aurora-glow w-full mt-8 py-4 rounded-xl bg-[#4DFFB5] text-[#080B12] text-sm font-semibold hover:bg-[#7EE8FA] transition-colors disabled:opacity-70"
            >
              {processing ? 'Confirming your journey…' : 'Book Your Journey'}
            </button>
            <p className="flex items-center justify-center gap-2 text-xs text-[#94A3B8] mt-4">
              <ShieldCheck size={14} /> Encrypted checkout · Free cancellation up to 30 days before arrival
            </p>
          </form>

          {/* Summary */}
          <div className="rounded-3xl border border-white/10 bg-[#111622] p-6 sm:p-8 lg:sticky lg:top-8">
            <h2 className="font-display text-2xl mb-6">Your itinerary</h2>
            <div className="relative pl-7 space-y-5">
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-[#4DFFB5]/60 via-white/15 to-transparent" />
              {timeline.map((t, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-7 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-[#4DFFB5] bg-[#080B12]" />
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#7EE8FA]">{t.label}</p>
                  <p className="text-sm text-[#F8FAFC] mt-0.5">{t.title}</p>
                  <p className="text-xs text-[#94A3B8]">{t.detail}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 mt-8 pt-5 space-y-2.5 text-sm">
              {pkg ? (
                <p className="flex justify-between text-[#94A3B8]">
                  <span>{pkg.name} × {snapshot.guests}</span>
                  <span className="text-[#F8FAFC]">{fmt(snapshot.total)}</span>
                </p>
              ) : (
                <>
                  {room && (
                    <p className="flex justify-between text-[#94A3B8]">
                      <span>{room.name} × {snapshot.nights}</span>
                      <span className="text-[#F8FAFC]">{fmt(room.price * snapshot.nights)}</span>
                    </p>
                  )}
                  {acts.map((a) => (
                    <p key={a.id} className="flex justify-between text-[#94A3B8]">
                      <span className="truncate pr-3">{a.name} × {snapshot.guests}</span>
                      <span className="text-[#F8FAFC] shrink-0">{fmt(a.price * snapshot.guests)}</span>
                    </p>
                  ))}
                </>
              )}
              <p className="flex justify-between text-base pt-3 border-t border-white/10">
                <span className="font-display">Total</span>
                <span className="font-medium text-[#4DFFB5]">{fmt(snapshot.total)}</span>
              </p>
            </div>
            <p className="text-xs text-[#94A3B8] mt-4">
              {snapshot.guests} guest{snapshot.guests > 1 ? 's' : ''}
              {pkg ? ` · ${snapshot.nights} nights` : snapshot.roomId ? ` · ${snapshot.nights} nights` : ''}
            </p>
            <p className="text-xs text-[#94A3B8] mt-1">Shown in {code} · indicative rates — payment is a design preview.</p>
          </div>
        </div>
      </div>
    </div>
  );
}