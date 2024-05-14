import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil'
import { useNavigate } from 'react-router-dom'
import { BottomSheet } from 'react-spring-bottom-sheet'
import { SearchModalBox } from '@/components/common/ModalStyle'
import BackFeedContents from '@/components/feed/BackFeedContents'
import FrontFeedContents from '@/components/feed/FrontFeedContents'
import TelePathyMotion from '@/components/feed/TelepathyMotion'
import { ModalProps } from '@/components/feed/types'
import { colors } from '@/styles/colors'
import { deleteFeedApi } from '@/apis/AnswerApi'
import { isMineState, userInfoState } from '@/context/Atoms'
import MusicIcon from '@/assets/MusicWhite.svg'
import PlayIcon from '@/assets/PlayGray.svg'
import PauseIcon from '@/assets/PauseGray.svg'
import LinkIcon from '@/assets/LinkWhite.svg'
import MoreDots from '@/assets/MoreDots.svg'
import pencil from '@/assets/main/Pencil.svg'
import trash from '@/assets/main/Trash.svg'
import Download from '@/assets/Download.svg'

// 피드 누를 시 피드 확대 컴포넌트
const DetailFeed = (props: ModalProps) => {
  const navigate = useNavigate()

  // 모달창 열고 닫기
  const setShowModal = props.setShowModal
  const showModal = props.showModal
  // 선택된 피드
  const selectedFeed = props.selectedFeed
  // 선택된 카테고리
  const selectedCategoryId = props.selectedCategoryId
  const selectedCategoryImage = props.selectedCategoryImage
  const selectedCategoryGroupName = props.selectedCategoryGroupName
  const selectedCategoryAnswerIds = props.selectedCategoryAnswerIds

  // 리코일 로그인한 유저의 유저정보
  const userInfo = useRecoilValue(userInfoState)
  // 리코일 내 페이지인지 여부 확인
  const isMyPage = useRecoilValue(isMineState)
  // 어느면을 바라볼지 state
  const [isFlipped, setIsFlipped] = useState<boolean>(false)

  // 모달 밖 클릭 시
  const backModal = () => {
    // 모달 내릴 때 오디오 끄기
    if (isPlaying) {
      currentAudio?.pause()
      setIsPlaying(false)
      setShowModal(!showModal)
    } else {
      setShowModal(!showModal)
    }
  }

  const spring = {
    type: 'spring',
    stiffness: 300,
    damping: 40,
  }
  // 플립 뒤집기
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    setIsFlipped((prevState) => !prevState)
  }
  // 음악 클릭 시 30초 미리듣기
  const MusicClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    handlePreview(selectedFeed.musicAudioUrl)
  }
  // 링크 클릭 시 링크 복사
  const LinkClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    navigator.clipboard.writeText(selectedFeed?.linkAttachments[0] || 'https://www.flipit.co.kr')
  }

  // 계정 주인일때 ...누를 시 bottom sheet 나오도록
  const [open, setOpen] = useState<boolean>(false)
  const MoreClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    setOpen(!open)
  }
  const handleDismiss = () => {
    setOpen(false)
  }

  // 공감 누른지 여부
  const [giveHeart, setGiveHeart] = useState<boolean>(false)
  const [giveSee, setGiveSee] = useState<boolean>(false)
  const [giveSad, setGiveSad] = useState<boolean>(false)
  const [giveTelepathy, setGiveTelepathy] = useState<boolean>(false)

  // 통했당 활성화 시 애니메이션
  const clickTelepathy = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    !giveTelepathy && setPopLottie(true)
    setGiveTelepathy(!giveTelepathy)
    setTimeout(() => {
      setPopLottie(false)
    }, 2350)
  }
  const [popLottie, setPopLottie] = useState<boolean>(false)

  //현재 실행하고 있는 트랙 저장
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null)
  //현재 실행중인지 여부 확인
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  //트랙 미리듣기 (한번에 여러개의 오디오가 드리지 않게 설정)
  const handlePreview = (previewUrl: string) => {
    if (currentAudio && currentAudio.src === previewUrl) {
      // 이미 실행 중인 노래의 버튼을 다시 누르면 일시 중지/재생 토글
      if (isPlaying) {
        currentAudio.pause()
      } else {
        currentAudio.play()
      }
      setIsPlaying(!isPlaying)
    } else {
      // 다른 노래의 버튼을 누르면 기존 노래 중지 후 새로운 노래 재생
      if (currentAudio) {
        currentAudio.pause()
        setIsPlaying(false)
      }

      const audio = new Audio(previewUrl)
      setCurrentAudio(audio)
      audio.play()
      setIsPlaying(true)
    }
  }

  // 피드 삭제
  const deleteFeed = async () => {
    try {
      await deleteFeedApi(userInfo.accessToken, selectedFeed.answerId).then((res) => {
        console.log(res)
        if (res.status === 204) {
          window.location.reload()
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

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
          {/* 음악,링크,설정 */}
          <TopContents>
            <Links>
              {selectedFeed?.musicName !== '' && (
                <LinkButton onClick={MusicClick}>
                  <Icon src={MusicIcon} />
                  <OverflowText width="60px">
                    {selectedFeed?.musicName} - {selectedFeed?.musicSinger}
                  </OverflowText>
                  {currentAudio && currentAudio.src === selectedFeed.musicAudioUrl && isPlaying ? (
                    <Icon src={PauseIcon} alt="pause" />
                  ) : (
                    <Icon src={PlayIcon} alt="play" />
                  )}
                </LinkButton>
              )}
              {selectedFeed?.linkAttachments[0] !== '' && (
                <LinkButton onClick={LinkClick}>
                  <Icon src={LinkIcon} />
                  <OverflowText width="82px">{selectedFeed?.linkAttachments[0]}</OverflowText>
                </LinkButton>
              )}
            </Links>
            {isMyPage && <Icon src={MoreDots} width={24} height={24} onClick={MoreClick} />}
          </TopContents>
          {/* 피드 */}
          <ModalWrapper onClick={handleClick} transition={spring}>
            <CardWrapper
              animate={{ rotateY: isFlipped ? -180 : 0 }}
              transition={spring}
              style={{ zIndex: isFlipped ? 0 : 1 }}
            >
              {/* 앞면 질문 */}
              <FrontFeedContents selectedFeed={selectedFeed} />
            </CardWrapper>
            <CardWrapper
              initial={{ rotateY: 180 }}
              animate={{ rotateY: isFlipped ? 0 : 180 }}
              transition={spring}
              style={{
                zIndex: isFlipped ? 1 : 0,
              }}
            >
              {/* 뒷면 답변*/}
              <BackFeedContents selectedFeed={selectedFeed} />
            </CardWrapper>
          </ModalWrapper>
          {/* 반응 */}
          <BottomContents>
            <EmotionButton
              state={giveHeart}
              onClick={(e) => {
                e.stopPropagation()
                setGiveHeart(!giveHeart)
              }}
            >
              <EmotionText>🖤</EmotionText>
              <EmotionText>{selectedFeed.heartCount}</EmotionText>
            </EmotionButton>
            <EmotionButton
              state={giveSee}
              onClick={(e) => {
                e.stopPropagation()
                setGiveSee(!giveSee)
              }}
            >
              <EmotionText>👀</EmotionText>
              <EmotionText>{selectedFeed.curiousCount}</EmotionText>
            </EmotionButton>
            <EmotionButton
              state={giveSad}
              onClick={(e) => {
                e.stopPropagation()
                setGiveSad(!giveSad)
              }}
            >
              <EmotionText>🥺</EmotionText>
              <EmotionText>{selectedFeed.sadCount}</EmotionText>
            </EmotionButton>
            <TelepathyButton state={giveTelepathy} onClick={clickTelepathy}>
              <EmotionText style={{ fontSize: 20 }}>👉🏻</EmotionText>
              <EmotionText style={{ fontSize: 20 }}>👈🏻</EmotionText>
              <EmotionText>통했당!</EmotionText>
            </TelepathyButton>
          </BottomContents>
          {/* 화면 캡쳐,공유 */}
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
      {/* ...누를 시 나오는 설정 모달 */}
      {open && (
        <BottomSheet
          open={open}
          snapPoints={() => [231]}
          onDismiss={handleDismiss}
          blocking={true}
          style={{ zIndex: 100 }}
        >
          <BottomSheetEachWrapper
            onClick={() => {
              navigate(`/questions/${selectedFeed.questionId}/answer`, {
                state: {
                  question: {
                    questionId: selectedFeed.questionId,
                    content: selectedFeed.questionContent,
                    nickname: '추후수정',
                  },
                  selectedFeed: selectedFeed,
                  condition: '수정',
                },
              })
            }}
          >
            <BottomSheetEachIcon src={pencil} />
            <BottomSheetEachText color={colors.grey1}>플립 수정하기</BottomSheetEachText>
          </BottomSheetEachWrapper>
          <BottomSheetEachWrapper
            onClick={() => {
              navigate(`/groups/${selectedCategoryId}/edit`, {
                state: {
                  categoryId: selectedCategoryId,
                  categoryImage: selectedCategoryImage,
                  categoryName: selectedCategoryGroupName,
                  answerIds: selectedCategoryAnswerIds,
                },
              })
            }}
          >
            <BottomSheetEachIcon src={pencil} />
            <BottomSheetEachText color={colors.grey1}>그룹 수정하기</BottomSheetEachText>
          </BottomSheetEachWrapper>
          <BottomSheetEachWrapper onClick={deleteFeed}>
            <BottomSheetEachIcon src={trash} />
            <BottomSheetEachText color="#f00">플립 삭제하기</BottomSheetEachText>
          </BottomSheetEachWrapper>
        </BottomSheet>
      )}
      {/* 통했당 누를 시 통했당 로띠 애니메이션 */}
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
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
`
const TopContents = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 315px;
  margin-bottom: 8px;
`
const Links = styled.div`
  display: flex;
  flex-direction: row;
  gap: 6px;
`
const LinkButton = styled.div`
  display: flex;
  align-items: center;
  width: 120px;
  padding: 4px 8px;
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
  font-weight: 400;
  letter-spacing: -0.2px;
`
const BottomContents = styled.div`
  display: flex;
  flex-direction: row;
  width: 315px;
  gap: 6px;
  margin-top: 8px;
`
const EmotionButton = styled.div<{ state: boolean }>`
  display: flex;
  align-items: center;
  height: 30px;
  padding: 4px 8px;
  gap: 4px;
  border-radius: 100px;
  background: ${(props) => (props.state ? colors.green : colors.white)};
  cursor: pointer;
`
const TelepathyButton = styled.div<{ state: boolean }>`
  display: flex;
  align-items: center;
  height: 30px;
  padding: 4px 12px;
  gap: 4px;
  border-radius: 100px;
  background: ${(props) => (props.state ? colors.primary : colors.white)};
  cursor: pointer;
`
const EmotionText = styled.div`
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: -0.24px;
`
const BottomSheetEachWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 20px;
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
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.56px;
`
const ShareButton = styled.div<{ background: string; color: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 56px;
  padding: 16px 20px;
  gap: 12px;
  flex: 1 0 0;
  border-radius: 12px;
  color: ${(props) => props.color};
  background: ${(props) => props.background};
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 600;
  line-height: 21px;
  letter-spacing: -0.28px;
`
const ButtonComponent = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  bottom: 30px;
  width: 315px;
  gap: 10px;
`
