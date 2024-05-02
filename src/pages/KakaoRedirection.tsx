import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { getKakaoUserInfoApi, loginApi } from '../apis/UserApi'
import loading from '../assets/kakaoRedirection/Loading.svg'

const KakaoRedirection = () => {
  //카카오 인가코드
  const code = new URL(document.location.toString()).searchParams.get('code')
  const navigate = useNavigate()

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
          navigate('/signup', {
            state: {
              kakaoAccessToken: res.data.access_token,
            },
          })
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
    <RedirectionOuterComponent>
      <LoadingLoginImg src={loading} alt="loading" />
      <LoadingLoginText>Loading..</LoadingLoginText>
    </RedirectionOuterComponent>
  )
}

export default KakaoRedirection

const RedirectionOuterComponent = styled.div`
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
