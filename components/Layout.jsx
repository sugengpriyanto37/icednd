"use client";
import Link from 'next/link';
import { Menu } from 'lucide-react';
import CurrencySwitcher from './CurrencySwitcher';
import { useState } from 'react';

const NAV = [
  { label: 'Hotels', to: '/hotels' },
  { label: 'Packages', to: '/packages' },
  { label: 'The Arctic', to: '/destination' },
];

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#080B12] text-[#F8FAFC]">
      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#080B12]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-display text-xl tracking-[0.08em]">
            Ice<span className="italic text-[#4DFFB5]">DnD</span>
          </Link>
          <nav className="hidden md:flex items-center gap-10">
            {NAV.map((item) => (
              <Link
                key={item.to}
                href={item.to}
                className="text-sm tracking-wide transition-colors hover:text-[#4DFFB5] text-[#94A3B8]"
              >
                {item.label}
              </Link>
            ))}
            <CurrencySwitcher />
            <Link
              href="/hotels"
              className="text-sm font-medium px-5 py-2 rounded-full bg-[#4DFFB5] text-[#080B12] hover:bg-[#7EE8FA] transition-colors"
            >
              Book a Stay
            </Link>
          </nav>
          <button
            className="md:hidden text-[#F8FAFC] p-2"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <Menu size={22} />
          </button>
        </div>
        {open && (
          <nav className="md:hidden border-t border-white/[0.06] px-6 py-4 flex flex-col gap-4 bg-[#080B12]">
            {NAV.map((item) => (
              <Link
                key={item.to}
                href={item.to}
                onClick={() => setOpen(false)}
                className="text-sm text-[#94A3B8] hover:text-[#4DFFB5]"
              >
                {item.label}
              </Link>
            ))}
            <CurrencySwitcher />
            <Link
              href="/hotels"
              onClick={() => setOpen(false)}
              className="text-sm font-medium px-5 py-2.5 rounded-full bg-[#4DFFB5] text-[#080B12] text-center"
            >
              Book a Stay
            </Link>
          </nav>
        )}
      </header>

      <main>
        {children}
      </main>

      <footer className="border-t border-white/[0.06] mt-24">
        <div className="max-w-7xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-display text-2xl">
              Ice<span className="italic text-[#4DFFB5]">DnD</span>
            </p>
            <p className="text-sm text-[#94A3B8] mt-3 max-w-xs leading-relaxed">
              Luxury winter stays and polar night journeys across the Norwegian Arctic, curated for
              international guests.
            </p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#94A3B8] mb-4">Explore</p>
            <div className="flex flex-col gap-2.5">
              <Link href="/hotels" className="text-sm text-[#F8FAFC] hover:text-[#4DFFB5]">Hotels</Link>
              <Link href="/packages" className="text-sm text-[#F8FAFC] hover:text-[#4DFFB5]">Curated Packages</Link>
              <Link href="/destination" className="text-sm text-[#F8FAFC] hover:text-[#4DFFB5]">The Arctic</Link>
            </div>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#94A3B8] mb-4">Concierge</p>
            <p className="text-sm text-[#F8FAFC]">concierge@icednd.no</p>
            <p className="text-sm text-[#F8FAFC] mt-1.5">+47 900 55 512</p>
            <p className="text-xs text-[#94A3B8] mt-4">Prices shown in your selected currency — indicative rates, charged in NOK. Payment on this site is a design preview — no card is charged.</p>
          </div>
        </div>
        <div className="border-t border-white/[0.06] py-5 px-6 text-center text-xs text-[#94A3B8]">
          © 2026 IceDnD. Tromsø · Lofoten · Svalbard · Alta · Narvik.
        </div>
      </footer>
    </div>
  );
}
