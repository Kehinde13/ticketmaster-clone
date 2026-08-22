export function MobileCountryAffordance() {
  return (
    <button
      type="button"
      aria-label="Change country, currently United States"
      className="flex h-[47px] w-full items-center gap-2.5 bg-[#111111] px-3 text-left text-[17px] leading-none font-normal text-white outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white active:bg-[#242424] md:hidden"
    >
      <span
        aria-hidden="true"
        className="relative size-[23px] shrink-0 overflow-hidden rounded-full border border-white/50 bg-[repeating-linear-gradient(to_bottom,#b22234_0_7.69%,#fff_7.69%_15.38%)] shadow-[0_0_0_1px_rgb(0_0_0/20%)]"
      >
        <span className="absolute top-0 left-0 h-[54%] w-[53%] bg-[#3c3b6e] bg-[radial-gradient(circle,#fff_0_0.6px,transparent_0.8px)] bg-[length:4px_4px]" />
      </span>
      <span>US</span>
    </button>
  );
}
