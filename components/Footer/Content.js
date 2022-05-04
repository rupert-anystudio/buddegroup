import styled from 'styled-components'

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  margin: -1rem 0 0 0;
`

const Content = ({ children }) => {
  return (
    <Wrap>
      {children}
    </Wrap>
  )
}

export default Content