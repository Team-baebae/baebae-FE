import styled from 'styled-components'
import backArrow from '../../assets/back_arrow.svg'
import { colors } from '../../styles/colors'

interface HeaderProps {
  text: string
}

const Header = ({ text }: HeaderProps) => {
  return (
    <HeaderTotalComponent>
      <HeaderLeftIcon src={backArrow} alt="<" />
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
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: -0.32px;
`
