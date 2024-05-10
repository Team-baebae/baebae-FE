import styled, { keyframes } from 'styled-components'
import { colors } from '../../styles/colors'
import CloseIcon from '../../assets/main/Close.svg'

interface ToolTipProps {
  show: boolean
  clickIcon: () => void
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const Tooltip = ({ show, clickIcon }: ToolTipProps) => {
  return (
    <Container show={show ? 1 : 0}>
      <Triangle />
      <AlertBox>
        답변을 보는 누구나 나의 피드를 볼 수 있어요!
        <Icon src={CloseIcon} width={18} height={18} onClick={clickIcon} />
      </AlertBox>
    </Container>
  )
}

export default Tooltip

const Container = styled.div<{ show: number }>`
  position: absolute;
  display: ${({ show }) => (show ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  left: 29px;
  top: 20px;
  animation: ${({ show }) => show && fadeIn} 0.3s ease;
`
const Triangle = styled.div`
  width: 0;
  height: 0;
  border-bottom: 6px solid #333;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
`
const AlertBox = styled.div`
  display: flex;
  padding: 6px 8px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  color: ${colors.white};
  border-radius: 4px;
  background: #333;
  text-align: center;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.6px;
`
const Icon = styled.img``
