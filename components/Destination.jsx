"use client";
import React from 'react';
import Link from 'next/link';
import { Plane, Globe, Wallet, Languages, Backpack, Moon } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Reveal from '@/components/Reveal';
import { IMG_POLAR_NIGHT, IMG_AURORA_HUNT } from '@/data/catalog';

const MONTHS = [
  { m: 'Sep', v: 2 }, { m: 'Oct', v: 3 }, { m: 'Nov', v: 4 }, { m: 'Dec', v: 4 },
  { m: 'Jan', v: 5 }, { m: 'Feb', v: 5 }, { m: 'Mar', v: 4 },
];

const PRACTICAL = [
  { icon: Plane, title: 'Getting there', text: 'Fly into Oslo and connect to Tromsø (1h 50m), Alta, Bodø for Lofoten, or Longyearbyen. Direct winter routes also reach Tromsø from several European hubs.' },
  { icon: Globe, title: 'Entry & visas', text: 'Norway is in the Schengen area. Visa requirements depend on your nationality — check well before travelling, as arctic airports process few same-day cases.' },
  { icon: Wallet, title: 'Money', text: 'The currency is the Norwegian krone (NOK). Cards and mobile payment are accepted everywhere — you will rarely need cash.' },
  { icon: Languages, title: 'Language', text: 'English is spoken fluently at every hotel, on every tour and in every restaurant. You will not need Norwegian.' },
  { icon: Backpack, title: 'What to pack', text: 'Thermal base layers, an insulated parka, wool socks and gripped soles for −15°C nights. Tour operators provide expedition suits and boots.' },
  { icon: Moon, title: 'Daylight & driving', text: 'Expect a few hours of blue-hour twilight rather than full daylight. Winter roads are ploughed but icy — transfers and guided drives are the relaxed choice.' },
];

export default function Destination() {
  return (
    <div className="pb-16">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <Image src={IMG_POLAR_NIGHT} alt="The polar night" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080B12] via-[#080B12]/30 to-[#080B12]/50" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-end pb-12">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#7EE8FA]">The Arctic, Explained</p>
          <h1 className="font-display font-light text-4xl sm:text-6xl mt-3 max-w-3xl leading-tight">
            A season with no sunrise, and a sky that answers.
          </h1>
        </div>
      </section>

      {/* Aurora season */}
      <section className="max-w-6xl mx-auto px-6 pt-24">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#7EE8FA]">The Aurora Season</p>
          <h2 className="font-display font-light text-3xl sm:text-5xl mt-3">When to come for the lights</h2>
          <p className="text-[#94A3B8] mt-5 max-w-2xl leading-relaxed">
            The aurora borealis is visible from northern Norway from September to late March, whenever
            the sky is dark and clear. Activity follows the solar wind — the deepest polar night months
            offer the most hours of darkness, and statistically the best odds.
          </p>
        </Reveal>
        <div className="mt-10 grid grid-cols-7 gap-2 sm:gap-4">
          {MONTHS.map((mo, i) => (
            <Reveal key={mo.m} delay={i * 0.06}>
              <div className="text-center">
                <p className="text-xs text-[#94A3B8] mb-3">{mo.m}</p>
                <div className="h-32 rounded-t-xl bg-white/[0.03] relative overflow-hidden">
                  <div
                    className="absolute bottom-0 inset-x-0 rounded-t-xl bg-gradient-to-t from-[#4DFFB5] to-[#7EE8FA] opacity-80"
                    style={{ height: `${(mo.v / 5) * 100}%` }}
                  />
                </div>
                {mo.v === 5 && <p className="text-[10px] uppercase tracking-[0.15em] text-[#4DFFB5] mt-2">Peak</p>}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Polar night */}
      <section className="max-w-6xl mx-auto px-6 pt-24 grid md:grid-cols-2 gap-12 items-center">
        <Reveal>
          <div className="rounded-3xl overflow-hidden aspect-[4/3]">
            <Image src={IMG_AURORA_HUNT} alt="Watching the aurora" className="h-full w-full object-cover" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#7EE8FA]">The Polar Night</p>
          <h2 className="font-display font-light text-3xl sm:text-5xl mt-3">Living in the long dark</h2>
          <p className="text-[#94A3B8] mt-5 leading-relaxed">
            North of the Arctic Circle the sun sets in November and does not rise again until January.
            It is not pitch black — snow, moon and twilight keep the landscape a deep, luminous blue —
            and it is precisely these weeks of darkness that give the aurora its stage.
          </p>
          <div className="mt-8 space-y-4">
            {[
              ['Tromsø', 'Nov 27 – Jan 15 · no sunrise'],
              ['Alta & Narvik', 'Late Nov – mid Jan · no sunrise'],
              ['Svalbard, 78°N', 'Oct 26 – Feb 16 · the longest dark'],
            ].map(([place, detail]) => (
              <div key={place} className="flex items-baseline justify-between border-b border-white/10 pb-3">
                <p className="text-[#F8FAFC]">{place}</p>
                <p className="text-xs text-[#94A3B8] text-right">{detail}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Practical info */}
      <section className="max-w-6xl mx-auto px-6 pt-24">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#7EE8FA]">Practical Notes</p>
          <h2 className="font-display font-light text-3xl sm:text-5xl mt-3">For visitors from abroad</h2>
        </Reveal>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PRACTICAL.map((card, i) => (
            <Reveal key={card.title} delay={(i % 3) * 0.08}>
              <div className="h-full rounded-2xl border border-white/10 bg-[#111622] p-6 hover:border-[#4DFFB5]/40 transition-colors">
                <card.icon size={22} className="text-[#4DFFB5]" />
                <h3 className="font-display text-xl mt-4">{card.title}</h3>
                <p className="text-sm text-[#94A3B8] mt-3 leading-relaxed">{card.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 pt-24 text-center">
        <Reveal>
          <h2 className="font-display font-light text-3xl sm:text-5xl">
            The sky is waiting. <span className="italic text-[#4DFFB5]">Begin planning.</span>
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/hotels" className="px-8 py-3.5 rounded-full bg-[#4DFFB5] text-[#080B12] text-sm font-semibold hover:bg-[#7EE8FA] transition-colors">
              Browse the Hotels
            </Link>
            <Link href="/packages" className="px-8 py-3.5 rounded-full border border-white/20 text-sm hover:border-[#4DFFB5] hover:text-[#4DFFB5] transition-colors">
              View Curated Packages
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
