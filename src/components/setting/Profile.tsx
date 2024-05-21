import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { colors } from '@/styles/colors'
import { UserInfoStateProps, userInfoState } from '@/context/Atoms'

interface ProfileProps {
  imageUrl: string
}
// 회원 프로필 컴포넌트
const Profile = ({ imageUrl }: ProfileProps) => {
  const navigate = useNavigate()

  //리코일 로그인한 유저정보
  const userInfo = useRecoilValue<UserInfoStateProps>(userInfoState)

  return (
    <Container>
      <ImageWrapper>
        <ProfileImage src={imageUrl} />
      </ImageWrapper>
      <ProfileContents>
        <Nickname>{userInfo.nickname}</Nickname>
        <EditButton onClick={() => navigate('/settings/account/edit')}>내 프로필 수정하기</EditButton>
      </ProfileContents>
    </Container>
  )
}

export default Profile

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px;
  gap: 20px;
  background-color: ${colors.white};
`
const ImageWrapper = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 80px;
  background-color: ${colors.grey4};
`
const ProfileImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 80px;
  transform: translate(50, 50);
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin: auto;
`
const ProfileContents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`
const Nickname = styled.div`
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
  line-height: 27px;
  letter-spacing: -0.72px;
`
const EditButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 4px 12px;
  gap: 10px;
  border-radius: 100px;
  border: 1px solid ${colors.grey1};
  background-color: #fff;
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: -0.48px;
  cursor: pointer;
`
