import styled from 'styled-components'
import { useEffect, useRef, useState } from 'react'
import Header from '@/components/common/Header'
import { colors } from '@/styles/colors'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import 'swiper/css'
import { useGesture } from '@use-gesture/react'
import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'
import pencil from '@/assets/main/Pencil.svg'
import trash from '@/assets/main/Trash.svg'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { userInfoState } from '@/context/Atoms'
import { deleteDirectoryApi, getDirectoriesApi } from '@/apis/DirectoryApi'
import plus from '@/assets/main/Plus.svg'

const Groups = () => {
  interface directory {
    categoryId: number
    categoryName: string
    answerAnswers: number[]
    categoryImage: string
  }

  const getDirectories = async () => {
    try {
      await getDirectoriesApi(userInfo.accessToken, userInfo.memberId).then((res) => {
        setDirectories(res.data.categories)
      })
    } catch (err) {
      console.log(err)
    }
  }

  const navigate = useNavigate()

  const userInfo = useRecoilValue(userInfoState)

  const [selectedDirectoryId, setSelectedDirectoryId] = useState<number>(0) // 선택된 디렉토리 ID 상태
  const holdTimer = useRef<number | null>(null) // useRef에 타입 명시

  // open은 모달 열고 닫는 상태
  const [open, setOpen] = useState<boolean>(false)

  const openModal = (directoryId: number) => {
    setSelectedDirectoryId(directoryId) // 선택된 디렉토리 ID 설정
    setOpen(true)
  }
  // 모달 이전상태로 변화
  const handleDismissPlusMusicModal = () => {
    setOpen(false)
  }

  // 꾹 누르기 기능
  const bind = useGesture({
    onPointerDown: ({ event, args }) => {
      const directoryId = args[0] as number // args를 통해 directoryId 받기
      event.preventDefault()
      holdTimer.current = window.setTimeout(() => openModal(directoryId), 500)
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

  const deleteDirectory = async () => {
    try {
      await deleteDirectoryApi(userInfo.accessToken, selectedDirectoryId).then(() => {
        setOpen(false)
        getDirectories()
      })
    } catch (err) {
      console.log(err)
    }
  }

  const moveModifyDirectory = () => {
    navigate(`/groups/${selectedDirectoryId}/edit`, {
      state: {
        categoryId: selectedDirectoryId,
      },
    })
  }

  useEffect(() => {
    getDirectories()
  }, [])

  const [directories, setDirectories] = useState<directory[]>([])

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
                    {...bind(item.categoryId)}
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
const GroupImgWrapper = styled.div`
  display: flex;
  width: 44px;
  height: 44px;
  padding: 3px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  border: 1px solid ${colors.grey5};
  background: ${colors.white};
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
