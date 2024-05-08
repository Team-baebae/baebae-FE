import styled from 'styled-components'
import BackArrow from '../../assets/BackArrow.svg'
import { colors } from '../../styles/colors'

interface HeaderProps {
  text: string
  background: string
  func: any
}

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
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: -0.32px;
`
