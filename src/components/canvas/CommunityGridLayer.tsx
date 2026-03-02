import { useEditorStore } from '../../store/editorStore'

export function CommunityGridLayer() {
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

  if (!communityEnabled || communitySections.length === 0) return null

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 3,
        display: 'flex',
        flexDirection: 'column',
        padding: '80px 60px 40px',
        pointerEvents: 'none',
        gap: '16px',
      }}
    >
      {/* Sections container - wraps sections in a flex layout */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          flex: 1,
          alignContent: 'flex-start',
        }}
      >
        {communitySections.map((section, sIndex) => (
          <div
            key={sIndex}
            style={{
              flex: communitySections.length === 1 ? '1 1 100%' : '1 1 calc(50% - 8px)',
              minWidth: '300px',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '16px',
              padding: '20px',
            }}
          >
            {/* Section title */}
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: `${sectionTitleSize}px`,
                fontWeight: 700,
                color: sectionTitleColor,
                marginBottom: '16px',
              }}
            >
              {section.title}
            </div>

            {/* Members grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${columnsPerRow}, 1fr)`,
                gap: '12px',
              }}
            >
              {section.members.map((member, mIndex) => (
                <div
                  key={mIndex}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '6px',
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
                          fontFamily: "'Inter', sans-serif",
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
                      fontFamily: "'Inter', sans-serif",
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
