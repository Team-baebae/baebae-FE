import styled from 'styled-components'
import { colors } from '@/styles/colors'
import ExampleImage from '@/assets/main/DefaultImage.svg'

interface FeedProps {
  answerId: number
  questionId: number
  questionContent: string
  memberId: number
  content: string
  linkAttachments: string[]
  musicName: string
  musicSinger: string
  musicAudioUrl: string
  imageUrls: string[]
  createdDate: string
  heartCount: number
  curiousCount: number
  sadCount: number
  fcmtoken: string
}

interface Props {
  selectedFeed: FeedProps
}

const BackFeedContents = (props: Props) => {
  const selectedFeed = props.selectedFeed
  return (
    <FlipWrapper>
      <Photo src={selectedFeed.imageUrls[0]} />
      <ContentWrapper>{selectedFeed.content}</ContentWrapper>
    </FlipWrapper>
  )
}

export default BackFeedContents

const Photo = styled.img`
  width: 279px;
  height: 250px;
`
const FlipWrapper = styled.div`
  display: flex;
  height: 100%;
  padding: 18px;
  flex-direction: column;
  gap: 18px;
  background: ${colors.white};
  box-shadow: 0px 4.945px 8.655px 0px rgba(0, 0, 0, 0.32);
`
const ContentWrapper = styled.div`
  height: 42px;
  overflow: hidden;
`
