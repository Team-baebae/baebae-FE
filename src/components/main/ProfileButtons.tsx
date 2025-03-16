import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { isLoggedInState } from '@/context/Atoms'
import PersonIcon from '@/assets/follow/Person.svg'
import AddIcon from '@/assets/follow/Add.svg'
import CheckIcon from '@/assets/follow/Check.svg'
import useFollow from '@/hooks/useFollow'
import useKakaoShare from '@/hooks/useKakaoShare'
import LoginModal from '@/components/question/LoginModal'
import styled from 'styled-components'
import { colors } from '@/styles/colors'

interface Props {
  ownerUserInfo: any
  isMine: boolean
}

const ProfileButtons = ({ ownerUserInfo, isMine }: Props) => {
  const navigate = useNavigate()
  const isLoggedIn = useRecoilValue(isLoggedInState)
  const { isFollowing, handleFollow, hasNewFollowers, checkNewFollowers } = useFollow(ownerUserInfo)
  const shareProfile = useKakaoShare(ownerUserInfo)

  const [showModal, setShowModal] = useState<boolean>(false)

  const handleFollowButtonClick = async () => {
    if (!isLoggedIn) {
      setShowModal(true) // 로그인되지 않은 경우 모달 띄우기
      return
    }

    if (isMine) {
      await checkNewFollowers()
      navigate('/follows')
    } else {
      await handleFollow()
    }
  }

  const toggleModal = () => {
    setShowModal((prev) => !prev)
  }

  return (
    <>
      <ButtonWrap>
        <ShareButton onClick={shareProfile}>{isMine ? '내 플리빗 초대' : '이 플리빗 공유'}</ShareButton>
        {isMine ? (
          <FollowButton onClick={handleFollowButtonClick}>
            <Icon src={PersonIcon} />
            {hasNewFollowers && <NotificationDot />}
          </FollowButton>
        ) : (
          <FollowButton onClick={handleFollowButtonClick} disabled={isLoggedIn && isFollowing === null}>
            <Icon src={isFollowing ? CheckIcon : AddIcon} />
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
const ShareButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 11px 24px;
  border-radius: 8px;
  border: 0;
  background-color: ${colors.grey7};
  color: ${colors.grey3};
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
`
const FollowButton = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: 0;
  background-color: ${colors.grey7};
  cursor: pointer;
`
const NotificationDot = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 4px;
  height: 4px;
  background-color: ${colors.primary60};
  border-radius: 50%;
`
const Icon = styled.img``
