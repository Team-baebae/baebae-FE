import styled from 'styled-components'
import { colors } from '../../styles/colors'
import DefaultImage from '../../assets/main/DefaultImage.svg'

interface MainProfileProps {
  nickname: string | undefined
  // image: string 프로필 이미지도 받아오기
}

const MainProfile = ({ nickname }: MainProfileProps) => {
  const sharing = async () => {
    if (navigator?.share) {
      try {
        await navigator.share({
          title: `${nickname}의 Flip에 초대합니다`,
          text: 'flip 들어오세요 멘트~~',
          url: `flipit.co.kr/${nickname}`,
        })
      } catch (err) {
        console.log('에러')
      }
    } else {
      //카카오톡 공유하기 넣거나 다른 방법
      console.log('web share api를 지원하지 않는 환경')
    }
  }

  return (
    <Container>
      <ProfileContents>
        <Nickname>{nickname}</Nickname>
        <ShareButton onClick={sharing}>내 플리빗 초대</ShareButton>
      </ProfileContents>
      <ProfileImage src={DefaultImage} />
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
