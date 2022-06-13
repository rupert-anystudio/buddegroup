import { useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import bp from '../../styles/bp'
import useMediaQuery from '../../hooks/useMediaQuery'
import Button from '../Button'

const columnsQuery = '(min-width: 1024px)'
const focusQuery = '(hover: hover) and (max-width: 1023px), (hover: none)'
const hoverQuery = '(hover: hover) and (min-width: 1024px)'

const columnsMediaQuery = `@media ${columnsQuery}`
const focusMediaQuery = `@media ${focusQuery}`
const hoverMediaQuery = `@media ${hoverQuery}`

const Wrap = styled.div`
  position: relative;
  background: black;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  flex: 1 0 100%;
  gap: 1px;
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
  @media (hover: hover) {
    cursor: pointer;
  }
`

const EntryContent = styled.div`
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
  position: relative;
  background: white;
  padding: 0;
  margin: 0;
  ${columnsMediaQuery} {
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
  
  ${columnsMediaQuery} {
    transform: translate3d(0, calc(-100% - 0rem), 0);
    transition: transform 0.3s 0s ease-in-out;
    .selected & {
      transform: translate3d(0, 0%, 0);
      transition-timing-function: ease-out;
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

  const entries = useMemo(() => {
    return members.map(member => ({
      ...member,
      isSelected: member.id === selectedEntry
    }))
  }, [members, selectedEntry])

  const domRefs = useRef({
    wrap: null,
    entries: {},
    entryContent: {},
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

  return (
    <Wrap
      ref={setDomRef('wrap')}
      onFocus={handleFocus}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
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
            className={`entry ${isSelected ? 'selected' : ''}`}
            data-entry-id={id}
          >
            <EntryContent
              className={`entryContent`}
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
            </EntryContent>
          </Entry>
        )
      })}
    </Wrap>
  )
}

export default BuddeGroups