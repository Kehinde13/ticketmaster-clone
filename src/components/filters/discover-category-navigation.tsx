const categories = [
  "Concerts",
  "Sports",
  "Arts, Theater & Comedy",
  "Family",
] as const;

export function DiscoverCategoryNavigation() {
  return (
    <nav
      aria-label="Event categories"
      className="border-b border-border bg-surface"
    >
      <div className="mx-auto max-w-[1120px] px-4 py-4 md:px-0 md:py-5">
        <div className="flex touch-pan-x gap-2 overflow-x-auto overscroll-x-contain [scrollbar-width:none] md:justify-center md:gap-8 md:overflow-visible [&::-webkit-scrollbar]:hidden">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className="h-11 shrink-0 rounded-[3px] border border-primary px-4 text-[14px] font-semibold whitespace-nowrap text-primary outline-none hover:bg-primary/5 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 md:h-12 md:border-transparent md:px-3 md:text-[15px] md:hover:bg-surface-subtle"
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
