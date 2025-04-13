import { getFollowCountApi } from '@/apis/FollowApi'
import { followerCountState, followingCountState, userInfoState } from '@/context/Atoms'
import { useEffect } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'

const useFollowCount = (ownerUserInfo: any) => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState)
  const setFollowerCount = useSetRecoilState(followerCountState)
  const setFollowingCount = useSetRecoilState(followingCountState)

  const userId = userInfo?.memberId
  const ownerId = ownerUserInfo?.memberId

  useEffect(() => {
    if (!userId || !ownerId) return

    const fetchFollowCounts = async () => {
      try {
        const res = await getFollowCountApi(ownerId, userInfo.accessToken, userInfo.refreshToken, setUserInfo)
        setFollowerCount(res.followerCount ?? 0)
        setFollowingCount(res.followingCount ?? 0)
      } catch {
        setFollowerCount(0)
        setFollowingCount(0)
      }
    }

    fetchFollowCounts()
  }, [userId, ownerId])
}

export default useFollowCount
