import Image from "next/image";
import type { ComponentPropsWithoutRef } from "react";

type NewCardProps = ComponentPropsWithoutRef<"div"> & {
  title: string;
  price: number;
  category: string;
  subcategory?: string;
  popular?: string;
  imageSrc: string;
  compareLabel?: string;
  ctaLabel?: string;
};

export default function NewCard({
  title,
  price,
  category,
  subcategory,
  popular,
  imageSrc,
  compareLabel = "Compare",
  ctaLabel = "Explore",
  className = "",
  ...rest
}: NewCardProps) {
  const priceFormatter = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  });

  const formattedPrice = priceFormatter.format(price);

  return (
    <div
      className={`flex h-full min-w-[300px] w-full flex-col border border-slate-200 bg-white text-slate-900 ${className}`}
      {...rest}
    >
      <div className="flex items-start justify-between gap-4 p-4 pb-2">
        <div className="space-y-1">
          <p className="text-sm font-semibold uppercase tracking-wide">{title}</p>
          <p className="text-xs text-slate-500">
            {category}
            {subcategory ? ` · ${subcategory}` : ""}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold">{formattedPrice}</p>
          {popular && (
            <span className="inline-block text-[10px] font-semibold uppercase tracking-wide text-emerald-600">
              {popular}
            </span>
          )}
        </div>
      </div>

      <div className="relative mx-4 my-2 flex-1">
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="256px"
          className="object-contain"
          priority
        />
      </div>

      <div className="flex items-center justify-between px-4 pb-4 pt-2">
        <button
          type="button"
          className="text-xs font-semibold uppercase tracking-wide text-slate-500 transition hover:text-slate-900"
        >
          {compareLabel}
        </button>
        <button
          type="button"
          className="border border-emerald-500 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-600 transition hover:bg-emerald-500 hover:text-white"
        >
          {ctaLabel}
        </button>
      </div>
    </div>
  );
}
