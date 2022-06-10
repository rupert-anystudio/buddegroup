import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { debounce, flip, join, throttle } from 'lodash'
import { gsap } from 'gsap'
import Flip from 'gsap/dist/Flip'
import bp, { minWidths } from '../../../styles/bp'
import useMediaQuery from '../../../hooks/useMediaQuery'
import Button from '../../Button'

gsap.registerPlugin(Flip)

const Content = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  background: white;
  flex: 0 0 auto;
  transform: translateY(100%);
  transition-timing-function: ease-in;
  transition-property: transform;
  transition-duration: .2s;
  transition-delay: 0s;
  .selected & {
    @media (max-width: 1023px) {
      transition-delay: .5s;
    }
    transform: translateY(0%);
    transition-timing-function: ease-out;
  }
`

const Title = styled.h2`
  position: relative;
  margin: 0;
  padding: 0;
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
`

const Text = styled.p`
  position: relative;
  margin: 0;
  padding: 0;
`

const Entry = styled.div`
  position: relative;
  background: steelblue;
  flex: 1 0 4rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
  @media (hover: hover) {
    cursor: pointer;
  }
  &.selected {
    @media (max-width: 1023px) {
      flex-grow: 10;
    }
  }
`

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

const Rows = ({
  entries,
  selectedEntry,
  setSelectedEntry,
}) => {
  const domRefs = useRef({
    wrap: null,
    entries: {},
    titles: {},
    links: {},
  })

  const isStacked = useMediaQuery('(max-width: 1023px)')
  const focusBehaviour = useMediaQuery('(hover: hover) and (max-width: 1023px), (hover: none)')
  const hoverBehaviour = useMediaQuery('(hover: hover) and (min-width: 1024px)')

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
    console.log('returnParentEntryId')
    if (!el) {
      console.log('!el')
      return null
    }
    const entry = el.classList.contains('entry')
      ? el
      : el.closest('div.entry')
    if (!entry) {
      console.log('!entry')
      return null
    }
    const id = entry.getAttribute('data-entry-id')
    console.log('id', id)
    return id
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

  const [flipState, setFlipState] = useState({})

  useEffect(() => {
    setFlipState({
      layout: Flip.getState('.entry'),
      selectedEntry,
    })
  }, [selectedEntry])

  const onFlipComplete = useCallback(e => {
    console.log('onFlipComplete')
  }, [])

  useEffect(() => {
    const q = gsap.utils.selector(domRefs.current.wrap)

    const flip = gsap.timeline({
      paused: true,
      defaults: {
        duration: .2,
        ease: 'power1.inOut',
      }
    })

    console.log(flipState)

    if (flipState.layout) {
      const entryEls = q('.entry')
      flip.add(
        Flip.from(flipState.layout, {
          delay: flipState.selectedEntry ? 0.2 : 0,
          duration: .3,
          absolute: true,
          ease: 'power2.inOut',
          targets: entryEls,
          scale: false,
          simple: true,
          onComplete: onFlipComplete,
        })
      )
    }

    flip.play()

    return () => {
      flip.kill()
    }
  }, [flipState, onFlipComplete])

  return (
    <Wrap
      ref={setDomRef('wrap')}
      onFocus={handleFocus}
      onMouseOver={handleMouseOver}
    >
      {entries.map(({
        id,
        name,
        description,
        logo,
      }) => {
        return (
          <Entry
            key={id}
            data-entry-id={id}
            ref={setDomRef(id, 'entries')}
            tabIndex={focusBehaviour ? 0 : -1}
            className={`entry ${flipState.selectedEntry === id ? 'selected' : 'idle'}`}
          >
            <Content className={`entry__content`}>
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
              <Button
                ref={setDomRef(id, 'links')}
                className={`entry__link`}
                label={'Visit'}
              />
            </Content>
          </Entry>
        )
      })}
    </Wrap>
  )
}

export default Rows