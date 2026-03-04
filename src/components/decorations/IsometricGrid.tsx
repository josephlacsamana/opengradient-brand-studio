import { useMemo } from 'react'

interface Props {
  opacity: number
  color: string
  width: number
  height: number
  onClick?: (e: React.MouseEvent) => void
}

export function IsometricGrid({ opacity, color, width, height, onClick }: Props) {
  const grid = useMemo(() => {
    const cellSize = 40
    const cols = 8
    const rows = 8

    // Isometric transform: 30° angle
    const cos30 = Math.cos(Math.PI / 6) // ~0.866
    const sin30 = 0.5

    const gridWidth = cols * cellSize * cos30
    const gridHeight = rows * cellSize * sin30 + cols * cellSize * sin30

    // Center the grid
    const offsetX = width / 2
    const offsetY = height / 2 - gridHeight * 0.1

    // Convert grid coords to isometric screen coords
    function toIso(col: number, row: number): { x: number; y: number } {
      return {
        x: offsetX + (col - row) * cellSize * cos30,
        y: offsetY + (col + row) * cellSize * sin30,
      }
    }

    // Generate grid lines
    const lines: { x1: number; y1: number; x2: number; y2: number }[] = []

    // Horizontal grid lines (along col axis)
    for (let r = 0; r <= rows; r++) {
      const start = toIso(0, r)
      const end = toIso(cols, r)
      lines.push({ x1: start.x, y1: start.y, x2: end.x, y2: end.y })
    }

    // Vertical grid lines (along row axis)
    for (let c = 0; c <= cols; c++) {
      const start = toIso(c, 0)
      const end = toIso(c, rows)
      lines.push({ x1: start.x, y1: start.y, x2: end.x, y2: end.y })
    }

    // Intersection dots
    const dots: { x: number; y: number; glow: boolean }[] = []
    for (let r = 0; r <= rows; r++) {
      for (let c = 0; c <= cols; c++) {
        const pos = toIso(c, r)
        // Some dots glow brighter (every 2nd intersection)
        const glow = (r + c) % 3 === 0
        dots.push({ x: pos.x, y: pos.y, glow })
      }
    }

    // Platform edge (the bottom two edges of the diamond for depth)
    const thickness = 8
    const bl = toIso(0, rows)
    const br = toIso(cols, rows)
    const front = toIso(cols, 0)
    const bottom = toIso(0, 0)

    const leftEdge = `M${bl.x},${bl.y} L${br.x},${br.y} L${br.x},${br.y + thickness} L${bl.x},${bl.y + thickness} Z`
    const rightEdge = `M${br.x},${br.y} L${front.x},${front.y} L${front.x},${front.y + thickness} L${br.x},${br.y + thickness} Z`

    return { lines, dots, leftEdge, rightEdge, gridWidth, gridHeight }
  }, [width, height])

  return (
    <svg
      onClick={onClick}
      style={{
        position: 'absolute',
        inset: 0,
        opacity,
        pointerEvents: onClick ? 'auto' : 'none',
        cursor: onClick ? 'pointer' : 'default',
      }}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="iso-dot-glow">
          <stop offset="0%" stopColor={color} stopOpacity="0.9" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Platform edges for depth */}
      <path d={grid.leftEdge} fill={color} opacity={0.15} />
      <path d={grid.rightEdge} fill={color} opacity={0.1} />

      {/* Grid lines */}
      {grid.lines.map((line, i) => (
        <line
          key={i}
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          stroke={color}
          strokeWidth={0.5}
          opacity={0.3}
        />
      ))}

      {/* Intersection dots */}
      {grid.dots.map((dot, i) => (
        <g key={`d${i}`}>
          {dot.glow && (
            <circle
              cx={dot.x}
              cy={dot.y}
              r={8}
              fill="url(#iso-dot-glow)"
            />
          )}
          <circle
            cx={dot.x}
            cy={dot.y}
            r={dot.glow ? 2.5 : 1.5}
            fill={color}
            opacity={dot.glow ? 0.9 : 0.4}
          />
        </g>
      ))}
    </svg>
  )
}
