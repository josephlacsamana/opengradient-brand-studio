import { useCallback, useState } from 'react'
import { Upload, Trash2, Eraser } from 'lucide-react'
import { useEditorStore } from '../../store/editorStore'

export function ImageControls() {
  const imageEnabled = useEditorStore(s => s.imageEnabled)
  const imageSrc = useEditorStore(s => s.imageSrc)
  const imageX = useEditorStore(s => s.imageX)
  const imageY = useEditorStore(s => s.imageY)
  const imageScale = useEditorStore(s => s.imageScale)
  const imageOpacity = useEditorStore(s => s.imageOpacity)
  const setField = useEditorStore(s => s.setField)
  const [removingBg, setRemovingBg] = useState(false)

  const handleRemoveBg = useCallback(async () => {
    if (!imageSrc || removingBg) return
    setRemovingBg(true)
    try {
      const { removeBackground } = await import('@imgly/background-removal')
      const blob = await removeBackground(imageSrc)
      const reader = new FileReader()
      reader.onload = () => {
        setField('imageSrc', reader.result as string)
        setRemovingBg(false)
      }
      reader.readAsDataURL(blob)
    } catch {
      setRemovingBg(false)
    }
  }, [imageSrc, removingBg, setField])

  const handleImageUpload = useCallback(() => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = () => {
        setField('imageSrc', reader.result as string)
        setField('imageEnabled', true)
      }
      reader.readAsDataURL(file)
    }
    input.click()
  }, [setField])

  const handleRemoveImage = useCallback(() => {
    setField('imageSrc', null)
    setField('imageEnabled', false)
  }, [setField])

  return (
    <div className="space-y-3 p-3">
      {/* Enable toggle */}
      <div className="flex items-center justify-between">
        <label className="text-xs text-ui-primary">Show Image</label>
        <button
          onClick={() => setField('imageEnabled', !imageEnabled)}
          className={`w-9 h-5 rounded-full transition-colors relative ${
            imageEnabled ? 'bg-brand-cyan' : 'bg-brand-dark-700'
          }`}
        >
          <span
            className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
              imageEnabled ? 'left-[18px]' : 'left-0.5'
            }`}
          />
        </button>
      </div>

      {/* Upload area */}
      {imageSrc ? (
        <div>
          <img
            src={imageSrc}
            alt="Uploaded"
            className="w-full rounded-lg border border-ui-border object-contain max-h-32"
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleImageUpload}
              className="flex-1 text-xs py-1.5 rounded bg-brand-dark-700 text-ui-primary hover:bg-brand-dark-600 transition-colors"
            >
              Replace
            </button>
            <button
              onClick={handleRemoveBg}
              disabled={removingBg}
              className="flex items-center gap-1 px-2 py-1.5 rounded bg-brand-dark-700 text-brand-cyan hover:bg-brand-dark-600 transition-colors disabled:opacity-50 disabled:cursor-wait"
              title="Remove background"
            >
              <Eraser size={14} />
              <span className="text-[10px]">{removingBg ? 'Processing...' : 'Remove BG'}</span>
            </button>
            <button
              onClick={handleRemoveImage}
              className="px-3 py-1.5 rounded bg-brand-dark-700 text-red-400 hover:bg-red-500/20 transition-colors"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={handleImageUpload}
          className="w-full py-6 border-2 border-dashed border-brand-dark-600 rounded-lg text-brand-dark-100 hover:border-brand-cyan/50 hover:text-ui-primary transition-colors flex flex-col items-center gap-1"
        >
          <Upload size={20} />
          <span className="text-xs">Upload Image</span>
        </button>
      )}

      {/* Controls (only when image exists) */}
      {imageSrc && (
        <div className="space-y-2">
          {/* X Position */}
          <div>
            <label className="block text-[10px] text-brand-dark-100 mb-0.5">
              X Position: {imageX}%
            </label>
            <input
              type="range"
              min={0}
              max={100}
              value={imageX}
              onChange={e => setField('imageX', Number(e.target.value))}
              className="w-full accent-brand-cyan"
            />
          </div>

          {/* Y Position */}
          <div>
            <label className="block text-[10px] text-brand-dark-100 mb-0.5">
              Y Position: {imageY}%
            </label>
            <input
              type="range"
              min={0}
              max={100}
              value={imageY}
              onChange={e => setField('imageY', Number(e.target.value))}
              className="w-full accent-brand-cyan"
            />
          </div>

          {/* Scale */}
          <div>
            <label className="block text-[10px] text-brand-dark-100 mb-0.5">
              Scale: {Math.round(imageScale * 100)}%
            </label>
            <input
              type="range"
              min={10}
              max={200}
              value={Math.round(imageScale * 100)}
              onChange={e => setField('imageScale', Number(e.target.value) / 100)}
              className="w-full accent-brand-cyan"
            />
          </div>

          {/* Opacity */}
          <div>
            <label className="block text-[10px] text-brand-dark-100 mb-0.5">
              Opacity: {Math.round(imageOpacity * 100)}%
            </label>
            <input
              type="range"
              min={0}
              max={100}
              value={Math.round(imageOpacity * 100)}
              onChange={e => setField('imageOpacity', Number(e.target.value) / 100)}
              className="w-full accent-brand-cyan"
            />
          </div>
        </div>
      )}
    </div>
  )
}
