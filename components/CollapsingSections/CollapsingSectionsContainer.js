import { useRef, useState, useCallback, useEffect } from 'react'
import { debounce } from 'lodash'
import { gsap } from 'gsap'
import Flip from 'gsap/dist/Flip'

import CollapsingSections from './CollapsingSections'
import useMediaQuery from '../../hooks/useMediaQuery'

gsap.registerPlugin(Flip)

const CollapsingSectionsContainer = ({ sections = [], ...rest }) => {
  const wrapRef = useRef()
  const q = gsap.utils.selector(wrapRef)

  const hasColumns = useMediaQuery('(min-width: 1024px)', false)
  const canHover = useMediaQuery('(hover: hover)', false)

  const [layout, setLayout] = useState({
    openSection: null,
  })

  const onSectionSelect_ = sectionId => {
    const items = q('.item')
    setLayout(prev => ({
      ...prev,
      state: Flip.getState(items),
      openSection: sectionId,
    }))
  }

  const onSectionSelect = useRef(
    debounce(onSectionSelect_, 120)
  ).current

  const handleClick = useCallback(section => {
    if (!canHover || (canHover && !hasColumns)) {
      onSectionSelect_(section.id)
    }
  }, [canHover, hasColumns])

  const handleMouseEnter = useCallback(section => {
    if (canHover && hasColumns) {
      onSectionSelect_(section.id)
    }
  }, [canHover, hasColumns])

  const handleMouseLeave = useCallback(() => {
    if (canHover && hasColumns) {
      onSectionSelect_(null)
    }
  }, [canHover, hasColumns])

  useEffect(() => {
    if (!layout.state) return

    const items = q('.item')

    const timeline = gsap.timeline({
      paused: true,
      defaults: {
        duration: .3,
        ease: 'power1.inOut',
      },
      onStart: () => {
        // console.log('timeline onStart!')
      },
      onComplete: () => {
        // console.log('timeline onComplete!')
      }
    })

    const layoutTl = Flip.from(layout.state, {
      duration: .3,
      absolute: true, 
      ease: 'power1.inOut',
      targets: items,
      scale: false,
      simple: true,
    })

    const beforeLayoutTl = gsap
      .timeline({
        defaults: {
          duration: .3,
          ease: 'power1.inOut',
        }
      })
      .to(q('.item.collapsed > .collapsing > .content'), {
        autoAlpha: 0,
      })
      .to(q('.item.collapsed > .media'), {
        autoAlpha: 1,
      }, '<')
      // .to(q('.item.open > .media > .blur'), {
      //   backdropFilter: 'blur(0px)',
      // }, '<')
      // .to(q('.item.collapsed > .media > .blur'), {
      //   backdropFilter: 'blur(80px)',
      // }, '<')
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

    const aterLayoutTl = gsap.timeline({
      defaults: {
        duration: .3,
        ease: 'power1.inOut',
      }
    })
    .to(q('.item.open > .collapsing > .content'), {
      autoAlpha: 1,
      y: 0,
    })

    timeline.add(beforeLayoutTl)
    timeline.add(layoutTl, '<')
    timeline.add(aterLayoutTl, '-=0.1')

    timeline.play()

    return () => {
      timeline.kill()
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
      {...rest}
    />
  )
}

export default CollapsingSectionsContainer