import { useCallback, useRef } from 'react'
import styled from 'styled-components'
import { debounce, throttle } from 'lodash'
import bp, { minWidths } from '../../../styles/bp'
import useMediaQuery from '../../../hooks/useMediaQuery'

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
  background: steelblue;
  flex: 1 0 18rem;
  @media (hover: hover) {
    cursor: pointer;
  }
  @media (hover: hover) and (min-width: 1024px) {
    &:hover {
      background: palevioletred;
    }
  }
  @media (hover: hover) and (max-width: 1023px), (hover: none) {
    &:focus-within, &:focus {
      background: palevioletred;
    }
  }
  @media (hover: hover) and (max-width: 1023px) {
    &:hover {
      background: dodgerblue;
    }
    &:focus-within, &:focus {
      &:hover {
        background: red;
      }
    }
  }
`

const Title = styled.h2`
  position: relative;
  margin: 0;
  padding: 0;
`

const Text = styled.p`
  position: relative;
  margin: 0;
  padding: 0;
`

const Button = styled.button`
  position: relative;
  margin: 0;
  padding: 0;
`

const Rows = ({
  entries,
}) => {
  const domRefs = useRef({
    wrap: null,
    entries: {},
    titles: {},
    visitButtons: {},
  })

  const focusBehaviour = useMediaQuery('(hover: hover) and (max-width: 1023px), (hover: none)')
  // const hoverBehaviour = useMediaQuery('(hover: hover) and (min-width: 1024px)')

  return (
    <Wrap
      ref={c => domRefs.current.wrap = c}
    >
      {entries.map(({
        id,
        name,
        description
      }) => {
        return (
          <Entry
            key={id}
            data-entry-id={id}
            ref={c => domRefs.current.entries[id] = c}
            tabIndex={focusBehaviour ? 0 : -1}
          >
            <div
            >
              <Title
                ref={c => domRefs.current.titles[id] = c}
              >
                {name}
              </Title>
              <Text>
                {description}
              </Text>
              <Button ref={c => domRefs.current.visitButtons[id] = c}>
                {'visit'}
              </Button>
            </div>
          </Entry>
        )
      })}
    </Wrap>
  )
}

export default Rows