import { useEffect, useState, useCallback } from 'react'
import { useRecoilState } from 'recoil'
import { userInfoState } from '@/context/Atoms'
import { getIsFollowingApi, deleteFollowApi, postFollowApi, getNewFollowApi, checkNewFollowApi } from '@/apis/FollowApi'

const useFollow = (ownerUserInfo: any) => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState)
  const [isFollowing, setIsFollowing] = useState<boolean | null>(null)
  const [hasNewFollowers, setHasNewFollowers] = useState<boolean>(false)

  useEffect(() => {
    if (!userInfo?.memberId || !ownerUserInfo?.memberId) return

    const fetchFollowStatus = async () => {
      try {
        if (userInfo.memberId !== ownerUserInfo.memberId) {
          const res = await getIsFollowingApi(
            userInfo.memberId,
            ownerUserInfo.memberId,
            userInfo.accessToken,
            userInfo.refreshToken,
            setUserInfo,
          )
          setIsFollowing(res.follow)
        } else {
          const res = await getNewFollowApi(userInfo.memberId, userInfo.accessToken, userInfo.refreshToken, setUserInfo)
          setHasNewFollowers(res.hasNewFollow)
        }
      } catch {
        setIsFollowing(false)
      }
    }

    fetchFollowStatus()
  }, [ownerUserInfo, userInfo])

  const handleFollow = useCallback(async () => {
    if (isFollowing === null) return

    try {
      if (isFollowing) {
        await deleteFollowApi(
          userInfo.memberId,
          ownerUserInfo.memberId,
          userInfo.accessToken,
          userInfo.refreshToken,
          setUserInfo,
        )
        setIsFollowing(false)
      } else {
        await postFollowApi(
          userInfo.memberId,
          ownerUserInfo.memberId,
          userInfo.accessToken,
          userInfo.refreshToken,
          setUserInfo,
        )
        setIsFollowing(true)
      }
    } catch (error) {
      console.error('Follow API 요청 실패:', error)
    }
  }, [isFollowing, userInfo, ownerUserInfo, setUserInfo])

  const checkNewFollowers = async () => {
    await checkNewFollowApi(userInfo.memberId, userInfo.accessToken, userInfo.refreshToken, setUserInfo)
    setHasNewFollowers(false)
  }

  return { isFollowing, handleFollow, hasNewFollowers, checkNewFollowers }
}

export default useFollow
