import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { colors } from '@/styles/colors'
import BackArrow from '@/assets/answer/BackArrow.svg'
import xIcon from '@/assets/feed/XIcon.svg'

interface HeaderProps {
  text: string
  background: string
}

// 그룹페이지 헤더 컴포넌트
const GroupHeader = ({ text, background }: HeaderProps) => {
  const navigate = useNavigate()

  return (
    <HeaderTotalComponent background={background}>
      <HeaderLeftIcon
        src={BackArrow}
        alt="<"
        onClick={() => {
          navigate(-1)
        }}
      />

      <HeaderText>{text}</HeaderText>
      <HeaderRightIcon
        src={xIcon}
        alt="X"
        onClick={() => {
          navigate(-1)
        }}
      />
    </HeaderTotalComponent>
  )
}

export default GroupHeader

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
const HeaderRightIcon = styled.img`
  position: absolute;
  width: 24px;
  height: 24px;
  right: 16px;
  cursor: pointer;
`
