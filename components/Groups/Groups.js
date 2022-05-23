import styled from 'styled-components'
import GroupInfo from './GroupInfo'
import GroupVideo from './GroupVideo'

import bp from '../../styles/bp'

const Wrap = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  background: var(--text-color);
  ${bp.min.laptop`
    flex-direction: row;
  `}
`

const Group = styled.div`
  flex: 1 0 13rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: stretch;
  background: white;
  cursor: pointer;
  position: relative;
  ${bp.max.laptop`
    &:not(:last-child) {
      border-bottom: 1px solid var(--border-color);
    }
  `}
  ${bp.min.laptop`
    &:not(:last-child) {
      border-right: 1px solid var(--border-color);
    }
  `}
`

const Groups = ({
  groups = [],
  onGroupSelect,
  selectedGroup,
}) => {
  return (
    <Wrap>
      {groups.map(group => {
        const isSelected = group.id === selectedGroup
        return (
          <Group
            key={group.id}
            onClick={() => onGroupSelect(group.id)}
          >
            <GroupVideo />
            {isSelected && (
              <GroupInfo
                description={group.description}
                href={group.href}
              />
            )}
          </Group>
        )
      })}
    </Wrap>
  )
}

export default Groups