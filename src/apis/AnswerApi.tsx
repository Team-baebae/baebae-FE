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
