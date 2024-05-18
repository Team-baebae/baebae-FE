import styled from 'styled-components'
import { colors } from '@/styles/colors'

interface TutorialToolTipProps {
  text: string
  triangleCenter: boolean
}

const TutorialTooltip = ({ text, triangleCenter }: TutorialToolTipProps) => {
  return (
    <Container center={triangleCenter}>
      <Triangle center={triangleCenter} />
      <AlertBox>{text}</AlertBox>
    </Container>
  )
}

export default TutorialTooltip

const Container = styled.div<{ center: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.center ? 'center' : 'flex-start')};
  z-index: 100;
`
const Triangle = styled.div<{ center: boolean }>`
  width: 0;
  height: 0;
  margin-top: 5px;
  border-bottom: 6px solid #fff;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  z-index: 100;
`
const AlertBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 8px;
  color: ${colors.black};
  border-radius: 4px;
  background-color: ${colors.white};
  text-align: center;
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: -0.6px;
  z-index: 100;
`
