import { useCallback, useState } from 'react'
import Groups from './Groups'

const GroupsContainer = ({ groups = [], ...props }) => {
  const [selectedGroup, setSelectedGroup] = useState(null)

  const handleGroupSelect = useCallback(id => {
    setSelectedGroup(prevId => {
      if (prevId === id) return null
      return id
    })
  }, [])

  // const groups = groupsRaw.map(group => {
  //   return {
  //     ...group,
  //     isSelected: group.id === selectedGroup,
  //     onSelect: () => handleGroupSelect(group.id),
  //   }
  // })

  return (
    <Groups
      {...props}
      groups={groups}
      onGroupSelect={handleGroupSelect}
      selectedGroup={selectedGroup}
    />
  )
}

export default GroupsContainer