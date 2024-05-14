import styled from 'styled-components'
import { colors } from '../../styles/colors'
import QuotationMark from '../../assets/question/QuotationMark.svg'

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

const FrontFeedContents = (props: Props) => {
  const writer = '추후수정'
  const selectedFeed = props.selectedFeed
  return (
    <FlipWrapper>
      <ContentWrapper>
        <Icon src={QuotationMark} />
        <FlipContent>{selectedFeed.questionContent}</FlipContent>
      </ContentWrapper>
      <WriterBlock>
        FROM <WriterRegion>{writer}님</WriterRegion>
      </WriterBlock>
    </FlipWrapper>
  )
}

export default FrontFeedContents

const Icon = styled.img`
  margin-top: 64.5px;
  width: 15.4px;
  height: 12.52px;
`
const FlipWrapper = styled.div`
  display: flex;
  height: 100%;
  padding: 30px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  background: ${colors.white};
  box-shadow: 0px 4.945px 8.655px 0px rgba(0, 0, 0, 0.32);
`
const ContentWrapper = styled.div``
const FlipContent = styled.div`
  display: flex;
  margin-top: 18px;
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 30px;
  letter-spacing: -0.8px;
`
const WriterBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 12px;
  color: ${colors.primary};
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: -0.28px;
`

const WriterRegion = styled.button`
  color: ${colors.grey4};
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: -0.28px;
  border: none;
  outline: none;
  background-color: transparent;
`
