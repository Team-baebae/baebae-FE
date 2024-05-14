import styled from 'styled-components'
import { FeedsProps } from '@/components/category/types'
import { colors } from '@/styles/colors'
import QuotationMark from '@/assets/question/QuotationMark.svg'
import CheckBlackBack from '@/assets/feed/CheckBlackBack.svg'

// 전체 모든피드들을 보여주는 컴포넌트
const Feeds = ({ data, selectedAnswerIds, setSelectedAnswerIds }: FeedsProps) => {
  // 피드 클릭 시 선택한 피드 리스트에 추가
  const handleFlipWrapperClick = (answerId: number) => {
    setSelectedAnswerIds((prev: number[]) => {
      const isSelected = prev.includes(answerId)
      if (isSelected) {
        return prev.filter((id) => id !== answerId)
      } else {
        return [...prev, answerId]
      }
    })
  }

  return (
    <>
      <GridContainer>
        {data.map((feed) => (
          <FlipWrapper
            key={feed.answerId}
            onClick={() => handleFlipWrapperClick(feed.answerId)}
            selected={selectedAnswerIds.includes(feed.answerId)}
          >
            {selectedAnswerIds.includes(feed.answerId) && <CheckIcon src={CheckBlackBack} />}
            <Icon src={QuotationMark} />
            <FlipContent>{feed.questionContent}</FlipContent>
            <WriterBlock>
              FROM <WriterRegion>추후수정님</WriterRegion>
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
const FlipWrapper = styled.div<{ selected: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  flex: 1 0 0;
  height: 179px;
  padding: 30px 10px 10px 10px;
  border-radius: 2px;
  background-color: ${(props) => (props.selected ? 'rgba(138, 138, 138, 0.30)' : `${colors.white}`)};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.08);
  border: ${(props) => props.selected && `2px solid ${colors.grey1}`};
  cursor: pointer;
`

const CheckIcon = styled.img`
  position: absolute;
  right: 10px;
  top: 10px;
  width: 20px;
  height: 20px;
  background-color: ${colors.grey1};
  border-radius: 100px;
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
  margin: 0px 0px 0px 4px;
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
