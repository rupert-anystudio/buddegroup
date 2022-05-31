import React from 'react'
import styled from 'styled-components'
import { css } from 'styled-components'
import bp from '../../styles/bp'

const Wrap = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  @media (min-width: ${1024 / 16}em) {
    flex-direction: row;
  }
`

const Item = styled.div`
  position: relative;
  margin: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 6rem;
  background: var(--border-color);
  flex: 0 1 100%;
  &:not(:last-child) {
    border-bottom: 1px solid white;
  }
  @media (max-width: ${(1024 - 1) / 16}em) {
    flex: 1 0 auto;
    ${p => (!p.isDefault && !p.isOpen) && css`
      flex: 0 0 0;
      /* background: lightskyblue; */
    `}
    ${p => (!p.isDefault && p.isOpen) && css`
      flex: 1 0 auto;
      min-height: 36rem;
      /* background: cornflowerblue; */
    `}
  }
`

const CollapsingContent = styled.div`
  position: relative;
  flex: 0 0 auto;
  transform: translateY(100%);
  p, h1 {
    position: relative;
    margin: 0;
  }
  p {
    padding: 1rem;
  }
  h1 {
    transform: translateY(-100%);
    line-height: 6rem;
    font-size: 3rem;
    padding: 0;
    padding: 0 1rem;
  }
`

const CollapsingSections = ({
  sections = [],
  onSectionClick,
  openSection,
  wrapRef,
}) => {
  return (
    <Wrap ref={wrapRef}>
      {sections.map(section => {
        const isOpen = section.id === openSection
        return (
          <React.Fragment key={section.id}>
            <Item
              onClick={() => onSectionClick(section)}
              className={`item ${isOpen ? 'open' : 'collapsed'}`}
              isOpen={isOpen}
              isDefault={!openSection}
            >
              <CollapsingContent
                className={'collapsingContent'}
                isOpen={isOpen}
              >
                <h1 className={'collapsingContentTitle'}>{section.id}</h1>
                <p>{section.description}</p>
              </CollapsingContent>
            </Item>
          </React.Fragment>
        )
      })}
    </Wrap>
  )
}

export default CollapsingSections