import React from 'react'
import styled from 'styled-components'
import { css } from 'styled-components'

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
  min-height: 7.8rem;
  background: white;
  flex: 0 1 100%;
  @media (max-width: ${(1024 - 1) / 16}em) {
    flex: 1 0 0;
    ${p => (!p.isDefault && !p.isOpen) && css`
      flex: 0 0 0;
      /* min-height: 0; */
    `}
    ${p => (!p.isDefault && p.isOpen) && css`
      flex: 1 0 auto;
    `}
  }
  .media {
    position: static;
    cursor: pointer;
    background: black;
  }
  .collapsing {
    position: relative;
    flex: 0 0 auto;
    transform: translateY(100%);
    background: white;
    .title {
      position: relative;
      margin: 0;
      padding: 0;
      transform: translateY(-100%);
      pointer-events: none;
    }
    .content {
      position: relative;
      margin: 0;
      padding: 0;
    }
  }
`

const CollapsingSections = ({
  sections = [],
  onClick,
  onMouseLeave,
  onMouseEnter,
  openSection,
  wrapRef,
  renderMedia = () => null,
  renderContent = () => null,
  renderTitle = () => null,
}) => {
  return (
    <Wrap
      ref={wrapRef}
    >
      {sections.map(section => {
        const isOpen = section.id === openSection
        return (
          <Item
            key={section.id}
            className={`item ${isOpen ? 'open' : 'collapsed'}`}
            isOpen={isOpen}
            isDefault={!openSection}
            onMouseEnter={() => onMouseEnter(section)}
            onMouseLeave={() => onMouseLeave()}
            onClick={() => onClick(section)}
          >
            <div
              className='media'
            >
              {renderMedia(section)}
            </div>
            <div className='collapsing'>
              <div className='title'>
                {renderTitle(section)}
              </div>
              <div className='content'>
                {renderContent(section)}
              </div>
            </div>
          </Item>
        )
      })}
    </Wrap>
  )
}

export default CollapsingSections