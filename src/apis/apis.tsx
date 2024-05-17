import { isLoggedInState, userInfoState, UserInfoStateProps } from '@/context/Atoms'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { stringify } from 'qs'
import { useRecoilState, useSetRecoilState } from 'recoil'
interface MyErrorResponse {
  message: string
}

const baseURL = import.meta.env.VITE_NEW_SERVER_URL

export const flipitAxios = axios.create({
  baseURL,
  paramsSerializer: (params) => {
    return stringify(params, { arrayFormat: 'brackets' })
  },
})

flipitAxios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const originalConfig = error.config
    const message = error.response.data.message
    const status = error.response.status

    if (status === 401 && message === '해당 토큰이 만료되었습니다.') {
      refreshTokenAndRetry(originalConfig, () => logout())
    }
    return Promise.reject(error)
  },
)

// accessToken 만료
const refreshTokenAndRetry = async (originalConfig: AxiosRequestConfig, errorCallback: () => void) => {
  const [userInfo, setUserInfo] = useRecoilState<UserInfoStateProps>(userInfoState)
  try {
    const response = await axios({
      url: `${baseURL}/api/auth/token/refresh`,
      method: 'Post',
      headers: {
        Authorization: `Bearer ${userInfo.refreshToken}`,
      },
    })
    const newAccessToken = response.data.accessToken
    // 토큰을 업데이트 후, 이전 요청 다시 시도
    setUserInfo({
      ...userInfo,
      accessToken: newAccessToken,
    })
    if (originalConfig.headers) {
      originalConfig.headers['Authorization'] = 'Bearer ' + newAccessToken
    }
    return flipitAxios(originalConfig)
  } catch (refreshError) {
    const error = refreshError as AxiosError<MyErrorResponse>
    const errorMessage = error.response?.data?.message
    // 리프레시 토큰 만료된 경우
    if (errorMessage === '해당 토큰이 만료되었습니다.') {
      // errorCallback(logout 함수)을 호출하여 처리
      errorCallback()
    }
    return Promise.reject(refreshError)
  }
}

// refreshToken 만료될 때 호출되는 로그아웃 함수
const logout = () => {
  const setUserInfo = useSetRecoilState<UserInfoStateProps>(userInfoState)
  const setIsLoggedIn = useSetRecoilState<boolean>(isLoggedInState)

  setUserInfo({
    accessToken: '',
    refreshToken: '',
    fcmToken: '',
    memberId: 0,
    email: '',
    nickname: '',
    profileImage: '',
  })
  setIsLoggedIn(false)
  window.location.href = '/login'
  console.log('토큰이 만료되어 자동으로 로그아웃 되었습니다.')
}
