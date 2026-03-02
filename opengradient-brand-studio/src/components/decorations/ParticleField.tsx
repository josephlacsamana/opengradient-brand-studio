import { useMemo } from 'react'

interface Props {
  opacity: number
  density: number
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

export function ParticleField({ opacity, density, color, width, height }: Props) {
  const particles = useMemo(() => {
    const rand = seededRandom(42)
    return Array.from({ length: density }, () => ({
      x: rand() * width,
      y: rand() * height,
      r: rand() * 2.5 + 0.5,
      opacity: rand() * 0.6 + 0.2,
    }))
  }, [density, width, height])

  return (
    <svg
      style={{ position: 'absolute', inset: 0, opacity }}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {particles.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={p.r}
          fill={color}
          opacity={p.opacity}
        />
      ))}
    </svg>
  )
}
