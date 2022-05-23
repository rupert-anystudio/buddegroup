// import BuddeGroupLogo from '../components/BuddeGroupLogo'
import Groups from '../components/Groups'

const groups = [
  {
    id: 'buddemusic',
    href: 'https://buddemusic.com',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
  },
  {
    id: 'bta',
    href: 'https://bta.com/',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
  },
  {
    id: 'phraseddifferently',
    href: 'http://www.phraseddifferently.com/',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
  },
  {
    id: 'buddemanagement',
    href: 'https://buddemusicmgmt.com/',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
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
