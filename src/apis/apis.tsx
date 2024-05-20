import { userInfoState, UserInfoStateProps } from '@/context/Atoms'
import { useLogout } from '@/context/utils'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { stringify } from 'qs'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'

interface MyErrorResponse {
  errorMessage: string
}

const baseURL = import.meta.env.VITE_NEW_SERVER_URL

export const flipitAxios = axios.create({
  baseURL,
  paramsSerializer: (params) => {
    return stringify(params, { arrayFormat: 'brackets' })
  },
})

// 어세스토큰 만료시 토큰 재발급하는 함수
const refreshTokenAndRetry = async (
  originalConfig: AxiosRequestConfig,
  userInfo: UserInfoStateProps,
  setUserInfo: (userInfo: UserInfoStateProps) => void,
  logout: () => void,
) => {
  try {
    // 어세스토큰 재발급 요청
    const response = await axios({
      url: `${baseURL}/api/auth/token/refresh`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${userInfo.refreshToken}`,
      },
    })

    // 어세스토큰 업데이트
    const newAccessToken = response.data.accessToken
    const updatedUserInfo = {
      ...userInfo,
      accessToken: newAccessToken,
    }
    setUserInfo(updatedUserInfo)

    if (originalConfig.headers) {
      originalConfig.headers['Authorization'] = `Bearer ${newAccessToken}`
    }
    return flipitAxios(originalConfig)
  } catch (refreshError) {
    // 리프레시 토큰 에러 발생 시
    const error = refreshError as AxiosError<MyErrorResponse>
    const errorMessage = error.response?.data?.errorMessage
    // 리프레시 토큰 만료 시
    if (errorMessage === '해당 토큰이 만료되었습니다.') {
      // 로그아웃 요청
      logout()
    }
    return Promise.reject(refreshError)
  }
}

// axios에서 error 발생
export const useAxiosInterceptors = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState)
  const { logout } = useLogout()

  useEffect(() => {
    flipitAxios.interceptors.response.use(
      (response) => {
        return response
      },
      async (error) => {
        const originalConfig = error.config
        const message = error.response?.data?.errorMessage
        const status = error.response?.status
        // 어세스토큰 만료된 경우
        if (status === 401 && message === '해당 토큰이 만료되었습니다.') {
          try {
            // 토큰 재발급 함수 실행
            await refreshTokenAndRetry(originalConfig, userInfo, setUserInfo, logout)
          } catch (retryError) {
            console.error(retryError)
          }
        }
        return Promise.reject(error)
      },
    )
  }, [userInfo, setUserInfo, logout])
}
