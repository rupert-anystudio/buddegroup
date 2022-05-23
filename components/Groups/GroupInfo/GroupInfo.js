import styled from 'styled-components'

import Button from '../../Button'

const Wrap = styled.div`
  background: var(--bg-color);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
  p {
    margin: 0 0 1rem 0;
  }
`

const Logo = styled.div`
  margin: 0;
  width: 20rem;
  height: 4rem;
  background: rgba(0,0,0,0.1);
  display: block;
  position: relative;
  border-radius: 1rem;
  margin: 0 0 1rem 0;
`

const GroupInfo = ({
  description,
  href,
  wrapRef,
}) => {
  return (
    <Wrap ref={wrapRef}>
      <Logo />
      <p>{description}</p>
      <Button
        label="Visit"
        href={href}
      />
    </Wrap>
  )
}

export default GroupInfo