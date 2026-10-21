"use client";
import Link from 'next/link';
import { Image } from '@/components/ui/image';
import { ArrowRight } from 'lucide-react';
import { useCurrency } from '@/lib/CurrencyContext';
import LumeRating from './LumeRating';

export default function HotelCard({ hotel }) {
  const { fmt } = useCurrency();
  return (
    <Link href={`/hotels/${hotel.id}`} className="group block h-full">
      <div className="aurora-frame opacity-70 transition-opacity duration-500 group-hover:opacity-100 rounded-3xl h-full">
        <div className="rounded-3xl overflow-hidden bg-[#111622] h-full flex flex-col">
          <div className="relative overflow-hidden aspect-[4/3]">
            <Image
              src={hotel.image}
              alt={hotel.name}
              className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080B12]/80 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.25em] text-[#7EE8FA]">{hotel.region}</p>
                <h3 className="font-display text-2xl text-[#F8FAFC] mt-1">{hotel.name}</h3>
              </div>
              <LumeRating level={hotel.lume} />
            </div>
          </div>
          <div className="p-5 flex flex-col flex-1">
            <p className="text-sm text-[#94A3B8] leading-relaxed flex-1">{hotel.tagline}</p>
            <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
              <p className="text-sm text-[#F8FAFC]">
                <span className="text-[#94A3B8]">from </span>
                <span className="font-medium">{fmt(hotel.priceFrom)}</span>
                <span className="text-[#94A3B8]"> / night</span>
              </p>
              <span className="flex items-center gap-2 text-sm text-[#4DFFB5] opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                Explore <ArrowRight size={16} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}