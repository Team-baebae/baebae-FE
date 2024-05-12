import { flipitAxios } from './apis'

const redirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI

// 인가코드를 통해 카카오에 등록된 유저정보 받기
export const getKakaoUserInfoApi = (code: string) => {
  let API = `/oauth/kakao/callback?code=${code}&redirectUri=${redirectUri}`
  return flipitAxios.get(API)
}

// 카카오 어세스토큰을 통하여 회원가입 여부 확인
export const isExistingAccountApi = (accessToken: string) => {
  let API = `/api/oauth/isExisting`
  return flipitAxios.get(API, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

// 존재하는 닉네임인지 여부확인
export const isExistingNicknameApi = (nickname: string) => {
  let API = `/api/oauth/nickname/isExisting?nickname=${nickname}`
  return flipitAxios.get(API)
}

// 카카오 어세스토큰을 통하여 jwt토큰 받기
export const loginApi = (accessToken: string, nickname: string) => {
  let API = `/api/oauth/login`
  return flipitAxios.post(
    API,
    { memberType: 'KAKAO', nickname: nickname },
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  )
}

// 유저 정보 받기
export const getUserInfoApi = (accessToken: string, memberId: number) => {
  let API = `/api/member/${memberId}`
  return flipitAxios.get(API, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

// 유저 프로필 사진 업데이트
export const updateUserProfileApi = (accessToken: string, memberId: number, imageFile: File) => {
  // FormData 객체 생성
  const formData = new FormData()
  // 이미지 파일을 'profileImage' 키로 추가
  formData.append('image', imageFile)

  let API = `/api/member/profile-image/${memberId}`
  // PATCH 요청
  return flipitAxios.patch(API, formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'multipart/form-data', // 컨텐츠 타입을 multipart/form-data로 지정
    },
  })
}

// 유저 아이디 변경
export const updateUserNicknameApi = (accessToken: string, memberId: number, nickname: string) => {
  let API = `/api/member/nickname/${memberId}`
  return flipitAxios.patch(
    API,
    {
      nickname: nickname,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )
}

// 로그아웃
export const logoutApi = (accessToken: string) => {
  let API = `/api/oauth/logout`
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

// 회원탈퇴
export const signOutApi = (accessToken: string, memberId: number) => {
  let API = `/api/member/${memberId}`
  return flipitAxios.delete(API, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
