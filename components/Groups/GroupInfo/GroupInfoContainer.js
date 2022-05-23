import { useEffect, useRef } from 'react'
import GroupInfo from './GroupInfo'

const GroupInfoContainer = props => {
  const elemRef = useRef(null)

  useEffect(() => {
    elemRef.current.scrollIntoView({ block: 'end', behaviour: 'smooth' })
  }, [])

  return (
    <GroupInfo {...props} wrapRef={elemRef} />
  )
}

export default GroupInfoContainer