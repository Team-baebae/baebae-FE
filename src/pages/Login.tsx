import styled from 'styled-components'
import loginBackground from '../assets/login/LoginBackround.svg'
import logo from '../assets/Logo.svg'
import { colors } from '../styles/colors'
import kakao from '../assets/KakaoIcon.svg'

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
  background-color: ${colors.grey2};
`

const BackgroundImg = styled.img`
  width: 527.03px;
  height: 431.605px;
  position: absolute;
  z-index: 2;
  left: -86px;
  top: 21.04px;
`

const FlipItLogo = styled.img`
  width: 200.001px;
  height: 89.743px;
  margin: 250px 0px 0px 0px;
  align-self: center;
`

const KakaoLoginBtn = styled.button`
  display: flex;
  gap: 10px;
  height: 56px;
  margin: 40px 20px 0px 20px;
  padding: 16px 67px;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  border-radius: 12px;
  border: none;
  background: #fee500;
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
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.32px;
`
