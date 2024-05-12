import styled from 'styled-components'
import { useEffect, useState } from 'react'
import Header from '@/components/common/Header'
import NoFlip from '@/components/main/NoFlip'
import { colors } from '@/styles/colors'
import QuotationMark from '@/assets/question/QuotationMark.svg'

// 답변을 기다리는 질문 리스트 페이지
const QuestionList = () => {
  const [askCount, setAskCount] = useState<number>(1)
  const data = [
    { content: '안녕하세요', writer: '유자인' },
    { content: '가은아 넌 양식이 좋아, 한식이 좋아?', writer: '예인' },
    { content: '가은아 넌 양식이 좋아, 한식이 좋아?', writer: '예인' },
  ]
  useEffect(() => {
    setAskCount(data.length)
  }, [])

  return (
    <Container>
      <Header text="답변을 기다리는 질문" background={colors.grey7} />
      <Title color={colors.grey1}>
        총 <CountText color={askCount ? colors.grey1 : colors.grey4}>{askCount}개</CountText>
      </Title>
      <ContentWrapper askCount={askCount}>
        {askCount == 0 ? (
          <NoFlip />
        ) : (
          <GridContainer>
            {data.map((value) => (
              <FlipWrapper>
                <Icon src={QuotationMark} />
                <FlipContent>{value.content}</FlipContent>
                <WriterBlock>
                  FROM <WriterRegion>{value.writer}님</WriterRegion>
                </WriterBlock>
              </FlipWrapper>
            ))}
          </GridContainer>
        )}
      </ContentWrapper>
    </Container>
  )
}

export default QuestionList

const Container = styled.div`
  display: flex;
  flex-direction: column;
`
const Title = styled.div`
  display: flex;
  margin: 30px 20px 20px 20px;
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.9px;
`
const CountText = styled.div<{ color: string }>`
  display: flex;
  margin: 0px 0px 0px 6px;
  color: ${(props) => props.color};
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.9px;
`
const ContentWrapper = styled.div<{ askCount: number }>`
  padding-top: ${(props) => (props.askCount == 0 ? '80px' : '0px')};
`
const GridContainer = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(2, 1fr);
  gap: 9px;
  margin: 0 20px;
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
  background-color: ${colors.white};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.08);
`
const FlipContent = styled.div`
  display: flex;
  flex: 1 0 0;
  margin: 18px 0px 0px 0px;
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
  border: none;
  outline: none;
  background-color: transparent;
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 10px;
  font-weight: 500;
  line-height: 15px;
  letter-spacing: -0.2px;
`
