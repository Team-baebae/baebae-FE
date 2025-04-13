import styled from 'styled-components'
import { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { colors } from '@/styles/colors'
import { followerCountState, followingCountState, isMineState, ownerUserData } from '@/context/Atoms'
import ProfileButtons from './ProfileButtons'
import { useNavigate } from 'react-router-dom'
import ProfileImage from './ProfileImage'
import { StyledToastContainer } from '../toast/toastStyle'
import { Flip } from 'react-toastify'
import useFollowCount from '@/hooks/useFollowCount'

interface MainProfileProps {
  nickname: string
  imageUrl: string
}

const MainProfile = ({ nickname, imageUrl }: MainProfileProps) => {
  const ownerUserInfo = useRecoilValue(ownerUserData)
  useFollowCount(ownerUserInfo)
  const isMyPage = useRecoilValue(isMineState)
  const followerCount = useRecoilValue(followerCountState)
  const followingCount = useRecoilValue(followingCountState)

  const isMine = useMemo(() => JSON.stringify(isMyPage) === 'true', [isMyPage])

  const navigate = useNavigate()
  const handleFollowClick = () => {
    isMine && navigate('/follows')
  }

  return (
    <Container>
      <ImageWrapper>
        <ProfileImage imageUrl={imageUrl} />
      </ImageWrapper>
      <ProfileContents>
        <Nickname>{nickname}</Nickname>
        <FollowInfo onClick={handleFollowClick}>
          <span>팔로잉 {followingCount}</span>
          <span>|</span>
          <span>팔로워 {followerCount}</span>
        </FollowInfo>
        <ProfileButtons />
      </ProfileContents>
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

export default MainProfile

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 12px 20px;
  background-color: ${colors.white};
`
const ImageWrapper = styled.div`
  width: 70px;
  height: 70px;
  perspective: 800px;
  border-radius: 100px;
  margin-right: 20px;
  cursor: pointer;
`
const ProfileContents = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`
const Nickname = styled.div`
  color: ${colors.grey1};
  font-size: 18px;
  font-weight: 700;
  line-height: 150%;
  letter-spacing: -0.36px;
  margin-bottom: 4px;
`
const FollowInfo = styled.div`
  display: flex;
  gap: 12px;
  color: ${colors.grey4};
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.6px;
  margin-bottom: 22px;
  cursor: pointer;
`
