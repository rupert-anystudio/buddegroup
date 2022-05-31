import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Flip from 'gsap/dist/Flip'

import CollapsingSections from './CollapsingSections'
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect'

gsap.registerPlugin(Flip)

const CollapsingSectionsContainer = ({ sections = [] }) => {
  const wrapRef = useRef()
  const q = gsap.utils.selector(wrapRef)

  const [layout, setLayout] = useState({
    openSection: null,
  })

  const handleSectionClick = section => {
    // console.log('handleSectionClick', section)
    setLayout(prev => ({
      ...prev,
      state: Flip.getState(q('.item')),
      openSection: prev.openSection !== section.id ? section.id : null,
    }))
  }

  useIsomorphicLayoutEffect(() => {
    if (!layout.state) return

    const timeline = gsap.timeline({
      defaults: {
        duration: .3,
        ease: 'power1.inOut',
      }
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
        autoAlpha: 0.2,
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
        y: 10,
      })

    const layoutTl = Flip.from(layout.state, {
      duration: .3,
      absolute: true, 
      ease: 'power1.inOut',
      targets: q('.item'),
      scale: false,
      simple: true,
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

  }, [layout, sections, q])

  return (
    <CollapsingSections
      sections={sections}
      onSectionClick={handleSectionClick}
      openSection={layout.openSection}
      wrapRef={wrapRef}
    />
  )
}

export default CollapsingSectionsContainer