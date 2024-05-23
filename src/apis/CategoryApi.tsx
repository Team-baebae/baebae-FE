import { flipitAxios, postRefreshToken } from './apis'

export const getCategoriesApi = (memberId: number) => {
  let API = `/api/category/${memberId}`
  return flipitAxios.get(API)
}

export const makeCategoryApi = async (
  accessToken: string,
  memberId: number,
  groupImgFile: File | undefined,
  groupName: string,
  selectedAnswerIds: any,
  refreshToken: string,
  setUserInfo: any,
) => {
  const makeRequest = async (token: string) => {
    // FormData 객체 생성
    const formData = new FormData()
    // categoryImage가 undefined가 아니면 FormData에 추가
    if (groupImgFile) {
      formData.append('categoryImage', groupImgFile)
    } else {
      console.warn('No category image provided')
    }
    const createCategory = {
      categoryName: groupName,
      answerIds: selectedAnswerIds,
    }
    formData.append('createCategory', JSON.stringify(createCategory))

    let API = `/api/category/${memberId}`
    return flipitAxios.post(API, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data', // 컨텐츠 타입을 multipart/form-data로 지정
      },
    })
  }
  try {
    return await makeRequest(accessToken)
  } catch (error: any) {
    console.error(error)
    if (error.response.data.errorCode === 'T-001') {
      const newAccessToken = await postRefreshToken(refreshToken, setUserInfo)
      console.log('new' + newAccessToken)
      return await makeRequest(newAccessToken)
    }
  }
}

export const deleteCategoryApi = async (
  accessToken: string,
  categoryId: number,
  refreshToken: string,
  setUserInfo: any,
) => {
  const makeRequest = async (token: string) => {
    let API = `/api/category/${categoryId}`
    return flipitAxios.delete(API, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }
  try {
    return await makeRequest(accessToken)
  } catch (error: any) {
    console.error(error)
    if (error.response.data.errorCode === 'T-001') {
      const newAccessToken = await postRefreshToken(refreshToken, setUserInfo)
      console.log('new' + newAccessToken)
      return await makeRequest(newAccessToken)
    }
  }
}

export const modifyCategoryApi = async (
  accessToken: string,
  categoryId: number,
  categoryName: string,
  selectedAnswerIds: number[],
  refreshToken: string,
  setUserInfo: any,
) => {
  const makeRequest = async (token: string) => {
    let API = `/api/category/${categoryId}`
    return flipitAxios.put(
      API,
      {
        categoryName: categoryName,
        answerIds: selectedAnswerIds,
      },

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
  }
  try {
    return await makeRequest(accessToken)
  } catch (error: any) {
    console.error(error)
    if (error.response.data.errorCode === 'T-001') {
      const newAccessToken = await postRefreshToken(refreshToken, setUserInfo)
      console.log('new' + newAccessToken)
      return await makeRequest(newAccessToken)
    }
  }
}

export const updateCategoryImgApi = async (
  accessToken: string,
  categoryId: number,
  imageFile: File | undefined,
  refreshToken: string,
  setUserInfo: any,
) => {
  const makeRequest = async (token: string) => {
    const formData = new FormData()
    if (imageFile) formData.append('imageFile', imageFile)

    let API = `/api/category/${categoryId}/image`
    return flipitAxios.patch(API, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }
  try {
    return await makeRequest(accessToken)
  } catch (error: any) {
    console.error(error)
    if (error.response.data.errorCode === 'T-001') {
      const newAccessToken = await postRefreshToken(refreshToken, setUserInfo)
      console.log('new' + newAccessToken)
      return await makeRequest(newAccessToken)
    }
  }
}

export const getCategoryListOfFeedApi = async (
  accessToken: string,
  answerId: number,
  refreshToken: string,
  setUserInfo: any,
) => {
  const makeRequest = async (token: string) => {
    let API = `/api/categorizedAnswer/${answerId}`
    return flipitAxios.get(API, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }
  try {
    return await makeRequest(accessToken)
  } catch (error: any) {
    console.error(error)
    if (error.response.data.errorCode === 'T-001') {
      const newAccessToken = await postRefreshToken(refreshToken, setUserInfo)
      console.log('new' + newAccessToken)
      return await makeRequest(newAccessToken)
    }
  }
}

export const modifyCategoryListOfFeedApi = async (
  accessToken: string,
  answerId: number,
  categoryIds: number[],
  refreshToken: string,
  setUserInfo: any,
) => {
  const makeRequest = async (token: string) => {
    let API = `/api/categorizedAnswer/${answerId}`
    return flipitAxios.put(
      API,
      {
        categoryIds: categoryIds,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
  }
  try {
    return await makeRequest(accessToken)
  } catch (error: any) {
    console.error(error)
    if (error.response.data.errorCode === 'T-001') {
      const newAccessToken = await postRefreshToken(refreshToken, setUserInfo)
      console.log('new' + newAccessToken)
      return await makeRequest(newAccessToken)
    }
  }
}
