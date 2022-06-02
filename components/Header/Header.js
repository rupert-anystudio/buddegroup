import styled from 'styled-components'
import bp from '../../styles/bp'

const Wrap = styled.header`
  flex: 0 0 auto;
  width: 100%;
  overflow: hidden;
  background: white;
  padding: 1.5rem;
  margin: 0;
  border-bottom: 1px solid var(--border-color);
`

const Logo = styled.div`
  position: relative;
  line-height: 0;
  span {
    visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
  }
  img {
    width: auto;
    height: 2.2rem;
    ${bp.min.laptop`
      height: 3.2rem;
    `}
  }
`

const Header = () => {
  return (
    <Wrap>
      <Logo>
        <span>
          BuddeGroup
        </span>
        <img src='/temp/BuddeGroup.svg' />
      </Logo>
    </Wrap>
  )
}

export default Header