import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import styled from 'styled-components'
import { SearchModalBox } from '../common/ModalStyle'
import BackFeedContents from './BackFeedContents'
import FrontFeedContents from './FrontFeedContents'
import MusicIcon from '../../assets/MusicWhite.svg'
import PlayIcon from '../../assets/PlayGray.svg'
import PauseIcon from '../../assets/PauseGray.svg'
import LinkIcon from '../../assets/LinkWhite.svg'
import MoreDots from '../../assets/MoreDots.svg'
import { colors } from '../../styles/colors'
import { BottomSheet } from 'react-spring-bottom-sheet'
import pencil from '../../assets/main/Pencil.svg'
import trash from '../../assets/main/Trash.svg'
import Download from '../../assets/Download.svg'
import TelePathyMotion from './TelepathyMotion'

interface ModalProps {
  clickModal: () => void
}

const DetailFeed = (props: ModalProps) => {
  const backModal = props.clickModal
  const [isFlipped, setIsFlipped] = useState(false)

  const spring = {
    type: 'spring',
    stiffness: 300,
    damping: 40,
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    setIsFlipped((prevState) => !prevState)
  }

  const MusicClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    console.log('음악재생')
  }
  const LinkClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    // 링크 복사
    navigator.clipboard.writeText(link)
  }

  const [open, setOpen] = useState<boolean>(false)
  const MoreClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    setOpen(!open)
  }
  const handleDismiss = () => {
    setOpen(false)
  }

  const music = 'Attention - NewJeans'
  const link = 'https://www.flipit.co.kr'
  const heartNum = 23
  const seeNum = 20
  const sadNum = 100

  const [giveHeart, setGiveHeart] = useState<boolean>(false)
  const [giveSee, setGiveSee] = useState<boolean>(false)
  const [giveSad, setGiveSad] = useState<boolean>(false)
  const [giveTelepathy, setGiveTelepathy] = useState<boolean>(false)

  const clickTelepathy = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    !giveTelepathy && setPopLottie(true)
    setGiveTelepathy(!giveTelepathy)
    setTimeout(() => {
      setPopLottie(false)
    }, 2350)
  }

  const [popLottie, setPopLottie] = useState<boolean>(false)
  return (
    <>
      <AnimatePresence>
        <SearchModalBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ zIndex: 0 }}
          onClick={backModal}
        >
          <TopContents>
            <Links>
              <LinkButton onClick={MusicClick}>
                <Icon src={MusicIcon} />
                <OverflowText width="60px">{music}</OverflowText>
                <Icon src={PlayIcon} />
              </LinkButton>
              <LinkButton onClick={LinkClick}>
                <Icon src={LinkIcon} />
                <OverflowText width="82px">{link}</OverflowText>
              </LinkButton>
            </Links>
            <Icon src={MoreDots} width={24} height={24} onClick={MoreClick} />
          </TopContents>
          <ModalWrapper onClick={handleClick} transition={spring}>
            <CardWrapper
              animate={{ rotateY: isFlipped ? -180 : 0 }}
              transition={spring}
              style={{ zIndex: isFlipped ? 0 : 1 }}
            >
              <FrontFeedContents />
            </CardWrapper>
            <CardWrapper
              initial={{ rotateY: 180 }}
              animate={{ rotateY: isFlipped ? 0 : 180 }}
              transition={spring}
              style={{
                zIndex: isFlipped ? 1 : 0,
              }}
            >
              {/* 뒷면 */}
              <BackFeedContents />
            </CardWrapper>
          </ModalWrapper>
          <BottomContents>
            <EmotionButton
              state={giveHeart}
              onClick={(e) => {
                e.stopPropagation()
                setGiveHeart(!giveHeart)
              }}
            >
              <EmotionText>🖤</EmotionText>
              <EmotionText>{heartNum}</EmotionText>
            </EmotionButton>
            <EmotionButton
              state={giveSee}
              onClick={(e) => {
                e.stopPropagation()
                setGiveSee(!giveSee)
              }}
            >
              <EmotionText>👀</EmotionText>
              <EmotionText>{seeNum}</EmotionText>
            </EmotionButton>
            <EmotionButton
              state={giveSad}
              onClick={(e) => {
                e.stopPropagation()
                setGiveSad(!giveSad)
              }}
            >
              <EmotionText>🥺</EmotionText>
              <EmotionText>{sadNum}</EmotionText>
            </EmotionButton>
            <TelepathyButton state={giveTelepathy} onClick={clickTelepathy}>
              <EmotionText style={{ fontSize: 20 }}>👉🏻</EmotionText>
              <EmotionText style={{ fontSize: 20 }}>👈🏻</EmotionText>
              <EmotionText>통했당!</EmotionText>
            </TelepathyButton>
          </BottomContents>
          <ButtonComponent>
            <ShareButton background={colors.grey1} color={colors.white}>
              <Icon src={Download} />
              저장하기
            </ShareButton>
            <ShareButton background={colors.primary} color={colors.grey1}>
              공유하기
            </ShareButton>
          </ButtonComponent>
        </SearchModalBox>
      </AnimatePresence>
      {open && (
        <BottomSheet
          open={open}
          snapPoints={() => [170]}
          onDismiss={handleDismiss}
          blocking={true}
          style={{ zIndex: 100 }}
        >
          <BottomSheetEachWrapper>
            <BottomSheetEachIcon src={pencil} />
            <BottomSheetEachText color={colors.grey1}>그룹 수정하기</BottomSheetEachText>
          </BottomSheetEachWrapper>
          <BottomSheetEachWrapper>
            <BottomSheetEachIcon src={trash} />
            <BottomSheetEachText color="#f00">그룹 삭제하기</BottomSheetEachText>
          </BottomSheetEachWrapper>
        </BottomSheet>
      )}
      {popLottie && <TelePathyMotion />}
    </>
  )
}

export default DetailFeed

const ModalWrapper = styled(motion.div)`
  width: 315px;
  height: 346px;
  perspective: 1200px;
  transform-style: preserve-3d;
  z-index: 1;
  background-color: transparent;
  padding: 0;
`
const CardWrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  position: absolute;
`
const TopContents = styled.div`
  width: 315px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
`
const Links = styled.div`
  display: flex;
  flex-direction: row;
  gap: 6px;
`
const LinkButton = styled.div`
  display: flex;
  width: 120px;
  padding: 4px 8px;
  align-items: center;
  gap: 8px;
  border-radius: 100px;
  background-color: ${colors.grey1};
  cursor: pointer;
`
const Icon = styled.img`
  cursor: pointer;
`
const OverflowText = styled.div<{ width: string }>`
  width: ${(props) => props.width};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${colors.white};
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: -0.2px;
`
const BottomContents = styled.div`
  width: 315px;
  display: flex;
  flex-direction: row;
  gap: 6px;
  margin-top: 8px;
`
const EmotionButton = styled.div<{ state: boolean }>`
  display: flex;
  height: 30px;
  padding: 4px 8px;
  align-items: center;
  gap: 4px;
  border-radius: 100px;
  background: ${(props) => (props.state ? colors.green : colors.white)};
  cursor: pointer;
`
const TelepathyButton = styled.div<{ state: boolean }>`
  display: flex;
  height: 30px;
  padding: 4px 12px;
  align-items: center;
  gap: 4px;
  border-radius: 100px;
  background: ${(props) => (props.state ? colors.primary : colors.white)};
  cursor: pointer;
`
const EmotionText = styled.div`
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: -0.24px;
`
const BottomSheetEachWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 20px;
  align-items: center;
  gap: 12px;
  background: ${colors.white};
  z-index: 100;
  cursor: pointer;
`
const BottomSheetEachIcon = styled.img`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
`
const BottomSheetEachText = styled.div<{ color: string }>`
  color: ${(props) => props.color};
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.56px;
`
const ShareButton = styled.div<{ background: string; color: string }>`
  display: flex;
  height: 56px;
  padding: 16px 20px;
  justify-content: center;
  align-items: center;
  gap: 12px;
  flex: 1 0 0;
  border-radius: 12px;
  color: ${(props) => props.color};
  background: ${(props) => props.background};
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 21px;
  letter-spacing: -0.28px;
`
const ButtonComponent = styled.div`
  position: absolute;
  width: 315px;
  gap: 10px;
  display: flex;
  flex-direction: row;
  bottom: 30px;
`
