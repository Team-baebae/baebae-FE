import styled from 'styled-components'
import { colors } from '@/styles/colors'
import DefaultImage from '@/assets/main/DefaultImage.png'

const TutorialProfile = () => {
  return (
    <Container>
      <ProfileContents>
        <Nickname>TEAM_BAEBAE</Nickname>
        <ShareButton>내 플리빗 초대</ShareButton>
      </ProfileContents>
      <ProfileImage src={DefaultImage} />
    </Container>
  )
}

export default TutorialProfile

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100px;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  background-color: ${colors.white};
`
const ProfileImage = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 100px;
  background: lightgray 50% / cover no-repeat;
`
const ProfileContents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`
const Nickname = styled.div`
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: -0.32px;
`
const ShareButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 11px 24px;
  border-radius: 8px;
  border: 0;
  background-color: ${colors.grey7};
  color: ${colors.grey3};
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 600;
  line-height: 18px;
  letter-spacing: -0.24px;
  cursor: pointer;
`
