import { useSetRecoilState } from 'recoil'
import { isLoggedInState, userInfoState } from '@/context/Atoms'

export const useLogout = () => {
  const setUserInfo = useSetRecoilState(userInfoState)
  const setIsLoggedIn = useSetRecoilState(isLoggedInState)

  const logout = () => {
    setUserInfo({
      accessToken: '',
      refreshToken: '',
      fcmToken: '',
      memberId: 0,
      email: '',
      nickname: '',
      profileImage: '',
    })
    setIsLoggedIn(false)
    window.location.href = '/login'
    console.log('토큰이 만료되어 자동으로 로그아웃 되었습니다.')
  }

  return { logout }
}
