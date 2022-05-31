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
  min-height: 8rem;
  background: white;
  flex: 0 1 100%;
  @media (max-width: ${(1024 - 1) / 16}em) {
    flex: 1 0 auto;
    ${p => (!p.isDefault && !p.isOpen) && css`
      flex: 0 0 0;
    `}
    ${p => (!p.isDefault && p.isOpen) && css`
      flex: 1 0 auto;
    `}
  }
`

const CollapsingContent = styled.div`
  position: relative;
  flex: 0 0 auto;
  transform: translateY(100%);
  background: white;
  .title {
    position: relative;
    margin: 0;
    transform: translateY(-100%);
    padding: 0;
    line-height: 0;
    padding: 2rem;
    h1 {
      position: relative;
      margin: 0;
      line-height: 4rem;
      font-size: 3rem;
      padding: 0;
    }
    img {
      width: auto;
      height: 4rem;
      margin: 0;
    }
  }
  .content {
    position: relative;
    margin: 0;
    padding: 0 2rem 2rem 2rem;
    p {
      margin: 0;
    }
  }
`

const Media = styled.div`
  position: static;
  img, video {
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    position: absolute;
    object-fit: cover;
  }
`

const CollapsingSections = ({
  sections = [],
  onSectionClick,
  openSection,
  wrapRef,
  renderMedia = () => null,
  renderContent = () => null,
  renderTitle = () => null,
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
              <Media className='media'>
                {renderMedia(section)}
              </Media>
              <CollapsingContent className='collapsing' isOpen={isOpen}>
                <div className='title'>
                  {renderTitle(section)}
                </div>
                <div className='content'>
                  {renderContent(section)}
                </div>
              </CollapsingContent>
            </Item>
          </React.Fragment>
        )
      })}
    </Wrap>
  )
}

export default CollapsingSections