import { useState, useEffect, useCallback, useMemo } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { userInfoState, followerCountState } from '@/context/Atoms'
import { getIsFollowingApi, deleteFollowApi, postFollowApi } from '@/apis/FollowApi'
import { toast } from 'react-toastify'

const useFollowStatus = (ownerUserInfo: any) => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState)
  const setFollowerCount = useSetRecoilState(followerCountState)
  const [isFollowing, setIsFollowing] = useState<boolean | null>(null)

  const userId = userInfo?.memberId
  const ownerId = ownerUserInfo?.memberId
  const isMine = useMemo(() => userId === ownerId, [userId, ownerId])

  // isFollowing 조회
  useEffect(() => {
    if (!userId || !ownerId || isMine) return

    const fetchFollowStatus = async () => {
      try {
        const res = await getIsFollowingApi(userId, ownerId, userInfo.accessToken, userInfo.refreshToken, setUserInfo)
        setIsFollowing(res.follow)
      } catch {
        setIsFollowing(false)
      }
    }

    fetchFollowStatus()
  }, [userId, ownerId, isMine])

  // follow/unfollow 처리
  const handleFollow = useCallback(async () => {
    if (!userId || !ownerId || isFollowing === null) return

    try {
      if (isFollowing) {
        await deleteFollowApi(userId, ownerId, userInfo.accessToken, userInfo.refreshToken, setUserInfo)
        setIsFollowing(false)
        setFollowerCount((prev) => Math.max(prev - 1, 0))
        toast(`${ownerUserInfo.nickname}님을 팔로우 취소했어요.`)
      } else {
        await postFollowApi(userId, ownerId, userInfo.accessToken, userInfo.refreshToken, setUserInfo)
        setIsFollowing(true)
        setFollowerCount((prev) => prev + 1)
        toast(`${ownerUserInfo.nickname}님을 팔로우 했어요!`)
      }
    } catch (error) {
      console.error('Follow API 요청 실패:', error)
    }
  }, [userId, ownerId, isFollowing, userInfo, setUserInfo])

  return {
    isFollowing,
    handleFollow,
  }
}

export default useFollowStatus
