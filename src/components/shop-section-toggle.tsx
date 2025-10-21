import Link from "next/link"
import { ShopSection } from "@/lib/types"
import { cn } from "@/lib/utils"

interface SectionOption {
  section: ShopSection
  label: string
  href: string
  disabled?: boolean
}

interface ShopSectionToggleProps {
  active: ShopSection
  options: SectionOption[]
  className?: string
}

export function ShopSectionToggle({ active, options, className }: ShopSectionToggleProps) {
  return (
    <div className={cn("w-full rounded-lg bg-muted/40 p-2", className)}>
      <div className="flex gap-2">
        {options.map(({ section, label, href, disabled }) => {
          const baseClasses =
            "flex-1 rounded-md border px-3 py-2 text-center text-sm font-semibold transition-colors"
          if (disabled) {
            return (
              <span
                key={section}
                className={cn(
                  baseClasses,
                  "cursor-not-allowed border-muted-foreground/20 bg-muted text-muted-foreground opacity-70"
                )}
              >
                {label}
              </span>
            )
          }

          return (
            <Link
              key={section}
              href={href}
              className={cn(
                baseClasses,
                active === section
                  ? "border-primary bg-primary text-primary-foreground shadow-sm"
                  : "border-muted-foreground/20 bg-background text-muted-foreground hover:border-primary hover:text-primary"
              )}
              prefetch={false}
            >
              {label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
