import styled from 'styled-components'
import { colors } from '@/styles/colors'
import QuotationMark from '@/assets/question/QuotationMark.svg'

const LandingFeedFront = () => {
  const question = '승우야 너 네일 정말 잘 아는 것 같아! 추천 좀 해줘'
  const writer = '유자인'

  return (
    <FlipWrapper>
      <ContentWrapper>
        <Icon src={QuotationMark} />
        <FlipContent>{question}</FlipContent>
      </ContentWrapper>
      <WriterBlock>
        FROM <WriterRegion>{writer}님</WriterRegion>
      </WriterBlock>
    </FlipWrapper>
  )
}

export default LandingFeedFront

const Icon = styled.img`
  margin-top: 64.5px;
  width: 15.4px;
  height: 12.52px;
`
const FlipWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 300px;
  height: 329.524px;
  padding: 28.571px;
  border-radius: 1.905px;
  background-color: ${colors.white};
  box-shadow: 0px 4.71px 8.242px 0px rgba(0, 0, 0, 0.18);
`
const ContentWrapper = styled.div``
const FlipContent = styled.div`
  display: flex;
  margin-top: 18px;
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 23.214px;
  font-weight: 600;
  line-height: 34.821px;
  letter-spacing: -0.929px;
`
const WriterBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 11.43px;
  color: ${colors.primary};
  font-family: Pretendard;
  font-size: 15.476px;
  font-weight: 500;
  line-height: 23.214px;
  letter-spacing: -0.31px;
`

const WriterRegion = styled.button`
  background-color: transparent;
  color: ${colors.grey4};
  font-family: Pretendard;
  font-size: 15.476px;
  font-weight: 500;
  line-height: 23.214px;
  letter-spacing: -0.31px;
  border: none;
  outline: none;
`
