// import BuddeGroupLogo from '../components/BuddeGroupLogo'
import Groups from '../components/Groups'

const groups = [
  {
    id: 'buddemusic',
    href: 'https://buddemusic.com',
    description: 'Independent publishing since 1947.',
  },
  {
    id: 'bta',
    href: 'https://bta.com/',
    description: 'We represent talent. Live, brands and talent agency based in Berlin.',
  },
  {
    id: 'phraseddifferently',
    href: 'http://www.phraseddifferently.com/',
    description: 'London-based independent music publishing, production and artist development company.',
  },
  {
    id: 'buddemanagement',
    href: 'https://buddemusicmgmt.com/',
    description: 'International artist management.',
  },
]

export default function Home() {
  return (
    <>
      {/* <BuddeGroupLogo /> */}
      <Groups groups={groups} />
    </>
  )
}
