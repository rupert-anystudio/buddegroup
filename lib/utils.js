
// export const returnSynchPlacementTitle = placement => `${placement?.title} by ARTIST for ${placement?.client?.name ?? 'CLIENT'}`

export const returnNormalizedString = string => {
  let normalizedString = string
  return normalizedString.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
}

export const returnNormalizedStrings = arrayOfStrings => arrayOfStrings.map(string => returnNormalizedString(string))

export const returnFirstChar = string => string.slice(0,1)

export const returnUniqueFirstChars = arrayOfStrings => {
  const allFirstChars = arrayOfStrings
    .map(string => returnFirstChar(string))
    .map(char => char.toUpperCase())
  const uniqueFirstChars = [...new Set(allFirstChars)]
  return uniqueFirstChars
}

export const returnAlphabeticallySortedStrings = arrayOfStrings => {
  let sortedStrings = arrayOfStrings
  return sortedStrings.sort((a, b) => a.localeCompare(b))
}

export const returnMinWidthMedia = bps => {
  if (!bps || typeof bps !== 'object') return {}
  return Object.keys(bps).reduce((acc, key) => {
    const val = bps[key]
    if (!val) return acc
    return {
      ...acc,
      [key]: `@media (min-width: ${val}px)`
    }
  }, {})
}

export const returnMaxWidthMedia = bps => {
  if (!bps || typeof bps !== 'object') return {}
  return Object.keys(bps).reduce((acc, key) => {
    const val = bps[key]
    if (!val) return acc
    return {
      ...acc,
      [key]: `@media (max-width: ${val - 1}px)`
    }
  }, {})
}

export const returnMinWidhts = bps => Object.keys(bps).reduce((acc, key) => {
  const bp = bps[key]
  if (!bp) return acc
  return {
    ...acc,
    [key]: `(min-width: ${bp}px)`
  }
}, {})

export const returnMaxWidths = bps => Object.keys(bps).reduce((acc, key) => {
  const bp = bps[key]
  if (!bp) return acc
  return {
    ...acc,
    [key]: `(max-width: ${bp - 1}px)`
  }
}, {})