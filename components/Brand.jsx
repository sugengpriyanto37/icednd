export default function Brand({ large = false }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${large ? 'text-2xl' : 'text-xl'} tracking-[0.08em]`}>
      <span
        aria-hidden="true"
        className={`relative grid place-items-center border border-[#4DFFB5]/70 bg-[#4DFFB5]/[0.06] ${large ? 'h-8 w-8' : 'h-7 w-7'} rounded-md`}
      >
        <span className="absolute h-px w-4 rotate-45 bg-[#4DFFB5]" />
        <span className="absolute h-px w-4 -rotate-45 bg-[#7EE8FA]" />
        <span className="relative h-1.5 w-1.5 rounded-full bg-[#F8FAFC] shadow-[0_0_10px_#4DFFB5]" />
      </span>
      <span className="font-display leading-none">
        Ice<span className="font-semibold text-[#4DFFB5]">DnD</span>
      </span>
    </span>
  );
}
