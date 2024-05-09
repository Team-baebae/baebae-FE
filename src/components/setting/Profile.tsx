import styled from 'styled-components'
import { colors } from '../../styles/colors'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { userInfoState } from '../../context/Atoms'

const Profile = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState)

  const navigate = useNavigate()
  // const nickname = '닉네임'
  return (
    <Container>
      <ProfileImage src={userInfo.profileImage} />
      <ProfileContents>
        <Nickname>{userInfo.nickname}</Nickname>
        <EditButton onClick={() => navigate('/setting/editProfile')}>내 프로필 수정하기</EditButton>
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
const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 80px;
  background-color: ${colors.grey4};
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
  font-style: normal;
  font-weight: 600;
  line-height: 27px;
  letter-spacing: -0.72px;
`
const EditButton = styled.button`
  display: flex;
  padding: 4px 12px;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  border-radius: 100px;
  border: 1px solid ${colors.grey1};
  background: #fff;
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: -0.48px;
  cursor: pointer;
`
