import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { getKakaoUserInfoApi, isExistingAccountApi, loginApi } from '../apis/UserApi'
import loading from '../assets/kakaoRedirection/Loading.svg'
import { useRecoilState } from 'recoil'
import { UserInfoStateProps, isLoggedInState, userInfoState } from '../context/Atoms'

const KakaoRedirection = () => {
  //카카오 인가코드
  const code = new URL(document.location.toString()).searchParams.get('code')
  const navigate = useNavigate()

  // 리코일 userInfo
  const [userInfo, setUserInfo] = useRecoilState<UserInfoStateProps>(userInfoState)
  // 리코일 로그인 여부
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState)

  // GetKakaoUserInfo함수의 response 인터페이스
  interface KakaoUserInfoResponseProps {
    data: any
    status: number
    statusText: string
    headers: any
    config: any
  }

  // 카카오에서 유저정보 받아오기
  const getKakaoUserInfo = async (code: string) => {
    try {
      await getKakaoUserInfoApi(code).then((res: KakaoUserInfoResponseProps) => {
        if (res.status === 200) {
          isExistingAccount(res.data.access_token)
        } else {
          alert('로그인 실패')
          navigate('/login')
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  // GetKakaoUserInfo함수의 response 인터페이스
  interface isExistingAccountResponseProps {
    data: any
    status: number
    statusText: string
    headers: any
    config: any
  }

  // 이미 존재하는 회원인지 여부 확인(여기 accessToken은 카카오어세스토큰)
  const isExistingAccount = async (accessToken: string) => {
    try {
      await isExistingAccountApi(accessToken).then((res: isExistingAccountResponseProps) => {
        if (res.data.isExisting) {
          login(accessToken, 'null')
        } else {
          navigate('/signup/terms', {
            state: {
              kakaoAccessToken: accessToken,
            },
          })
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  // Login함수의 response 인터페이스
  interface LoginProps {
    data: any
    status: number
    statusText: string
    headers: any
    config: any
  }

  // 이미 존재하는 회원일 경우 바로 로그인 진행
  const login = async (kakaoAccessToken: string, nickname: string) => {
    try {
      await loginApi(kakaoAccessToken, nickname).then((res: LoginProps) => {
        if (res.status === 200) {
          console.log(res.data.accessToken)
          console.log(res.data.id)
          setUserInfo({
            ...userInfo,
            memberId: res.data.id,
            nickname: res.data.nickname,
            email: res.data.email,
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken,
          })
          setIsLoggedIn(true)
          navigate(`/${res.data.nickname}`)
        } else {
          alert('로그인 실패')
          navigate('/login')
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (code) {
      getKakaoUserInfo(code)
    }
  }, [code])

  return (
    <Container>
      <LoadingLoginImg src={loading} alt="loading" />
      <LoadingLoginText>Loading..</LoadingLoginText>
    </Container>
  )
}

export default KakaoRedirection

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const LoadingLoginImg = styled.img`
  width: 36px;
  height: 36px;
  margin: 300px 0px 0px 0px;
`

const LoadingLoginText = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin: 18px 0px 0px 0px;
`
