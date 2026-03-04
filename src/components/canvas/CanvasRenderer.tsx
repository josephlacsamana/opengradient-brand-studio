import { forwardRef } from 'react'
import { useExportStore } from '../../store/exportStore'
import { useUIStore, type PanelSectionId } from '../../store/uiStore'
import { BackgroundLayer } from './BackgroundLayer'
import { DecorativeLayer } from './DecorativeLayer'
import { TextLayer } from './TextLayer'
import { LogoLayer } from './LogoLayer'
import { CommunityGridLayer } from './CommunityGridLayer'

export const CanvasRenderer = forwardRef<HTMLDivElement>(function CanvasRenderer(_, ref) {
  const { customWidth: width, customHeight: height } = useExportStore()
  const setFocusedSection = useUIStore(s => s.setFocusedSection)

  const handleLayerClick = (section: PanelSectionId) => {
    setFocusedSection(section)
  }

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        width: `${width}px`,
        height: `${height}px`,
        overflow: 'hidden',
        fontSmoothing: 'antialiased',
      }}
    >
      <BackgroundLayer onLayerClick={() => handleLayerClick('background')} />
      <DecorativeLayer onLayerClick={() => handleLayerClick('decorations')} />
      <TextLayer onLayerClick={() => handleLayerClick('text')} />
      <CommunityGridLayer onLayerClick={() => handleLayerClick('community-grid')} />
      <LogoLayer onLayerClick={() => handleLayerClick('logo')} />
    </div>
  )
})
