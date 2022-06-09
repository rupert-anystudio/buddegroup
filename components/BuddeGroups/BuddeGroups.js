import styled from 'styled-components'
import ReactPlayer from 'react-player'

import Button from '../Button'
import bp from '../../styles/bp'
import CollapsingSections from '../CollapsingSections'

const Title = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  line-height: 0;
  padding: 2rem 1.5rem;
  pointer-events: none;
  &:before {
    content: '';
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 150%;
    background: linear-gradient(
      rgba(255,255,255,0),
      rgba(255,255,255,0.25)
    );
  }
  h1 {
    position: relative;
    margin: 0;
    line-height: 4rem;
    font-size: 3rem;
    padding: 0;
  }
  img {
    position: relative;
    width: auto;
    height: 3.8rem;
    margin: 0;
    ${bp.min.laptop`
      height: 4.8rem;
    `}
  }
`

const Content = styled.div`
  position: relative;
  padding: 0 1.5rem;
  margin: 0 0 2rem 0;
  p {
    margin: 0;
    ${bp.min.laptop`
      font-size: 2rem;
    `}
  }
`

const Media = styled.div`
  position: static;
  opacity: 1;
  cursor: pointer;
  background: black;
`

const Img = styled.img`
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  position: absolute;
  object-fit: cover;
`

const VideoWrapper = styled.div`
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  position: absolute;
  video {
    object-fit: cover;
  }
`

const BuddeGroups = ({ members }) => {

  const renderTitle = ({entry}) => (
    <Title>
      {entry.logo ? (
        <img src={entry.logo.asset.url} alt={entry.name} />
      ) : (
        <h1>{entry.name}</h1>
      )}
    </Title>
  )

  const renderContent = ({entry}) => (
    <Content>
      <p>{entry.description}</p>
      <Button
        href={entry.url}
        label={'Visit'}
        style={{ marginTop: 10 }}
      />
    </Content>
  )

  const renderMedia = ({entry, hasWindow, hasColumns }) => {
    return (
      <Media>
        {entry?.image?.asset?.url && !hasColumns && (
          <Img src={entry.image.asset.url} />
        )}
        {entry?.video?.asset?.url && hasWindow && hasColumns && (
          <ReactPlayer
            muted
            loop
            playing={true}
            // onReady={handleVideoReady}
            url={entry.video.asset.url}
            wrapper={VideoWrapper}
            width='100%'
            height='100%'
          />
        )}
      </Media>
    )
  }

  // const handleVideoReady = e => {
  //   console.log('handleVideoReady', e)
  // }

  return (
    <CollapsingSections
      sections={members}
      renderTitle={renderTitle}
      renderContent={renderContent}
      renderMedia={renderMedia}
    />
  )
}

export default BuddeGroups