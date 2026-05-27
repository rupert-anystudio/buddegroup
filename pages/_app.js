import Head from 'next/head'
import 'normalize.css'
import '../styles/fontfaces.css'
import GlobalStyles from '../components/GlobalStyles'
import Header from '../components/Header'
import Main from '../components/Main'
import Footer from '../components/Footer'

function MyApp({ Component, pageProps }) {
  const title = 'BuddeGroup'
  const desc = ''
  return (
    <>
      <GlobalStyles buttonColor={pageProps?.accentColor?.hex} />
      <Head>
        {/* Uncomment when using a custom font to preload in order to prevent FOUC */}
        <link
          rel='preload'
          href='/fonts/ABCRepro-Regular.woff2'
          as='font'
          crossOrigin='anonymous'
        />
        <link
          rel='preload'
          href='/fonts/ABCRepro-RegularItalic.woff2'
          as='font'
          crossOrigin='anonymous'
        />
        <title>{title}</title>
        <meta name='description' content={desc} />
        <meta name='application-name' content={title} />
        <meta name='apple-mobile-web-app-title' content={title} />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        {/* following is generated with https://realfavicongenerator.net */}
        <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
        <link rel='manifest' href='/site.webmanifest' />
        <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
        <meta name='msapplication-TileColor' content='#2d89ef' />
        <meta name='theme-color' content='#ffffff' />
      </Head>
      <Header />
      <Main>
        <Component {...pageProps} />
      </Main>
      <Footer />
    </>
  )
}

export default MyApp
