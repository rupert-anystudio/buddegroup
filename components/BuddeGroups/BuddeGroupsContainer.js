import BuddeGroups from './BuddeGroups'

import useResizeObserver from '../../hooks/useResizeObserver'

const BuddeGroupsContainer = ({ groups = [] }) => {
  const {
    ref: wrapRef,
    height: wrapHeight = 0,
    width: wrapWidth = 0,
  } = useResizeObserver({ box: 'content-box' })
  return (
    <BuddeGroups
      groups={groups}
      wrapRef={wrapRef}
      entryHeight={wrapHeight / groups.length}
    />
  )
}

export default BuddeGroupsContainer