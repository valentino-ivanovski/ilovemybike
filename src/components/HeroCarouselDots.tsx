"use client";

type Props = {
  count: number;
  selectedIndex: number;
  onSelect: (index: number) => void;
};

export default function HeroCarouselDots({ count, selectedIndex, onSelect }: Props) {
  return (
    <div className="mt-4 flex items-center justify-center gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          aria-label={`Go to slide ${i + 1}`}
          className={`h-[3px] rounded-full transition-all duration-300 ${
            selectedIndex === i ? "w-16 bg-gray-900/70" : "w-8 bg-gray-400/50"
          }`}
        />
      ))}
    </div>
  );
}