import styled from 'styled-components'
import NavLogo from '../../assets/nav/NavLogo.svg'
import Alram from '../../assets/nav/Alarm.svg'
import Setting from '../../assets/nav/Setting.svg'
import { useNavigate } from 'react-router-dom'

interface HeaderProps {
  backColor: string
}

const MainHeader = ({ backColor }: HeaderProps) => {
  const navigate = useNavigate()

  return (
    <HeaderTotalComponent backColor={backColor}>
      <HeaderLeftIcon
        src={NavLogo}
        alt="flipit"
        onClick={() => {
          navigate('/')
        }}
      />
      <HeaderRight>
        <HeaderRightIcon src={Alram} alt="alram" />
        <HeaderRightIcon onClick={() => navigate('/setting')} src={Setting} alt="setting" />
      </HeaderRight>
    </HeaderTotalComponent>
  )
}

export default MainHeader

const HeaderTotalComponent = styled.div<{ backColor: string }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 48px;
  background-color: ${(props) => props.backColor};
`
const HeaderLeftIcon = styled.img`
  position: absolute;
  width: 44.5px;
  height: 20px;
  left: 20px;
  cursor: pointer;
`
const HeaderRight = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  right: 20px;
  gap: 20px;
`
const HeaderRightIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`
