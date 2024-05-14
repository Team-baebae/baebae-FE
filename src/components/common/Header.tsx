import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { colors } from '@/styles/colors'
import BackArrow from '@/assets/answer/BackArrow.svg'

interface HeaderProps {
  text: string
  background: string
}

// 페이지들의 공통헤더 컴포넌트
const Header = ({ text, background }: HeaderProps) => {
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
    </HeaderTotalComponent>
  )
}

export default Header

const HeaderTotalComponent = styled.div<{ background: string }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
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
