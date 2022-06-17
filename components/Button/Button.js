import Link from 'next/link'
import { forwardRef } from 'react'
import styled from 'styled-components'
import fontSizes from '../../styles/fontSizes'
import fontStyles from '../../styles/fontStyles'

const Wrap = styled.div`
  margin: 0;
  padding: 0;
  appearance: none;
  outline: none;
  position: relative;
  display: inline-block;
  padding: .3rem 1.2rem;
  border-radius: .5rem;
  color: var(--text-color);
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: .5rem;
    background: var(--button-color);
    filter: blur(.2rem);
    transition: filter 0.25s ease-in-out;
  }
  &:hover, &:focus {
    text-decoration: none;
    color: var(--text-color);
    &:before {
      filter: blur(0rem);
    }
  }
`

const Label = styled.span`
  ${fontStyles.base}
  ${fontSizes.root}
  position: relative;
  white-space: pre;
`

const Button = ({
  label,
  href,
  ...props
}, ref) => {
  
  // if no href is given, render as a button
  if (!href) return (
    <Wrap
      {...props}
      as='button'
    >
      <Label>{label}</Label>
    </Wrap>
  )
  

  // if the given href is either an object or starts with a slash, it is considered an internal link
  if (typeof href === 'object' || (typeof href === 'string' && href.slice(0,1) === '/')) return (
    <Link href={href} passHref>
      <Wrap
        ref={ref}
        {...props}
        as='a'
      >
        <Label>{label}</Label>
      </Wrap>
    </Link>
  )

  // otherwise consider link as external, adding appropriate attributes
  return (
    <Wrap
      ref={ref}
      {...props}
      as='a'
      href={href}
      target='_blank'
      rel='noopener noreferrer'
    >
      <Label>{label}</Label>
    </Wrap>
  )
}

export default forwardRef(Button)