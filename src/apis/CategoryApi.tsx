import { flipitAxios } from './apis'

export const getCategoriesApi = (memberId: number) => {
  let API = `/api/category/${memberId}`
  return flipitAxios.get(API)
}

export const makeCategoryApi = (
  accessToken: string,
  memberId: number,
  groupImgFile: File | undefined,
  groupName: string,
  selectedAnswerIds: any,
) => {
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
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'multipart/form-data', // 컨텐츠 타입을 multipart/form-data로 지정
    },
  })
}

export const deleteCategoryApi = (accessToken: string, categoryId: number) => {
  let API = `/api/category/${categoryId}`
  return flipitAxios.delete(API, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export const modifyCategoryApi = (
  accessToken: string,
  categoryId: number,
  categoryName: string,
  selectedAnswerIds: number[],
) => {
  let API = `/api/category/${categoryId}`
  return flipitAxios.put(
    API,
    {
      categoryName: categoryName,
      answerIds: selectedAnswerIds,
    },

    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )
}

export const updateCategoryImgApi = (accessToken: string, categoryId: number, imageFile: File | undefined) => {
  const formData = new FormData()
  if (imageFile) formData.append('imageFile', imageFile)

  let API = `/api/category/${categoryId}/image`
  return flipitAxios.patch(API, formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
