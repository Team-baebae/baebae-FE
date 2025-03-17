import { useCallback, useEffect } from 'react'

const useKakaoShare = (ownerUserInfo: any) => {
  const { Kakao } = window
  const javascriptKey: string = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY
  const realUrl: string = import.meta.env.VITE_CLIENT_URL

  useEffect(() => {
    if (!Kakao.isInitialized()) {
      Kakao.cleanup()
      Kakao.init(javascriptKey)
    }
  }, [Kakao, javascriptKey])

  const shareProfile = useCallback(() => {
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
  }, [Kakao, ownerUserInfo, realUrl])

  return shareProfile
}

export default useKakaoShare
