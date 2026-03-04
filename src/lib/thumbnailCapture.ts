import { toPng } from 'html-to-image'

/**
 * Capture the current canvas DOM element as a low-res thumbnail data URL.
 * Clones the element first so the capture is independent of future DOM changes
 * (e.g., when switching pages fires before toPng finishes reading styles).
 */
export async function captureThumbnail(canvasElement: HTMLElement): Promise<string> {
  const w = canvasElement.offsetWidth
  const h = canvasElement.offsetHeight

  // Synchronously clone the DOM so we capture current state, not post-switch state
  const clone = canvasElement.cloneNode(true) as HTMLElement
  const offscreen = document.createElement('div')
  offscreen.style.position = 'fixed'
  offscreen.style.left = '-99999px'
  offscreen.style.top = '0'
  offscreen.style.overflow = 'visible'
  offscreen.appendChild(clone)
  document.body.appendChild(offscreen)

  try {
    return await toPng(clone, {
      width: w,
      height: h,
      pixelRatio: 0.3,
      cacheBust: true,
    })
  } finally {
    document.body.removeChild(offscreen)
  }
}
