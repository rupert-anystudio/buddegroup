import Image from 'next/image'
import styled from 'styled-components'

const Wrap = styled.div`
  background: #ebebeb;
  width: 100%;
  position: relative;
  padding: 2rem;
  flex: 1 0 13rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;

  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`

const Logo = styled.div`
  margin: 0;
  width: 20rem;
  height: 4rem;
  background: rgba(0,0,0,0.1);
  display: block;
  position: relative;
  border-radius: 1rem;
`

const GroupVideo = () => {
  return (
    <Wrap>
      <Image src='/placeholder.webp' layout='fill' objectFit='cover' />
      <Logo />
    </Wrap>
  )
}

export default GroupVideo