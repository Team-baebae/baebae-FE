import styled from 'styled-components'
import Header from '@/components/common/Header'
import { colors } from '@/styles/colors'
import { useEffect, useState } from 'react'
import Flips from '@/components/main/Flips'
import QuotationMark from '@/assets/main/QuotationMark.svg'

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
          <Flips />
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
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.9px;
`
const CountText = styled.div<{ color: string }>`
  display: flex;
  margin-left: 6px;
  color: ${(props) => props.color};
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.9px;
`
const ContentWrapper = styled.div<{ askCount: number }>`
  padding-top: ${(props) => (props.askCount == 0 ? '80px' : '0px')};
`
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 9px;
  justify-content: center;
  margin: 0 20px;
`
const Icon = styled.img`
  width: 7.72px;
  height: 6.28px;
`
const FlipWrapper = styled.div`
  display: flex;
  flex: 1 0 0;
  height: 179px;
  padding: 30px 10px 10px 10px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
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
  font-style: normal;
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
  font-style: normal;
  font-weight: 500;
  line-height: 15px;
  letter-spacing: -0.2px;
`
const WriterRegion = styled.button`
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: 15px;
  letter-spacing: -0.2px;
  border: none;
  outline: none;
  background-color: transparent;
`
