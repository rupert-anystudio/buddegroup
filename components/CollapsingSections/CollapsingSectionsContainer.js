import { useRef, useState } from 'react'
import { debounce, throttle } from 'lodash'
import { gsap } from 'gsap'
import Flip from 'gsap/dist/Flip'

import CollapsingSections from './CollapsingSections'
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect'

gsap.registerPlugin(Flip)

const CollapsingSectionsContainer = ({ sections = [], ...rest }) => {
  const wrapRef = useRef()
  const q = gsap.utils.selector(wrapRef)

  const [layout, setLayout] = useState({
    openSection: null,
  })

  const onSectionSelectBase = sectionId => {
    // console.log('handleSectionClick', section)
    setLayout(prev => ({
      ...prev,
      state: Flip.getState(q('.item')),
      openSection: sectionId,
    }))
  }

  const onSectionSelect = useRef(
    debounce(onSectionSelectBase, 120)
  ).current

  const handleSectionClick = section => {
    // console.log('handleSectionClick', section)
    // onSectionSelect(section.id)
    setLayout(prev => ({
      ...prev,
      state: Flip.getState(q('.item')),
      openSection: section.id === prev.openSection ? null : section.id,
    }))
  }

  const handleSectionMouseEnter = section => {
    // console.log('handleSectionMouseEnter')
    onSectionSelect(section.id)
  }

  const handleMouseLeave = section => {
    // console.log('handleSectionMouseLeave', section)
    onSectionSelect(null)
  }

  useIsomorphicLayoutEffect(() => {
    if (!layout.state) return

    const timeline = gsap.timeline({
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

    return () => {
      timeline.kill()
    }

  }, [layout, sections, q])

  return (
    <CollapsingSections
      sections={sections}
      onSectionClick={handleSectionClick}
      onSectionMouseEnter={handleSectionMouseEnter}
      onMouseLeave={handleMouseLeave}
      openSection={layout.openSection}
      wrapRef={wrapRef}
      {...rest}
    />
  )
}

export default CollapsingSectionsContainer