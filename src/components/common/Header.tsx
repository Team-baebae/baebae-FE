import styled from 'styled-components'
import leftArrow from '../../assets/signup/LeftArrow.svg'

interface HeaderProps {
  text: string
}

const Header = ({ text }: HeaderProps) => {
  return (
    <HeaderTotalComponent>
      <HeaderLeftIcon src={leftArrow} alt="<" />
      <HeaderText>{text}</HeaderText>
    </HeaderTotalComponent>
  )
}

export default Header

const HeaderTotalComponent = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 48px;
  background-color: #f5f5f5;
`

const HeaderLeftIcon = styled.img`
  position: absolute;
  width: 24px;
  height: 24px;
  left: 16px;
`

const HeaderText = styled.div`
  font-family: 'Pretendard';
  color: #373737;
  font-weight: 700;
`
