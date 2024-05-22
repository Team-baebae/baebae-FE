import { colors } from '@/styles/colors'
import styled from 'styled-components'
import TutorialTooltip from './TutorialTooltip'
import { HighLightProps } from './types'

const HighLight4 = ({ ClickPage }: HighLightProps) => {
  return (
    <Container onClick={ClickPage}>
      <Wrapper>
        <ShareButton>내 플리빗 초대</ShareButton>
      </Wrapper>
      <TutorialTooltip text="친구들을 내 플리빗에 초대하고 질문을 받아보세요!" triangleCenter={false} />
    </Container>
  )
}

export default HighLight4

const Container = styled.div`
  position: absolute;
  top: 88px;
  width: 375px;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
  padding: 0 12px;
  z-index: 100;
`
const Wrapper = styled.div`
  width: 130px;
  background-color: ${colors.white};
  padding: 8px;
  border-radius: 12px;
`
const ShareButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 11px 24px;
  border-radius: 8px;
  border: 0;
  background-color: ${colors.grey7};
  color: ${colors.grey3};
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 600;
  line-height: 18px;
  letter-spacing: -0.24px;
  cursor: pointer;
`
