import { useState, useRef, useEffect } from 'react'
import { getSearchResultApi } from '@/apis/SearchApi'
import { useRecoilState } from 'recoil'
import { userInfoState, UserInfoStateProps } from '@/context/Atoms'

export const useSearch = (keyword: string) => {
  const [data, setData] = useState<{ memberId: number; nickname: string; profileImage: string }[]>([])
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const observerRef = useRef<HTMLDivElement | null>(null)

  const [userInfo, setUserInfo] = useRecoilState<UserInfoStateProps>(userInfoState)

  const fetchResults = async (pageNum: number) => {
    if (!userInfo.accessToken || !userInfo.refreshToken) return

    setLoading(true)
    try {
      const result = await getSearchResultApi(
        keyword,
        pageNum,
        userInfo.accessToken,
        userInfo.refreshToken,
        setUserInfo,
      )

      setData((prev) => (pageNum === 0 ? result.content : [...prev, ...result.content]))
      setHasMore(!result.last)
    } catch (error) {
      console.error('검색 실패:', error)
    } finally {
      setLoading(false)
    }
  }

  // 검색어 변경 시 첫 페이지부터 다시 불러오기
  useEffect(() => {
    setPage(0)
    fetchResults(0)
  }, [keyword])

  // 무한 스크롤 감지
  useEffect(() => {
    if (!observerRef.current || !hasMore) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((prev) => prev + 1)
        }
      },
      { threshold: 1.0 },
    )

    observer.observe(observerRef.current)
    return () => observer.disconnect()
  }, [hasMore, loading])

  // 페이지 변경 시 추가 데이터 불러오기
  useEffect(() => {
    if (page > 0) {
      fetchResults(page)
    }
  }, [page])

  return { data, loading, hasMore, observerRef }
}
