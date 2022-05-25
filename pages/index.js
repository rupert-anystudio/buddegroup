// import BuddeGroupLogo from '../components/BuddeGroupLogo'
// import Groups from '../components/Groups'
import BuddeGroups from '../components/BuddeGroups'
import buddegroups from '../lib/buddegroups'

export default function Home() {
  return (
    <>
      {/* <BuddeGroupLogo /> */}
      {/* <Groups groups={buddegroups} /> */}
      <BuddeGroups groups={buddegroups} />
    </>
  )
}
