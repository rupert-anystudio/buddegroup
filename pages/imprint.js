import StaticText from '../components/StaticText'
import { getClient } from '../lib/sanity.server'

export default function Imprint({ title, content }) {
  return (
    <StaticText content={content} title={title} />
  )
}

export async function getStaticProps ({
  preview = false,
}) {
  const client = await getClient(preview)
  const data = await client.fetch('*[_type == "staticPage" && _id == "27f1a972-b3d2-4a79-8e81-7e786ad97478"][0]{ content, title }')
  return {
    revalidate: 100,
    props: {
      preview,
      ...data,
    }
  }
}