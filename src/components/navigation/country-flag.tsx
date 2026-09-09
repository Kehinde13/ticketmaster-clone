import type { SupportedCountry } from "@/lib/countries";

export function CountryFlag({ country, size }: Readonly<{ country: SupportedCountry; size: "mobile" | "desktop" }>) {
  if (country.code !== "US") {
    return <span aria-hidden="true" className={size === "mobile" ? "text-[21px] leading-none" : "text-[13px] leading-none"}>{country.flag}</span>;
  }
  return (
    <span aria-hidden="true" className={size === "mobile" ? "relative size-[23px] shrink-0 overflow-hidden rounded-full border border-white/50 bg-[repeating-linear-gradient(to_bottom,#b22234_0_7.69%,#fff_7.69%_15.38%)] shadow-[0_0_0_1px_rgb(0_0_0/20%)]" : "relative size-3.5 overflow-hidden rounded-full border border-white/50 bg-[repeating-linear-gradient(to_bottom,#b22234_0_7.69%,#fff_7.69%_15.38%)]"}>
      <span className={size === "mobile" ? "absolute top-0 left-0 h-[54%] w-[53%] bg-[#3c3b6e] bg-[radial-gradient(circle,#fff_0_0.6px,transparent_0.8px)] bg-[length:4px_4px]" : "absolute top-0 left-0 h-[54%] w-[53%] bg-[#3c3b6e]"} />
    </span>
  );
}
