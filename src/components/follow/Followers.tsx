import { useEffect, useState, useCallback, useMemo, useRef } from 'react'
import { useRecoilState } from 'recoil'
import SearchInput from '@/components/search/SearchInput'
import FollowerResult from '@/components/follow/FollowerResult'
import { useSearchInput } from '@/hooks/useSearchInput'
import { getFollowersApi } from '@/apis/FollowApi'
import { userInfoState } from '@/context/Atoms'
import { useInView } from 'react-intersection-observer'
import { colors } from '@/styles/colors'
import styled from 'styled-components'

const Followers = () => {
  const { searchTerm, debouncedKeyword, handleSearchChange, handleClearSearch } = useSearchInput()
  const [userInfo, setUserInfo] = useRecoilState(userInfoState)
  const [followers, setFollowers] = useState<any[]>([])
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const loading = useRef(false)

  const { ref, inView } = useInView() // 마지막 요소 감지

  const fetchFollowers = useCallback(
    async (reset = false) => {
      if (!userInfo?.memberId || !hasMore || loading.current) return

      loading.current = true // 중복 호출 방지

      try {
        const nextPage = reset ? 0 : page
        const data = await getFollowersApi(
          userInfo.memberId,
          userInfo.accessToken,
          userInfo.refreshToken,
          setUserInfo,
          nextPage,
        )

        setFollowers((prev) => (reset ? data.content : [...prev, ...data.content]))
        setHasMore(!data.last)

        if (!reset) setPage((prev) => prev + 1)
      } catch (error) {
        console.error('팔로워 목록 가져오기 실패:', error)
      }

      loading.current = false // API 호출 종료 후 중복 방지 해제
    },
    [userInfo, page, hasMore, setUserInfo],
  )

  useEffect(() => {
    fetchFollowers(true)
  }, [userInfo])

  // 무한스크롤
  useEffect(() => {
    if (inView) fetchFollowers()
  }, [inView])

  const filteredFollowers = useMemo(() => {
    if (!debouncedKeyword) return followers
    return followers.filter((follower) => follower.nickname.toLowerCase().includes(debouncedKeyword.toLowerCase()))
  }, [debouncedKeyword, followers])

  const handleDelete = useCallback((userId: number) => {
    setFollowers((prev) => prev.filter((user) => user.memberId !== userId))
  }, [])

  return (
    <>
      <SearchInput searchTerm={searchTerm} onChange={handleSearchChange} onClear={handleClearSearch} />
      <FollowerResult
        users={filteredFollowers}
        isSearching={!!searchTerm}
        myId={userInfo?.memberId}
        accessToken={userInfo.accessToken}
        refreshToken={userInfo.refreshToken}
        setUserInfo={setUserInfo}
        onDelete={handleDelete}
      />
      {loading.current && <Loading>Loading...</Loading>}
      {hasMore && <div ref={ref} style={{ height: '1px' }} />}
    </>
  )
}

export default Followers

const Loading = styled.div`
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  color: ${colors.grey5};
`
