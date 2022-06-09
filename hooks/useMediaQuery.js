import { useState, useEffect } from 'react'

const useMediaQuery = (mediaQuery, initialMatch = false) => {
  const [matches, setMatches] = useState(initialMatch)

  useEffect(() => {
    const mediaWatcher = window.matchMedia(mediaQuery)

    setMatches(mediaWatcher.matches)

    function onMediaChange(e) {
      setMatches(e.matches)
    }
  
    if (!mediaWatcher.addEventListener) { // for sarfari issue
      mediaWatcher.addListener(onMediaChange)
      return () => {
        mediaWatcher.removeListener(onMediaChange)
      }
    }

    mediaWatcher.addEventListener('change', onMediaChange)
    return () => {
      mediaWatcher.removeEventListener('change', onMediaChange)
    }
  }, [mediaQuery, setMatches])

  return matches
}

export default useMediaQuery