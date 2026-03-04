import { toPng } from 'html-to-image'

/**
 * Capture the current canvas DOM element as a low-res thumbnail data URL.
 * Uses pixelRatio 0.3 for small file size (thumbnails are ~360px wide in the UI).
 */
export async function captureThumbnail(canvasElement: HTMLElement): Promise<string> {
  return toPng(canvasElement, {
    width: canvasElement.offsetWidth,
    height: canvasElement.offsetHeight,
    pixelRatio: 0.3,
    cacheBust: true,
  })
}
