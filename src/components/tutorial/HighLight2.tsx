import { colors } from '@/styles/colors'
import styled from 'styled-components'
import TutorialTooltip from './TutorialTooltip'

const HighLight2 = () => {
  return (
    <Container>
      <AskContainer>
        <WriterBlock>
          FROM <WriterRegion placeholder="자유롭게 입력해주세요" />
        </WriterBlock>
      </AskContainer>
      <TutorialTooltip text="질문자 명칭을 자유롭게 설정할 수 있어요" triangleCenter={true} />
    </Container>
  )
}

export default HighLight2

const Container = styled.div`
  position: absolute;
  top: 555px;
  width: 375px;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
  padding: 0 20px;
`
const AskContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  height: 60px;
  padding: 20px;
  border-radius: 12px;
  background-color: ${colors.white};
  box-shadow: 0px 5.259px 9.204px 0px rgba(0, 0, 0, 0.04);
  z-index: 100;
`
const WriterBlock = styled.div`
  display: flex;
  width: 100%;
  color: ${colors.primary};
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: -0.28px;
  z-index: 100;
`
const WriterRegion = styled.input`
  width: 100%;
  margin-left: 12.6px;
  border: none;
  outline: none;
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: -0.28px;
  &::placeholder {
    color: ${colors.grey5};
  }
  z-index: 100;
`
