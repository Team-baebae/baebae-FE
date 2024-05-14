import styled from 'styled-components'
import { colors } from '@/styles/colors'
import Feed1 from '@/assets/landing/FeedImage.png'
import Feed2 from '@/assets/landing/FeedImage2.png'

interface FeedBackProps {
  topFeed: boolean
  answer: string
}
const LandingFeedBack = ({ topFeed, answer }: FeedBackProps) => {
  return (
    <FlipWrapper>
      <Photo src={topFeed ? Feed1 : Feed2} />
      <ContentWrapper>{answer}</ContentWrapper>
    </FlipWrapper>
  )
}

export default LandingFeedBack

const Photo = styled.img`
  width: 263.19px;
  height: 230.061px;
`
const FlipWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 329.448px;
  padding: 18.4px;
  flex-direction: column;
  justify-content: space-between;
  gap: 18px;
  border-radius: 2px;
  background: ${colors.white};
  box-shadow: 0px 7.362px 7.362px 0px rgba(0, 0, 0, 0.2);
`
const ContentWrapper = styled.div`
  height: 38px;
  overflow: hidden;
  color: ${colors.grey1};
  text-align: center;
  text-overflow: ellipsis;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 500;
  line-height: 30px;
  letter-spacing: -0.4px;
`
