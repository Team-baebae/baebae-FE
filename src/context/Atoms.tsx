import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

//유저 정보 저장
export interface UserInfoStateProps {
  accessToken: string
  refreshToken: string
  fcmToken: string
  memberId: number
  email: string
  nickname: string
  profileImage: string
}

export const userInfoState = atom<UserInfoStateProps>({
  key: 'userInfoState',
  default: {
    accessToken: '',
    refreshToken: '',
    fcmToken: '',
    memberId: 0,
    email: '',
    nickname: '',
    profileImage: '',
  },
  effects: [persistAtom],
})

// 로그인 상태 관리
export const isLoggedInState = atom({
  key: 'isLoggedInState',
  default: false,
  effects: [persistAtom],
})

// 자신의 홈인지 확인
export const isMineState = atom({
  key: 'isMineState',
  default: false,
  effects: [persistAtom],
})

export interface ownerUserDataProps {
  nickname: string
  memberId: number
  imageUrl: string
}

export const ownerUserData = atom({
  key: 'ownerUserData',
  default: {
    nickname: '',
    memberId: 0,
    imageUrl: '',
  },
  effects: [persistAtom],
})

export const selectedQuestionState = atom<number[]>({
  key: 'selectedQuestionState',
  default: [],
})

export const followerCountState = atom<number>({
  key: 'followerCountState',
  default: 0,
})

export const followingCountState = atom<number>({
  key: 'followingCountState',
  default: 0,
})
