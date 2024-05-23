import axios from 'axios'
import { stringify } from 'qs'
const baseURL = import.meta.env.VITE_NEW_SERVER_URL

export const flipitAxios = axios.create({
  baseURL,
  paramsSerializer: (params) => {
    return stringify(params, { arrayFormat: 'brackets' })
  },
})

export const postRefreshToken = async (refreshToken: string, setUserInfo: any) => {
  console.log(refreshToken)
  try {
    let API = '/api/auth/token/refresh'
    const response = await flipitAxios.post(
      API,
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      },
    )
    const newAccessToken = response.data.accessToken
    setUserInfo((prevData: any) => ({ ...prevData, accessToken: newAccessToken }))
    console.log(newAccessToken)
    return newAccessToken
  } catch (error: any) {
    console.log(error)
    if (error.response.data.errorCode === 'T-001') {
      window.location.href = '/login'
      setUserInfo({
        accessToken: '',
        refreshToken: '',
        fcmToken: '',
        memberId: 0,
        email: '',
        nickname: '',
        profileImage: '',
      })
    }
  }
}
