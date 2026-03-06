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

  // Clone the canvas and reset its transform/dimensions
  const clone = canvasElement.cloneNode(true) as HTMLElement
  clone.style.transform = 'none'
  clone.style.width = `${targetWidth}px`
  clone.style.height = `${targetHeight}px`
  clone.style.position = 'relative'

  // Use a wrapper div for off-screen positioning so the clone itself
  // stays position:relative (matching CanvasRenderer). This prevents
  // html-to-image from mis-positioning content due to position:fixed.
  const offscreen = document.createElement('div')
  offscreen.style.position = 'fixed'
  offscreen.style.left = '-99999px'
  offscreen.style.top = '0'
  offscreen.style.overflow = 'visible'
  offscreen.appendChild(clone)
  document.body.appendChild(offscreen)

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
    document.body.removeChild(offscreen)
  }
}

export async function copyCanvasToClipboard(
  canvasElement: HTMLElement,
  options: Omit<ExportOptions, 'filename'>
): Promise<void> {
  const { targetWidth, targetHeight, pixelRatio = 2 } = options

  await waitForFonts()

  const clone = canvasElement.cloneNode(true) as HTMLElement
  clone.style.transform = 'none'
  clone.style.width = `${targetWidth}px`
  clone.style.height = `${targetHeight}px`
  clone.style.position = 'relative'

  const offscreen = document.createElement('div')
  offscreen.style.position = 'fixed'
  offscreen.style.left = '-99999px'
  offscreen.style.top = '0'
  offscreen.style.overflow = 'visible'
  offscreen.appendChild(clone)
  document.body.appendChild(offscreen)

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

    const res = await fetch(dataUrl)
    const blob = await res.blob()
    await navigator.clipboard.write([
      new ClipboardItem({ 'image/png': blob }),
    ])
  } finally {
    document.body.removeChild(offscreen)
  }
}

export async function exportAllSizes(
  canvasElement: HTMLElement,
  sizes: Array<{ id: string; width: number; height: number }>,
  onProgress?: (percent: number) => void,
  designName?: string
): Promise<void> {
  const prefix = designName || 'opengradient'
  for (let i = 0; i < sizes.length; i++) {
    const size = sizes[i]!
    await exportCanvasToPng(canvasElement, {
      targetWidth: size.width,
      targetHeight: size.height,
      filename: `${prefix}-${size.width}x${size.height}.png`,
    })
    onProgress?.(((i + 1) / sizes.length) * 100)
    // Brief pause between exports to avoid overwhelming the browser
    await new Promise(r => setTimeout(r, 200))
  }
}
