import styled from 'styled-components'
import { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { getMemberIdApi, getOwnerProfileApi } from '@/apis/MainInfoApi'
import { colors } from '@/styles/colors'
import { isMineState, ownerUserData } from '@/context/Atoms'

declare global {
  interface Window {
    Kakao: any
  }
}

interface MainProfileProps {
  nickname: string
}

// 메인프로필 컴포넌트
const MainProfile = ({ nickname }: MainProfileProps) => {
  // 리코일 계정 주인의 데이터 정보
  const [ownerUserInfo, setOwnerUserInfo] = useRecoilState(ownerUserData)
  // 내 페이지인지 여부 확인
  const isMyPage = useRecoilValue(isMineState)
  const isMine = JSON.stringify(isMyPage)

  // 공유
  const { Kakao } = window
  const javascriptKey: string = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY
  const realUrl: string = import.meta.env.VITE_CLIENT_URL

  const getOwnerProfile = () => {
    getMemberIdApi(nickname).then((result) => {
      getOwnerProfileApi(result.memberId).then((res) => {
        setOwnerUserInfo({
          ...ownerUserInfo,
          imageUrl: res.imageUrl,
        })
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
    if (!Kakao.isInitialized()) {
      Kakao.init(javascriptKey)
    }
    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: `${ownerUserInfo.nickname}님의 플리빗 페이지를 공유했어요!`,
        description: `${ownerUserInfo.nickname}님께 질문하고, 취향이 담긴 답변을 확인하세요!`,
        imageUrl: 'https://kr.object.ncloudstorage.com/baebae-bucket/Flip-it.png',
        link: {
          webUrl: `${realUrl}/${ownerUserInfo.nickname}`,
          mobileWebUrl: `${realUrl}/${ownerUserInfo.nickname}`,
        },
      },
      buttons: [
        {
          title: '보러가기',
          link: {
            webUrl: `https://www.flipit.co.kr/${ownerUserInfo.nickname}`,
            mobileWebUrl: `https://www.flipit.co.kr/${ownerUserInfo.nickname}`,
          },
        },
        {
          title: '플리빗이 뭐예요?',
          link: {
            webUrl: 'https://www.flipit.co.kr',
            mobileWebUrl: 'https://www.flipit.co.kr/',
          },
        },
      ],
    })
  }

  const sharing = async () => {
    if (navigator?.share) {
      try {
        await navigator.share({
          title: `${ownerUserInfo.nickname}님의 플리빗 페이지를 공유했어요!`,
          text: `${ownerUserInfo.nickname}님께 질문하고, 취향이 담긴 답변을 확인하세요!`,
          url: `${realUrl}/${ownerUserInfo.nickname}`,
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
        <ShareButton onClick={sharing}>{isMine == 'true' ? '내 플리빗 초대' : '이 플리빗 공유'}</ShareButton>
      </ProfileContents>
      <ProfileImage src={ownerUserInfo.imageUrl} />
    </Container>
  )
}

export default MainProfile

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  background-color: ${colors.white};
`
const ProfileImage = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 100px;
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
