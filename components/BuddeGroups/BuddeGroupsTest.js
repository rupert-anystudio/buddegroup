import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { gsap } from 'gsap'
import Flip from 'gsap/dist/Flip'
import bp from '../../styles/bp'
import useMediaQuery from '../../hooks/useMediaQuery'
import Button from '../Button'
import useIsomorphicLayoutEffect from '../../hooks/useIsomorphicLayoutEffect'

gsap.registerPlugin(Flip)

const stackQuery = '(max-width: 1023px)'
const columnsQuery = '(min-width: 1024px)'
const focusQuery = '(hover: hover) and (max-width: 1023px), (hover: none)'
const hoverQuery = '(hover: hover) and (min-width: 1024px)'

const stackMediaQuery = `@media ${stackQuery}`
const columnsMediaQuery = `@media ${columnsQuery}`
const focusMediaQuery = `@media ${focusQuery}`
const hoverMediaQuery = `@media ${hoverQuery}`

const Wrap = styled.div`
  flex: 1 0 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
`

const Entries = styled.div`
  position: relative;
  background: black;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  flex: 1 0 100%;
  ${columnsMediaQuery} {
    flex-direction: row;
  }
`

const Entry = styled.div`
  position: relative;
  flex: 1 0 8rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: stretch;
  overflow: hidden;
  @media (hover: hover) {
    cursor: pointer;
  }
  ${stackMediaQuery} {
    &.selected {
      flex-basis: 50rem;
    }
  }
`

const Media = styled.div`
  position: relative;
  background: red;
  flex: 1 0 auto;
  overflow: hidden;
  /* background: steelblue; */
  /* min-height: 30rem; */
  > img, > video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 12rem;
    background: linear-gradient(
      rgba(255,255,255,0) 0%,
      rgba(255,255,255,0.3) 100%
    )
  }
`

const Content = styled.div`
  /* display: none; */
  flex: 0 0 auto;
  background: white;
  padding: 0;
  margin: 0;

  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  will-change: transform;
  transform: translate3d(0, 100%, 0);
  transition: transform 0.3s 0s ease-in-out;
  .selected & {
    transform: translate3d(0, 0%, 0);
    transition-timing-function: ease-out;
    ${stackMediaQuery} {
      transition-delay: 0.3s;
    }
  }
`

const Title = styled.h2`
  position: relative;
  padding: 2rem 2rem 1rem 2rem;
  margin: 0 0 0 0;
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
  
  transform: translate3d(0, calc(-100% - 0rem), 0);
  transition: transform 0.3s 0s ease-in-out;
  .selected & {
    transform: translate3d(0, 0%, 0);
    transition-timing-function: ease-out;
    ${stackMediaQuery} {
      transition-delay: 0.3s;
    }
  }
  
`

const Description = styled.div`
  position: relative;
  padding: 0 2rem;
  margin: 0;
  p {
    margin: 0 0 1rem 0;
  }
`

const VisitButton = styled(Button)`
  margin: 0 0 2rem 0;
`

const BuddeGroups = ({
  members,
}) => {
  const [selectedEntry, setSelectedEntry] = useState(null)

  const domRefs = useRef({
    wrap: null,
    entries: null,
    entry: {},
    entryContent: {},
    title: {},
    link: {},
  })

  // const q = useMemo(() => gsap.utils.selector(domRefs.current.wrap), [])

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

  const columnsLayout = useMediaQuery(columnsQuery)
  const touchBehaviour = useMediaQuery(focusQuery)
  const hoverBehaviour = useMediaQuery(hoverQuery)

  const handleMouseEnter = useCallback(id => e => {
    console.log('handleMouseEnter', id)
    if (hoverBehaviour) {
      setSelectedEntry(id)
    }
  }, [hoverBehaviour])

  const handleMouseLeave = useCallback(e => {
    console.log('handleMouseLeave')
    if (hoverBehaviour) {
      setSelectedEntry(null)
    }
  }, [hoverBehaviour])

  const handleEntryClick = useCallback(id => e => {
    console.log('handleEntryClick', id)
    if (touchBehaviour) {
      setSelectedEntry(prevId => {
        if (prevId === id) return null
        return id
      })
    }
  }, [touchBehaviour])

  const [flipState, setFlipState] = useState({
    entries: members,
    layout: null,
    selectedEntry: null,
  })

  useEffect(() => {
    // const q = gsap.utils.selector(domRefs.current.wrap)
    // const layoutElems = q('.entry, .entryContent')
    // console.log('layoutElems', layoutElems)
    setFlipState({
      layout: Flip.getState('.entries, .entry'),
      entries: members.map(entry => ({
        ...entry,
        isSelected: entry.id === selectedEntry
      })),
    })
  }, [
    members,
    selectedEntry,
  ])

  useIsomorphicLayoutEffect(() => {
    if (!flipState.layout) return
    console.log('flipState changed', flipState)
    // const q = gsap.utils.selector(domRefs.current.wrap)
    // const targetElems = q('.entryContent')
    // console.log('targetElems', targetElems)
    const flipEntryContent = Flip.from(flipState.layout, {
      duration: 0.3,
      ease: 'power2.inOut',
      paused: true,
      simple: true,
      absolute: '.entry',
      targets: '.entries, .entry',
      nested: true,
      scale: false,
      zIndex: 99, // header - 1
    })

    flipEntryContent.play()

    return () => {
      flipEntryContent.kill()
    }
  }, [flipState])

  return (
    <Wrap ref={setDomRef('wrap')}>
      <Entries
        className={`entries`}
        ref={setDomRef('entries')}
        onMouseLeave={handleMouseLeave}
      >
        {flipState.entries.map(({
          id,
          name,
          description,
          logo,
          image,
          video,
          url,
          isSelected,
        }) => {
          // const isSelected = id === flipState.selectedEntry
          return (
            <Entry
              key={id}
              ref={setDomRef(id, 'entry')}
              className={`entry ${isSelected ? 'selected' : ''}`}
              data-entry-id={id}
              onMouseEnter={handleMouseEnter(id)}
              onClick={handleEntryClick(id)}
            >
              <Media>
                {image?.asset?.url && (
                  <img src={image.asset.url} />
                )}
                {video?.asset?.url && columnsLayout && (
                  <video
                    src={video.asset.url}
                    autoPlay
                    muted
                    loop
                  />
                )}
              </Media>
              <Content>
                <Title>
                  <span>{name}</span>
                  {logo?.asset?.url && (
                    <img src={logo.asset.url} alt={name} />
                  )}
                </Title>
                <Description>
                  <p>
                    {description}
                  </p>
                  <VisitButton
                    label={'Visit'}
                    href={url}
                    tabIndex={columnsLayout && !isSelected ? -1 : 0}
                  />
                </Description>
              </Content>
            </Entry>
          )
        })}
      </Entries>
    </Wrap>
  )
}

export default BuddeGroups