import styled from 'styled-components'

const Wrap = styled.div`
  flex: 1;
  background: yellow;
  position: relative;
`

const Entry = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  &:not(:last-child) {
    border-bottom: 1px solid currentColor;
  }
`

const BuddeGroups = ({
  groups = [],
  wrapRef,
  entryHeight,
}) => {
  return (
    <Wrap ref={wrapRef}>
      {groups.map((group, index) => {
        return (
          <Entry key={group.id} style={{ top: entryHeight * index, height: entryHeight }}>
            <span>{group.id}</span>
          </Entry>
        )
      })}
    </Wrap>
  )
}

export default BuddeGroups