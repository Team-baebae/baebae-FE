import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { colors } from '@/styles/colors'
import Logo from '@/assets/login/Logo.svg'
import LoginBackground from '@/assets/login/LoginBack.svg'
import KakaoIcon from '@/assets/login/KakaoIcon.svg'
import { useEffect } from 'react'

// 로그인 페이지
const Login = () => {
  const navigate = useNavigate()

  // 카카오 로그인 버튼 누를 시 link로 이동
  const clientId = import.meta.env.VITE_KAKAO_CLIENT_ID
  const redirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI
  const link = `http://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`
  const KAKAO_JS_KEY = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY
  const loginHandler = () => {
    window.location.href = link
  }

  useEffect(() => {
    // 카카오 SDK 초기화
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_JS_KEY)
    }
  }, [])

  const loginWithKakao = () => {
    window.Kakao.Auth.authorize({
      redirectUri: redirectUri,
    })
  }

  // const kakaoSDKLogin = () => {
  //   const kakao = (window as any)?.Kakao

  //   kakao?.Auth?.authorize({
  //     redirectUri, // 리다이렉트 URI만 넘겨주고, 해당 주소에서 인가 코드를 받아서 처리
  //   })
  // }

  // useEffect(() => {
  //   const kakao = (window as any)?.Kakao

  //   // 카카오 객체를 초기화 (필수)
  //   if (!kakao?.isInitialized()) {
  //     kakao?.init(KAKAO_JS_KEY)
  //   }
  // }, [])

  return (
    <Container>
      <Background src={LoginBackground} />
      <FlipItLogo onClick={() => navigate('/')} src={Logo} />
      <ContentTextTop>타인을 알아가고 본인을 표현하는</ContentTextTop>
      <ContentTextBottom>가장 단순한 방법, 플리빗.</ContentTextBottom>
      <KakaoLoginBtn onClick={loginWithKakao}>
        <KakaoLoginBtnIcon src={KakaoIcon} />
        <KakaoLoginBtnText>카카오로 로그인하기</KakaoLoginBtnText>
      </KakaoLoginBtn>
    </Container>
  )
}

export default Login

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${colors.grey2};
`

const Background = styled.img`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 722.534px;
`

const FlipItLogo = styled.img`
  width: 200.001px;
  height: 89.743px;
  margin: 290.63px 0px 0px 0px;
  z-index: 1;
  cursor: pointer;
`

// FlipIt 설명 내용
const ContentTextTop = styled.div`
  margin: 20px 0px 0px 0px;
  font-family: Pretendard;
  color: ${colors.white};
  font-size: 14px;
  font-weight: 400;
  letter-spacing: -0.56px;
`
const ContentTextBottom = styled(ContentTextTop)`
  margin: 6px 0px 0px 0px;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.72px;
`

// 카카오 로그인 버튼
const KakaoLoginBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  z-index: 2;
  height: 56px;
  margin: 61.63px 20px 0px 20px;
  padding: 16px 67px;
  border: none;
  border-radius: 12px;
  gap: 10px;
  background-color: #fee500;
  cursor: pointer;
`
const KakaoLoginBtnIcon = styled.img`
  width: 24px;
  height: 24px;
`
const KakaoLoginBtnText = styled.div`
  color: #373737;
  font-feature-settings:
    'clig' off,
    'liga' off;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.32px;
`
