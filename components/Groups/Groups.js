import styled from 'styled-components'

const Wrap = styled.div``

const Group = styled.div``

const Groups = ({ groups = [] }) => {
  return (
    <Wrap>
      {groups.map(group => {
        return (
          <Group key={group.id}>
            {group.id}
          </Group>
        )
      })}
    </Wrap>
  )
}

export default Groups