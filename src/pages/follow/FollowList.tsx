import Header from '@/components/common/Header'
import Followers from '@/components/follow/Followers'
import Followings from '@/components/follow/Followings'
import { StyledToastContainer } from '@/components/toast/toastStyle'
import { followerCountState, followingCountState, ownerUserData } from '@/context/Atoms'
import useFollowCount from '@/hooks/useFollowCount'
import { colors } from '@/styles/colors'
import { useState } from 'react'
import { Flip } from 'react-toastify'
import { useRecoilState, useRecoilValue } from 'recoil'
import styled from 'styled-components'

const FollowList = () => {
  const [category, setCategory] = useState<number>(0)
  const [ownerUserInfo] = useRecoilState(ownerUserData)
  useFollowCount(ownerUserInfo)

  const followerCount = useRecoilValue(followerCountState)
  const followingCount = useRecoilValue(followingCountState)

  return (
    <Container>
      <Header text="친구 목록" background={colors.white} />
      <CategoryBox>
        <Category category={category} num={0} onClick={() => setCategory(0)}>
          팔로잉 {followingCount}
        </Category>
        <Category category={category} num={1} onClick={() => setCategory(1)}>
          팔로워 {followerCount}
        </Category>
      </CategoryBox>
      {category ? <Followers /> : <Followings />}
      <StyledToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar
        pauseOnHover={false}
        closeOnClick={false}
        closeButton={false}
        rtl={false}
        theme="dark"
        transition={Flip}
      />
    </Container>
  )
}

export default FollowList

const Container = styled.div`
  background-color: ${colors.white};
  height: 100%;
`
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
