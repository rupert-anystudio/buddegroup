import { useState } from 'react'
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect'

const useMediaQuery = (mediaQuery, initialMatch = false) => {
  const [matches, setMatches] = useState(initialMatch)

  useIsomorphicLayoutEffect(() => {
    const mediaWatcher = window.matchMedia(mediaQuery)

    setMatches(mediaWatcher.matches)

    function onMediaChange(e) {
      setMatches(e.matches)
    }

    if (mediaWatcher.addListener) { // for sarfari issue
      mediaWatcher.addListener(onMediaChange)
    } else {
      mediaWatcher.addEventListener('change', onMediaChange)
    }

    return () => {
      if (mediaWatcher.removeListener) {
        mediaWatcher.removeListener(onMediaChange)
      } else {
        mediaWatcher.removeEventListener('change', onMediaChange)
      }
    }
  }, [mediaQuery])

  return matches
}

export default useMediaQuery