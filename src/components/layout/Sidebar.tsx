import { TemplateGrid } from '../controls/TemplateGrid'

export function Sidebar() {
  return (
    <aside className="h-full overflow-y-auto bg-brand-dark-800 border-r border-white/5">
      <div className="p-3 border-b border-white/5">
        <h2 className="text-xs font-semibold text-brand-dark-100 uppercase tracking-wider">Templates</h2>
      </div>
      <TemplateGrid />
    </aside>
  )
}
