import { useMemo } from 'react'

interface Props {
  opacity: number
  nodeCount: number
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

export function ConnectedNodes({ opacity, nodeCount, color, width, height }: Props) {
  const { nodes, edges } = useMemo(() => {
    const rand = seededRandom(99)
    const pts = Array.from({ length: nodeCount }, () => ({
      x: rand() * width,
      y: rand() * height,
      r: rand() * 3 + 2,
    }))

    const threshold = Math.max(width, height) * 0.25
    const edgeList: Array<{ x1: number; y1: number; x2: number; y2: number; opacity: number }> = []
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i]!.x - pts[j]!.x
        const dy = pts[i]!.y - pts[j]!.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < threshold) {
          edgeList.push({
            x1: pts[i]!.x, y1: pts[i]!.y,
            x2: pts[j]!.x, y2: pts[j]!.y,
            opacity: 1 - dist / threshold,
          })
        }
      }
    }

    return { nodes: pts, edges: edgeList }
  }, [nodeCount, width, height])

  return (
    <svg
      style={{ position: 'absolute', inset: 0, opacity }}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {edges.map((e, i) => (
        <line
          key={`e${i}`}
          x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
          stroke={color}
          strokeWidth={0.8}
          opacity={e.opacity * 0.5}
        />
      ))}
      {nodes.map((n, i) => (
        <circle
          key={`n${i}`}
          cx={n.x} cy={n.y} r={n.r}
          fill={color}
          opacity={0.7}
        />
      ))}
    </svg>
  )
}
