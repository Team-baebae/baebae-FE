import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import NavLogo from '@/assets/nav/NavLogo.svg'
import Alram from '@/assets/nav/Alarm.svg'
import Setting from '@/assets/nav/Setting.svg'

interface HeaderProps {
  background: string
}

// 메인페이지의 헤더 컴포넌트
const MainHeader = ({ background }: HeaderProps) => {
  const navigate = useNavigate()

  return (
    <HeaderTotalComponent background={background}>
      <HeaderLeftIcon
        src={NavLogo}
        alt="flipit"
        onClick={() => {
          navigate('/')
        }}
      />
      <HeaderRight>
        <HeaderRightIcon src={Alram} alt="alram" />
        <HeaderRightIcon
          src={Setting}
          alt="setting"
          onClick={() => {
            navigate('/settings')
          }}
        />
      </HeaderRight>
    </HeaderTotalComponent>
  )
}

export default MainHeader

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
  width: 44.5px;
  height: 20px;
  left: 20px;
  cursor: pointer;
`
const HeaderRight = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  right: 20px;
  gap: 20px;
`
const HeaderRightIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`
