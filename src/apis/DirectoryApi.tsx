import axios from 'axios'

const serverUrl = import.meta.env.VITE_SERVER_URL

export const getDirectoriesApi = (accessToken: string, memberId: number) => {
  return axios.get(`http://${serverUrl}/api/category/${memberId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export const makeDirectoryApi = (
  accessToken: string,
  memberId: number,
  categoryImage: File | undefined,
  categoryName: string,
  answerIds: any,
) => {
  // FormData 객체 생성
  const formData = new FormData()
  // categoryImage가 undefined가 아니면 FormData에 추가
  if (categoryImage) {
    formData.append('categoryImage', categoryImage)
  } else {
    console.warn('No category image provided')
  }
  const createCategory = {
    categoryName: categoryName,
    answerIds: answerIds,
  }
  formData.append('createCategory', JSON.stringify(createCategory))

  return axios.post(`http://${serverUrl}/api/category/${memberId}`, formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'multipart/form-data', // 컨텐츠 타입을 multipart/form-data로 지정
    },
  })
}

export const deleteDirectoryApi = (accessToken: string, categoryId: number) => {
  return axios.delete(`http://${serverUrl}/api/category/${categoryId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export const modifyDirectoryApi = (accessToken: string, categoryId: number, categoryName: string, answerIds: any) => {
  return axios.put(
    `http://${serverUrl}/api/category/${categoryId}`,
    {
      categoryId: categoryId,
      categoryName: categoryName,
      answerIds: answerIds,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )
}

export const updateDirectoryImgApi = (accessToken: string, categoryId: number, imageFile: File) => {
  return axios.patch(
    `http://${serverUrl}/api/category/${categoryId}/image`,
    {
      imageFile: imageFile,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )
}
