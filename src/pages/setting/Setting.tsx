import { useRecoilValue } from 'recoil'
import Header from '@/components/common/Header'
import Profile from '@/components/setting/Profile'
import Settings from '@/components/setting/Settings'
import { ownerUserData, userInfoState } from '@/context/Atoms'
import { colors } from '@/styles/colors'

// 설정 페이지
const Setting = () => {
  const userInfo = useRecoilValue(userInfoState)
  const ownerInfo = useRecoilValue(ownerUserData)
  return (
    <>
      <Header text="설정" background={colors.white} route={`${ownerInfo.nickname}`} />
      <Profile imageUrl={userInfo.profileImage} />
      <Settings />
    </>
  )
}

export default Setting
