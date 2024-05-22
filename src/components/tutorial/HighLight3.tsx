import { colors } from '@/styles/colors'
import styled from 'styled-components'
import NewIcon from '@/assets/main/NewIcon.svg'
import ForwardArrow from '@/assets/setting/ForwardArrow.svg'
import TutorialTooltip from './TutorialTooltip'
import { HighLightProps } from './types'

const HighLight3 = ({ ClickPage }: HighLightProps) => {
  return (
    <Container onClick={ClickPage}>
      <Wrapper>
        <AskNotification>
          <Icon width={34.25} height={16} src={NewIcon} />
          <TextWrapper ml="6px" color={colors.white}>
            답변을 기다리는 질문
            <TextWrapper ml="4px" color={colors.primary}>
              9개
            </TextWrapper>
          </TextWrapper>
          <Icon width={20} height={20} src={ForwardArrow} />
        </AskNotification>
      </Wrapper>
      <TutorialTooltip text="내가 받은 새로운 질문에 대해 답변해 보세요!" triangleCenter={true} />
    </Container>
  )
}

export default HighLight3

const Container = styled.div`
  position: absolute;
  top: 204px;
  width: 375px;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
  padding: 0 12px;
  z-index: 100;
`
const Wrapper = styled.div`
  background-color: ${colors.white};
  padding: 8px;
  border-radius: 12px;
`
const AskNotification = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  border-radius: 12px;
  background-color: ${colors.grey2};
  cursor: pointer;
`
const TextWrapper = styled.div<{ ml: string; color: string }>`
  display: flex;
  flex: 1 0 0;
  margin-left: ${(props) => props.ml};
  color: ${(props) => props.color};
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: -0.6px;
`
const Icon = styled.img``
