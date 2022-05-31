import CollapsingSections from '../components/CollapsingSections'
import Button from '../components/Button'
import buddegroups from '../lib/buddegroups'
import { getClient } from '../lib/sanity.server'

export default function Home({ members }) {
  console.log('members', members)
  return (
    <>
      <CollapsingSections
        sections={members}
        renderTitle={entry => {
          if (entry.logo) return <img src={entry.logo.asset.url} />
          return <h1>{entry.name}</h1>
        }}
        renderContent={entry => (
          <>
            <p>{entry.description}</p>
            <Button href={entry.url} label={'Visit'} style={{ marginTop: 10 }} />
          </>
        )}
        renderMedia={entry => (
          <video
            muted
            autoPlay={true}
            loop
            src={entry.video.asset.url}
          />
        )}
      />
    </>
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
