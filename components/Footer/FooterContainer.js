import Footer from './Footer'

const FooterContainer = () => {
  return (
    <Footer
      copyrightBy='BuddeGroup'
      navEntries={[
        {
          key: 'imprint',
          href: '/imprint',
          label: 'Imprint',
        }
      ]}
    />
  )
}

export default FooterContainer