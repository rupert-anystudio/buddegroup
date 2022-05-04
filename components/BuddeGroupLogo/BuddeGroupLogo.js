import styled from 'styled-components'
import BuddeLogofamily from '../../svgs/BuddeLogofamily'

const Wrap = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  > svg {
    width: clamp(12rem, 80%, 140rem);
    margin: 0 auto;
  }
`

const BuddeGroupLogo = () => {
  return (
    <Wrap>
      <BuddeLogofamily />
    </Wrap>
  )
}

export default BuddeGroupLogo