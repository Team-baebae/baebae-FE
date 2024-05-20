import { flipitAxios } from './apis'

export const answerApi = (accessToken: string, memberId: number, imageFile: File | undefined, request: any) => {
  let API = `/api/answers/${memberId}`

  // FormData 객체 생성
  const formData = new FormData()
  // categoryImage가 undefined가 아니면 FormData에 추가
  if (imageFile) {
    formData.append('imageFile', imageFile)
  }

  formData.append('request', JSON.stringify(request))
  return flipitAxios.post(API, formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export const getFeedsApi = (memberId: number, selectedDirectoryId: number, page: number) => {
  const recent = ['createdDate,desc']
  const categoryRecent = ['answer.createdDate,desc']
  if (selectedDirectoryId === 0) {
    let API = `/api/answers?memberId=${memberId}&page=${page}&size=6&sort=${recent}`
    return flipitAxios.get(API)
  } else {
    let API = `/api/answers?memberId=${memberId}&categoryId=${selectedDirectoryId}&page=${page}&size=6&sort=${categoryRecent}`
    return flipitAxios.get(API)
  }
}

export const getTotalFeedsApi = (memberId: number) => {
  const recent = ['createdDate,desc']

  let API = `/api/answers?memberId=${memberId}&sort=${recent}`
  return flipitAxios.get(API)
}

export const connectGroupApi = (accessToken: string, categoryId: number, answerId: number) => {
  let API = `/api/category/${categoryId}/answers/${answerId}`
  return flipitAxios.post(
    API,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )
}

export const deleteFeedApi = (accessToken: string, answerId: number) => {
  let API = `/api/answers/${answerId}`
  return flipitAxios.delete(API, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export const modifyFeedApi = (accessToken: string, answerId: number, imageFile: File | undefined, request: any) => {
  let API = `/api/answers/${answerId}`

  // FormData 객체 생성
  const formData = new FormData()
  // categoryImage가 undefined가 아니면 FormData에 추가
  if (imageFile && imageFile !== undefined) {
    formData.append('imageFile', imageFile)
  }

  formData.append(
    'request',
    JSON.stringify({
      ...request,
      updateImage: imageFile === undefined ? false : true,
    }),
  )
  return flipitAxios.put(API, formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'multipart/form-data', // 컨텐츠 타입을 multipart/form-data로 지정
    },
  })
}

export const getReactCountApi = (answerId: number) => {
  let API = `/api/reactionsCount/${answerId}/reactionsCount`
  return flipitAxios.get(API)
}

export const getIsReactedApi = (accessToken: string, answerId: number, memberId: number) => {
  let API = `/api/answers/${answerId}/reacted?memberId=${memberId}`
  return flipitAxios.get(API, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export const postReactApi = (accessToken: string, answerId: number, memberId: number, reaction: string) => {
  let API = `/api/reactions/${memberId}/${answerId}`
  return flipitAxios.post(
    API,
    {
      reaction: reaction,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )
}

export const extractImage = (accessToken: string, url: string) => {
  let API = `/api/image?url=${url}`
  return flipitAxios.get(API, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
