// Official brand palette + useful extended colors for all color pickers
const BRAND_COLOR_PRESETS = [
  // Official brand palette (4 core colors)
  { color: '#FFFFFF', label: 'White' },
  { color: '#E9F8FC', label: 'Clear Skies' },
  { color: '#24BCE3', label: 'Caribbean Blue' },
  { color: '#0E4B5B', label: 'Teal Dark Blue' },
  // Extended useful colors
  { color: '#A7E4F4', label: 'Light Cyan' },
  { color: '#40D1DB', label: 'Logo Cyan' },
  { color: '#141E32', label: 'Dark Navy' },
  { color: '#000000', label: 'Black' },
]

interface ColorSwatchesProps {
  value: string
  onChange: (color: string) => void
}

export function ColorSwatches({ value, onChange }: ColorSwatchesProps) {
  return (
    <div className="flex flex-wrap gap-1.5 mb-1.5">
      {BRAND_COLOR_PRESETS.map(({ color, label }) => (
        <button
          key={color}
          title={label}
          onClick={() => onChange(color)}
          className="relative w-5 h-5 rounded-full border-2 transition-transform hover:scale-110"
          style={{
            backgroundColor: color,
            borderColor: value.toLowerCase() === color.toLowerCase() ? '#24BCE3' : 'rgba(255,255,255,0.15)',
            boxShadow: value.toLowerCase() === color.toLowerCase() ? '0 0 0 2px rgba(36,188,227,0.4)' : 'none',
          }}
        />
      ))}
    </div>
  )
}
