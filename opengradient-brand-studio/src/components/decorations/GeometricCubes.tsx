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

function cubePath(cx: number, cy: number, size: number): string {
  const s = size / 2
  const dx = s * 0.866
  const dy = s * 0.5
  // Isometric cube paths
  const top = `M${cx},${cy - s} L${cx + dx},${cy - dy} L${cx},${cy} L${cx - dx},${cy - dy} Z`
  const left = `M${cx - dx},${cy - dy} L${cx},${cy} L${cx},${cy + s} L${cx - dx},${cy + dy} Z`
  const right = `M${cx + dx},${cy - dy} L${cx},${cy} L${cx},${cy + s} L${cx + dx},${cy + dy} Z`
  return `${top} ${left} ${right}`
}

export function GeometricCubes({ opacity, count, color, width, height }: Props) {
  const cubes = useMemo(() => {
    const rand = seededRandom(123)
    return Array.from({ length: count }, () => ({
      x: rand() * width,
      y: rand() * height,
      size: rand() * 40 + 20,
      opacity: rand() * 0.5 + 0.2,
      rotation: rand() * 30 - 15,
    }))
  }, [count, width, height])

  return (
    <svg
      style={{ position: 'absolute', inset: 0, opacity }}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {cubes.map((c, i) => (
        <g key={i} transform={`rotate(${c.rotation}, ${c.x}, ${c.y})`}>
          <path
            d={cubePath(c.x, c.y, c.size)}
            fill="none"
            stroke={color}
            strokeWidth={1}
            opacity={c.opacity}
          />
        </g>
      ))}
    </svg>
  )
}
