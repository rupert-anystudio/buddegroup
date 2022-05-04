import styled from 'styled-components'
import { PortableText as PortableTextReact } from '@portabletext/react'
import fontSizes from '../../styles/fontSizes'
import bp from '../../styles/bp'

const Paragraph = styled.p`
  ${fontSizes.root}
  margin: 2rem 0;
`

const HeadingLarge = styled(Paragraph)`
  ${fontSizes.plus2}
  ${bp.min.tabletwide`
    ${fontSizes.plus4}
  `}
`

const HeadingNormal = styled(Paragraph)`
  ${fontSizes.plus1}
  ${bp.min.tabletwide`
    ${fontSizes.plus2}
  `}
`

const HeadingSmall = styled(Paragraph)`
  text-transform: uppercase;
`

const PortableText = ({ value = [] }) => {
  if (!value || value.length < 1) return null
  return (
    <PortableTextReact
      value={value}
      components={{
        types: {

        },
        block: {
          normal: ({ children }) => <Paragraph>{children}</Paragraph>,
          h1: ({ children }) => <HeadingLarge as='h1'>{children}</HeadingLarge>,
          h2: ({ children }) => <HeadingLarge as='h2'>{children}</HeadingLarge>,
          h3: ({ children }) => <HeadingNormal as='h3'>{children}</HeadingNormal>,
          h4: ({ children }) => <HeadingSmall as='h4'>{children}</HeadingSmall>,
        },
        list: {
          
        },
        marks: {
          internalLink: ({ value, children }) => {
            const {slug = {}} = value
            const href = slug.current
            return (
              <a href={href}>{children}</a>
            )
          },
          link: ({ value, children }) => {
            const { href } = value
            return (
              <a href={href} target="_blank" rel="noreferrer">{children}</a>
            )
          }
        }
      }}
    />
  )
}

export default PortableText