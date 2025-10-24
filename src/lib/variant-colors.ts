const VARIANT_COLOR_CLASS_MAP: Record<string, string> = {
  "bg-white": "bg-white",
  "bg-black": "bg-black",
  "bg-blue-900": "bg-blue-900",
  "bg-cyan-500": "bg-cyan-500",
  "bg-gray-400": "bg-gray-400",
  "bg-green-700": "bg-green-700",
  "bg-orange-500": "bg-orange-500",
  "bg-blue-500": "bg-blue-500",
  "bg-amber-900": "bg-amber-900"
}

export function stringToColor(value: string): string {
  let hash = 0
  for (let i = 0; i < value.length; i += 1) {
    hash = value.charCodeAt(i) + ((hash << 5) - hash)
  }
  const hue = Math.abs(hash) % 360
  return `hsl(${hue}, 70%, 55%)`
}

export function resolveVariantColorClass(colorClass: string | null | undefined): string | null {
  if (!colorClass) {
    return null
  }

  const normalized = colorClass.trim()
  return VARIANT_COLOR_CLASS_MAP[normalized] ?? null
}

export const KNOWN_VARIANT_COLOR_CLASSES = Object.values(VARIANT_COLOR_CLASS_MAP)
