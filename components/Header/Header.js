import styled from 'styled-components'

const Wrap = styled.header`
  flex: 0 0 auto;
  width: 100%;
  overflow: hidden;
  background: white;
  padding: 1rem 1.5rem;
  margin: 0;
  border-bottom: 1px solid var(--border-color);
`

const Logo = styled.div`

`

const Header = () => {
  return (
    <Wrap>
      <Logo>BuddeGroup</Logo>
    </Wrap>
  )
}

export default Header