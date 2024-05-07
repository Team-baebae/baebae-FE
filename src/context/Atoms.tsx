import { atom } from 'recoil'

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
})
