import { useState } from 'react'
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

export const getFeedsApi = (memberId: number, selectedDirectoryId: number) => {
  // const recent = 'createdDate,desc'
  // const sort = JSON.stringify(recent)

  if (selectedDirectoryId === 0) {
    let API = `/api/answers?memberId=${memberId}&page=0&size=30`
    return flipitAxios.get(API)
  } else {
    let API = `/api/answers?memberId=${memberId}&category=${selectedDirectoryId}&page=0&size=10`
    return flipitAxios.get(API)
  }
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
