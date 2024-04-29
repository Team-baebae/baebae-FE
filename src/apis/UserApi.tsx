import axios from 'axios'

const serverUrl = import.meta.env.VITE_SERVER_URL
const redirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI

// 인가코드를 통해 카카오에 등록된 유저정보 받기
export const getKakaoUserInfoApi = (code: string) => {
  return axios.get(`http://${serverUrl}/oauth/kakao/callback?code=${code}&redirectUri=${redirectUri}`)
}

// 카카오 어세스토큰을 통하여 jwt토큰 받기
export const loginApi = (accessToken: string, nickname: string) => {
  return axios.post(
    `http://${serverUrl}/api/oauth/login`,
    { memberType: 'KAKAO', nickname: nickname },
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  )
}
