import { AnimatePresence } from 'framer-motion'
import Lottie from 'lottie-react'
import styled from 'styled-components'
import { SearchModalBox } from '@/components/common/ModalStyle'
import { colors } from '@/styles/colors'
import TelepathyMotion from '@/assets/lottie/Telepathy.json'

const LandingTelepathy = () => {
  const nickname1 = 'SEUNNGENY_'
  const nickname2 = 'YEREEEMY'
  return (
    <>
      <AnimatePresence>
        <SearchModalBox initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ zIndex: 0 }}>
          <Lottie
            style={{ position: 'absolute', height: 630, width: 630, zIndex: 10 }}
            animationData={TelepathyMotion}
          />
          <ModalWrapper>
            <Finger>👉🏻👈🏻</Finger>
            <TextWrapper>
              <NicknameBox>{nickname1}</NicknameBox>님과
              <NicknameBox>{nickname2}</NicknameBox>님이 통했당!
            </TextWrapper>
          </ModalWrapper>
        </SearchModalBox>
      </AnimatePresence>
    </>
  )
}

export default LandingTelepathy

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Finger = styled.div`
  font-family: Pretendard;
  font-size: 40px;
`
const TextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  color: ${colors.white};
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: -0.28px;
`
const NicknameBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  gap: 4px;
  border-radius: 100px;
  background: ${colors.primary};
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 10px;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: -0.2px;
`
