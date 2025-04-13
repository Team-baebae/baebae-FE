import styled from 'styled-components'
import { colors } from '@/styles/colors'
import DeleteIcon from '@/assets/follow/Delete.svg'
import { useNavigate } from 'react-router-dom'
import DeleteModal from './DeleteModal'
import useFollowAction from '@/hooks/useFollowAction'

interface UserCardProps {
  user: {
    memberId: number
    nickname: string
    profileImage: string
    following?: boolean
  }
  type: 'following' | 'follower'
  myId: number
  accessToken: string
  refreshToken: string
  setUserInfo: any
  onActionComplete?: (userId: number) => void
}

const UserCard = ({ user, type, myId, accessToken, refreshToken, setUserInfo, onActionComplete }: UserCardProps) => {
  const navigate = useNavigate()
  const { requestCompleted, showModal, clickModal, handleFollow, handleDelete } = useFollowAction(user, type, {
    myId,
    accessToken,
    refreshToken,
    setUserInfo,
    onActionComplete,
  })
  return (
    <CardContainer>
      <UserInfo onClick={() => navigate(`/${user.nickname}`)}>
        <ProfileImage src={user.profileImage} alt={`${user.nickname}의 프로필 이미지`} />
        <Nickname>{user.nickname}</Nickname>
      </UserInfo>
      <Actions>
        {type === 'follower' && (
          <FollowButton
            onClick={!user.following ? handleFollow : undefined}
            $requestCompleted={!!user.following || requestCompleted}
          >
            {user.following || requestCompleted ? '팔로잉' : '팔로우'}
          </FollowButton>
        )}
        <DeleteButton onClick={clickModal}>
          <img src={DeleteIcon} width={20} height={20} />
        </DeleteButton>
      </Actions>
      {showModal && (
        <DeleteModal
          content={user.nickname}
          imageUrl={user.profileImage}
          clickModal={clickModal}
          handleDelete={handleDelete}
        />
      )}
    </CardContainer>
  )
}

export default UserCard

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  cursor: pointer;
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
  object-fit: cover;
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
  background-color: ${(props) => (props.$requestCompleted ? colors.grey7 : colors.grey1)};
  color: ${(props) => (props.$requestCompleted ? colors.grey4 : colors.white)};
  border: none;
  outline: none;
`
const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  height: 20px;
  z-index: 2;
`
