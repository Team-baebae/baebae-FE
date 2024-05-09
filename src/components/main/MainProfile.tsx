import styled from 'styled-components'
import { colors } from '../../styles/colors'
import DefaultImage from '../../assets/main/DefaultImage.svg'
import { useEffect } from 'react'

declare global {
  interface Window {
    Kakao: any
  }
}
interface MainProfileProps {
  nickname: string | undefined
  // image: string 프로필 이미지도 받아오기
}

const MainProfile = ({ nickname }: MainProfileProps) => {
  const { Kakao } = window
  const javascriptKey: string = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY
  const realUrl: string = import.meta.env.VITE_CLIENT_URL

  useEffect(() => {
    // init 해주기 전에 clean up 을 해준다.
    Kakao.cleanup()
    Kakao.init(javascriptKey)
    // 잘 적용되면 true
    console.log(Kakao.isInitialized())
  }, [])

  const shareKakao = () => {
    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '타인을 알아가고 본인을 표현하는 가장 단순한 방법, 플리빗',
        description: '플리빗은 세상과 SNS로 대화하는 현세대의 소통 방법을 개선하고자 하는 Q&A 플랫폼입니다.',
        imageUrl: 'https://images.velog.io/images/sdb016/post/5d955cc9-06d0-433d-a059-a352e6f93d39/test.png',
        link: {
          mobileWebUrl: `${realUrl}/${nickname}`,
        },
      },
      buttons: [
        {
          title: '플리빗 보러가기',
          link: {
            mobileWebUrl: `${realUrl}/${nickname}`,
          },
        },
      ],
    })
  }

  const sharing = async () => {
    if (navigator?.share) {
      try {
        await navigator.share({
          title: '타인을 알아가고 본인을 표현하는 가장 단순한 방법, 플리빗',
          text: '플리빗은 세상과 SNS로 대화하는 현세대의 소통 방법을 개선하고자 하는 Q&A 플랫폼입니다.',
          url: `https://www.flipit.co.kr/${nickname}`,
        })
      } catch (err) {
        console.log('에러')
      }
    } else {
      shareKakao()
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
