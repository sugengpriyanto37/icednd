"use client";
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const BookingContext = createContext(null);

const readStoredBooking = () => {
  if (typeof window === 'undefined') return { draft: null, lastBooking: null };
  try {
    const saved = window.localStorage.getItem('icednd-booking');
    if (!saved) return { draft: null, lastBooking: null };
    const parsed = JSON.parse(saved);
    return { draft: parsed.draft ?? null, lastBooking: parsed.lastBooking ?? null };
  } catch {
    window.localStorage.removeItem('icednd-booking');
    return { draft: null, lastBooking: null };
  }
};

const createReference = () =>
  `ICE-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

export function BookingProvider({ children }) {
  const [stored] = useState(readStoredBooking);
  const [draft, setDraft] = useState(stored.draft);
  const [lastBooking, setLastBooking] = useState(stored.lastBooking);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem('icednd-booking', JSON.stringify({ draft, lastBooking }));
  }, [draft, lastBooking, ready]);

  const value = useMemo(
    () => ({
      draft,
      lastBooking,
      ready,
      startBooking: (booking) => setDraft(booking),
      confirmBooking: (customer) => {
        if (!draft) return;
        setLastBooking({ ...draft, ...customer, reference: createReference() });
        setDraft(null);
      },
      clearBooking: () => setDraft(null),
    }),
    [draft, lastBooking, ready]
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) throw new Error('useBooking must be used within a BookingProvider');
  return context;
}
