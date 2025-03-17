import { useState, useCallback } from 'react'
import styled from 'styled-components'
import { deleteFollowApi, postFollowApi } from '@/apis/FollowApi'
import { colors } from '@/styles/colors'
import DeleteIcon from '@/assets/follow/Delete.svg'

interface UserCardProps {
  user: {
    memberId: number
    nickname: string
    profileImage: string
    isFollowing?: boolean
  }
  type: 'following' | 'follower'
  myId: number
  accessToken: string
  refreshToken: string
  setUserInfo: any
  onActionComplete?: (userId: number) => void
}

const UserCard = ({ user, type, myId, accessToken, refreshToken, setUserInfo, onActionComplete }: UserCardProps) => {
  const [requestCompleted, setRequestCompleted] = useState(false)

  const handleDelete = useCallback(async () => {
    try {
      if (type === 'follower') {
        // 팔로워 삭제
        await deleteFollowApi(user.memberId, myId, accessToken, refreshToken, setUserInfo)
      } else {
        // 팔로잉 삭제
        await deleteFollowApi(myId, user.memberId, accessToken, refreshToken, setUserInfo)
      }

      if (onActionComplete) onActionComplete(user.memberId)
    } catch (error) {
      console.error('삭제 실패:', error)
    }
  }, [user, type, myId, accessToken, refreshToken, setUserInfo, onActionComplete])

  const handleFollow = useCallback(async () => {
    if (requestCompleted) return

    try {
      await postFollowApi(myId, user.memberId, accessToken, refreshToken, setUserInfo)
      setRequestCompleted(true)
    } catch (error) {
      console.error('팔로우 요청 실패:', error)
    }
  }, [requestCompleted, user, accessToken, refreshToken, setUserInfo])

  return (
    <CardContainer>
      <UserInfo>
        <ProfileImage src={user.profileImage} alt={`${user.nickname}의 프로필 이미지`} />
        <Nickname>{user.nickname}</Nickname>
      </UserInfo>

      <Actions>
        {type === 'follower' && (
          <FollowButton onClick={handleFollow} $requestCompleted={requestCompleted}>
            {requestCompleted ? '요청 완료!' : '팔로우하기'}
          </FollowButton>
        )}
        <DeleteButton onClick={handleDelete}>
          <img src={DeleteIcon} width={20} height={20} />
        </DeleteButton>
      </Actions>
    </CardContainer>
  )
}

export default UserCard

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
`
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`
const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`
const Nickname = styled.div`
  font-size: 14px;
  font-weight: 600;
`
const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`
const FollowButton = styled.button<{ $requestCompleted: boolean }>`
  padding: 9px 20px;
  border-radius: 8px;
  outline: none;
  cursor: ${(props) => (props.$requestCompleted ? 'default' : 'pointer')};
  font-size: 12px;
  font-weight: 600;
  line-height: 18px;
  background-color: ${(props) => (props.$requestCompleted ? colors.grey1 : colors.white)};
  color: ${(props) => (props.$requestCompleted ? colors.white : colors.grey3)};
  border: 1px solid ${(props) => (props.$requestCompleted ? colors.grey1 : colors.grey3)};
`
const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  height: 20px;
`
