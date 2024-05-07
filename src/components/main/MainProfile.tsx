import styled from 'styled-components'
import { colors } from '../../styles/colors'
import DefaultImage from '../../assets/main/DefaultImage.svg'
import { useRecoilState } from 'recoil'
import { UserInfoStateProps, userInfoState } from '../../context/Atoms'

interface MainProfileProps {
  nickname: string | undefined
  // image: string 프로필 이미지도 받아오기
}

const MainProfile = ({ nickname }: MainProfileProps) => {
  const [userInfo, setUserInfo] = useRecoilState<UserInfoStateProps>(userInfoState)

  return (
    <Container>
      <ProfileContents>
        <Nickname>{nickname}</Nickname>
        <ShareButton onClick={() => console.log('초대기능')}>내 플리빗 초대</ShareButton>
      </ProfileContents>
      {userInfo.profileImage === null ? (
        <ProfileImage src={DefaultImage} />
      ) : (
        <ProfileImage src={userInfo.profileImage} />
      )}
    </Container>
  )
}

export default MainProfile

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: ${colors.white};
`
const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 80px;
`
const ProfileContents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`
const Nickname = styled.div`
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: -0.32px;
`
const ShareButton = styled.button`
  display: flex;
  padding: 8px 24px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border: 0;
  background: ${colors.grey7};
  color: ${colors.grey3};
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 18px;
  letter-spacing: -0.24px;
  cursor: pointer;
`
