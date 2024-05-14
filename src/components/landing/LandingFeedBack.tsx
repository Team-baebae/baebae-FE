import styled from 'styled-components'
import { colors } from '@/styles/colors'
import FeedImage from '@/assets/landing/FeedImage.png'

const LandingFeedBack = () => {
  const answer = '요즘 약간 조약돌 네일?'

  return (
    <FlipWrapper>
      <Photo src={FeedImage} />
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
  padding: 18.405px;
  gap: 18px;
  border-radius: 3.681px;
  background-color: ${colors.white};
  box-shadow: 0px 7.362px 7.362px 0px rgba(0, 0, 0, 0.2);
`
const ContentWrapper = styled.div`
  height: 42px;
  overflow: hidden;
  color: ${colors.grey1};
  text-align: center;
  text-overflow: ellipsis;
  font-family: Pretendard;
  font-size: 25.767px;
  font-weight: 500;
  line-height: 38.65px;
  letter-spacing: -0.515px;
`
