"use client";
import { createContext, useContext, useMemo, useState } from 'react';

const BookingContext = createContext(null);

const createReference = () =>
  `ICE-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

export function BookingProvider({ children }) {
  const [draft, setDraft] = useState(null);
  const [lastBooking, setLastBooking] = useState(null);

  const value = useMemo(
    () => ({
      draft,
      lastBooking,
      startBooking: (booking) => setDraft(booking),
      confirmBooking: (customer) => {
        if (!draft) return;
        setLastBooking({ ...draft, ...customer, reference: createReference() });
        setDraft(null);
      },
      clearBooking: () => setDraft(null),
    }),
    [draft, lastBooking]
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) throw new Error('useBooking must be used within a BookingProvider');
  return context;
}
