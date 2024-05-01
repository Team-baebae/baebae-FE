import styled from 'styled-components'

const Login = () => {
  const clientId = import.meta.env.VITE_KAKAO_CLIENT_ID
  const redirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI
  const link = `http://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`

  const loginHandler = () => {
    window.location.href = link
  }

  return (
    <LoginOuterComponent>
      <FlipItIcon>로고</FlipItIcon>
      <KakaoLoginBtn onClick={loginHandler}>카카오 로그인</KakaoLoginBtn>
    </LoginOuterComponent>
  )
}

export default Login

const LoginOuterComponent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const FlipItIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 264px;
  height: 264px;
  border-radius: 30px;
  background-color: #d9d9d9;
  margin: 202.5px 0px 0px 0px;
`

const KakaoLoginBtn = styled.button`
  width: 335px;
  height: 56px;
  border-radius: 12px;
  background-color: #fee500;
  border: none;
  margin: 40px 0px 0px 0px;
  cursor: pointer;
`
