import { forwardRef } from 'react'
import { useExportStore } from '../../store/exportStore'
import { BackgroundLayer } from './BackgroundLayer'
import { DecorativeLayer } from './DecorativeLayer'
import { TextLayer } from './TextLayer'
import { LogoLayer } from './LogoLayer'
import { CommunityGridLayer } from './CommunityGridLayer'

export const CanvasRenderer = forwardRef<HTMLDivElement>(function CanvasRenderer(_, ref) {
  const { customWidth: width, customHeight: height } = useExportStore()

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
      <BackgroundLayer />
      <DecorativeLayer />
      <TextLayer />
      <CommunityGridLayer />
      <LogoLayer />
    </div>
  )
})
