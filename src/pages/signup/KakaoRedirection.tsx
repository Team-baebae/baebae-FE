import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import {
  KakaoUserInfoResponseProps,
  IsExistingAccountResponseProps,
  LoginProps,
  GetUserInfoProps,
} from '@/components/signup/types'
import { getKakaoUserInfoApi, getUserInfoApi, isExistingAccountApi, loginApi, loginWithoutFCMApi } from '@/apis/UserApi'
import { UserInfoStateProps, isLoggedInState, ownerUserData, userInfoState } from '@/context/Atoms'
import Loading from '@/components/common/Loading'
import { registerServiceWorker, requestPermission } from '@/firebase-messaging-sw'

// 카카오 로그인 후 리다이렉션 페이지
const KakaoRedirection = () => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  const navigate = useNavigate()

  //카카오 인가코드
  const code = new URL(document.location.toString()).searchParams.get('code')
  // 리코일 userInfo
  const [userInfo, setUserInfo] = useRecoilState<UserInfoStateProps>(userInfoState)
  // 리코일 로그인 여부
  const setIsLoggedIn = useSetRecoilState(isLoggedInState)

  const ownerUserInfo = useRecoilValue(ownerUserData)

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
    if (isMobile) {
      loginWithoutFCMApi(kakaoAccessToken, nickname).then(async (res: LoginProps) => {
        if (res.status === 200) {
          console.log(res.data.accessToken)
          console.log(res.data.id)
          getUserInfo(res.data)
          setIsLoggedIn(true)
          console.log(userInfo)
          navigate(`/${res.data.nickname}`)
        } else {
          alert('로그인 실패')
          navigate('/login')
        }
      })
    } else {
      try {
        let fcmToken = await requestPermission()
        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          fcmToken: fcmToken,
        }))
        fcmToken.length > 0
          ? loginApi(kakaoAccessToken, nickname, fcmToken).then(async (res: LoginProps) => {
              if (res.status === 200) {
                console.log(res.data.accessToken)
                console.log(res.data.id)
                getUserInfo(res.data)
                setIsLoggedIn(true)
                console.log(userInfo)
                // 계정주인페이지에서 상세로그인 시는 계정주인 페이지로 유지
                // 첫 로그인페이지에서 로그인 시 내 페이지로
                {
                  ownerUserInfo.nickname === ''
                    ? navigate(`/${res.data.nickname}`)
                    : navigate(`/${ownerUserInfo.nickname}`)
                }
              } else {
                alert('로그인 실패')
                navigate('/login')
              }
            })
          : loginWithoutFCMApi(kakaoAccessToken, nickname).then(async (res: LoginProps) => {
              if (res.status === 200) {
                console.log(res.data.accessToken)
                console.log(res.data.id)
                getUserInfo(res.data)
                setIsLoggedIn(true)
                console.log(userInfo)
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
  }

  // 유저 정보 받아오기
  const getUserInfo = async (data: GetUserInfoProps) => {
    try {
      await getUserInfoApi(data.accessToken, data.id).then((res) => {
        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          memberId: data.id,
          nickname: data.nickname,
          email: data.email,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          profileImage: res.data.profileImage,
        }))
      })
    } catch (err) {
      console.log(err)
    }
  }

  // url에 code 받으면 getKakaoUserInfo 함수 실행
  useEffect(() => {
    if (code) {
      registerServiceWorker()
      getKakaoUserInfo(code)
    }
  }, [code])

  return <Loading />
}

export default KakaoRedirection
