import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import MainHeader from '@/components/common/MainHeader'
import MainProfile from '@/components/main/MainProfile'
import Feed from '@/components/main/Feed'
import Ask from '@/components/main/Ask'
import { userDataProps } from '@/components/main/types'
import { getMemberIdApi, isExistingNicknameApi } from '@/apis/MainInfoApi'
import { UserInfoStateProps, isMineState, userInfoState } from '@/context/Atoms'
import { colors } from '@/styles/colors'

const Main = () => {
  // url의 username
  const { username } = useParams<{ username: string }>()

  // 유저 존재 여부
  const [isExisting, setIsExisting] = useState<boolean>(false)
  const [userData, setUserData] = useState<userDataProps>({ nickname: 'flipit', memberId: -1 })

  const [isMyPage, setIsMyPage] = useRecoilState(isMineState)

  // 유저의 존재 여부 확인 및 memberId 조회
  const userCheck = (nickname: string) => {
    isExistingNicknameApi(nickname).then((result) => {
      result.isExisting == true && setIsExisting(true)
      result.isExisting == true &&
        getMemberIdApi(nickname).then((result) => {
          setUserData({ nickname: nickname, memberId: result.memberId })
          myMemberId == result.memberId ? setIsMyPage(true) : setIsMyPage(false)
        })
    })
  }

  // 리코일에서 받은 사용자의 userInfo
  const myInfo = useRecoilValue<UserInfoStateProps>(userInfoState)
  const myMemberId = myInfo.memberId

  useEffect(() => {
    if (username) {
      userCheck(username)
    }
  }, [])

  const [category, setCategory] = useState<number>(0)

  return (
    <>
      {isExisting ? (
        <Container>
          <MainHeader background={colors.white} />
          <MainProfile nickname={username} />
          <CategoryBox>
            <Category category={category} num={0} onClick={() => setCategory(0)}>
              질문
            </Category>
            <Category category={category} num={1} onClick={() => setCategory(1)}>
              피드
            </Category>
          </CategoryBox>
          {category ? <Feed /> : <Ask userInfo={userData} isMyPage={isMyPage} />}
        </Container>
      ) : (
        <Container>존재하지 않는 사용자입니다.</Container>
      )}
    </>
  )
}

export default Main
const Container = styled.div``
const CategoryBox = styled.div`
  display: flex;
  align-items: flex-end;
  height: 44px;
  flex: 1 0 0;
  gap: 18.5px;
  padding: 0px 21.25px;
  background-color: ${colors.white};
  border-bottom: 0.2px solid ${colors.grey4};
`
const Category = styled.div<{ category: number; num: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 0 0;
  height: 33px;
  gap: 9px;
  border-bottom: 2px solid ${(props) => (props.category == props.num ? colors.grey1 : colors.white)};
  color: ${(props) => (props.category == props.num ? colors.grey1 : colors.grey3)};
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  letter-spacing: -0.6px;
  cursor: pointer;
`