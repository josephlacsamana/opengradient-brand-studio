import { useEditorStore } from '../../store/editorStore'
import { useExportStore } from '../../store/exportStore'
import { ParticleField } from '../decorations/ParticleField'
import { GeometricCubes } from '../decorations/GeometricCubes'
import { RadialLines } from '../decorations/RadialLines'
import { HorizontalStreaks } from '../decorations/HorizontalStreaks'
import { ConnectedNodes } from '../decorations/ConnectedNodes'
import { GlowOrb } from '../decorations/GlowOrb'
import { IsometricGrid } from '../decorations/IsometricGrid'

interface DecorativeLayerProps {
  onLayerClick?: () => void
}

export function DecorativeLayer({ onLayerClick }: DecorativeLayerProps) {
  const decorations = useEditorStore(s => s.decorations)
  const width = useExportStore(s => s.customWidth)
  const height = useExportStore(s => s.customHeight)

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onLayerClick?.()
  }

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 2, overflow: 'hidden', pointerEvents: 'none' }}>
      {decorations.glow.enabled && (
        <GlowOrb
          opacity={decorations.glow.opacity}
          color={decorations.glow.color}
          x={decorations.glow.x}
          y={decorations.glow.y}
          onClick={handleClick}
        />
      )}
      {decorations.particles.enabled && (
        <ParticleField
          opacity={decorations.particles.opacity}
          density={decorations.particles.density}
          color={decorations.particles.color}
          width={width}
          height={height}
          onClick={handleClick}
        />
      )}
      {decorations.cubes.enabled && (
        <GeometricCubes
          opacity={decorations.cubes.opacity}
          count={decorations.cubes.count}
          color={decorations.cubes.color}
          width={width}
          height={height}
          onClick={handleClick}
        />
      )}
      {decorations.radialLines.enabled && (
        <RadialLines
          opacity={decorations.radialLines.opacity}
          color={decorations.radialLines.color}
          width={width}
          height={height}
          onClick={handleClick}
        />
      )}
      {decorations.streaks.enabled && (
        <HorizontalStreaks
          opacity={decorations.streaks.opacity}
          count={decorations.streaks.count}
          color={decorations.streaks.color}
          width={width}
          height={height}
          onClick={handleClick}
        />
      )}
      {decorations.nodes.enabled && (
        <ConnectedNodes
          opacity={decorations.nodes.opacity}
          nodeCount={decorations.nodes.nodeCount}
          color={decorations.nodes.color}
          width={width}
          height={height}
          onClick={handleClick}
        />
      )}
      {decorations.isometricGrid.enabled && (
        <IsometricGrid
          opacity={decorations.isometricGrid.opacity}
          color={decorations.isometricGrid.color}
          width={width}
          height={height}
          onClick={handleClick}
        />
      )}
    </div>
  )
}
