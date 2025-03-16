import styled from 'styled-components'
import { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { colors } from '@/styles/colors'
import { isMineState, ownerUserData } from '@/context/Atoms'
import ProfileButtons from './ProfileButtons'

interface MainProfileProps {
  nickname: string
  imageUrl: string
}

const MainProfile = ({ nickname, imageUrl }: MainProfileProps) => {
  const ownerUserInfo = useRecoilValue(ownerUserData)
  const isMyPage = useRecoilValue(isMineState)

  const isMine = useMemo(() => JSON.stringify(isMyPage) === 'true', [isMyPage])

  return (
    <Container>
      <ProfileContents>
        <Nickname>{nickname}</Nickname>
        <ProfileButtons ownerUserInfo={ownerUserInfo} isMine={isMine} />
      </ProfileContents>
      <ImageWrapper>
        <ProfileImage src={imageUrl} />
      </ImageWrapper>
    </Container>
  )
}

export default MainProfile

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  background-color: ${colors.white};
`
const ImageWrapper = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 100px;
`
const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 100px;
`
const ProfileContents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`
const Nickname = styled.div`
  color: ${colors.grey1};
  font-size: 16px;
  font-weight: 700;
`
