import styled from 'styled-components'
import Header from '../components/common/Header'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { loginApi } from '../apis/UserApi'
import { colors } from '../styles/colors'
import { ChangeEvent, useState } from 'react'

// Login함수의 response 인터페이스
interface LoginProps {
  data: any
  status: number
  statusText: string
  headers: any
  config: any
}

const SignUp = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const kakaoAccessToken = location.state?.kakaoAccessToken
  const [nickname, setNickname] = useState<string>('')

  const onChangeNickname = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setNickname(value)
  }

  const login = async (kakaoAccessToken: string, nickname: string) => {
    try {
      await loginApi(kakaoAccessToken, nickname).then((res: LoginProps) => {
        if (res.status === 200) {
          localStorage.setItem('accessToken', res.data.accessToken)
          localStorage.setItem('nickname', res.data.nickname)
          localStorage.setItem('email', res.data.email)
          localStorage.setItem('refreshToken', res.data.refreshToken)

          navigate('/')
        } else {
          alert('로그인 실패')
          navigate('/login')
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <SignUpTotalComponent>
      <Header text="텍스트" backColor={colors.white} />
      <SignUpHeaderText>
        플리빗을 사용하기 위해 <br />
        닉네임이 필요해요!
      </SignUpHeaderText>
      <SignUpNicknameLabel>닉네임</SignUpNicknameLabel>
      <SingUpNicknameInput value={nickname} onChange={onChangeNickname} placeholder="닉네임 입력" />
      <NextBtn>다음</NextBtn>
    </SignUpTotalComponent>
  )
}

export default SignUp

const SignUpTotalComponent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const SignUpHeaderText = styled.div`
  font-family: Pretendard;
  width: 335px;
  height: 54px;
  color: #1d1d1d;
  font-size: 18px;
  font-weight: 600;
  margin: 20px 0px 0px 0px;
`

const SignUpNicknameLabel = styled.div`
  font-family: Pretendard;
  color: #767676;
  align-self: flex-start;
  font-size: 12px;
  font-weight: 400;
  margin: 40px 0px 0px 20px;
`

const SingUpNicknameInput = styled.input`
  padding: 20px;
  margin: 4px 20px;
  border-radius: 12px;
  background: ${colors.white};
  align-self: stretch;
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.56px;
  border: none;
  &:focus {
    outline: none;
    border: 1px solid ${colors.grey1};
  }
  &::placeholder {
    color: ${colors.grey5};
  }
`

const NextBtn = styled.button`
  font-family: Pretendard;
  position: absolute;
  bottom: 30px;
  border: none;
  width: 335px;
  height: 56px;
  border-radius: 12px;
  background-color: #55eab0;
  color: #1d1d1d;
  font-size: 14px;
  font-weight: 600;
  color: var(--Grayscale-Gray-03, #767676);
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 21px */
  letter-spacing: -0.28px;
`
