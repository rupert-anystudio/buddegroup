import styled from 'styled-components'
import BuddeLogofamily from '../../svgs/BuddeLogofamily'

const Wrap = styled.div`
  width: clamp(80%, 80%, 140rem);
  height: auto;
  position: relative;
  margin: 0 auto;
`

const BuddeGroupLogo = () => {
  return (
    <Wrap>
      <BuddeLogofamily />
    </Wrap>
  )
}

export default BuddeGroupLogo