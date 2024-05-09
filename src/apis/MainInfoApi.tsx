import { flipitAxios } from './apis'

interface QuestionProps {
  content: string
  nickname: string
  profileOnOff: boolean
}

// 닉네임 중복 여부 확인해서 해당 유저 존재하는지 체크하는 api
export const isExistingNicknameApi = async (nickname: string) => {
  try {
    let API = `/api/oauth/nickname/isExisting`
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

// 질문 보내는 api
export const postQuestionApi = async (memberId: number, question: QuestionProps, accessToken: string) => {
  try {
    let API = `/api/questions/member/${memberId}`
    const response = await flipitAxios.post(API, question, {
      params: memberId,
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    })
  } catch (error) {
    console.error(error)
  }
}

// 질문 조회 api -> pageable param 추가 필요
export const getQuestionsApi = async (memberId: number) => {
  try {
    let API = `/api/questions`
    const response = await flipitAxios.get(API, {
      params: memberId,
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
}

// 질문 삭제 api
export const deleteQuestionsApi = async (questionId: number) => {
  try {
    let API = `/api/questions/${questionId}`
    const response = await flipitAxios.delete(API, {
      params: questionId,
    })
  } catch (error) {
    console.error(error)
  }
}
