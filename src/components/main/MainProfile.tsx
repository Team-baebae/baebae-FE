import styled from 'styled-components'
import { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { colors } from '@/styles/colors'
import { UserInfoStateProps, ownerUserData, userInfoState } from '@/context/Atoms'
import DefaultImage from '@/assets/main/DefaultImage.png'
import { getOwnerProfileApi } from '@/apis/MainInfoApi'

declare global {
  interface Window {
    Kakao: any
  }
}

// 메인프로필 컴포넌트
const MainProfile = () => {
  const userInfo = useRecoilValue<UserInfoStateProps>(userInfoState)
  // 유저 데이터 정보
  const [ownerUserInfo, setOwnerUserInfo] = useRecoilState(ownerUserData)

  const { Kakao } = window
  const javascriptKey: string = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY
  const realUrl: string = import.meta.env.VITE_CLIENT_URL

  const getOwnerProfile = () => {
    getOwnerProfileApi(ownerUserInfo.memberId).then((res) => {
      setOwnerUserInfo({
        ...ownerUserInfo,
        imageUrl: res.imageUrl,
      })
    })
  }

  useEffect(() => {
    getOwnerProfile()
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
          mobileWebUrl: `${realUrl}/${ownerUserInfo.nickname}`,
        },
      },
      buttons: [
        {
          title: '플리빗 보러가기',
          link: {
            mobileWebUrl: `${realUrl}/${ownerUserInfo.nickname}`,
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
          url: `https://www.flipit.co.kr/${ownerUserInfo.nickname}`,
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
        <Nickname>{ownerUserInfo.nickname}</Nickname>
        <ShareButton onClick={sharing}>내 플리빗 초대</ShareButton>
      </ProfileContents>
      {ownerUserInfo.imageUrl === '' ? (
        <ProfileImage src={DefaultImage} />
      ) : (
        <ProfileImage src={ownerUserInfo.imageUrl} />
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
  border-radius: 100px;
  background: lightgray 50% / cover no-repeat;
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
  font-weight: 700;
  line-height: 24px;
  letter-spacing: -0.32px;
`
const ShareButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 24px;
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
