import styled from 'styled-components'
import loginBackground from '../assets/login/LoginBack.svg'
import logo from '../assets/Logo.svg'
import { colors } from '../styles/colors'
import kakao from '../assets/KakaoIcon.svg'
// import kakao from '@/assets/KakaoIcon.svg'

const Login = () => {
  const clientId = import.meta.env.VITE_KAKAO_CLIENT_ID
  const redirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI
  const link = `http://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`

  const loginHandler = () => {
    window.location.href = link
  }

  return (
    <Container>
      <BackgroundImg src={loginBackground} alt="back" />
      <FlipItLogo src={logo} alt="logo" />
      <ContentTextTop>타인을 알아가고 본인을 표현하는</ContentTextTop>
      <ContentTextBottom>가장 단순한 방법, 플리빗.</ContentTextBottom>
      <KakaoLoginBtn onClick={loginHandler}>
        <KakaoLoginBtnIcon src={kakao} alt="kakao" />
        <KakaoLoginBtnText>카카오로 로그인하기</KakaoLoginBtnText>
      </KakaoLoginBtn>
    </Container>
  )
}

export default Login

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${colors.grey2};
`

const BackgroundImg = styled.img`
  width: 569.454px;
  height: 722.534px;
  position: absolute;
  z-index: 1;
  left: -86px;
`

const FlipItLogo = styled.img`
  width: 200.001px;
  height: 89.743px;
  margin: 290.63px 0px 0px 0px;
  align-self: center;
`

const ContentTextTop = styled.div`
  color: ${colors.white};
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.56px;
  margin: 20px 0px 0px 0px;
`

const ContentTextBottom = styled(ContentTextTop)`
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.72px;
  margin: 6px 0px 0px 0px;
`

const KakaoLoginBtn = styled.button`
  display: flex;
  gap: 10px;
  height: 56px;
  margin: 61.63px 20px 0px 20px;
  padding: 16px 67px;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  border-radius: 12px;
  border: none;
  background: #fee500;
  cursor: pointer;
  z-index: 2;
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
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.32px;
`
