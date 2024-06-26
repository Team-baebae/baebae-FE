import styled from 'styled-components'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Flip, toast } from 'react-toastify'
import { useGesture } from '@use-gesture/react'
import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { StyledToastContainer } from '@/components/toast/toastStyle'
import { categoryProps } from '@/components/category/types'
import Header from '@/components/common/Header'
import { FeedProps } from '@/components/feed/types'
import TotalPageFeeds from '@/components/category/TotalPageFeeds'
import Loading from '@/components/common/Loading'
import { colors } from '@/styles/colors'
import { getFeedsApi } from '@/apis/AnswerApi'
import { deleteCategoryApi, getCategoriesApi } from '@/apis/CategoryApi'
import { isMineState, ownerUserData, userInfoState } from '@/context/Atoms'
import pencil from '@/assets/main/Pencil.svg'
import trash from '@/assets/main/Trash.svg'
import TelePathyMotion from '@/components/feed/TelepathyMotion'
import GroupList from '@/components/category/GroupList'

// 해당 카테고리 피드 전체보기 페이지
const Groups = () => {
  const navigate = useNavigate()

  // 넘겨받은 category 정보 저장
  const location = useLocation()

  // 리코일 계정주인의 userInfo
  const ownerUserInfo = useRecoilValue(ownerUserData)
  // 내 페이지인지 여부 확인
  const isMyPage = useRecoilValue(isMineState)
  // 로그인 한 유저의 userInfo
  const [userInfo, setUserInfo] = useRecoilState(userInfoState)

  // 보여줄 선택된 디렉토리
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(location.state?.selectedCategoryId)
  const [selectedCategoryGroupName, setSelectedCategoryGroupName] = useState<string>(
    location.state?.selectedCategoryGroupName,
  )
  const [selectedCategoryImage, setSelectedCategoryImage] = useState<string>(location.state?.selectedCategoryImage)
  const [selectedCategoryAnswerIds, setSelectedCategoryAnswerIds] = useState<number[]>(
    location.state?.selectedCategoryAnswerIds,
  )

  // open은 모달 열고 닫는 상태 (해당 디렉토리 수정,삭제 오픈)
  const [open, setOpen] = useState<boolean>(false)
  const openModal = (categoryId: number, categoryImage: string, categoryName: string, answerIds: number[]) => {
    setSelectedCategoryId(categoryId)
    setSelectedCategoryImage(categoryImage)
    setSelectedCategoryGroupName(categoryName)
    setSelectedCategoryAnswerIds(answerIds)
    setOpen(true)
  }
  // 모달 이전상태로 변화
  const handleDismissPlusMusicModal = () => {
    setOpen(false)
  }

  // 꾹 누르기 기능
  const holdTimer = useRef<number | null>(null) // useRef에 타입 명시
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

  // 카테고리 삭제
  const deleteCategory = async () => {
    try {
      await deleteCategoryApi(userInfo.accessToken, selectedCategoryId, userInfo.refreshToken, setUserInfo).then(
        (res: any) => {
          setOpen(false)
          getCategories()
          if (res.status === 204) {
            toast('그룹이 삭제되었습니다')
          }
        },
      )
    } catch (err) {
      console.log(err)
      setOpen(false)
      toast('피드가 있는 그룹은 삭제가 불가능합니다')
    }
  }

  // 카테고리 수정페이지로 이동
  const moveModifyCategory = () => {
    navigate(`/groups/${selectedCategoryId}/edit`, {
      state: {
        redirectRoute: 'feedTotal',
        categoryId: selectedCategoryId,
        categoryImage: selectedCategoryImage,
        categoryName: selectedCategoryGroupName,
        answerIds: selectedCategoryAnswerIds,
      },
    })
  }

  // 계정 주인 카테고리 조회
  const [categories, setCategories] = useState<categoryProps[]>([])
  const getCategories = async () => {
    try {
      await getCategoriesApi(ownerUserInfo.memberId).then((res) => {
        setCategories(res.data.categories)
      })
    } catch (err) {
      console.log(err)
    }
  }

  const [popLottie, setPopLottie] = useState<boolean>(false)

  useEffect(() => {
    getCategories()
  }, [])

  // 무한스크롤 상태관리
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(true) // 첫 데이터 로딩 상태
  const [scrollLoading, setScrollLoading] = useState<boolean>(true) // 무한스크롤 로딩 상태

  // 해당 카테고리 피드리스트 조회
  const [feedList, setFeedList] = useState<FeedProps[]>([])
  const getFeeds = useCallback(
    async (page: number) => {
      try {
        await getFeedsApi(ownerUserInfo.memberId, selectedCategoryId, page).then((res) => {
          const result = res.data.content
          if (result.length > 0) {
            if (page === 0) {
              setFeedList(result)
            } else {
              setFeedList((prevData) => [...prevData, ...result])
            }
            setCurrentPage(page)
            if (result.length < 6) {
              // 더 이상 데이터가 없을 경우
              setHasMore(false) // 무한 스크롤 중단
            }
          } else {
            setFeedList(result)
            setHasMore(false)
          }
          setLoading(false)
          setScrollLoading(false)
        })
      } catch (err) {
        console.log(err)
      }
    },
    [selectedCategoryId],
  )

  useEffect(() => {
    getFeeds(currentPage)
  }, [getFeeds])

  // 무한스크롤
  const handleScroll = () => {
    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight
    const body = document.body
    const html = document.documentElement
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight,
    )
    const windowBottom = windowHeight + window.pageYOffset
    if (windowBottom >= docHeight && !loading && hasMore && !scrollLoading) {
      setScrollLoading(true)
      getFeeds(currentPage + 1)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrollLoading, hasMore]) // 스크롤 이벤트 리스너 등록 및 해제

  if (loading) {
    return <Loading /> // 데이터 로딩 중일 때 로딩 표시
  }

  return (
    <Container>
      <Header route={ownerUserInfo.nickname} text="전체보기" background={colors.grey7} />
      {/* 카테고리 리스트 */}
      <GroupList
        categories={categories}
        setCurrentPage={setCurrentPage}
        selectedCategoryId={selectedCategoryId}
        setSelectedCategoryId={setSelectedCategoryId}
        setSelectedCategoryImage={setSelectedCategoryImage}
        setSelectedCategoryGroupName={setSelectedCategoryGroupName}
        setSelectedCategoryAnswerIds={setSelectedCategoryAnswerIds}
        bind={bind}
        isMyPage={isMyPage}
      />

      {/* 해당 카테고리 피드 부분 */}
      <TotalPageFeeds
        feedList={feedList}
        selectedCategoryId={selectedCategoryId}
        selectedCategoryImage={selectedCategoryImage}
        selectedCategoryGroupName={selectedCategoryGroupName}
        selectedCategoryAnswerIds={selectedCategoryAnswerIds}
        popLottie={popLottie}
        setPopLottie={setPopLottie}
      />

      {/* 통했당 누를 시 통했당 로띠 애니메이션 */}
      {popLottie && <TelePathyMotion />}
      {scrollLoading && <div>loading...</div>}
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
      {/* 꾹 눌렀을 때 나오는 bottom sheet 모달 */}
      {open && (
        <BottomSheet open={open} snapPoints={() => [170]} onDismiss={handleDismissPlusMusicModal} blocking={true}>
          <BottomSheetEachWrapper onClick={moveModifyCategory}>
            <BottomSheetEachIcon src={pencil} />
            <BottomSheetEachText color={colors.grey1}>그룹 수정하기</BottomSheetEachText>
          </BottomSheetEachWrapper>
          <BottomSheetEachWrapper onClick={deleteCategory}>
            <BottomSheetEachIcon src={trash} />
            <BottomSheetEachText color="#f00">그룹 삭제하기</BottomSheetEachText>
          </BottomSheetEachWrapper>
        </BottomSheet>
      )}
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
