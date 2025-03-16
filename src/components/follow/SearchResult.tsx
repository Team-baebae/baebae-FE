import { colors } from '@/styles/colors'
import styled from 'styled-components'

interface SearchResultProps {
  users: {
    memberId: number
    nickname: string
    profileImage: string
  }[]
  isSearching: boolean
}

const SearchResult = ({ users, isSearching }: SearchResultProps) => {
  return (
    <Container>
      {users.length > 0 ? (
        users.map((user) => (
          <UserCard key={user.memberId}>
            <ProfileImage src={user.profileImage} alt={`${user.nickname}의 프로필 이미지`} />
            <Nickname>{user.nickname}</Nickname>
          </UserCard>
        ))
      ) : (
        <EmptyText>
          {isSearching ? '검색 결과가 없습니다.' : '친구가 아직 없어요!\n친구와 함께 취향 소통을 시작해 보세요 🙌'}
        </EmptyText>
      )}
    </Container>
  )
}

export default SearchResult

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`
const UserCard = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 8px;
  background: #f5f5f5;
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
const EmptyText = styled.div`
  margin-top: 200px;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  color: ${colors.grey5};
  white-space: pre-wrap;
`
