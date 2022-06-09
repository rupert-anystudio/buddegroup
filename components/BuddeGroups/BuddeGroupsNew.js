import { useCallback, useMemo, useState } from 'react'
import useHasWindow from '../../hooks/useHasWindow'
import useMediaQuery from '../../hooks/useMediaQuery'
import { minWidths } from '../../styles/bp'
import Columns from './components/Columns'
import Rows from './components/Rows'

const BuddeGroups = ({ members }) => {
  const matchedColumns = useMediaQuery(minWidths.tabletwide, false)
  const canHover = useMediaQuery('(hover: hover)', false)
  const hasWindow = useHasWindow()

  const [selectedEntry, setSelectedEntry] = useState(null)

  const entries = useMemo(() => {
    return members.map(member => ({
      ...member,
      isSelected: member.id === selectedEntry
    }))
  }, [members, selectedEntry])

  const onEntrySelect = useCallback(newSelection => {
    setSelectedEntry(previousSelection => {
      if (newSelection === previousSelection) return null
      return newSelection
    })
  }, [])

  const returnEntryHandlers = useCallback(({ id }) => {
    if (canHover) {
      return {
        onMouseEnter: () => onEntrySelect(id),
        onMouseLeave: () => onEntrySelect(null),
      }
    }
    return {
      onClick: () => onEntrySelect(id),
    }
  }, [canHover, onEntrySelect])

  const viewProps = {
    entries,
    returnEntryHandlers,
    canHover,
    matchedColumns,
  }

  // if (matchedColumns) return <Columns {...viewProps} />
  return <Rows {...viewProps} />
}

export default BuddeGroups