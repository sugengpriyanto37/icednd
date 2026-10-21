"use client";

import { BookingProvider } from "@/lib/BookingContext";
import { CurrencyProvider } from "@/lib/CurrencyContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <BookingProvider>
      <CurrencyProvider>{children}</CurrencyProvider>
    </BookingProvider>
  );
}
