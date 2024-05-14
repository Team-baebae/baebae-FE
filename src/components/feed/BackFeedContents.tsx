import styled from 'styled-components'
import { SelectedFeedProps } from '@/components/feed/types'
import { colors } from '@/styles/colors'

// 피드의 답변 컴포넌트
const BackFeedContents = (props: SelectedFeedProps) => {
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
  flex-direction: column;
  height: 100%;
  padding: 18px;
  gap: 18px;
  background: ${colors.white};
  box-shadow: 0px 4.945px 8.655px 0px rgba(0, 0, 0, 0.32);
`
const ContentWrapper = styled.div`
  height: 42px;
  overflow: hidden;
`
