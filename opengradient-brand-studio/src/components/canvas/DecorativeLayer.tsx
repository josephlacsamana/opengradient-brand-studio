import { useEditorStore } from '../../store/editorStore'
import { useExportStore } from '../../store/exportStore'
import { ParticleField } from '../decorations/ParticleField'
import { GeometricCubes } from '../decorations/GeometricCubes'
import { RadialLines } from '../decorations/RadialLines'
import { HorizontalStreaks } from '../decorations/HorizontalStreaks'
import { ConnectedNodes } from '../decorations/ConnectedNodes'
import { GlowOrb } from '../decorations/GlowOrb'

export function DecorativeLayer() {
  const decorations = useEditorStore(s => s.decorations)
  const { customWidth: width, customHeight: height } = useExportStore()

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 2, overflow: 'hidden' }}>
      {decorations.glow.enabled && (
        <GlowOrb
          opacity={decorations.glow.opacity}
          color={decorations.glow.color}
          x={decorations.glow.x}
          y={decorations.glow.y}
        />
      )}
      {decorations.particles.enabled && (
        <ParticleField
          opacity={decorations.particles.opacity}
          density={decorations.particles.density}
          color={decorations.particles.color}
          width={width}
          height={height}
        />
      )}
      {decorations.cubes.enabled && (
        <GeometricCubes
          opacity={decorations.cubes.opacity}
          count={decorations.cubes.count}
          color={decorations.cubes.color}
          width={width}
          height={height}
        />
      )}
      {decorations.radialLines.enabled && (
        <RadialLines
          opacity={decorations.radialLines.opacity}
          color={decorations.radialLines.color}
          width={width}
          height={height}
        />
      )}
      {decorations.streaks.enabled && (
        <HorizontalStreaks
          opacity={decorations.streaks.opacity}
          count={decorations.streaks.count}
          color={decorations.streaks.color}
          width={width}
          height={height}
        />
      )}
      {decorations.nodes.enabled && (
        <ConnectedNodes
          opacity={decorations.nodes.opacity}
          nodeCount={decorations.nodes.nodeCount}
          color={decorations.nodes.color}
          width={width}
          height={height}
        />
      )}
    </div>
  )
}
