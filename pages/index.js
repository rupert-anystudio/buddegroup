import CollapsingSections from '../components/CollapsingSections'
import buddegroups from '../lib/buddegroups'

export default function Home() {
  return (
    <>
      <CollapsingSections
        sections={buddegroups}
        renderTitle={section => {
          if (section.logo) return <img src={section.logo} />
          return <h1>{section.id}</h1>
        }}
        renderContent={section => (
          <p>{section.description}</p>
        )}
        renderMedia={section => (
          <video
            muted
            autoPlay={true}
            loop
            src={section.video}
          />
        )}
      />
    </>
  )
}
