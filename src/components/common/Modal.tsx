import { SearchModalBox, SearchModalContent } from './ModalStyle'
import styled from 'styled-components'
import { colors } from '../../styles/colors'
import { AnimatePresence } from 'framer-motion'

interface ModalProps {
  content: string
  buttonText1: string
  buttonText2: string
  func1: any
  func2: any
  clickModal: () => void
}
const Modal = (props: ModalProps) => {
  // 전달받은 state 함수
  const { content, buttonText1, buttonText2, func1, func2, clickModal } = props

  return (
    <AnimatePresence>
      {/* 뒷배경을 클릭하면 모달을 나갈 수 있게 해야하므로 뒷 배경 onClick에 state함수를 넣는다. */}
      <SearchModalBox initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={clickModal}>
        <SearchModalContent
          width="320px"
          height="287px"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
        >
          <ModalContent>
            <Content>{content}</Content>
            <Button $positive={true} onClick={func1}>
              {buttonText1}
            </Button>
            <Button $positive={false} onClick={func2}>
              {buttonText2}
            </Button>
          </ModalContent>
        </SearchModalContent>
      </SearchModalBox>
    </AnimatePresence>
  )
}

export default Modal

const ModalContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  gap: 8px;
`
const Content = styled.div`
  color: ${colors.grey1};
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.32px;
  margin: 40px 22px 52px 22px;
`
const Button = styled.button<{ $positive: boolean }>`
  display: flex;
  height: 56px;
  padding: 16px 0px;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  border-radius: 12px;
  background: ${(props) => (props.$positive ? colors.primary : colors.white)};
  border: 1px solid ${(props) => (props.$positive ? colors.primary : colors.grey5)};
  color: ${(props) => (props.$positive ? colors.grey1 : colors.grey3)};
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: -0.32px;
  cursor: pointer;
`
