import styled from 'styled-components'

const Wrap = styled.div`
  flex: 1 0 auto;
  white-space: pre;
  margin: 1rem 2rem 0 0;
`

const Copyright = ({ by = '' }) => {
  if (!by) return null
  const today = new Date()
  const year = today.getFullYear()
  return (
    <Wrap>{`© ${year} ${by}`}</Wrap>
  )
}

export default Copyright