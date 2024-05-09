import styled from 'styled-components'
import BackArrow from '../../assets/BackArrow.svg'
import xIcon from '../../assets/feed/XIcon.svg'

import { colors } from '../../styles/colors'
import { useNavigate } from 'react-router-dom'

interface HeaderProps {
  text: string
  backColor: string
}

const GroupHeader = ({ text, backColor }: HeaderProps) => {
  const navigate = useNavigate()

  return (
    <HeaderTotalComponent backColor={backColor}>
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
          navigate('/nickname')
        }}
      />
    </HeaderTotalComponent>
  )
}

export default GroupHeader

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
const HeaderRightIcon = styled.img`
  position: absolute;
  width: 24px;
  height: 24px;
  right: 16px;
  cursor: pointer;
`