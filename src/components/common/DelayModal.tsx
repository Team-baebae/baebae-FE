import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { colors } from '../../styles/colors'

interface DelayModalProps {
  text: string
  setIsOpenDelayModal: any
}

const DelayModal = ({ setIsOpenDelayModal, text }: DelayModalProps) => {
  const [showMessage, setShowMessage] = useState<boolean>(false)

  useEffect(() => {
    setShowMessage(true)
    setTimeout(() => {
      setShowMessage(false)
      setIsOpenDelayModal(false)
    }, 2000)
  }, [])

  return <div>{showMessage && <Container className="message">{text}</Container>}</div>
}

export default DelayModal

const Container = styled.div`
  display: flex;
  width: calc(100% - 40px);
  height: 56px;
  padding: 16px 67px;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 20px;
  bottom: 42px;
  border-radius: 12px;
  background: rgba(29, 29, 29, 0.8);
  color: ${colors.white};
  font-feature-settings:
    'clig' off,
    'liga' off;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.32px;
`
