import { useRef, useState, useCallback, useEffect } from 'react'
import { debounce } from 'lodash'
import { gsap } from 'gsap'
import Flip from 'gsap/dist/Flip'

import CollapsingSections from './CollapsingSections'
import useMediaQuery from '../../hooks/useMediaQuery'
import useHasWindow from '../../hooks/useHasWindow'

gsap.registerPlugin(Flip)

const CollapsingSectionsContainer = ({ sections = [], ...rest }) => {
  const wrapRef = useRef()
  const q = gsap.utils.selector(wrapRef)

  const hasColumns = useMediaQuery('(min-width: 1024px)', false)
  const canHover = useMediaQuery('(hover: hover)', false)
  const hasWindow = useHasWindow()

  const [layout, setLayout] = useState({
    openSection: null,
  })

  const onSectionSelect = useCallback(sectionId => {
    const items = q('.item')
    const newState = Flip.getState(items)
    setLayout(prev => ({
      ...prev,
      state: newState,
      openSection: sectionId,
    }))
  }, [q])

  const onSectionSelectDebounced = useRef(
    debounce(onSectionSelect, 120)
  ).current

  const handleClick = useCallback(section => {
    if (!canHover || (canHover && !hasColumns)) {
      onSectionSelectDebounced(section.id)
    }
  }, [canHover, hasColumns, onSectionSelectDebounced])

  const handleMouseEnter = useCallback(section => {
    if (canHover && hasColumns) {
      onSectionSelectDebounced(section.id)
    }
  }, [canHover, hasColumns, onSectionSelectDebounced])

  const handleMouseLeave = useCallback(() => {
    if (canHover && hasColumns) {
      onSectionSelectDebounced(null)
    }
  }, [canHover, hasColumns, onSectionSelectDebounced])

  useEffect(() => {
    if (!layout.state) return

    const items = q('.item')

    const timeline = gsap.timeline({
      paused: true,
      defaults: {
        duration: .3,
        ease: 'power1.inOut',
        overwrite: true,
      },
      onStart: () => {
        // console.log('timeline onStart!')
      },
      onComplete: () => {
        // console.log('timeline onComplete!')
      }
    })

    const timelineFlip = Flip.from(layout.state, {
      duration: .3,
      absolute: true,
      ease: 'power1.inOut',
      targets: items,
      scale: false,
      simple: true,
    })

    const timelineBeforeFlip = gsap
      .timeline({
        defaults: {
          duration: .3,
          ease: 'power1.inOut',
          overwrite: true,
        }
      })
      .to(q('.item.collapsed > .collapsing > .content'), {
        autoAlpha: 0,
      })
      .to(q('.item.collapsed > .media'), {
        autoAlpha: 1,
      }, '<')
      .to(q('.item.open > .media'), {
        autoAlpha: 1,
      }, '<')
      .to(q('.item.collapsed > .collapsing'), {
        y: '100%'
      }, '<')
      .to(q('.item.collapsed > .collapsing > .title'), {
        y: '-100%'
      }, '<')
      .to(q('.item.open > .collapsing'), {
        y: '0%'
      }, '<')
      .to(q('.item.open > .collapsing > .title'), {
        y: '0%'
      }, '<')
      .set(q('.item.collapsed > .collapsing > .content'), {
        y: 5,
      })

    const timelineAfterFlip = gsap.timeline({
      defaults: {
        duration: .3,
        ease: 'power1.inOut',
        overwrite: true,
      }
    })
    .to(q('.item.open > .collapsing > .content'), {
      autoAlpha: 1,
      y: 0,
    })

    timeline.add(timelineBeforeFlip)
    timeline.add(timelineFlip, '<')
    timeline.add(timelineAfterFlip, '-=0.1')

    timeline.play()

    return () => {
      timeline.invalidate()
      timeline.kill()
      timelineBeforeFlip.kill()
      timelineFlip.kill()
      timelineAfterFlip.kill()
    }

  }, [layout, sections, q])

  return (
    <CollapsingSections
      sections={sections}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      openSection={layout.openSection}
      wrapRef={wrapRef}
      hasColumns={hasColumns}
      canHover={canHover}
      hasWindow={hasWindow}
      {...rest}
    />
  )
}

export default CollapsingSectionsContainer