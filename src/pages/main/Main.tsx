import styled from 'styled-components'
import { useLocation, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import MainHeader from '@/components/common/MainHeader'
import MainProfile from '@/components/main/MainProfile'
import Feed from '@/components/feed/Feed'
import Ask from '@/components/question/Ask'
import NoUser from '@/components/main/NoUser'
import { getMemberIdApi, getOwnerProfileApi, isExistingNicknameApi } from '@/apis/MainInfoApi'
import { UserInfoStateProps, isMineState, ownerUserData, userInfoState } from '@/context/Atoms'
import { colors } from '@/styles/colors'

// 로그인 성공 시 메인 페이지
const Main = () => {
  // 넘겨받은 값 저장 (메인페이지 질문인지 피드인지, 피드일경우 어느 디렉토리인지)
  const location = useLocation()
  const defaultCategory = location.state?.defaultCategory || 0

  // url의 username 뽑아내기
  const { username } = useParams<{ username: string }>()
  // 로딩중 여부
  const [isLoading, setIsLoading] = useState<boolean>(true)
  // 유저 존재 여부
  const [isExisting, setIsExisting] = useState<boolean>(false)
  // 리코일 계정주인 데이터 정보
  const [userData, setUserData] = useRecoilState(ownerUserData)
  // 내 페이지인지 여부 전역 변수에 저장
  const setIsMyPage = useSetRecoilState(isMineState)
  // 리코일에서 받은 로그인한 사용자의 userInfo
  const myInfo = useRecoilValue<UserInfoStateProps>(userInfoState)
  // category=0은 질문, 1은 피드
  const [category, setCategory] = useState<number>(defaultCategory)

  // 유저의 존재 여부 확인 및 계정주인의 memberId 조회
  const userCheck = (nickname: string) => {
    isExistingNicknameApi(nickname).then((result) => {
      result.isExisting == true && setIsExisting(true)
      result.isExisting == true &&
        getMemberIdApi(nickname).then((result) => {
          getOwnerProfileApi(result.memberId).then((response) => {
            setUserData({
              nickname: nickname,
              memberId: result.memberId,
              imageUrl: response.imageUrl,
            })
          })
        })
      setIsLoading(false)
    })
  }
  // url의 닉네임으로 실제 있는 계정인지 확인
  useEffect(() => {
    if (username) {
      username === myInfo.nickname ? setIsMyPage(true) : setIsMyPage(false)
      userCheck(username)
    }
  }, [username])

  return isLoading ? (
    <></>
  ) : isExisting ? (
    <Container>
      <MainHeader background={colors.white} />
      {username && <MainProfile nickname={username} imageUrl={userData.imageUrl} />}
      <CategoryBox>
        <Category category={category} num={0} onClick={() => setCategory(0)}>
          질문
        </Category>
        <Category category={category} num={1} onClick={() => setCategory(1)}>
          피드
        </Category>
      </CategoryBox>
      {category ? <Feed username={username} /> : <Ask isMine={username === myInfo.nickname} username={username} />}
    </Container>
  ) : (
    <NoUser />
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
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  letter-spacing: -0.6px;
  cursor: pointer;
`
