import { createGlobalStyle } from 'styled-components'

import bp from '../../styles/bp'
import fontSizes from '../../styles/fontSizes'
import fontStyles from '../../styles/fontStyles'

const GlobalStyles = createGlobalStyle`
  :root {
    --bg-color: #ffffff;
    --text-color: #000000;
    --border-color: #BBBBBB;
    --button-color: #FFE7AA;
  }
  *, *:before, *:after {
    box-sizing: border-box;
  }
  html {
    font-size: 52.5%;
    overflow: -moz-scrollbars-vertical;
    overflow: hidden;
    overflow-y: scroll;
    scroll-behavior: smooth;
    ${bp.min.phone`
       font-size: 62.5%;
    `}
  }
  body, html, #__next {
    background: var(--bg-color);
    color: var(--text-color);
    width: 100%;
    max-width: 100%;
    padding: 0 !important;
    margin: 0 !important;
  }
  body {
    ${fontStyles.base}
    ${fontSizes.root}
    text-rendering: optimizeLegibility;
  }
  #__next {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    margin: 0 auto;
    min-height: 100vh;
  }
  a {
    color: inherit;
    text-decoration: none;
    &:hover, &:active {
      text-decoration: underline;
    }
  }
  h1, h2, h3, h4, h5, h6, p, ul, ol, input, textarea, button {
    ${fontStyles.base}
    ${fontSizes.root}
    margin: .4em 0;
  }
`

export default GlobalStyles
