import { useMemo } from 'react'

interface Props {
  opacity: number
  color: string
  width: number
  height: number
}

export function RadialLines({ opacity, color, width, height }: Props) {
  const lines = useMemo(() => {
    const cx = width / 2
    const cy = height / 2
    const maxLen = Math.max(width, height)
    const count = 60
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2
      const len = maxLen * 0.9
      return {
        x1: cx,
        y1: cy,
        x2: cx + Math.cos(angle) * len,
        y2: cy + Math.sin(angle) * len,
      }
    })
  }, [width, height])

  return (
    <svg
      style={{ position: 'absolute', inset: 0, opacity }}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {lines.map((l, i) => (
        <line
          key={i}
          x1={l.x1}
          y1={l.y1}
          x2={l.x2}
          y2={l.y2}
          stroke={color}
          strokeWidth={0.5}
          opacity={0.3}
        />
      ))}
    </svg>
  )
}
