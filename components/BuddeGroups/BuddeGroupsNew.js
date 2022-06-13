import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { debounce, flip, join, throttle } from 'lodash'
import { gsap } from 'gsap'
import Flip from 'gsap/dist/Flip'
import bp, { minWidths } from '../../styles/bp'
import useMediaQuery from '../../hooks/useMediaQuery'
import Button from '../Button'

const columnsQuery = '(min-width: 1024px)'
const focusQuery = '(hover: hover) and (max-width: 1023px), (hover: none)'
const hoverQuery = '(hover: hover) and (min-width: 1024px)'

const columnsMediaQuery = `@media ${columnsQuery}`
const focusMediaQuery = `@media ${focusQuery}`
const hoverMediaQuery = `@media ${hoverQuery}`

gsap.registerPlugin(Flip)

const Wrap = styled.div`
  position: relative;
  background: black;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  flex: 1 0 100%;
  gap: 1px;
  ${bp.min.tabletwide`
    flex-direction: row;
  `}
`

const Entry = styled.div`
  position: relative;
  flex: 1 0 8rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: stretch;
  @media (hover: hover) {
    cursor: pointer;
  }
  /* &.selected {
    @media (max-width: 1023px) {
      flex-grow: 20;
      min-height: 50rem;
    }
  } */
`

const EntryChild = styled.div`
  position: relative;
  background: slateblue;
  flex: 1 0 100%;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: stretch;
  overflow: hidden;
`

const Media = styled.div`
  position: relative;
  background: red;
  flex: 1 0 auto;
  background: steelblue;
  min-height: 30rem;
  > img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const Content = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  flex: 0 0 auto;
  ${columnsMediaQuery} {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    
    transform: translate3d(0, 100%, 0);
    transition: transform 0.3s 0s ease-in-out;
    .selected & {
      transform: translate3d(0, 0%, 0);
      transition-timing-function: ease-out;
    }
  }
  /* will-change: transform;
  transform: translate3d(0, 100%, 0);
  transition-timing-function: ease-in;
  transition-property: transform;
  transition-duration: .2s;
  transition-delay: 0s;
  .selected & {
    transform: translate3d(0,0,0);
    transition-timing-function: ease-out;
    @media (max-width: 1023px) {
      transition-delay: .5s;
    }
  } */
  > div {
    position: relative;
    background: white;
    padding: 2rem;
  }
`

const Title = styled.h2`
  position: relative;
  margin: 1rem 0 2rem 0;
  span {
    position: absolute;
    visibility: hidden;
  }
  img {
    position: relative;
    width: auto;
    height: 3.8rem;
    margin: 0;
    ${bp.min.laptop`
      height: 4.8rem;
    `}
  }
  
  ${columnsMediaQuery} {
    transform: translate3d(0, calc(-100% - 5rem), 0);
    transition: transform 0.3s 0s ease-in-out;
    .selected & {
      transform: translate3d(0, 0%, 0);
      transition-timing-function: ease-out;
    }
  }
  /* transform: translate3d(0, calc(-100% - 5rem), 0);
  transition-timing-function: ease-in;
  transition-property: transform;
  transition-duration: .2s;
  transition-delay: 0s;
  .selected & {
    @media (max-width: 1023px) {
      transition-delay: .5s;
    }
    transform: translate3d(0, 0%, 0);
    transition-timing-function: ease-out;
  } */
`

const Text = styled.p`
  position: relative;
  margin: 0 0 2rem 0;
`

const VisitButton = styled(Button)`
  margin: 0 0 1rem 0;
`

const BuddeGroups = ({
  members,
}) => {
  const [selectedEntry, setSelectedEntry] = useState(null)

  const entries = useMemo(() => {
    return members.map(member => ({
      ...member,
      isSelected: member.id === selectedEntry
    }))
  }, [members, selectedEntry])

  const domRefs = useRef({
    wrap: null,
    entries: {},
    entryChild: {},
    titles: {},
    links: {},
  })

  const columnsLayout = useMediaQuery(columnsQuery)
  const focusBehaviour = useMediaQuery(focusQuery)
  const hoverBehaviour = useMediaQuery(hoverQuery)

  const setDomRef = (id, group) => c => {
    if (!id) return
    if (!group) {
      domRefs.current[id] = c
      return
    }
    const presentGroup = domRefs.current[group]
    if (!presentGroup) {
      domRefs.current[group] = {
        [id]: c
      }
      return
    }
    domRefs.current[group][id] = c
  }

  const returnParentEntryId = el => {
    if (!el) return null
    const entry = el.classList.contains('entry')
      ? el
      : el.closest('div.entry')
    if (!entry) return null
    return entry.getAttribute('data-entry-id')
  }

  const handleFocus = e => {
    if (!focusBehaviour) return
    const id = returnParentEntryId(e.target)
    setSelectedEntry(id)
  }

  const handleMouseOver = e => {
    if (!hoverBehaviour) return
    const id = returnParentEntryId(e.target)
    setSelectedEntry(id)
  }

  const handleMouseLeave = () => {
    if (!hoverBehaviour) return
    setSelectedEntry(null)
  }

  // const [flipState, setFlipState] = useState({ height: 0 })

  // useEffect(() => {
  //   const q = gsap.utils.selector(domRefs.current.wrap)
  //   const rect = domRefs.current.wrap.getBoundingClientRect()
  //   setFlipState(prevState => ({
  //     layout: Flip.getState(q('.entryChild')),
  //     selectedEntry,
  //     height: rect?.height || prevState.height,
  //   }))
  // }, [selectedEntry])

  // const scrollToEntry = useCallback(id => {
  //   const target = domRefs.current.entries[id]
  //   if (target) {
  //     target.scrollIntoView({
  //       // behaviour: 'smooth'
  //     })
  //   }
  // }, [])

  // useEffect(() => {
  //   const q = gsap.utils.selector(domRefs.current.wrap)

  //   // gsap.set(
  //   //   domRefs.current.wrap,
  //   //   {
  //   //     minHeight: flipState.height,
  //   //   }
  //   // )

  //   const flip = gsap.timeline({
  //     paused: true,
  //     defaults: {
  //       duration: .2,
  //       ease: 'power1.inOut',
  //     }
  //   })

  //   if (flipState.layout) {
  //     const entryEls = q('.entryChild')
  //     flip.add(
  //       Flip.from(flipState.layout, {
  //         delay: flipState.selectedEntry ? 0.2 : 0,
  //         // delay: 0,
  //         duration: .4,
  //         absolute: true,
  //         ease: 'power2.inOut',
  //         targets: entryEls,
  //         scale: false,
  //         simple: true,
  //         // onStart: () => scrollToEntry(flipState.selectedEntry),
  //         // onComplete: () => scrollToEntry(flipState.selectedEntry),
  //       }), '<'
  //     )
  //   }

  //   // flip.add(
  //   //   gsap.set(
  //   //     domRefs.current.wrap,
  //   //     {
  //   //       minHeight: 0
  //   //     }
  //   //   )
  //   // )

  //   flip.play()

  //   return () => {
  //     flip.kill()
  //   }
  // }, [
  //   flipState,
  //   scrollToEntry,
  // ])

  return (
    <Wrap
      ref={setDomRef('wrap')}
      onFocus={handleFocus}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      className={`entries`}
    >
      {entries.map(({
        id,
        name,
        description,
        logo,
        image,
        video,
        url,
        isSelected,
      }) => {
        return (
          <Entry
            key={id}
            ref={setDomRef(id, 'entries')}
            tabIndex={focusBehaviour ? 0 : -1}
            className={`entry ${isSelected ? 'selected' : 'idle'}`}
            data-entry-id={id}
          >
            <EntryChild
              ref={setDomRef(id, 'entryChild')}
              className={`entryChild`}
            >
              <Media>
                {image?.asset?.url && (
                  <img src={image.asset.url} />
                )}
              </Media>
              <Content
                className={`entry__content`}
              >
                <div>
                  <Title
                    ref={setDomRef(id, 'titles')}
                    className={`entry__title`}
                  >
                    <span>{name}</span>
                    {logo?.asset?.url && (
                      <img src={logo.asset.url} alt={name} />
                    )}
                  </Title>
                  <Text>
                    {description}
                  </Text>
                  <VisitButton
                    ref={setDomRef(id, 'links')}
                    className={`entry__link`}
                    label={'Visit'}
                    href={url}
                    tabIndex={columnsLayout && !isSelected ? -1 : 0}
                  />
                </div>
              </Content>
            </EntryChild>
          </Entry>
        )
      })}
    </Wrap>
  )
}

export default BuddeGroups