import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { isLoggedInState, isMineState, ownerUserData } from '@/context/Atoms'
import LoginModal from '@/components/question/LoginModal'
import styled from 'styled-components'
import { colors } from '@/styles/colors'
import useFollowStatus from '@/hooks/useFollowStatus'

const ProfileButtons = () => {
  const isLoggedIn = useRecoilValue(isLoggedInState)
  const isMyPage = useRecoilValue(isMineState)
  const ownerUserInfo = useRecoilValue(ownerUserData)
  const { isFollowing, handleFollow } = useFollowStatus(ownerUserInfo)

  const [showModal, setShowModal] = useState<boolean>(false)

  const handleFollowButtonClick = async () => {
    if (!isLoggedIn) {
      setShowModal(true) // 로그인되지 않은 경우 모달 띄우기
      return
    }
    await handleFollow()
  }

  const toggleModal = () => {
    setShowModal((prev) => !prev)
  }

  return (
    <>
      <ButtonWrap>
        {!isMyPage && (
          <FollowButton
            onClick={handleFollowButtonClick}
            disabled={isLoggedIn && isFollowing === null}
            $isFollow={!!isFollowing}
          >
            {isFollowing ? '팔로잉' : '팔로우'}
          </FollowButton>
        )}
      </ButtonWrap>
      {showModal && <LoginModal content={`앗!\n로그인을 해야 접근할 수 있어요😥`} clickModal={toggleModal} />}
    </>
  )
}

export default ProfileButtons

const ButtonWrap = styled.div`
  display: flex;
  gap: 12px;
`
const FollowButton = styled.button<{ $isFollow: boolean }>`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  padding: 8px 12px;
  border-radius: 6px;
  border: 0;
  background-color: ${(props) => (props.$isFollow ? colors.grey2 : colors.grey7)};
  color: ${(props) => (props.$isFollow ? colors.grey7 : colors.grey4)};
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.6px;
  cursor: pointer;
`
