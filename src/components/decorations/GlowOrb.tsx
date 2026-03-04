interface Props {
  opacity: number
  color: string
  x: number
  y: number
  onClick?: (e: React.MouseEvent) => void
}

export function GlowOrb({ opacity, color, x, y, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      style={{
        position: 'absolute',
        inset: 0,
        opacity,
        background: `radial-gradient(ellipse at ${x}% ${y}%, ${color}66 0%, transparent 60%)`,
        pointerEvents: onClick ? 'auto' : 'none',
        cursor: onClick ? 'pointer' : 'default',
      }}
    />
  )
}
