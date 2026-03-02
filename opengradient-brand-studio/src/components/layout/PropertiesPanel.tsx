import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { TextControls } from '../controls/TextControls'
import { FontSelector } from '../controls/FontSelector'
import { BackgroundControls } from '../controls/BackgroundControls'
import { DecorationControls } from '../controls/DecorationControls'
import { LogoControls } from '../controls/LogoControls'
import { CommunityControls } from '../controls/CommunityControls'
import { ExportControls } from '../controls/ExportControls'

interface Props {
  onExport: () => void
  onExportAll: () => void
}

interface SectionProps {
  title: string
  defaultOpen?: boolean
  children: React.ReactNode
}

function Section({ title, defaultOpen = false, children }: SectionProps) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-white/5">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-3 hover:bg-white/5 transition-colors"
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
    <aside className="h-full overflow-y-auto bg-brand-dark-800 border-l border-white/5">
      <Section title="Text" defaultOpen>
        <TextControls />
      </Section>
      <Section title="Fonts" defaultOpen>
        <FontSelector />
      </Section>
      <Section title="Background" defaultOpen>
        <BackgroundControls />
      </Section>
      <Section title="Decorations">
        <DecorationControls />
      </Section>
      <Section title="Logo">
        <LogoControls />
      </Section>
      <Section title="Community Grid">
        <CommunityControls />
      </Section>
      <Section title="Export" defaultOpen>
        <ExportControls onExport={onExport} onExportAll={onExportAll} />
      </Section>
    </aside>
  )
}
