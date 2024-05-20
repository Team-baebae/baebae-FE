import { colors } from '@/styles/colors'
import styled from 'styled-components'
import QuotationMark from '@/assets/question/QuotationMark.svg'
import TutorialTooltip from './TutorialTooltip'

const HighLight5 = () => {
  return (
    <Container>
      <Wrapper>
        <GridContainer>
          <FlipWrapper key={1}>
            <Icon src={QuotationMark} />
            <FlipContent>가은아 넌 양식이 좋아 한식이 좋아?</FlipContent>
            <WriterBlock>
              FROM<WriterRegion>유자인님</WriterRegion>
            </WriterBlock>
          </FlipWrapper>
          <FlipWrapper key={2}>
            <Icon src={QuotationMark} />
            <FlipContent>요즘 꽂힌 노래 알려줘!</FlipContent>
            <WriterBlock>
              FROM<WriterRegion>배승우님</WriterRegion>
            </WriterBlock>
          </FlipWrapper>
        </GridContainer>
      </Wrapper>
      <TutorialTooltip text="질문에 대한 답변이 궁금하다면 뒤집어 보세요!" triangleCenter={true} />
    </Container>
  )
}

export default HighLight5

const Container = styled.div`
  position: absolute;
  top: 280px;
  width: 375px;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
  padding: 0 12px;
  z-index: 100;
`
const Wrapper = styled.div`
  background-color: ${colors.grey7};
  padding: 8px;
  border-radius: 12px;
`
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 9px;
  justify-content: center;
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
  cursor: pointer;
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
  margin: 0px 0px 0px 4px;
  color: ${colors.grey4};
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
