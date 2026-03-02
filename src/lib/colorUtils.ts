export function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export function buildGradientCSS(colors: string[], angle: number): string {
  if (colors.length === 0) return 'transparent'
  if (colors.length === 1) return colors[0]!
  const stops = colors.map((c, i) => {
    const pos = (i / (colors.length - 1)) * 100
    return `${c} ${pos}%`
  }).join(', ')
  return `linear-gradient(${angle}deg, ${stops})`
}
