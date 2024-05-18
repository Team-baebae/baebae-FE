import { colors } from '@/styles/colors'
import styled from 'styled-components'
import TutorialTooltip from './TutorialTooltip'

const HighLight1 = () => {
  return (
    <Container>
      <AskContainer>
        <TextRegion placeholder={`이런 질문은 어떤가요?\n너의 패션 스타일이 궁금해!\n무슨 음식 좋아해?`} />
        <WarnText isShow={true}>{`* 사칭으로 인한 신고 접수시\n플리빗 이용에 제한이 있을 수 있어요.`}</WarnText>
        <WriterBlock>
          FROM <WriterRegion placeholder="자유롭게 입력해주세요" />
        </WriterBlock>
      </AskContainer>
      <TutorialTooltip text="상대방 혹은 자신의 취향에 대해 궁금한 점을 질문 해보세요!" triangleCenter={true} />
    </Container>
  )
}

export default HighLight1

const Container = styled.div`
  position: absolute;
  top: 270px;
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
  height: 346px;
  padding: 20px;
  border-radius: 12px;
  background-color: ${colors.white};
  box-shadow: 0px 5.259px 9.204px 0px rgba(0, 0, 0, 0.04);
  z-index: 100;
`
const TextRegion = styled.textarea`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 346px;
  flex: 1 0 0;
  border: none;
  resize: none;
  outline: none;
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 500;
  line-height: 30px;
  letter-spacing: -0.8px;
  &::placeholder {
    color: ${colors.grey5};
  }
`
const WarnText = styled.span<{ isShow: boolean }>`
  visibility: ${(props) => (props.isShow ? 'visible' : 'hidden')};
  position: absolute;
  top: 127px;
  white-space: pre-wrap;
  color: #e1e1e1;
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: -0.48px;
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
`
