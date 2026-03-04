import { useState, useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { TextControls } from '../controls/TextControls'
import { FontSelector } from '../controls/FontSelector'
import { BackgroundControls } from '../controls/BackgroundControls'
import { DecorationControls } from '../controls/DecorationControls'
import { ImageControls } from '../controls/ImageControls'
import { LogoControls } from '../controls/LogoControls'
import { CommunityControls } from '../controls/CommunityControls'
import { ExportControls } from '../controls/ExportControls'
import { useUIStore, type PanelSectionId } from '../../store/uiStore'

interface Props {
  onExport: () => void
  onExportAll: () => void
}

interface SectionProps {
  sectionId: PanelSectionId
  title: string
  defaultOpen?: boolean
  children: React.ReactNode
}

function Section({ sectionId, title, defaultOpen = false, children }: SectionProps) {
  const [open, setOpen] = useState(defaultOpen)
  const sectionRef = useRef<HTMLDivElement>(null)
  const focusedSection = useUIStore(s => s.focusedSection)
  const setFocusedSection = useUIStore(s => s.setFocusedSection)

  useEffect(() => {
    if (focusedSection === sectionId) {
      setOpen(true)
      requestAnimationFrame(() => {
        sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
      setFocusedSection(null)
    }
  }, [focusedSection, sectionId, setFocusedSection])

  return (
    <div ref={sectionRef} className="border-b border-ui-border">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-3 hover:bg-ui-hover-overlay transition-colors"
      >
        <span className="text-xs font-semibold text-brand-dark-100 uppercase tracking-wider">{title}</span>
        <ChevronDown
          size={14}
          className={`text-brand-dark-100 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && children}
    </div>
  )
}

export function PropertiesPanel({ onExport, onExportAll }: Props) {
  return (
    <aside className="h-full overflow-y-auto bg-brand-dark-800 border-l border-ui-border">
      <Section sectionId="text" title="Text" defaultOpen>
        <TextControls />
      </Section>
      <Section sectionId="fonts" title="Fonts" defaultOpen>
        <FontSelector />
      </Section>
      <Section sectionId="background" title="Background" defaultOpen>
        <BackgroundControls />
      </Section>
      <Section sectionId="decorations" title="Decorations">
        <DecorationControls />
      </Section>
      <Section sectionId="hero-image" title="Hero Image">
        <ImageControls />
      </Section>
      <Section sectionId="logo" title="Logo">
        <LogoControls />
      </Section>
      <Section sectionId="community-grid" title="Community Grid">
        <CommunityControls />
      </Section>
      <Section sectionId="export" title="Export" defaultOpen>
        <ExportControls onExport={onExport} onExportAll={onExportAll} />
      </Section>
    </aside>
  )
}
