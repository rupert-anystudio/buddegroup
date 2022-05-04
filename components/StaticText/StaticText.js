import styled from 'styled-components'
import fontSizes from '../../styles/fontSizes'
import bp from '../../styles/bp'
import PortableText from '../PortableText'

const Wrap = styled.div`
  padding: 2rem;
  position: relative;
  width: clamp(10rem, 100%, 90rem);
  display: block;
`

const Title = styled.h1`
  margin: 2rem 0 4rem 0;
  ${fontSizes.plus2}
  ${bp.min.phonewide`
    ${fontSizes.plus4}
  `}
`

const StaticText = ({ title, content }) => {
  return (
    <Wrap>
      {title && <Title>{title}</Title>}
      {content && <PortableText value={content} />}
    </Wrap>
  )
}

export default StaticText