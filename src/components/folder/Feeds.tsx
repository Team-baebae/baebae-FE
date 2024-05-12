import styled from 'styled-components'
import { colors } from '@/styles/colors'
import QuotationMark from '@/assets/question/QuotationMark.svg'

interface FeedProps {
  questionId: number
  questionContent: string
  writer: string
}

interface FeedsProps {
  data: FeedProps[]
}

const Feeds = ({ data }: FeedsProps) => {
  return (
    <>
      <GridContainer>
        {data.map((feed) => (
          <FlipWrapper>
            <Icon src={QuotationMark} />
            <FlipContent>{feed.questionContent}</FlipContent>
            <WriterBlock>
              FROM <WriterRegion>{feed.writer}님</WriterRegion>
            </WriterBlock>
          </FlipWrapper>
        ))}
      </GridContainer>
    </>
  )
}

export default Feeds

const GridContainer = styled.div`
  display: grid;
  justify-content: center;
  margin: 4px 20px;
  grid-template-columns: repeat(2, 1fr);
  gap: 9px;
`
const Icon = styled.img`
  width: 7.72px;
  height: 6.28px;
`
const FlipWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  flex: 1 0 0;
  height: 179px;
  padding: 30px 10px 10px 10px;
  border-radius: 2px;
  background: ${colors.white};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.08);
`
const FlipContent = styled.div`
  display: flex;
  flex: 1 0 0;
  margin-top: 18px;
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 600;
  line-height: 21px;
  letter-spacing: -0.56px;
`
const WriterBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: ${colors.primary};
  font-family: Pretendard;
  font-size: 10px;
  font-weight: 500;
  line-height: 15px;
  letter-spacing: -0.2px;
`

const WriterRegion = styled.button`
  background-color: transparent;
  color: ${colors.grey4};
  font-family: Pretendard;
  font-size: 10px;
  font-weight: 500;
  line-height: 15px;
  letter-spacing: -0.2px;
  border: none;
  outline: none;
`
