import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

interface SearchItemProps {
  memberId: number
  nickname: string
  profileImage: string
}

const SearchItem = ({ memberId, nickname, profileImage }: SearchItemProps) => {
  const navigate = useNavigate()

  return (
    <UserCard key={memberId} onClick={() => navigate(`/${nickname}`)}>
      <ProfileImage src={profileImage} alt={nickname} />
      <Nickname>{nickname}</Nickname>
    </UserCard>
  )
}

export default SearchItem

const UserCard = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 12px 24px;
  cursor: pointer;
`

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`

const Nickname = styled.div`
  font-size: 14px;
  font-weight: 500;
`
