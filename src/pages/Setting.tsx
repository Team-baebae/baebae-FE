import styled from 'styled-components'
import Header from '../components/common/Header'
import Profile from '../components/setting/Profile'
import { colors } from '../styles/colors'
import Settings from '../components/setting/Settings'
import AlramSetting from '../components/setting/AlramSetting'

const Setting = () => {
  return (
    <>
      <Header text="설정" background={colors.white} />
      <Profile />
      <Settings />
      <Title>알림 설정</Title>
      <AlramSetting />
    </>
  )
}

export default Setting

const Title = styled.div`
  margin: 10px 20px 12px 20px;
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`
