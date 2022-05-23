import styled from 'styled-components'
import Content from './Content'
import Copyright from './Copyright'
import Navigation from './Navigation'

const Wrap = styled.footer`
  flex: 0 0 auto;
  width: 100%;
  overflow: hidden;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: stretch;
  border-top: 1px solid var(--border-color);
`

const Footer = ({ copyrightBy, navEntries }) => {
  return (
    <Wrap>
      <Content>
        <Copyright by={copyrightBy}/>
        <Navigation entries={navEntries} />
      </Content>
    </Wrap>
  )
}

export default Footer