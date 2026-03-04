import { useEditorStore } from '../../store/editorStore'

interface CommunityGridLayerProps {
  onLayerClick?: () => void
}

export function CommunityGridLayer({ onLayerClick }: CommunityGridLayerProps) {
  const communityEnabled = useEditorStore(s => s.communityEnabled)
  const communitySections = useEditorStore(s => s.communitySections)
  const avatarSize = useEditorStore(s => s.communityAvatarSize)
  const borderColor = useEditorStore(s => s.communityAvatarBorderColor)
  const borderWidth = useEditorStore(s => s.communityAvatarBorderWidth)
  const sectionTitleColor = useEditorStore(s => s.communitySectionTitleColor)
  const sectionTitleSize = useEditorStore(s => s.communitySectionTitleSize)
  const usernameColor = useEditorStore(s => s.communityUsernameColor)
  const usernameSize = useEditorStore(s => s.communityUsernameSize)
  const columnsPerRow = useEditorStore(s => s.communityColumnsPerRow)
  const headlineFontSize = useEditorStore(s => s.headlineFontSize)
  const textPaddingY = useEditorStore(s => s.textPaddingY)
  const textPaddingX = useEditorStore(s => s.textPaddingX)

  if (!communityEnabled || communitySections.length === 0) return null

  // Calculate top offset to clear the headline area
  const headlineAreaHeight = textPaddingY + headlineFontSize + 20

  return (
    <div
      style={{
        position: 'absolute',
        top: `${headlineAreaHeight}px`,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: `10px ${textPaddingX}px 40px`,
        pointerEvents: 'none',
        gap: '12px',
      }}
    >
      {/* Sections container */}
      <div
        onClick={(e) => { e.stopPropagation(); onLayerClick?.() }}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          alignContent: 'center',
          justifyContent: 'center',
          pointerEvents: 'auto',
          cursor: 'pointer',
        }}
      >
        {communitySections.map((section, sIndex) => (
          <div
            key={sIndex}
            style={{
              flex: communitySections.length === 1 ? '1 1 100%' : '1 1 calc(50% - 6px)',
              minWidth: '280px',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '16px',
              padding: '16px 20px',
            }}
          >
            {/* Section title */}
            <div
              style={{
                fontFamily: "'Geist', sans-serif",
                fontSize: `${sectionTitleSize}px`,
                fontWeight: 700,
                color: sectionTitleColor,
                marginBottom: '12px',
              }}
            >
              {section.title}
            </div>

            {/* Members grid */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '10px',
              }}
            >
              {section.members.map((member, mIndex) => (
                <div
                  key={mIndex}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                    width: `calc((100% - ${(columnsPerRow - 1) * 10}px) / ${columnsPerRow})`,
                  }}
                >
                  {/* Avatar circle */}
                  <div
                    style={{
                      width: `${avatarSize}px`,
                      height: `${avatarSize}px`,
                      borderRadius: '50%',
                      border: `${borderWidth}px solid ${borderColor}`,
                      overflow: 'hidden',
                      background: 'rgba(255,255,255,0.08)',
                      flexShrink: 0,
                    }}
                  >
                    {member.imageUrl ? (
                      <img
                        src={member.imageUrl}
                        alt={member.username}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: borderColor,
                          fontSize: `${avatarSize * 0.35}px`,
                          fontFamily: "'Geist', sans-serif",
                          opacity: 0.5,
                        }}
                      >
                        ?
                      </div>
                    )}
                  </div>

                  {/* Username */}
                  <div
                    style={{
                      fontFamily: "'Geist', sans-serif",
                      fontSize: `${usernameSize}px`,
                      fontWeight: 500,
                      color: usernameColor,
                      textAlign: 'center',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: `${avatarSize + 20}px`,
                    }}
                  >
                    {member.username}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
