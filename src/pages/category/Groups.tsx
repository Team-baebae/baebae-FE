import styled from 'styled-components'
import { useCallback, useEffect, useRef, useState } from 'react'
import Header from '@/components/common/Header'
import { colors } from '@/styles/colors'
import { Flip, toast } from 'react-toastify'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import 'swiper/css'
import { useGesture } from '@use-gesture/react'
import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'
import pencil from '@/assets/main/Pencil.svg'
import trash from '@/assets/main/Trash.svg'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { isMineState, ownerUserData, userInfoState } from '@/context/Atoms'
import { deleteCategoryApi, getCategoriesApi } from '@/apis/CategoryApi'
import plus from '@/assets/main/Plus.svg'
import { getFeedsApi } from '@/apis/AnswerApi'
import { StyledToastContainer } from '@/components/toast/toastStyle'
import { categoryProps } from '@/components/category/types'

const Groups = () => {
  interface FeedProps {
    answerId: number
    questionId: number
    questionContent: string
    memberId: number
    content: string
    linkAttachments: string[]
    musicName: string
    musicSinger: string
    musicAudioUrl: string
    imageUrls: string[]
    createdDate: string
    heartCount: number
    curiousCount: number
    sadCount: number
    fcmtoken: string
  }

  // 리코일 계정주인의 userInfo
  const [ownerUserInfo, setOwnerUserInfo] = useRecoilState(ownerUserData)
  // 내 페이지인지 여부 확인
  const [isMyPage, setIsMyPage] = useRecoilState(isMineState)

  const navigate = useNavigate()

  const userInfo = useRecoilValue(userInfoState)

  // 보여줄 선택된 디렉토리
  const [selectedDirectoryId, setSelectedDirectoryId] = useState<number>(0)
  const [selectedDirectoryGroupName, setSelectedDirectoryGroupName] = useState<string>('')
  const [selectedDirectoryImage, setSelectedDirectoryImage] = useState<string>('')
  const [selectedDirectoryAnswerIds, setSelectedDirectoryAnswerIds] = useState<number[]>([])
  const holdTimer = useRef<number | null>(null) // useRef에 타입 명시

  // open은 모달 열고 닫는 상태
  const [open, setOpen] = useState<boolean>(false)
  const openModal = (categoryId: number, categoryImage: string, categoryName: string, answerIds: number[]) => {
    setSelectedDirectoryId(categoryId)
    setSelectedDirectoryImage(categoryImage)
    setSelectedDirectoryGroupName(categoryName)
    setSelectedDirectoryAnswerIds(answerIds)
    setOpen(true)
  }
  // 모달 이전상태로 변화
  const handleDismissPlusMusicModal = () => {
    setOpen(false)
  }

  // 꾹 누르기 기능
  const bind = useGesture({
    onPointerDown: ({ event, args }) => {
      const [categoryId, categoryImage, categoryName, answerIds] = args as [number, string, string, number[]]
      event.preventDefault()
      holdTimer.current = window.setTimeout(() => openModal(categoryId, categoryImage, categoryName, answerIds), 500)
    },
    onPointerUp: () => {
      if (holdTimer.current !== null) {
        clearTimeout(holdTimer.current)
        holdTimer.current = null
      }
    },
    onPointerCancel: () => {
      if (holdTimer.current !== null) {
        clearTimeout(holdTimer.current)
        holdTimer.current = null
      }
    },
  })

  // 디렉토리 삭제
  const deleteDirectory = async () => {
    try {
      await deleteCategoryApi(userInfo.accessToken, selectedDirectoryId).then((res) => {
        setOpen(false)
        getDirectories()
        if (res.status === 204) {
          toast('그룹이 삭제되었습니다')
        }
      })
    } catch (err) {
      console.log(err)
      setOpen(false)
      toast('피드가 있는 그룹은 삭제가 불가능합니다')
    }
  }

  // 디렉토리 수정페이지로 이동
  const moveModifyDirectory = () => {
    navigate(`/groups/${selectedDirectoryId}/edit`, {
      state: {
        categoryId: selectedDirectoryId,
        categoryImage: selectedDirectoryImage,
        categoryName: selectedDirectoryGroupName,
        answerIds: selectedDirectoryAnswerIds,
      },
    })
  }

  useEffect(() => {
    getDirectories()
  }, [])

  // 유저 디렉토리 조회
  const getDirectories = async () => {
    try {
      await getCategoriesApi(ownerUserInfo.memberId).then((res) => {
        console.log(res)
        setDirectories(res.data.categories)
        if (res.data.categories.length !== 0) {
          setSelectedDirectoryId(res.data.categories[0].categoryId)
          setSelectedDirectoryImage(res.data.categories[0].categoryImage)
          setSelectedDirectoryGroupName(res.data.categories[0].categoryName)
          setSelectedDirectoryAnswerIds(res.data.categories[0].answerIds)
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  const [directories, setDirectories] = useState<categoryProps[]>([])
  const [feedList, setFeedList] = useState<FeedProps[]>([])
  const getFeeds = useCallback(async () => {
    try {
      await getFeedsApi(ownerUserInfo.memberId, selectedDirectoryId).then((res) => {
        console.log(res)
        setFeedList(res.data.content)
      })
    } catch (err) {
      console.log(err)
    }
  }, [selectedDirectoryId])

  useEffect(() => {
    getFeeds()
  }, [getFeeds])

  return (
    <Container>
      <Header text="전체보기" background={colors.grey7} />
      <TopComponent>
        <Swiper
          style={{ width: '100%' }}
          slidesPerView={6.1}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
        >
          {directories.map((item) => {
            return (
              <SwiperSlide key={item.categoryId}>
                <GroupWrapper>
                  <GroupImgWrapper
                    onClick={() => {
                      setSelectedDirectoryId(item.categoryId)
                      setSelectedDirectoryImage(item.categoryImage)
                      setSelectedDirectoryGroupName(item.categoryName)
                      setSelectedDirectoryAnswerIds(item.answerIds)
                    }}
                    selected={selectedDirectoryId === item.categoryId}
                    {...bind(item.categoryId, item.categoryImage, item.categoryName, item.answerIds)}
                    onContextMenu={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                  >
                    <GroupImg src={item.categoryImage} />
                  </GroupImgWrapper>
                  <GroupName>{item.categoryName}</GroupName>
                </GroupWrapper>
              </SwiperSlide>
            )
          })}

          {isMyPage && (
            <SwiperSlide>
              <GroupWrapper>
                <GroupPlusImg
                  onClick={() => {
                    navigate('/groups/new')
                  }}
                  src={plus}
                />
                <GroupName>추가</GroupName>
              </GroupWrapper>
            </SwiperSlide>
          )}
        </Swiper>
        {open && (
          <BottomSheet open={open} snapPoints={() => [170]} onDismiss={handleDismissPlusMusicModal} blocking={true}>
            <BottomSheetEachWrapper onClick={moveModifyDirectory}>
              <BottomSheetEachIcon src={pencil} />
              <BottomSheetEachText color={colors.grey1}>그룹 수정하기</BottomSheetEachText>
            </BottomSheetEachWrapper>
            <BottomSheetEachWrapper onClick={deleteDirectory}>
              <BottomSheetEachIcon src={trash} />
              <BottomSheetEachText color="#f00">그룹 삭제하기</BottomSheetEachText>
            </BottomSheetEachWrapper>
          </BottomSheet>
        )}
      </TopComponent>
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
    </Container>
  )
}

export default Groups

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
`

const TopComponent = styled.div`
  display: flex;
  width: 100%;
  padding: 12px 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
`

const GroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  width: 44px;
  height: 63px;
`
const GroupImgWrapper = styled.div<{ selected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  padding: 3px;
  border-radius: 12px;
  border: ${(props) => (props.selected ? `1px solid ${colors.grey1}` : `1px solid ${colors.grey5}`)};
  background-color: ${colors.white};
  user-select: none;
`

const GroupImg = styled.img`
  width: 38px;
  height: 38px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 0.8px solid ${colors.grey6};
  background: lightgray 50% / cover no-repeat;
  user-select: none;
  pointer-events: none;
`

const GroupName = styled.div`
  color: ${colors.grey3};
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.4px;
`

const GroupPlusImg = styled.img`
  width: 44px;
  height: 44px;
`

const BottomSheetEachWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 20px;
  align-items: center;
  gap: 12px;
  background: ${colors.white};
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
