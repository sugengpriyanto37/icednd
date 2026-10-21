"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#080B12] px-6 text-[#F8FAFC]">
      <div className="text-center">
        <p className="font-display text-3xl">The lights went quiet.</p>
        <p className="mt-3 text-sm text-[#94A3B8]">Something went wrong while loading this journey.</p>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-8 rounded-full bg-[#4DFFB5] px-6 py-3 text-sm font-semibold text-[#080B12]"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
