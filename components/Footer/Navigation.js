import Link from 'next/link'
import styled from 'styled-components'

const Wrap = styled.nav``

const EntryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const Entry = styled.li`
  padding: 0;
  margin: 1rem 2rem 0 0;
  &:last-child {
    margin-right: 0rem;
  }
`

const Navigation = ({ entries = [] }) => {
  return (
    <Wrap>
      <EntryList>
        {entries.map(({ key, href, label }) => {
          return (
            <Entry key={key}>
              <Link href={href} passHref>
                <a>{label}</a>
              </Link>
            </Entry>
          )
        })}
      </EntryList>
    </Wrap>
  )
}

export default Navigation