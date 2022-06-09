import { useCallback } from 'react'
import styled from 'styled-components'

const Wrap = styled.div`
  background: black;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
  flex: 1 0 100%;
`

const Entry = styled.div`
  background: lightcoral;
  flex: 1 0 18rem;
  &:not(:last-child) {
    border-right: 1px solid black;
  }
  ${props => props.isSelected && `
    background: red;
  `}
  @media (hover: hover) {
    cursor: pointer;
  }
`

const Columns = ({
  entries,
  returnEntryHandlers,
}) => {
  return (
    <Wrap>
      {entries.map(entry => {
        return (
          <Entry
            key={entry.id}
            isSelected={entry.isSelected}
            {...returnEntryHandlers(entry)}
          >
            
          </Entry>
        )
      })}
    </Wrap>
  )
}

export default Columns