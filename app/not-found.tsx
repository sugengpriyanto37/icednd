import Link from "next/link";

export default function NotFound() {
  return <main className="min-h-screen flex items-center justify-center bg-[#080B12] px-6 text-[#F8FAFC]"><div className="text-center"><p className="font-display text-7xl text-[#4DFFB5]">404</p><h1 className="mt-4 font-display text-3xl">Page not found</h1><Link href="/" className="mt-8 inline-block rounded-full bg-[#4DFFB5] px-6 py-3 text-sm font-semibold text-[#080B12]">Return home</Link></div></main>;
}
