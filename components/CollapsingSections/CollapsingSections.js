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
  &:not(:last-child) {
    /* border-bottom: 1px solid white; */
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
  background: white;
  .title {
    position: relative;
    margin: 0;
    transform: translateY(-100%);
    padding: 0;
    line-height: 0;
    padding: 2rem;
    img {
      width: auto;
      height: 4rem;
      margin: 0;
    }
  }
`

const Title = styled.h1`
  position: relative;
  margin: 0;
  line-height: 4rem;
  font-size: 3rem;
  padding: 0;
`

const Description = styled.p`
  position: relative;
  margin: 0;
  padding: 0 2rem 2rem 2rem;
`

const ItemBackground = styled.div`
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
              <ItemBackground className='media'>
                <video
                  muted
                  autoPlay={true}
                  loop
                  src={section.video}
                />
              </ItemBackground>
              <CollapsingContent className='collapsing' isOpen={isOpen}>
                <div className='title'>
                  {section.logo
                    ? <img src={section.logo} />
                    : <Title>{section.id}</Title>
                  }
                </div>
                <div className='content'>
                  <Description>{section.description}</Description>
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