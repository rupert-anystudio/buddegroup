import { css } from 'styled-components'
import { returnMaxWidths, returnMinWidths } from '../lib/utils'

export const breakpoints = {
  phone: 350,
  phonewide: 520,
  tablet: 758,
  tabletwide: 1014,
  laptop: 1270,
  laptopwide: 1430,
  desktop: 1670,
  desktopwide: 2500,
  // component/layout specific
  twocols: 1014,
  title1: 600,
  title2: 900,
}

// use em in breakpoints to work properly cross-browser and support users
// changing their browsers font-size: https://zellwk.com/blog/media-query-units/

const getMin = (value) => (...args) => css`
  @media (min-width: ${value / 16}em) {
    ${css(...args)}
  }
`

const getMax = (value) => (...args) => css`
  @media (max-width: ${(value - 1) / 16}em) {
    ${css(...args)}
  }
`

export const min = Object.keys(breakpoints).reduce((acc, key) => {
  acc[key] = getMin(breakpoints[key])
  return acc
}, {})

export const max = Object.keys(breakpoints).reduce((acc, key) => {
  acc[key] = getMax(breakpoints[key])
  return acc
}, {})

const bp = { min, max }

export const minWidths = returnMinWidths(breakpoints)
export const maxWidths = returnMaxWidths(breakpoints)

export default bp