# BuddeGroup — Developer Documentation

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Getting Started](#3-getting-started)
4. [Environment Variables](#4-environment-variables)
5. [Project Structure](#5-project-structure)
6. [Architecture & Key Patterns](#6-architecture--key-patterns)
7. [Pages & Routing](#7-pages--routing)
8. [Components](#8-components)
9. [Sanity CMS](#9-sanity-cms)
10. [Styling System](#10-styling-system)
11. [Custom Hooks](#11-custom-hooks)
12. [Utility Functions](#12-utility-functions)
13. [Animations (GSAP)](#13-animations-gsap)
14. [SVG Handling](#14-svg-handling)
15. [Deployment](#15-deployment)

---

## 1. Project Overview

BuddeGroup is a marketing/showcase website for an agency group. The primary feature is an interactive, full-screen member grid that displays each member company with a background video (desktop) or image (mobile), a logo, a description, and a "Visit" link.

The site has two public pages:

| Page | Route | Description |
|---|---|---|
| Home | `/` | Interactive member grid |
| Imprint | `/imprint` | Legal/imprint page with portable text content |

All content is managed through Sanity CMS. Pages are statically generated with Incremental Static Regeneration (ISR).

---

## 2. Tech Stack

| Concern | Library | Version |
|---|---|---|
| Framework | Next.js | 12.1.6 |
| UI | React | 18.1.0 |
| Styling | styled-components | 5.3.5 |
| CMS | Sanity (next-sanity) | 0.5.2 |
| Image optimization | next-sanity-image | 3.2.1 |
| Animation | GSAP (with Flip plugin) | 3.10.4 |
| Video | react-player | 2.10 |
| Rich text | @portabletext/react | 1.0.6 |
| CSS reset | normalize.css | 8.0.1 |

---

## 3. Getting Started

### Prerequisites

- Node.js ≥ 16
- Yarn (lockfile is committed; prefer Yarn over npm)
- Access to the Sanity project (project ID + dataset)

### Install & Run

```bash
yarn install
cp .env.local.example .env.local
# fill in .env.local — see Section 4
yarn dev
```

The dev server runs at `http://localhost:3000`.

### Other Scripts

| Script | Command | Description |
|---|---|---|
| Dev server | `yarn dev` | Next.js development server |
| Production build | `yarn build` | Build and export |
| Production server | `yarn start` | Serve the production build |
| Lint | `yarn lint` | Run ESLint |
| Convert SVGs | `yarn svgs` | Re-generate SVG components from raw SVGs (see [Section 14](#14-svg-handling)) |

---

## 4. Environment Variables

Copy `.env.local.example` to `.env.local` and fill in the values.

| Variable | Visibility | Description |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Public (browser) | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | Public (browser) | Sanity dataset (`production`, `staging`, etc.) |
| `SANITY_PREVIEW_API_TOKEN` | Server only | Sanity API token with read access to drafts, used for preview mode |

The `NEXT_PUBLIC_` prefix exposes the variable to client-side code. The preview token must **never** be prefixed with `NEXT_PUBLIC_`.

---

## 5. Project Structure

```
buddegroup/
├── pages/
│   ├── _app.js              # App wrapper — layout, global styles, fonts
│   ├── _document.js         # Custom document — styled-components SSR
│   ├── index.js             # Home page (/ route)
│   └── imprint.js           # Imprint page (/imprint route)
├── components/
│   ├── BuddeGroupLogo/      # Decorative hero logo
│   ├── BuddeGroups/         # Main interactive member grid
│   ├── Button/              # Universal button/link component
│   ├── Footer/              # Footer with copyright and navigation
│   ├── GlobalStyles/        # styled-components global CSS + CSS variables
│   ├── Header/              # Sticky header with logo
│   ├── Main/                # Content area flex wrapper
│   ├── NextSanityImage/     # next/image wrapper for Sanity images
│   ├── PortableText/        # @portabletext/react renderer
│   └── StaticText/          # Static page title + portable text layout
├── lib/
│   ├── sanity.config.js     # Shared Sanity client config
│   ├── sanity.server.js     # getClient() — switches preview vs. production
│   ├── sanity.client.js     # urlFor(), usePreviewSubscription, PortableText
│   └── utils.js             # String and breakpoint helper functions
├── hooks/
│   ├── useMediaQuery.js     # Returns boolean for a CSS media query string
│   └── useIsomorphicLayoutEffect.js  # useLayoutEffect that's SSR-safe
├── styles/
│   ├── bp.js                # Breakpoint definitions + tagged-template helpers
│   ├── fontSizes.js         # Typographic scale (rem-based)
│   ├── fontStyles.js        # Font-family CSS strings
│   └── fontfaces.css        # @font-face declarations (ABC Repro)
├── svgs/
│   ├── BuddeLogo.js         # Logo SVG as React component
│   ├── BuddeLogofamily.js   # Full family logo SVG as React component
│   ├── budde-logo.svg       # Source SVG
│   ├── budde-logofamily.svg # Source SVG
│   └── index.js             # Barrel export
├── public/
│   ├── fonts/               # ABC Repro font files (woff/woff2)
│   ├── BuddeGroup.svg       # Static brand SVG
│   ├── placeholder.webp     # Image placeholder
│   └── …                    # Favicons, web manifest, browser config
├── next.config.js
├── package.json
├── .env.local.example
└── .eslintrc.json
```

---

## 6. Architecture & Key Patterns

### Static Generation with ISR

Both pages use `getStaticProps` with `revalidate`:

- **Home** (`/`): revalidates every **10 seconds**
- **Imprint** (`/imprint`): revalidates every **100 seconds**

This means content updates in Sanity are reflected on the live site within those windows without a full redeploy.

### Preview Mode

`lib/sanity.server.js` exports a `getClient(preview)` helper. When `preview = true` it uses `previewClient` (authenticated with `SANITY_PREVIEW_API_TOKEN`), which reads Sanity drafts. When `preview = false` (default) it uses the CDN-backed production client.

Next.js preview mode can be enabled via a custom API route (not yet wired up — see `lib/sanity.client.js`'s exported `usePreviewSubscription` which is available but unused).

### Styled-Components SSR

`pages/_document.js` implements the styled-components `ServerStyleSheet` pattern so CSS is collected on the server and injected into the initial HTML. This prevents the flash of unstyled content on first load.

Next.js 12's `compiler.styledComponents: true` in `next.config.js` handles the Babel transform in production.

### CSS Variable Theming

`GlobalStyles` sets a small set of CSS custom properties that drive the entire site's theme:

```css
--bg-color:      #ffffff
--text-color:    #000000
--border-color:  #000000
--button-color:  <accentColor from Sanity siteSettings>
```

The accent color (used by Button and other interactive elements) is fetched from Sanity on every page and passed as a prop to `GlobalStyles`.

### Container / Presenter Pattern

Several components are split into a container and a presenter:

- `HeaderContainer` → fetches/composes → `Header`
- `FooterContainer` → provides hardcoded data → `Footer`

This makes the presentational components easy to test and reuse.

---

## 7. Pages & Routing

### `pages/_app.js`

The root wrapper for every page. It:

1. Imports `normalize.css` and `styles/fontfaces.css`
2. Renders `<GlobalStyles accentColor={...} />`
3. Wraps all page content in `<Header />` / `<Main />` / `<Footer />`
4. Injects `<link rel="preload">` for the ABC Repro Regular font
5. Sets `<head>` metadata, `<meta>` viewport, and favicon `<link>` tags

The `accentColor` prop comes from `pageProps` — each page that fetches it from Sanity passes it through.

### `pages/index.js` — Home (`/`)

```js
// Sanity GROQ query (inline in getStaticProps):
{
  ...*[_type == "buddegroup"][0]{
    members[]{ "id": _key, name, url, description, video{ asset->{ url } }, image, logo{ asset->{ url } } }
  },
  ...*[_type == "siteSettings"][0]{ accentColor }
}
```

Props passed to page: `members[]`, `accentColor`, `preview`.

Renders: `<BuddeGroups members={members} />`

### `pages/imprint.js` — Imprint (`/imprint`)

```js
// Sanity GROQ query (inline in getStaticProps):
*[_type == "staticPage" && _id == "27f1a972-b3d2-4a79-8e81-7e786ad97478"][0]{ title, content }
// + siteSettings accentColor
```

The imprint Sanity document has a hardcoded ID. If the document is ever deleted and recreated in Sanity, this ID must be updated.

Renders: `<StaticText title={title} content={content} />`

---

## 8. Components

### `BuddeGroups`

**Path:** `components/BuddeGroups/BuddeGroups.js`

The most complex component in the project. It renders the full-screen member grid.

#### Layout behaviour

| Breakpoint | Layout | Interaction | Media type |
|---|---|---|---|
| ≤ 1023px (stack) | vertical flex column | click/tap to select | image |
| ≥ 1024px (columns) | horizontal flex row | hover to select | video |

#### Selection state

`selectedEntry` holds the `id` of the currently active member (or `null`).

- **Desktop (hover):** `onMouseEnter` sets selected, `onMouseLeave` on the container clears it.
- **Mobile (touch/click):** `onClick` toggles — clicking the same entry twice deselects it.

Which behaviour is active is determined by `useMediaQuery`:
- `hoverQuery`: `(hover: hover) and (min-width: 1024px)` — true on pointer devices at desktop width
- `focusQuery`: `(hover: hover) and (max-width: 1023px), (hover: none)` — true on touch or narrow viewport

#### GSAP Flip animation

When `selectedEntry` changes, a GSAP Flip animation smoothly transitions the layout. See [Section 13](#13-animations-gsap) for full details.

#### Content panel

Each entry has a `Content` div that is positioned absolutely at the bottom and translated off-screen (`translateY(100%)`). When the entry has the `selected` class, it slides up to `translateY(0)`. The delay on mobile is `0.3s` (waits for the Flip layout animation to finish first).

#### Video loading

`MediaVideo` uses `ReactPlayer` with `muted`, `loop`, `playing`. The video fades in with a GSAP tween once the player fires `onReady`. Before ready, it is invisible (`autoAlpha: 0`) and slightly scaled up (`scale: 1.2`).

#### Accessibility note

On desktop (columns layout), non-selected entries have their "Visit" button set to `tabIndex={-1}` so keyboard navigation skips hidden buttons.

---

### `Button`

**Path:** `components/Button/Button.js`

A universal interactive element. It automatically selects the correct underlying element:

| Condition | Renders as |
|---|---|
| `href` is an object or starts with `/` | `<Link>` (Next.js internal link) |
| `href` is a string (external) | `<a target="_blank" rel="noopener noreferrer">` |
| No `href` | `<button>` |

Styled with the `--button-color` CSS variable. Accepts a `className` prop for extension with `styled(Button)`.

---

### `NextSanityImage`

**Path:** `components/NextSanityImage/NextSanityImage.js`

Bridges `next-sanity-image`'s `useNextSanityImage` hook with Next.js `<Image>`. Handles:
- Sanity crop and hotspot metadata
- Layout modes: `responsive`, `intrinsic`, `fixed`, `fill`
- Default quality: 75; blur quality: 40
- Custom image builder with rect and focal-point support

---

### `PortableText`

**Path:** `components/PortableText/PortableText.js`

Renders Sanity Portable Text using `@portabletext/react`. Configured block types:

| Block style | Treatment |
|---|---|
| `normal` | Default `<p>` |
| `h1` | `plus4` font size (responsive) |
| `h2` | `plus2` font size (responsive) |
| `h3` | `minus1` font size |
| `h4` | `minus1` font size |

Marks:
- `internalLink` — rendered as Next.js `<Link>`
- `link` — external, opens in new tab

---

### `Header`

**Path:** `components/Header/`

Sticky header (`position: sticky`, `top: 0`, `z-index: 100`) with a white background and 1px black bottom border. Contains only the `BuddeGroupLogo` at a responsive size (2.2rem mobile → 3.2rem desktop).

---

### `Footer`

**Path:** `components/Footer/`

Footer data is hardcoded in `FooterContainer.js`:
- Copyright: `BuddeGroup`
- Navigation: single entry — `{ href: '/imprint', label: 'Imprint' }`

To add footer navigation items, edit the `entries` array in `FooterContainer.js`.

---

### `GlobalStyles`

**Path:** `components/GlobalStyles/GlobalStyles.js`

Sets the following globals via styled-components `createGlobalStyle`:
- CSS variables (theme tokens listed above)
- Base font-size: `52.5%` (≈ 8.4px) on mobile, `62.5%` (= 10px) on desktop — this makes `1rem = 10px` on desktop, which is used throughout the whole app
- `#__next` as a full-height flex column (so the footer sticks to the bottom)
- Smooth scroll behavior
- Global link hover style (underline)

---

## 9. Sanity CMS

### Client setup

| File | Purpose |
|---|---|
| `lib/sanity.config.js` | Shared config object (project ID, dataset, CDN flag, API version) |
| `lib/sanity.server.js` | `getClient(preview)` — returns production or preview client |
| `lib/sanity.client.js` | `urlFor()` image builder, `usePreviewSubscription`, `PortableText` (unused) |

The Sanity API version is pinned to `2021-10-21`.

### Content Types

#### `buddegroup`

A singleton document. Contains a `members` array. Each member has:

| Field | Type | Notes |
|---|---|---|
| `_key` | string | Used as React key and selection ID (`id`) |
| `name` | string | Member company name |
| `url` | string | Company website URL |
| `description` | string | Short description text |
| `image` | image | Displayed on mobile |
| `video` | file | Asset with URL; displayed on desktop |
| `logo` | file | Asset with URL; displayed in the content panel as `<img>` |

#### `siteSettings`

A singleton document. Used fields:

| Field | Type | Notes |
|---|---|---|
| `accentColor` | string | Hex color (e.g. `#FF5500`); used as `--button-color` |

#### `staticPage`

Generic static content pages. The imprint page is identified by its hardcoded Sanity document ID: `27f1a972-b3d2-4a79-8e81-7e786ad97478`.

| Field | Type | Notes |
|---|---|---|
| `title` | string | Page title |
| `content` | array | Sanity Portable Text |

### Adding a new static page

1. Create a new `staticPage` document in Sanity Studio
2. Copy its `_id`
3. Create a new file in `pages/` that queries by that ID
4. Render with `<StaticText />`

---

## 10. Styling System

### Font size convention

The root font-size is set to `62.5%` on desktop (`= 10px`), so **all `rem` values are 10× their pixel equivalent** — `1rem = 10px`, `2rem = 20px`, etc. On mobile it is `52.5%` (`≈ 8.4px`).

### Typographic scale (`styles/fontSizes.js`)

| Token | Rem | ≈ Desktop px |
|---|---|---|
| `minus3` | 1.4rem | 14px |
| `minus2` | 1.5rem | 15px |
| `minus1` | 1.8rem | 18px |
| `root` | 2.0rem | 20px |
| `plus1` | 3.0rem | 30px |
| `plus2` | 4.0rem | 40px |
| `plus3` | 5.0rem | 50px |
| `plus4` | 6.0rem | 60px |
| `plus5` | 8.0rem | 80px |
| `plus6` | 10.0rem | 100px |

Each token also carries `lineHeight` and `letterSpacing` values.

### Breakpoints (`styles/bp.js`)

```js
breakpoints = {
  phone:        350,
  phonewide:    520,
  tablet:       758,
  tabletwide:   1014,
  laptop:       1270,
  laptopwide:   1430,
  desktop:      1670,
  desktopwide:  2500,
  // Semantic aliases:
  twocols:      1014,
  title1:       600,
  title2:       900,
}
```

Usage in styled-components (tagged template literals):

```js
import bp from '../../styles/bp'

const MyDiv = styled.div`
  font-size: 1.4rem;
  ${bp.min.laptop`
    font-size: 1.8rem;
  `}
  ${bp.max.tablet`
    padding: 1rem;
  `}
`
```

Breakpoints use **em units** (divided by 16) for accessibility — they scale with the user's browser font size setting.

### Custom font

The typeface is **ABC Repro** (licensed font, not open-source). Files are in `public/fonts/`. Two weights are loaded:
- Regular (upright + italic)

Declared in `styles/fontfaces.css`, which is imported globally in `_app.js`. The regular weight is preloaded with a `<link rel="preload">` tag.

---

## 11. Custom Hooks

### `useMediaQuery(query: string): boolean`

Returns `true` when the given CSS media query string matches. Subscribes to changes. Uses `matchMedia` with a fallback for Safari compatibility.

```js
const isDesktop = useMediaQuery('(min-width: 1024px)')
```

### `useIsomorphicLayoutEffect`

Drop-in replacement for `useLayoutEffect` that falls back to `useEffect` during SSR, preventing the Next.js hydration warning.

---

## 12. Utility Functions

All in `lib/utils.js`.

| Function | Description |
|---|---|
| `returnNormalizedString(str)` | Strips diacritics via Unicode NFD decomposition |
| `returnNormalizedStrings(arr)` | Maps the above over an array |
| `returnFirstChar(str)` | Returns the first character of a string |
| `returnUniqueFirstChars(arr)` | Returns array of unique uppercased first characters |
| `returnAlphabeticallySortedStrings(arr)` | Sorts array of strings alphabetically |
| `returnMinWidthMedia(bp)` | Builds a `min-width` media query string from a breakpoint value |
| `returnMaxWidthMedia(bp)` | Builds a `max-width` media query string from a breakpoint value |
| `returnMinWidths(bps)` | Converts a breakpoints object to min-width query strings |
| `returnMaxWidths(bps)` | Converts a breakpoints object to max-width query strings |

---

## 13. Animations (GSAP)

### GSAP Flip — Member Grid

The core animation of the site. When the selected member changes, the grid needs to redistribute space (e.g. expand one column, compress others). Rather than animating CSS properties directly, the GSAP Flip plugin snapshots the DOM state before and after the layout change and interpolates between them.

**Flow:**

1. `selectedEntry` state changes (via hover or click)
2. A `useEffect` fires:
   - Takes a `Flip.getState('.entries, .entry')` snapshot of current positions
   - Updates `flipState` with the new snapshot + updated `isSelected` flags
3. A `useIsomorphicLayoutEffect` fires when `flipState` changes:
   - Calls `Flip.from(flipState.layout, { ... })` to create the animation
   - Calls `.play()` immediately
   - Returns a cleanup function that `.kill()`s the animation

**Key Flip options:**

| Option | Value | Reason |
|---|---|---|
| `duration` | 0.3s | Snappy, not sluggish |
| `ease` | `power2.inOut` | Smooth acceleration/deceleration |
| `absolute` | `.entry` | Temporarily makes entries `position: absolute` during animation |
| `nested` | true | Animates child elements correctly within the Flip |
| `zIndex` | 99 | Keeps animating entries below the sticky header (z-index 100) |

### Video fade-in

When a video is ready to play (`onReady`), it fades from `autoAlpha: 0, scale: 1.2` to `autoAlpha: 1, scale: 1` over 0.3s. This hides the initial frame flash and adds a subtle zoom effect.

---

## 14. SVG Handling

Raw SVG files live in `svgs/`. They are converted to React components using the `@svgr/cli` tool:

```bash
yarn svgs
```

This runs:

```
npx @svgr/cli -d svgs svgs --replace-attr-values '#000=currentColor,#fff=transparent'
```

- Input and output directories are both `svgs/` (in-place conversion)
- `#000` is replaced with `currentColor` (so the SVG inherits text color)
- `#fff` is replaced with `transparent`

When the source SVGs change, re-run `yarn svgs` and commit the updated component files.

---

## 15. Deployment

The project is designed to be deployed on **Vercel** (standard Next.js deployment target).

### Steps

1. Connect the repository to Vercel
2. Set the three environment variables in the Vercel project settings (see [Section 4](#4-environment-variables))
3. Deploy — Vercel automatically runs `next build`

### No custom deployment config exists

There is no `vercel.json`, `Dockerfile`, or other deployment config. All defaults apply.

### ISR on Vercel

ISR (`revalidate`) works out of the box on Vercel. The home page regenerates every 10 seconds on demand; stale requests are served the cached version and a background regeneration is triggered.

---

## Appendix: Known Gaps & Future Work

| Area | Notes |
|---|---|
| GROQ queries | All GROQ queries are written inline in each page's `getStaticProps`. Extracting them to a shared `lib/queries.js` would improve maintainability. |
| Preview mode API route | `lib/sanity.client.js` exports `usePreviewSubscription` but no `/api/preview` route exists yet. Live preview is not wired up. |
| Imprint document ID | The imprint static page is queried by a hardcoded Sanity document `_id`. This will break if the document is recreated. Consider using a `slug` field instead. |
| Sanity Studio | The Sanity Studio (schema definitions, desk configuration) is **not** part of this repository. It lives in a separate Sanity project. |
