import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

//유저 정보 저장
export interface UserInfoStateProps {
  accessToken: string
  refreshToken: string
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
    memberId: 0,
    email: '',
    nickname: '',
    profileImage: '',
  },
  effects: [persistAtom],
})

// 로그인 상태 관리
export const isLoggedInState = atom({
  key: 'isLoggedIn',
  default: false,
  effects: [persistAtom],
})
