import { getClient } from '../lib/sanity.server'
import BuddeGroups from '../components/BuddeGroups'

export default function Home({ members }) {
  return (
    <BuddeGroups members={members} />
  )
}

export async function getStaticProps ({
  preview = false,
}) {
  const client = await getClient(preview)
  const data = await client.fetch(`*[_type == "buddegroup"][0]{
    members[]{
      "id": _key,
      name,
      url,
      description,
      video{ asset->{ url } },
      image{ asset->{ url } },
      logo{ asset->{ url } },
    }
  }`)
  return {
    revalidate: 10,
    props: {
      preview,
      ...data
    }
  }
}
