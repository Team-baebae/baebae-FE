import { flipitAxios } from './apis'

interface QuestionProps {
  content: string
  nickname: string
  profileOnOff: boolean
}

// 닉네임 중복 여부 확인해서 해당 유저 존재하는지 체크하는 api
export const isExistingNicknameApi = async (nickname: string) => {
  try {
    let API = `/api/auth/nickname/isExisting?nickname=${nickname}`
    const response = await flipitAxios.get(API, {
      params: nickname,
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
}

// // 회원 닉네임으로 id 조회하는 api
export const getMemberIdApi = async (nickname: string) => {
  try {
    let API = `api/member/nickname/${nickname}`
    const response = await flipitAxios.get(API, {
      params: nickname,
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getOwnerProfileApi = async (memberId: number) => {
  try {
    let API = `api/member/profile-image/${memberId}`
    const response = await flipitAxios.get(API, {
      params: memberId,
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
}

// 질문 보내는 api
export const postQuestionApi = async (memberId: number, question: QuestionProps, accessToken: string) => {
  try {
    let API = `/api/questions/member/${memberId}`
    const response = await flipitAxios.post(API, question, {
      params: memberId,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getQuestionLengthApi = async (accessToken: string, memberId: number) => {
  try {
    let API = `/api/questions/unanswered/count/${memberId}`
    const response = await flipitAxios.get(API, {
      params: memberId,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
}

// 답변하지 않은 질문 조회 api -> pageable param 추가 필요
export const getQuestionsApi = async (memberId: number, page: number, accessToken: string) => {
  try {
    let API = `/api/questions/unanswered/${memberId}?page=${page}&size=8`
    const response = await flipitAxios.get(API, {
      params: memberId,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
}

// 질문 삭제 api
export const deleteQuestionsApi = async (questionId: number, accessToken: string) => {
  try {
    let API = `/api/questions/${questionId}`
    await flipitAxios.delete(API, {
      params: questionId,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  } catch (error) {
    console.error(error)
  }
}
