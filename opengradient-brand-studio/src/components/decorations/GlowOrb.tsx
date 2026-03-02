interface Props {
  opacity: number
  color: string
  x: number
  y: number
}

export function GlowOrb({ opacity, color, x, y }: Props) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        opacity,
        background: `radial-gradient(ellipse at ${x}% ${y}%, ${color}66 0%, transparent 60%)`,
        pointerEvents: 'none',
      }}
    />
  )
}
