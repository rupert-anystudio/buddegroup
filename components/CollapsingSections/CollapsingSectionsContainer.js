import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Flip from 'gsap/dist/Flip'

import CollapsingSections from './CollapsingSections'

gsap.registerPlugin(Flip)

const CollapsingSectionsContainer = ({ sections = [] }) => {
  const prevLayout = useRef(null)
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

  useEffect(() => {
    const layoutPrev = prevLayout.current
    if (!layout.state) {
      return
    }

    const timeline = gsap.timeline()

    // timeline.add(
    //   gsap
    //     .timeline({
    //       defaults: {
    //         ease: 'power1.inOut',
    //       }
    //     })
    //     .to(
    //       q('.item.collapsed'),
    //       {
    //         duration: 0.3,
    //         backgroundColor: 'rgba(187,187,187,1)'
    //       }
    //     )
    //     .to(q('.item.collapsed > div > p'), {
    //       duration: 0.2,
    //       autoAlpha: 0,
    //     }, '<')
    //     .to(q('.item.collapsed > div'), {
    //       duration: 0.2,
    //       // backgroundColor: 'rgba(255,255,255,0)'
    //     }, '<')
    // )

    // timeline.add(
    //   gsap
    //     .timeline({
    //       defaults: {
    //         ease: 'power1.inOut',
    //       }
    //     })
    //     .to(q('.item.collapsed > div'), {
    //       duration: 0.3,
    //       y: '100%'
    //     })
    //     .to(q('.item.collapsed > div > h1'), {
    //       duration: 0.3,
    //       y: '-100%'
    //     }, '<')
    //     .to(q('.item.open'), {
    //       backgroundColor: 'rgba(157,157,157,1)'
    //     }, '<'),
    //   '-=0.2'
    // )

    timeline.add(Flip.from(layout.state, {
      duration: .3,
      absolute: true, 
      ease: 'power1.inOut',
      targets: q('.item'),
      scale: false,
      simple: true,
    }))
    timeline.addLabel("layoutStart", '<')
    timeline.addLabel("layoutEnd", '+=0')
    timeline.addLabel("start", 0)


    // timeline.to(q('.item.collapsed'), {
    //   duration: .3,
    //   backgroundColor: 'rgba(255,255,255,1)'
    // }, 'layoutStart')

    // timeline.to(q('.item.open'), {
    //   duration: .3,
    //   backgroundColor: 'rgba(255,0,0,1)'
    // }, 'layoutEnd')



    timeline.to(q('.item.collapsed > div'), {
      duration: .3,
      y: '100%',
    }, 'layoutStart')

    timeline.to(q('.item.collapsed > div'), {
      duration: .3,
      backgroundColor: 'rgba(255,255,255,0)'
    }, 'layoutStart')

    timeline.to(q('.item.open > div'), {
      duration: .3,
      y: '0%',
    }, 'layoutStart')


    timeline.to(q('.item.collapsed > div > h1'), {
      duration: .3,
      y: '-100%',
    }, 'layoutStart')


    timeline.to(q('.item.collapsed > div > p'), {
      duration: .15,
      autoAlpha: 0,
    }, 'layoutStart')

    timeline.to(q('.item.open > div > h1'), {
      duration: .3,
      y: '0%',
    }, 'layoutStart')


    timeline.to(q('.item.open > div > p'), {
      duration: .15,
      autoAlpha: 1,
    }, 'layoutEnd')

    timeline.to(q('.item.open > div'), {
      duration: .3,
      backgroundColor: 'rgba(255,255,255,1)'
    }, 'layoutEnd')

    // timeline.add(
    //   gsap
    //     .timeline({
    //       defaults: {
    //         duration: 0.3,
    //         ease: 'power1.inOut',
    //       }
    //     })
    //     .to(q('.item.open > div'), {
    //       duration: 0.1,
    //       backgroundColor: 'rgba(255,255,255,1)'
    //     })
    //     .to(q('.item.open > div'), {
    //       y: '0%'
    //     }, '<')
    //     .to(q('.item.open > div > h1'), {
    //       y: '0%'
    //     }, '<')
    //     .to(q('.item.open > div > p'), {
    //       autoAlpha: 1
    //     }, '+=0'),
    //   '-=0.5'
    // )

    timeline.play()

    prevLayout.current = layout

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