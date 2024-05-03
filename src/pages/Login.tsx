import styled from 'styled-components'
import loginBackground from '../assets/login/LoginBackround.svg'
import logo from '../assets/Logo.svg'

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
      <KakaoLoginBtn onClick={loginHandler}>카카오 로그인</KakaoLoginBtn>
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
  background-color: #3b3b3b;
`

const BackgroundImg = styled.img`
  margin: 21.04px 0px 0px 0px;
  width: 527.03px;
  height: 431.605px;
  position: absolute;
  left: -86px;
  top: 21.035px;
  object-fit: cover;
`

const FlipItLogo = styled.img`
  width: 200.001px;
  height: 89.743px;
  margin: 250px 0px 0px 0px;
`

const KakaoLoginBtn = styled.button`
  display: flex;
  height: 56px;
  margin: 40px 20px 0px 20px;
  padding: 16px 67px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  border-radius: 12px;
  background: #fee500;
  cursor: pointer;
`
