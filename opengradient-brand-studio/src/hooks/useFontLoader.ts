import { useEffect, useState } from 'react'
import { loadAllFonts } from '../lib/fontLoader'

export function useFontLoader() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    loadAllFonts()
    document.fonts.ready.then(() => setLoaded(true))
  }, [])

  return loaded
}
