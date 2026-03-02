import { useMemo } from 'react'

interface Props {
  opacity: number
  count: number
  color: string
  width: number
  height: number
}

function seededRandom(seed: number): () => number {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

export function HorizontalStreaks({ opacity, count, color, width, height }: Props) {
  const streaks = useMemo(() => {
    const rand = seededRandom(77)
    return Array.from({ length: count }, () => {
      const y = rand() * height
      const streakWidth = rand() * width * 0.6 + width * 0.1
      const x = rand() * (width - streakWidth * 0.3)
      const h = rand() * 2 + 0.5
      return { x, y, w: streakWidth, h, opacity: rand() * 0.5 + 0.1 }
    })
  }, [count, width, height])

  return (
    <svg
      style={{ position: 'absolute', inset: 0, opacity }}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {streaks.map((s, i) => (
        <rect
          key={i}
          x={s.x}
          y={s.y}
          width={s.w}
          height={s.h}
          fill={color}
          opacity={s.opacity}
          rx={s.h / 2}
        />
      ))}
    </svg>
  )
}
