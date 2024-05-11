import styled from 'styled-components'
import { HeaderProps } from '@/components/answer/types'
import { colors } from '@/styles/colors'
import BackArrow from '@/assets/answer/BackArrow.svg'

// 답변 페이지 최상단 헤더 컴포넌트 (예외 : 뒤로 가기 시 바로 가지는 게 아닌 경고창이 나오도록 설정)
const PersonalHeader = ({ text, background, func }: HeaderProps) => {
  return (
    <HeaderTotalComponent background={background}>
      <HeaderLeftIcon src={BackArrow} alt="<" onClick={func} />
      <HeaderText>{text}</HeaderText>
    </HeaderTotalComponent>
  )
}

export default PersonalHeader

const HeaderTotalComponent = styled.div<{ background: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 48px;
  background-color: ${(props) => props.background};
`

const HeaderLeftIcon = styled.img`
  position: absolute;
  width: 24px;
  height: 24px;
  left: 16px;
  cursor: pointer;
`

const HeaderText = styled.div`
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: -0.32px;
`
