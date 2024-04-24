import styled from 'styled-components'

const Login = () => {
  return (
    <LoginOuterComponent>
      <KakaoLoginBtn>카카오 로그인</KakaoLoginBtn>
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
