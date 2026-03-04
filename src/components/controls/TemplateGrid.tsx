import { useEditorStore } from '../../store/editorStore'
import { templates } from '../../templates'
import { BACKGROUND_PRESETS } from '../../constants/brand'

// Preview is ~150px wide vs ~1200px canvas = 0.125 scale
const PREVIEW_SCALE = 0.125

function getTemplateBackground(t: (typeof templates)[number]): string {
  const d = t.defaults
  if (d.backgroundPresetId) {
    const preset = BACKGROUND_PRESETS.find(p => p.id === d.backgroundPresetId)
    if (preset) return preset.value
  }
  if (d.backgroundType === 'solid' && d.solidColor) return d.solidColor
  if (d.gradientColors && d.gradientColors.length >= 2) {
    return `linear-gradient(${d.gradientAngle ?? 180}deg, ${d.gradientColors.join(', ')})`
  }
  return t.category === 'dark-technical'
    ? 'linear-gradient(135deg, #0A0F19, #0E4B5B)'
    : 'linear-gradient(135deg, #0E4B5B, #50C9E9, #E9F8FC)'
}

function getTextAlign(t: (typeof templates)[number]): 'left' | 'center' | 'right' {
  return (t.defaults.textAlignment as 'left' | 'center' | 'right') ?? 'center'
}

function scalePx(size: number): number {
  return Math.max(3, Math.round(size * PREVIEW_SCALE))
}

export function TemplateGrid() {
  const activeTemplateId = useEditorStore(s => s.activeTemplateId)
  const applyTemplate = useEditorStore(s => s.applyTemplate)

  return (
    <div className="grid grid-cols-2 gap-2 p-3">
      {templates.map(t => {
        const d = t.defaults
        const align = getTextAlign(t)
        const headlineSize = scalePx(d.headlineFontSize ?? 64)
        const subtitleSize = scalePx(d.subtitleFontSize ?? 24)
        const sections = d.communitySections ?? []
        const totalMembers = sections.reduce((sum, s) => sum + s.members.length, 0)

        const isCommunity = d.communityEnabled && sections.length > 0

        return (
          <button
            key={t.id}
            onClick={() => applyTemplate(t.id)}
            className={`rounded-lg overflow-hidden text-left transition-all ${
              activeTemplateId === t.id
                ? 'ring-2 ring-brand-cyan'
                : 'ring-1 ring-ui-border-subtle hover:ring-ui-border-strong'
            }`}
          >
            <div
              className="w-full relative overflow-hidden"
              style={{ background: getTemplateBackground(t), height: 80 }}
            >
              {/* Mini headline */}
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: 0,
                  ...(isCommunity ? {} : { bottom: 0 }),
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: isCommunity ? 'flex-start'
                    : d.textVerticalPosition === 'top' ? 'flex-start'
                    : d.textVerticalPosition === 'bottom' ? 'flex-end' : 'center',
                  alignItems: align === 'left' ? 'flex-start'
                    : align === 'right' ? 'flex-end' : 'center',
                  padding: isCommunity ? '5px 6px 0' : '6px 8px',
                  gap: '1px',
                }}
              >
                <div
                  style={{
                    fontFamily: d.headlineFontFamily ?? 'Geist',
                    fontWeight: d.headlineFontWeight ?? 700,
                    fontSize: isCommunity ? '6px' : `${headlineSize}px`,
                    lineHeight: 1.15,
                    color: d.headlineColor ?? '#FFFFFF',
                    textAlign: align,
                    maxWidth: '100%',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: isCommunity ? 1 : 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {(d.headline ?? 'Headline').replace(/\n/g, ' ')}
                </div>
                {d.subtitle && (
                  <div
                    style={{
                      fontFamily: d.subtitleFontFamily ?? 'Geist',
                      fontWeight: d.subtitleFontWeight ?? 400,
                      fontSize: `${subtitleSize}px`,
                      lineHeight: 1.2,
                      color: d.subtitleColor ?? '#A7E4F4',
                      textAlign: align,
                      maxWidth: '100%',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {d.subtitle}
                  </div>
                )}
              </div>

              {/* Community grid preview — rendered as separate block below headline */}
              {isCommunity && (
                <div
                  style={{
                    position: 'absolute',
                    left: 6,
                    right: 6,
                    bottom: 6,
                    top: d.subtitle ? 24 : 16,
                    display: 'flex',
                    gap: '4px',
                  }}
                >
                  {sections.map((section, si) => {
                    const cols = d.communityColumnsPerRow ?? 4
                    const maxRows = 2
                    const count = Math.min(section.members.length, cols * maxRows)
                    return (
                      <div
                        key={si}
                        style={{
                          flex: 1,
                          minWidth: 0,
                          backgroundColor: 'rgba(255,255,255,0.05)',
                          borderRadius: 3,
                          padding: '2px 3px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '2px',
                        }}
                      >
                        <div style={{
                          fontSize: '5px',
                          color: d.communitySectionTitleColor ?? '#FFFFFF',
                          fontWeight: 700,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}>
                          {section.title}
                        </div>
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: `repeat(${cols}, 1fr)`,
                          gap: '3px',
                          justifyItems: 'center',
                        }}>
                          {Array.from({ length: count }).map((_, i) => (
                            <div
                              key={i}
                              style={{
                                width: 7,
                                height: 7,
                                borderRadius: '50%',
                                border: `1px solid ${d.communityAvatarBorderColor ?? '#40D1DB'}`,
                                backgroundColor: 'rgba(255,255,255,0.08)',
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}

              {/* Mini logo indicator */}
              {d.logoEnabled && (
                <div
                  style={{
                    position: 'absolute',
                    ...(d.logoPosition?.includes('top') ? { top: 4 } : { bottom: 4 }),
                    ...(d.logoPosition?.includes('left') ? { left: 6 }
                      : d.logoPosition?.includes('right') ? { right: 6 }
                      : { left: '50%', transform: 'translateX(-50%)' }),
                    width: 20,
                    height: 6,
                    borderRadius: 1,
                    backgroundColor: d.logoColor === 'white' ? 'rgba(255,255,255,0.5)'
                      : d.logoColor === 'black' ? 'rgba(0,0,0,0.4)'
                      : 'rgba(64,209,219,0.5)',
                  }}
                />
              )}
            </div>
            <div className="px-2 py-1.5 bg-brand-dark-800">
              <div className="text-xs font-medium text-ui-primary truncate">{t.name}</div>
            </div>
          </button>
        )
      })}
    </div>
  )
}
