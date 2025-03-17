import { colors } from '@/styles/colors'
import styled from 'styled-components'
import UserCard from '@/components/follow/UserCard'

interface FollowerResultProps {
  users: {
    memberId: number
    nickname: string
    profileImage: string
    isFollowing?: boolean
  }[]
  isSearching: boolean
  myId: number
  accessToken: string
  refreshToken: string
  setUserInfo: any
  onDelete: (userId: number) => void
}

const FollowerResult = ({
  users,
  isSearching,
  myId,
  accessToken,
  refreshToken,
  setUserInfo,
  onDelete,
}: FollowerResultProps) => {
  return (
    <Container>
      {users.length > 0 ? (
        users.map((user) => (
          <UserCard
            key={user.memberId}
            user={user}
            type="follower"
            myId={myId}
            accessToken={accessToken}
            refreshToken={refreshToken}
            setUserInfo={setUserInfo}
            onActionComplete={onDelete}
          />
        ))
      ) : (
        <EmptyText>
          {isSearching ? '검색 결과가 없습니다.' : '친구가 아직 없어요!\n친구와 함께 취향 소통을 시작해 보세요 🙌'}
        </EmptyText>
      )}
    </Container>
  )
}

export default FollowerResult

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`
const EmptyText = styled.div`
  margin-top: 200px;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  color: ${colors.grey5};
  white-space: pre-wrap;
`
