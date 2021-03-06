import { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { gsap } from 'gsap'
import Flip from 'gsap/dist/Flip'
import ReactPlayer from 'react-player'
import bp from '../../styles/bp'
import useMediaQuery from '../../hooks/useMediaQuery'
import Button from '../Button'
import useIsomorphicLayoutEffect from '../../hooks/useIsomorphicLayoutEffect'
import NextSanityImage from '../NextSanityImage'

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
  background: black;
  flex: 1 0 auto;
  overflow: hidden;
  user-select: none;
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
  user-select: none;
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
  user-select: none;
`

const MediaVideoWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  video {
    object-fit: cover;
  }
`

const MediaImage = ({ image }) => {
  return (
    <NextSanityImage
      image={image}
      layout='fill'
      sizes='100vw'
      // imageBuilder={imageBuilder}
      // blurUpImageBuilder={blurUpImageBuilder}
    />
  )
}

const MediaVideo = ({ src }) => {
  const playerRef = useRef(null)

  const [isReady, setIsReady] = useState(false)

  const handleReady = useCallback(() => {
    setIsReady(true)
  }, [])

  useIsomorphicLayoutEffect(() => {
    gsap.set(playerRef.current, {
      autoAlpha: 0,
      scale: 1.2,
    })
  }, [])

  useIsomorphicLayoutEffect(() => {
    if (!isReady) return
    gsap.to(playerRef.current, {
      autoAlpha: 1,
      scale: 1,
      duration: .3
    })
  }, [isReady])

  return (
    <MediaVideoWrapper ref={playerRef}>
      <ReactPlayer
        url={src}
        playing={isReady}
        muted
        loop
        width="100%"
        height="100%"
        wrapper={MediaVideoWrapper}
        onReady={() => handleReady()}
      />
    </MediaVideoWrapper>
  )
}

const BuddeGroups = ({
  members,
}) => {
  const [selectedEntry, setSelectedEntry] = useState(null)

  const stackLayout = useMediaQuery(stackQuery)
  const columnsLayout = useMediaQuery(columnsQuery)
  const touchBehaviour = useMediaQuery(focusQuery)
  const hoverBehaviour = useMediaQuery(hoverQuery)

  const handleMouseEnter = useCallback(id => e => {
    if (hoverBehaviour) {
      setSelectedEntry(id)
    }
  }, [hoverBehaviour])

  const handleMouseLeave = useCallback(e => {
    if (hoverBehaviour) {
      setSelectedEntry(null)
    }
  }, [hoverBehaviour])

  const handleEntryClick = useCallback(id => e => {
    if (touchBehaviour) {
      setSelectedEntry(prevId => {
        if (prevId === id) return null
        return id
      })
    }
  }, [touchBehaviour])

  const [flipState, setFlipState] = useState({
    layout: null,
    entries: members,
  })

  useEffect(() => {
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
    <Wrap>
      <Entries
        className={`entries`}
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
          isSelected = false,
        }) => {
          return (
            <Entry
              key={id}
              className={`entry ${isSelected ? 'selected' : ''}`}
              onMouseEnter={handleMouseEnter(id)}
              onClick={handleEntryClick(id)}
            >
              <Media>
                {image && stackLayout && (
                  <MediaImage image={image} />
                )}
                {video?.asset?.url && columnsLayout && (
                  <MediaVideo src={video.asset.url} />
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