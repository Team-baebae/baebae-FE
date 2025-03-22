import { flipitAxios, postRefreshToken } from '@/apis/apis'

export const getSearchResultApi = async (
  keyword: string,
  page: number,
  accessToken: string,
  refreshToken: string,
  setUserInfo: any,
) => {
  if (!keyword) return { content: [], last: true }

  const fetchSearchResult = async (token: string) => {
    const API = `/api/member/search/${keyword}`
    const response = await flipitAxios.get(API, {
      params: { page, size: 15, sort: 'nickname' },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  }

  try {
    return await fetchSearchResult(accessToken)
  } catch (error: any) {
    console.error(error)

    if (error.response?.data?.errorCode === 'T-001') {
      const newAccessToken = await postRefreshToken(refreshToken, setUserInfo)
      return await fetchSearchResult(newAccessToken)
    }

    throw error
  }
}
