import { toPng } from 'html-to-image'
import { generateFontFaceCSS, waitForFonts } from './fontLoader'

interface ExportOptions {
  targetWidth: number
  targetHeight: number
  pixelRatio?: number
  filename?: string
}

export async function exportCanvasToPng(
  canvasElement: HTMLElement,
  options: ExportOptions
): Promise<void> {
  const { targetWidth, targetHeight, pixelRatio = 2, filename } = options

  await waitForFonts()

  const clone = canvasElement.cloneNode(true) as HTMLElement
  clone.style.transform = 'none'
  clone.style.width = `${targetWidth}px`
  clone.style.height = `${targetHeight}px`
  clone.style.position = 'fixed'
  clone.style.left = '-99999px'
  clone.style.top = '0'
  document.body.appendChild(clone)

  const fontCSS = await generateFontFaceCSS()
  if (fontCSS) {
    const styleEl = document.createElement('style')
    styleEl.textContent = fontCSS
    clone.prepend(styleEl)
  }

  try {
    const dataUrl = await toPng(clone, {
      width: targetWidth,
      height: targetHeight,
      pixelRatio,
      cacheBust: true,
    })

    const link = document.createElement('a')
    link.download = filename ?? `opengradient-${targetWidth}x${targetHeight}.png`
    link.href = dataUrl
    link.click()
  } finally {
    document.body.removeChild(clone)
  }
}

export async function exportAllSizes(
  canvasElement: HTMLElement,
  sizes: Array<{ id: string; width: number; height: number }>,
  onProgress?: (percent: number) => void
): Promise<void> {
  for (let i = 0; i < sizes.length; i++) {
    const size = sizes[i]!
    await exportCanvasToPng(canvasElement, {
      targetWidth: size.width,
      targetHeight: size.height,
      filename: `opengradient-${size.id}-${size.width}x${size.height}.png`,
    })
    onProgress?.(((i + 1) / sizes.length) * 100)
    // Brief pause between exports to avoid overwhelming the browser
    await new Promise(r => setTimeout(r, 200))
  }
}
