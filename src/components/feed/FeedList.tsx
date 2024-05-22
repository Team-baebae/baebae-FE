import styled from 'styled-components'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import DetailFeed from '@/components/feed/DetailFeed'
import { FeedProps, FeedListProps } from '@/components/feed/types'
import { colors } from '@/styles/colors'
import QuotationMark from '@/assets/question/QuotationMark.svg'
import { Flip, toast } from 'react-toastify'
import { StyledToastContainer } from '../toast/toastStyle'

// 해당 카테고리에 속한 피드들 보여주는 컴포넌트
const FeedList = ({
  data,
  setFeedList,
  selectedCategoryId,
  selectedCategoryImage,
  selectedCategoryGroupName,
  selectedCategoryAnswerIds,
}: FeedListProps) => {
  const navigate = useNavigate()

  // 선택된 필드 확대모달 띄워주기 위한 상태 저장
  const [selectedFeed, setSelectedFeed] = useState<FeedProps>({
    answerId: -1,
    memberId: -1,
    senderNickname: '',
    questionContent: '',
    questionId: -1,
    nickname: '',
    profileOnOff: false,
    content: '',
    createdDate: '',
    linkAttachments: '',
    musicAudioUrl: '',
    musicName: '',
    musicSinger: '',
    imageUrl: '',
  })

  // 모달 버튼 클릭 유무를 저장할 state (피드 확대)
  const [showModal, setShowModal] = useState<boolean>(false)

  // 앞면일때 확대인지, 뒷면일 때 확대인지 state(0이 앞면, 1이 뒷면)
  const [flipPlane, setFlipPlane] = useState(true)

  // 버튼 클릭시 모달 버튼 클릭 유무를 설정하는 state 함수
  const clickFlip = (feed: FeedProps) => {
    setSelectedFeed(feed)
    clickModal()
  }
  // 모달창 열고 닫는 state 함수
  const clickModal = () => {
    setShowModal(!showModal)
  }

  const [flippedState, setFlippedState] = useState<{ [key: number]: boolean }>({})

  const spring = {
    type: 'spring',
    stiffness: 300,
    damping: 40,
  }
  const handleClick = (answerId: number) => {
    setFlippedState((prevState) => ({
      ...prevState,
      [answerId]: !prevState[answerId],
    }))
  }

  return (
    <>
      <GridContainer>
        {data.map((feed) => (
          <AnimatePresence>
            <ModalWrapper onClick={() => handleClick(feed.answerId)} transition={spring}>
              <CardWrapper
                animate={{ rotateY: flippedState[feed.answerId] ? -180 : 0 }}
                transition={spring}
                style={{ zIndex: flippedState[feed.answerId] ? 0 : 1 }}
              >
                <FlipWrapper
                  key={feed.answerId}
                  onClick={() => {
                    setFlipPlane(true)
                    clickFlip(feed)
                  }}
                >
                  <Icon src={QuotationMark} />
                  <FlipContent>{feed.questionContent}</FlipContent>
                  <WriterBlock>
                    FROM{' '}
                    {feed.profileOnOff ? (
                      <WriterRegion
                        onClick={(e) => {
                          e.stopPropagation()
                          navigate(`/${feed.senderNickname}`)
                          window.location.reload()
                        }}
                        color={colors.grey1}
                      >
                        {feed.nickname}
                      </WriterRegion>
                    ) : (
                      <WriterRegion
                        color={colors.grey4}
                        onClick={(e) => {
                          e.stopPropagation()
                          toast('질문자가 피드 공개를 설정하지 않았어요!')
                        }}
                      >
                        {feed.nickname}
                      </WriterRegion>
                    )}
                  </WriterBlock>
                </FlipWrapper>
              </CardWrapper>
              <CardWrapper
                initial={{ rotateY: 180 }}
                animate={{ rotateY: flippedState[feed.answerId] ? 0 : 180 }}
                transition={spring}
                style={{
                  zIndex: flippedState[feed.answerId] ? 1 : 0,
                }}
              >
                <SelectedFlipWrapper
                  key={feed.answerId}
                  onClick={() => {
                    setFlipPlane(false)
                    clickFlip(feed)
                  }}
                >
                  <ImageWrapper>
                    <SelectedFeedAnswerImg src={feed.imageUrl} />
                  </ImageWrapper>
                  <SelectedContentWrapper>{feed.content}</SelectedContentWrapper>
                </SelectedFlipWrapper>
              </CardWrapper>
            </ModalWrapper>
          </AnimatePresence>
        ))}
      </GridContainer>
      {/* 해당 카테고리 피드리스트 전체보기 */}
      <TotalFeedsBtn
        onClick={() => {
          navigate('/groups', {
            state: {
              selectedCategoryId: selectedCategoryId,
              selectedCategoryImage: selectedCategoryImage,
              selectedCategoryGroupName: selectedCategoryGroupName,
              selectedCategoryAnswerIds: selectedCategoryAnswerIds,
            },
          })
        }}
      >
        전체 보기
      </TotalFeedsBtn>
      <StyledToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar
        pauseOnHover={false}
        closeOnClick={false}
        closeButton={false}
        rtl={false}
        theme="dark"
        transition={Flip}
      />
      {/* 피드 누를시 피드 확대 */}
      {showModal && (
        <DetailFeed
          setShowModal={setShowModal}
          flipPlane={flipPlane}
          showModal={showModal}
          selectedFeed={selectedFeed}
          feedList={data}
          setFeedList={setFeedList}
          selectedCategoryId={selectedCategoryId}
          selectedCategoryImage={selectedCategoryImage}
          selectedCategoryGroupName={selectedCategoryGroupName}
          selectedCategoryAnswerIds={selectedCategoryAnswerIds}
        />
      )}
    </>
  )
}

export default FeedList

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 9px;
  justify-content: center;
  align-items: stretch;
`
const Icon = styled.img`
  position: absolute;
  top: 30px;
  left: 10px;
  width: 7.72px;
  height: 6.28px;
`
const FlipWrapper = styled.div`
  position: relative;
  display: flex;
  height: 179px;
  padding: 30px 10px 10px 10px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  border-radius: 2px;
  background: ${colors.white};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.08);
  cursor: pointer;
`
const FlipContent = styled.div`
  display: flex;
  height: 100px;
  overflow: hidden;
  display: -webkit-box;
  word-wrap: break-word;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  margin-top: 18px;
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 21px;
  letter-spacing: -0.56px;
`
const WriterBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: ${colors.primary};
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: 15px;
  letter-spacing: -0.2px;
`

const WriterRegion = styled.button<{ color: string }>`
  margin: 0px 0px 0px 4px;
  color: ${(porps) => porps.color};
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: 15px;
  letter-spacing: -0.2px;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
`

const TotalFeedsBtn = styled.div`
  display: flex;

  height: 40px;
  padding: 10px 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  background: ${colors.grey1};
  color: var(--White, #fff);
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.28px;
  margin: 14px 0px 20px 0px;
  cursor: pointer;
`

const SelectedFlipWrapper = styled(FlipWrapper)`
  padding: 9.31436px;
`
const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 129.366px;
`
const SelectedFeedAnswerImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(50, 50);
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin: auto;
`

const SelectedContentWrapper = styled.div`
  height: 21.7335px;
  overflow: hidden;
  text-overflow: ellipsis;
`

const ModalWrapper = styled(motion.div)`
  height: 179px;
  perspective: 1200px;
  transform-style: preserve-3d;
  background-color: transparent;
  padding: 0;
`
const CardWrapper = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
`
