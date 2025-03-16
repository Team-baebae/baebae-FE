import styled from 'styled-components'
import UserCard from '@/components/follow/UserCard'
import { colors } from '@/styles/colors'

interface FollowingResultProps {
  users: {
    memberId: number
    nickname: string
    profileImage: string
  }[]
  isSearching: boolean
  myId: number
  accessToken: string
  refreshToken: string
  setUserInfo: any
  onDelete: (userId: number) => void
}

const FollowingResult = ({
  users,
  isSearching,
  myId,
  accessToken,
  refreshToken,
  setUserInfo,
  onDelete,
}: FollowingResultProps) => {
  return (
    <Container>
      {users.length > 0 ? (
        users.map((user) => (
          <UserCard
            key={user.memberId}
            user={user}
            type="following"
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

export default FollowingResult

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
