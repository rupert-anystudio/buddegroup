import { css } from 'styled-components'

const returnMinWidhts = bps => Object.keys(bps).reduce((acc, key) => {
  const bp = bps[key]
  if (!bp) return acc
  return {
    ...acc,
    [key]: `(min-width: ${bp}px)`
  }
}, {})

const returnMaxWidths = bps => Object.keys(bps).reduce((acc, key) => {
  const bp = bps[key]
  if (!bp) return acc
  return {
    ...acc,
    [key]: `(max-width: ${bp - 1}px)`
  }
}, {})

export const breakpoints = {
  phone: 350,
  phonewide: 520,
  tablet: 758,
  tabletwide: 1014,
  laptop: 1270,
  laptopwide: 1430,
  desktop: 1670,
  desktopwide: 2500,
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
  return { ...acc, [key]: getMin(breakpoints[key])}
}, {})

export const max = Object.keys(breakpoints).reduce((acc, key) => {
  return { ...acc, [key]: getMax(breakpoints[key])}
}, {})

const bp = { min, max }

export const minWidths = returnMinWidhts(breakpoints)
export const maxWidths = returnMaxWidths(breakpoints)

export default bp