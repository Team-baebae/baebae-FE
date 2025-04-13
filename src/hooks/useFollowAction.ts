import { useState, useCallback } from 'react'
import { deleteFollowApi, postFollowApi } from '@/apis/FollowApi'
import { toast } from 'react-toastify'
import { useSetRecoilState } from 'recoil'
import { followerCountState, followingCountState } from '@/context/Atoms'

interface UseFollowActionProps {
  myId: number
  accessToken: string
  refreshToken: string
  setUserInfo: any
  onActionComplete?: (userId: number) => void
}

const useFollowAction = (
  user: { memberId: number; nickname: string },
  type: 'follower' | 'following',
  props: UseFollowActionProps,
) => {
  const { myId, accessToken, refreshToken, setUserInfo, onActionComplete } = props

  const [requestCompleted, setRequestCompleted] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const setFollowerCount = useSetRecoilState(followerCountState)
  const setFollowingCount = useSetRecoilState(followingCountState)

  const clickModal = () => setShowModal((prev) => !prev)

  const handleFollow = useCallback(async () => {
    if (requestCompleted) return

    try {
      await postFollowApi(myId, user.memberId, accessToken, refreshToken, setUserInfo)
      setRequestCompleted(true)
      setFollowerCount((prev) => prev + 1)
      toast(`${user.nickname}님을 팔로우 했어요!`)
    } catch (error) {
      console.error('팔로우 요청 실패:', error)
    }
  }, [requestCompleted, myId, user.memberId, accessToken, refreshToken, setUserInfo])

  const handleDelete = useCallback(async () => {
    try {
      if (type === 'follower') {
        await deleteFollowApi(user.memberId, myId, accessToken, refreshToken, setUserInfo)
        setFollowerCount((prev) => prev - 1)
        toast(`${user.nickname}님의 팔로우를 삭제했어요.`)
      } else {
        await deleteFollowApi(myId, user.memberId, accessToken, refreshToken, setUserInfo)
        setFollowingCount((prev) => prev - 1)
        toast(`${user.nickname}님을 팔로잉 취소했어요.`)
      }

      onActionComplete?.(user.memberId)
      setShowModal(false)
    } catch (error) {
      console.error('삭제 실패:', error)
    }
  }, [type, myId, user.memberId, accessToken, refreshToken, setUserInfo, onActionComplete])

  return {
    requestCompleted,
    showModal,
    clickModal,
    handleFollow,
    handleDelete,
  }
}

export default useFollowAction
