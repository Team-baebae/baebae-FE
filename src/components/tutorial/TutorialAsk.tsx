import styled from 'styled-components'
import { useState } from 'react'
import MiniToggle from '@/components/common/MiniToggle'
import { Button } from '@/components/common/Button'
import { colors } from '@/styles/colors'
import NewIcon from '@/assets/main/NewIcon.svg'
import ForwardArrow from '@/assets/setting/ForwardArrow.svg'
import Info from '@/assets/main/Info.svg'

const TutorialAsk = () => {
  const [isProfileOn, setIsProfileOn] = useState<boolean>(false)

  return (
    <Container>
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
      {/* 질문 입력 */}
      <AskContainer>
        <TextRegion placeholder={`이런 질문은 어떤가요?\n너의 패션 스타일이 궁금해!\n무슨 음식 좋아해?`} />
        <WarnText isShow={true}>{`* 사칭으로 인한 신고 접수시\n플리빗 이용에 제한이 있을 수 있어요.`}</WarnText>
        <WriterBlock>
          FROM <WriterRegion placeholder="자유롭게 입력해주세요" />
        </WriterBlock>
      </AskContainer>
      {/* 프로필 공개여부 */}
      <OpenProfileWrapper margin="30px">
        <OpenProfile>
          <MiniToggle isActive={isProfileOn} setIsActive={setIsProfileOn} />
          <OpenProfileText>
            질문자 프로필 공개
            <Icon width={18} height={18} src={Info} />
          </OpenProfileText>
        </OpenProfile>
      </OpenProfileWrapper>
      {/* 최하단 버튼 */}
      <Button $positive={false} func={() => console.log('온보딩 질문')} text="질문하기" />
    </Container>
  )
}

export default TutorialAsk

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 20px;
  gap: 14px;
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

const OpenProfileWrapper = styled.div<{ margin: string }>`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: ${(props) => props.margin};
`
const OpenProfile = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`
const OpenProfileText = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  color: ${colors.grey4};
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: -0.24px;
`
