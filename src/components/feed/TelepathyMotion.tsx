import { AnimatePresence } from 'framer-motion'
import { SearchModalBox } from '../common/ModalStyle'
import Lottie from 'lottie-react'
import TelepathyMotion from '../../assets/lottie/Telepathy.json'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil'
import { userInfoState } from '../../context/Atoms'
import { colors } from '../../styles/colors'

const TelePathyMotion = () => {
  const userInfo = useRecoilValue(userInfoState)
  const nickname1 = userInfo.nickname
  const nickname2 = 'HEEEEEE'
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

export default TelePathyMotion

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
  font-style: normal;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: -0.28px;
`
const NicknameBox = styled.div`
  display: flex;
  padding: 4px 8px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border-radius: 100px;
  background: ${colors.primary};
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: -0.2px;
`