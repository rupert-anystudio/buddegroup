import styled from 'styled-components'
import Copyright from './Copyright'
import Navigation from './Navigation'

const Wrap = styled.footer`
  flex: 0 0 auto;
  width: 100%;
  overflow: hidden;
  padding: 2rem;
  border-top: 1px solid var(--border-color);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`

const Footer = ({ copyrightBy, navEntries }) => {
  return (
    <Wrap>
      <Copyright by={copyrightBy}/>
      <Navigation entries={navEntries} />
    </Wrap>
  )
}

export default Footer