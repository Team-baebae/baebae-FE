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
      <KakaoLoginBtn onClick={loginHandler}>카카오 로그인</KakaoLoginBtn>
    </LoginOuterComponent>
  )
}

export default Login

const LoginOuterComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const KakaoLoginBtn = styled.button`
  background-color: yellow;
  color: #000;
  width: 200px;
  height: 30px;
  border: none;
  cursor: pointer;
`
