import { FONT_REGISTRY, buildGoogleFontsUrl } from '../constants/fonts'

let fontsLoaded = false
let fontFaceCSSCache: string | null = null

export function loadAllFonts(): void {
  if (fontsLoaded) return
  fontsLoaded = true

  const url = buildGoogleFontsUrl(FONT_REGISTRY)
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = url
  document.head.appendChild(link)
}

export async function generateFontFaceCSS(): Promise<string> {
  if (fontFaceCSSCache) return fontFaceCSSCache

  const url = buildGoogleFontsUrl(FONT_REGISTRY)
  try {
    const response = await fetch(url)
    const css = await response.text()
    fontFaceCSSCache = css
    return css
  } catch {
    return ''
  }
}

export async function waitForFonts(): Promise<void> {
  await document.fonts.ready
}
