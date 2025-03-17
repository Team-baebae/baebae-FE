import { flipitAxios, postRefreshToken } from './apis'

export const getIsFollowingApi = async (
  followerId: number,
  followingId: number,
  accessToken: string,
  refreshToken: string,
  setUserInfo: any,
) => {
  const makeRequest = async (token: string) => {
    let API = `/api/follow/isFollowing/${followerId}/${followingId}`
    const response = await flipitAxios.get(API, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  }
  try {
    return await makeRequest(accessToken)
  } catch (error: any) {
    console.error(error)
    if (error.response.data.errorCode === 'T-001') {
      const newAccessToken = await postRefreshToken(refreshToken, setUserInfo)
      return await makeRequest(newAccessToken)
    }
  }
}

export const postFollowApi = async (
  followerId: number,
  followingId: number,
  accessToken: string,
  refreshToken: string,
  setUserInfo: any,
) => {
  const makeRequest = async (token: string) => {
    let API = `/api/follow/${followerId}/${followingId}`
    const response = await flipitAxios.post(
      API,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return response.data
  }
  try {
    return await makeRequest(accessToken)
  } catch (error: any) {
    console.error(error)
    if (error.response.data.errorCode === 'T-001') {
      const newAccessToken = await postRefreshToken(refreshToken, setUserInfo)
      return await makeRequest(newAccessToken)
    }
  }
}

export const deleteFollowApi = async (
  followerId: number,
  followingId: number,
  accessToken: string,
  refreshToken: string,
  setUserInfo: any,
) => {
  const makeRequest = async (token: string) => {
    let API = `/api/follow/${followerId}/${followingId}`
    const response = await flipitAxios.delete(API, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  }
  try {
    return await makeRequest(accessToken)
  } catch (error: any) {
    console.error(error)
    if (error.response.data.errorCode === 'T-001') {
      const newAccessToken = await postRefreshToken(refreshToken, setUserInfo)
      return await makeRequest(newAccessToken)
    }
  }
}

export const checkNewFollowApi = async (
  memberId: number,
  accessToken: string,
  refreshToken: string,
  setUserInfo: any,
) => {
  const makeRequest = async (token: string) => {
    let API = `/api/follow/followers/relation/update/${memberId}`
    const response = await flipitAxios.patch(
      API,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return response.data
  }
  try {
    return await makeRequest(accessToken)
  } catch (error: any) {
    console.error(error)
    if (error.response.data.errorCode === 'T-001') {
      const newAccessToken = await postRefreshToken(refreshToken, setUserInfo)
      return await makeRequest(newAccessToken)
    }
  }
}

export const getNewFollowApi = async (
  memberId: number,
  accessToken: string,
  refreshToken: string,
  setUserInfo: any,
) => {
  const makeRequest = async (token: string) => {
    let API = `/api/follow/followers/new/${memberId}`
    const response = await flipitAxios.get(API, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  }
  try {
    return await makeRequest(accessToken)
  } catch (error: any) {
    console.error(error)
    if (error.response.data.errorCode === 'T-001') {
      const newAccessToken = await postRefreshToken(refreshToken, setUserInfo)
      return await makeRequest(newAccessToken)
    }
  }
}

export const getFollowingsApi = async (
  memberId: number,
  accessToken: string,
  refreshToken: string,
  setUserInfo: any,
  page: number,
) => {
  const makeRequest = async (token: string) => {
    let API = `/api/follow/followings/${memberId}`
    const response = await flipitAxios.get(API, {
      params: { page, size: 15 },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  }
  try {
    return await makeRequest(accessToken)
  } catch (error: any) {
    console.error(error)
    if (error.response.data.errorCode === 'T-001') {
      const newAccessToken = await postRefreshToken(refreshToken, setUserInfo)
      return await makeRequest(newAccessToken)
    }
  }
}

export const getFollowersApi = async (
  memberId: number,
  accessToken: string,
  refreshToken: string,
  setUserInfo: any,
  page: number,
) => {
  const makeRequest = async (token: string) => {
    let API = `/api/follow/followers/${memberId}`
    const response = await flipitAxios.get(API, {
      params: { page, size: 15 },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  }

  try {
    return await makeRequest(accessToken)
  } catch (error: any) {
    console.error(error)
    if (error.response.data.errorCode === 'T-001') {
      const newAccessToken = await postRefreshToken(refreshToken, setUserInfo)
      return await makeRequest(newAccessToken)
    }
  }
}
