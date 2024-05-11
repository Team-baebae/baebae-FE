import styled from 'styled-components'
import { colors } from '../../styles/colors'
import quotesOpen from '@/assets/answer/QuotesOpen.svg'
import quotesClose from '@/assets/answer/QuotesClose.svg'

const Question = () => {
  return (
    <>
      <SenderWrapper>
        <SenderText color={colors.primary}>FROM</SenderText>
        <SenderText color={colors.grey4}>유자인님</SenderText>
      </SenderWrapper>
      <QuestionWrapper>
        <QuestionQuotes src={quotesOpen} />
        <QuestionText>가은아 넌 양식이 좋아, 한식이 좋아?</QuestionText>
        <QuestionQuotes src={quotesClose} />
      </QuestionWrapper>
    </>
  )
}

export default Question

const SenderWrapper = styled.div`
  display: flex;
  gap: 5px;
  margin: 20px 0px 0px 0px;
`

const SenderText = styled.div<{ color: string }>`
  color: ${(props) => props.color};
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.24px;
`

const QuestionWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 4px;
  margin: 10px 0px 0px 0px;
`

const QuestionQuotes = styled.img`
  width: 6.16px;
  height: 5.008px;
`

const QuestionText = styled.div`
  color: #373737;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.64px;
`
