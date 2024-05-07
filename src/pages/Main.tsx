import styled from 'styled-components'
import { colors } from '../styles/colors'
import { useParams } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import MainHeader from '../components/common/MainHeader'
import MainProfile from '../components/main/MainProfile'
import Feed from '../components/main/Feed'
import Ask from '../components/main/Ask'
import { getUserInfoApi } from '../apis/UserApi'
import { useRecoilState } from 'recoil'
import { UserInfoStateProps, userInfoState } from '../context/Atoms'

const Main = () => {
  const { username } = useParams<{ username: string }>()
  const [userData, setUserData] = useState<string | undefined>(undefined)

  // 리코일에서 받은 userInfo
  const [userInfo, setUserInfo] = useRecoilState<UserInfoStateProps>(userInfoState)

  // 회원정보 받기 (프로필 이미지 저장)
  const getUserInfo = useCallback(async (userInfo: UserInfoStateProps) => {
    try {
      await getUserInfoApi(userInfo.accessToken, userInfo.memberId).then((res) => {
        console.log(res)
        setUserInfo({
          ...userInfo,
          profileImage: res.data.profileImage,
        })
      })
    } catch (err) {
      console.log(err)
    }
  }, [])

  useEffect(() => {
    getUserInfo(userInfo)
    setUserData(username)
    console.log(username)
  }, [username, getUserInfo])

  const [category, setCategory] = useState<number>(0)

  return (
    <>
      <Container>
        <MainHeader backColor={colors.white} />
        <MainProfile nickname={username} />
        <CategoryBox>
          <Category category={category} num={0} onClick={() => setCategory(0)}>
            질문
          </Category>
          <Category category={category} num={1} onClick={() => setCategory(1)}>
            피드
          </Category>
        </CategoryBox>
        {category ? <Feed /> : <Ask params={{ username: userData }} />}
      </Container>
    </>
  )
}

export default Main
const Container = styled.div`
  height: 100vh;
`
const CategoryBox = styled.div`
  display: flex;
  height: 44px;
  align-items: flex-end;
  flex: 1 0 0;
  gap: 18.5px;
  padding: 0px 21.25px;
  background-color: ${colors.white};
  border-bottom: 0.2px solid ${colors.grey4};
`
const Category = styled.div<{ category: number; num: number }>`
  display: flex;
  flex: 1 0 0;
  flex-direction: column;
  height: 33px;
  align-items: center;
  gap: 9px;
  border-bottom: 2px solid ${(props) => (props.category == props.num ? colors.grey1 : colors.white)};
  color: ${(props) => (props.category == props.num ? colors.grey1 : colors.grey3)};
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px;
  letter-spacing: -0.6px;
  cursor: pointer;
`
