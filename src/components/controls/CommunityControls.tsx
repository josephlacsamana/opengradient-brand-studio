import { useCallback } from 'react'
import { Plus, Trash2, Upload, X } from 'lucide-react'
import { useEditorStore } from '../../store/editorStore'
import { ColorSwatches } from '../ui/ColorSwatches'

export function CommunityControls() {
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
  const setField = useEditorStore(s => s.setField)
  const setCommunityMemberImage = useEditorStore(s => s.setCommunityMemberImage)
  const setCommunityMemberUsername = useEditorStore(s => s.setCommunityMemberUsername)
  const setCommunityTitle = useEditorStore(s => s.setCommunityTitle)
  const addCommunityMember = useEditorStore(s => s.addCommunityMember)
  const removeCommunityMember = useEditorStore(s => s.removeCommunityMember)
  const addCommunitySection = useEditorStore(s => s.addCommunitySection)
  const removeCommunitySection = useEditorStore(s => s.removeCommunitySection)

  const handleImageUpload = useCallback((sectionIndex: number, memberIndex: number) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = () => {
        setCommunityMemberImage(sectionIndex, memberIndex, reader.result as string)
      }
      reader.readAsDataURL(file)
    }
    input.click()
  }, [setCommunityMemberImage])

  if (!communityEnabled) {
    return (
      <div className="p-3">
        <p className="text-xs text-brand-dark-100 mb-2">
          Community grid is disabled. Use a community template to enable it.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3 p-3">
      {/* Grid settings */}
      <div>
        <label className="block text-xs text-brand-dark-100 mb-1">
          Columns per row: {columnsPerRow}
        </label>
        <input
          type="range"
          min={2}
          max={6}
          value={columnsPerRow}
          onChange={e => setField('communityColumnsPerRow', Number(e.target.value))}
          className="w-full accent-brand-cyan"
        />
      </div>

      <div>
        <label className="block text-xs text-brand-dark-100 mb-1">
          Avatar size: {avatarSize}px
        </label>
        <input
          type="range"
          min={40}
          max={140}
          value={avatarSize}
          onChange={e => setField('communityAvatarSize', Number(e.target.value))}
          className="w-full accent-brand-cyan"
        />
      </div>

      <div>
        <label className="block text-xs text-brand-dark-100 mb-1">Border Color</label>
        <ColorSwatches
          value={borderColor}
          onChange={c => setField('communityAvatarBorderColor', c)}
        />
        <input
          type="color"
          value={borderColor}
          onChange={e => setField('communityAvatarBorderColor', e.target.value)}
          className="w-full h-7 rounded cursor-pointer bg-transparent"
        />
      </div>

      <div>
        <label className="block text-xs text-brand-dark-100 mb-1">
          Border: {borderWidth}px
        </label>
        <input
          type="range"
          min={0}
          max={6}
          value={borderWidth}
          onChange={e => setField('communityAvatarBorderWidth', Number(e.target.value))}
          className="w-full accent-brand-cyan"
        />
      </div>

      <div>
        <label className="block text-xs text-brand-dark-100 mb-1">Title Color</label>
        <ColorSwatches
          value={sectionTitleColor}
          onChange={c => setField('communitySectionTitleColor', c)}
        />
        <input
          type="color"
          value={sectionTitleColor}
          onChange={e => setField('communitySectionTitleColor', e.target.value)}
          className="w-full h-7 rounded cursor-pointer bg-transparent"
        />
      </div>

      <div>
        <label className="block text-xs text-brand-dark-100 mb-1">Username Color</label>
        <ColorSwatches
          value={usernameColor}
          onChange={c => setField('communityUsernameColor', c)}
        />
        <input
          type="color"
          value={usernameColor}
          onChange={e => setField('communityUsernameColor', e.target.value)}
          className="w-full h-7 rounded cursor-pointer bg-transparent"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-xs text-brand-dark-100 mb-1">
            Title: {sectionTitleSize}px
          </label>
          <input
            type="range"
            min={12}
            max={32}
            value={sectionTitleSize}
            onChange={e => setField('communitySectionTitleSize', Number(e.target.value))}
            className="w-full accent-brand-cyan"
          />
        </div>
        <div>
          <label className="block text-xs text-brand-dark-100 mb-1">
            Name: {usernameSize}px
          </label>
          <input
            type="range"
            min={10}
            max={20}
            value={usernameSize}
            onChange={e => setField('communityUsernameSize', Number(e.target.value))}
            className="w-full accent-brand-cyan"
          />
        </div>
      </div>

      {/* Sections */}
      <div className="border-t border-ui-border pt-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-brand-dark-100 uppercase tracking-wider">Sections</span>
          <button
            onClick={addCommunitySection}
            className="text-brand-cyan hover:text-brand-cyan-400 transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>

        {communitySections.map((section, sIndex) => (
          <div key={sIndex} className="mb-4 bg-brand-dark-950 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={section.title}
                onChange={e => setCommunityTitle(sIndex, e.target.value)}
                className="flex-1 bg-transparent border border-ui-border-subtle rounded px-2 py-1 text-xs text-ui-primary focus:outline-none focus:border-brand-cyan/50"
              />
              {communitySections.length > 1 && (
                <button
                  onClick={() => removeCommunitySection(sIndex)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>

            {/* Members */}
            <div className="space-y-2">
              {section.members.map((member, mIndex) => (
                <div key={mIndex} className="flex items-center gap-2">
                  {/* Avatar preview / upload button */}
                  <button
                    onClick={() => handleImageUpload(sIndex, mIndex)}
                    className="w-8 h-8 rounded-full border border-ui-border-medium overflow-hidden flex-shrink-0 flex items-center justify-center hover:border-brand-cyan/50 transition-colors"
                  >
                    {member.imageUrl ? (
                      <img src={member.imageUrl} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <Upload size={12} className="text-brand-dark-100" />
                    )}
                  </button>

                  {/* Username input */}
                  <input
                    type="text"
                    value={member.username}
                    onChange={e => setCommunityMemberUsername(sIndex, mIndex, e.target.value)}
                    className="flex-1 bg-transparent border border-ui-border-subtle rounded px-2 py-1 text-xs text-ui-primary focus:outline-none focus:border-brand-cyan/50"
                  />

                  {/* Remove button */}
                  <button
                    onClick={() => removeCommunityMember(sIndex, mIndex)}
                    className="text-red-400/50 hover:text-red-300"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>

            {/* Add member button */}
            <button
              onClick={() => addCommunityMember(sIndex)}
              className="mt-2 w-full py-1 text-xs text-brand-dark-100 hover:text-brand-cyan border border-dashed border-ui-border-subtle hover:border-brand-cyan/30 rounded transition-colors flex items-center justify-center gap-1"
            >
              <Plus size={12} /> Add Member
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
