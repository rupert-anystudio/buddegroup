# BuddeGroup

Marketing and showcase website for BuddeGroup. Features an interactive full-screen member grid with video backgrounds on desktop and a static imprint page. All content is pulled from the [buddemusic.com](https://buddemusic.com) Sanity backend — there is no content in this repository.

## Stack

- **Next.js 12** — framework and static generation (ISR)
- **React 18** — UI
- **styled-components 5** — CSS-in-JS styling
- **Sanity (next-sanity)** — headless CMS, content fetched at build time via GROQ
- **GSAP** — layout animations

## Requirements

- **Node.js 24**
- **Yarn**

## Getting Started

```bash
yarn install
cp .env.local.example .env.local
```

Fill in `.env.local` with the Sanity credentials (ask a team member):

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_PREVIEW_API_TOKEN=
```

Then start the dev server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `yarn dev` | Start development server |
| `yarn build` | Production build |
| `yarn start` | Serve the production build |
| `yarn lint` | Run ESLint |
| `yarn svgs` | Re-generate SVG React components from source files in `svgs/` |

## Project Structure

```text
buddegroup/
├── pages/          # Next.js routes (_app, index, imprint)
├── components/     # React components
├── hooks/          # Custom React hooks
├── lib/            # Sanity client setup and utilities
├── styles/         # Breakpoints, font sizes, font styles, global CSS
├── svgs/           # SVG source files and generated React components
└── public/         # Static assets (fonts, favicons)
```

For a full breakdown of architecture, components, and the styling system see [DOCUMENTATION.md](DOCUMENTATION.md).

## Content

All site content (member companies, videos, images, accent color, imprint text) lives in the Sanity project connected to **buddemusic.com**. Pages are statically generated with ISR — the home page revalidates every 10 seconds, the imprint page every 100 seconds.
