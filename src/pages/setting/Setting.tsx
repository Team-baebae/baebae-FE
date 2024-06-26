// import styled from 'styled-components'
import { useRecoilValue } from 'recoil'
import Header from '@/components/common/Header'
import Profile from '@/components/setting/Profile'
import Settings from '@/components/setting/Settings'
import { ownerUserData, userInfoState } from '@/context/Atoms'
// import AlramSetting from '@/components/setting/AlramSetting'
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
      {/* 향후 추가예정 */}
      {/* <Title>알림 설정</Title> */}
      {/* <AlramSetting /> */}
    </>
  )
}

export default Setting

// const Title = styled.div`
//   margin: 10px 20px 12px 20px;
//   color: ${colors.grey1};
//   font-family: Pretendard;
//   font-size: 16px;
//   font-weight: 600;
// `
