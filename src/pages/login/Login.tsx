import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { isLoggedInState } from '@/context/Atoms'
import { colors } from '@/styles/colors'
import Logo from '@/assets/login/Logo.svg'
import LoginBackground from '@/assets/login/LoginBack.svg'
import KakaoIcon from '@/assets/login/KakaoIcon.svg'
import { safeLocalStorage } from '@/utils/safeLocalStorage'

// 로그인 페이지
const Login = () => {
  const navigate = useNavigate()
  const [, setIsLoggedIn] = useRecoilState(isLoggedInState)

  // // 카카오 로그인 버튼 누를 시 link로 이동
  const clientId = import.meta.env.VITE_KAKAO_CLIENT_ID
  const redirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`

  const loginHandler = () => {
    window.location.href = link
  }

  useEffect(() => {
    setIsLoggedIn(false)
    safeLocalStorage.remove('profile_tooltip_shown')
  }, [])

  return (
    <Container>
      <Background src={LoginBackground} />
      <FlipItLogo onClick={() => navigate('/')} src={Logo} />
      <ContentTextTop>타인을 알아가고 본인을 표현하는</ContentTextTop>
      <ContentTextBottom>가장 단순한 방법, 플리빗.</ContentTextBottom>
      <KakaoLoginBtn onClick={loginHandler}>
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
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: ${colors.grey2};
`

const Background = styled.img`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
`

const FlipItLogo = styled.img`
  width: 200.001px;
  height: 89.743px;
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
  font-size: 16px;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.32px;
`
