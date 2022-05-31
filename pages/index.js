import CollapsingSections from '../components/CollapsingSections'
import Button from '../components/Button'
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
          <>
            <p>{section.description}</p>
            <Button href={section.href} label={'Visit'} style={{ marginTop: 10 }} />
          </>
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
