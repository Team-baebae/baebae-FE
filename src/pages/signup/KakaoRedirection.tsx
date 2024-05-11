import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { getKakaoUserInfoApi, isExistingAccountApi, loginApi } from '@/apis/UserApi'
import { UserInfoStateProps, isLoggedInState, userInfoState } from '@/context/Atoms'
import loading from '@/assets/kakaoRedirection/Loading.svg'

const KakaoRedirection = () => {
  const navigate = useNavigate()

  //카카오 인가코드
  const code = new URL(document.location.toString()).searchParams.get('code')
  // 리코일 userInfo
  const [userInfo, setUserInfo] = useRecoilState<UserInfoStateProps>(userInfoState)
  // 리코일 로그인 여부
  const setIsLoggedIn = useSetRecoilState(isLoggedInState)

  // 카카오에서 유저정보 받아오기
  const getKakaoUserInfo = async (code: string) => {
    try {
      await getKakaoUserInfoApi(code).then((res: KakaoUserInfoResponseProps) => {
        console.log(res)
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

  // 이미 존재하는 회원인지 여부 확인(여기 accessToken은 카카오어세스토큰)
  const isExistingAccount = async (accessToken: string) => {
    try {
      await isExistingAccountApi(accessToken).then((res: IsExistingAccountResponseProps) => {
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

  // 이미 존재하는 회원일 경우 바로 로그인 진행
  const login = async (kakaoAccessToken: string, nickname: string) => {
    try {
      await loginApi(kakaoAccessToken, nickname).then((res: LoginProps) => {
        if (res.status === 200) {
          console.log(res)
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

  // url에 코드 받으면 getKakaoUserInfo 함수 실행
  useEffect(() => {
    if (code) {
      getKakaoUserInfo(code)
    }
  }, [code])

  return (
    <Container>
      <Loading src={loading} />
      <LoadingText>Loading..</LoadingText>
    </Container>
  )
}

export default KakaoRedirection

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

const Loading = styled.img`
  width: 36px;
  height: 36px;
  margin: 300px 0px 0px 0px;
`

const LoadingText = styled.div`
  margin: 18px 0px 0px 0px;
  font-size: 20px;
  font-weight: 600;
`
