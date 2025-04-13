import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import NavLogo from '@/assets/nav/NavLogo.svg'
import HouseIcon from '@/assets/nav/House.svg'
import AlarmIcon from '@/assets/nav/Alarm.svg'
import SettingIcon from '@/assets/nav/Setting.svg'
import SearchIcon from '@/assets/nav/Search.svg'
import { useRecoilState, useRecoilValue } from 'recoil'
import { isLoggedInState, isMineState, ownerUserData, userInfoState, UserInfoStateProps } from '@/context/Atoms'
import LoginModal from '../question/LoginModal'
import { getMemberIdApi, getOwnerProfileApi } from '@/apis/MainInfoApi'

interface HeaderProps {
  background: string
}

const Header = ({ background }: HeaderProps) => {
  const navigate = useNavigate()
  const isMyPage = useRecoilValue(isMineState)
  const isLoggedIn = useRecoilValue(isLoggedInState)
  const myInfo = useRecoilValue<UserInfoStateProps>(userInfoState)
  const myNickname = myInfo?.nickname
  const [, setUserData] = useRecoilState(ownerUserData)

  // 모달 상태
  const [showModal, setShowModal] = useState<boolean>(false)

  // 홈 클릭 핸들러
  const handleHomeClick = useCallback(() => {
    if (isLoggedIn && myNickname) {
      getMemberIdApi(myNickname).then((result) => {
        getOwnerProfileApi(result.memberId).then((response) => {
          setUserData({
            nickname: myNickname,
            memberId: result.memberId,
            imageUrl: response.imageUrl,
          })
          navigate(`/${myNickname}`, {
            state: { defaultCategory: 0 },
          })
        })
      })
    } else {
      navigate('/')
    }
  }, [isLoggedIn, myNickname, navigate, setUserData])

  // 아이콘 클릭 이벤트
  const handleIconClick = useCallback(
    (route: string) => {
      if (isLoggedIn) {
        navigate(route)
      } else {
        setShowModal(true)
      }
    },
    [isLoggedIn, navigate],
  )

  // 모달 토글 함수
  const toggleModal = useCallback(() => {
    setShowModal((prev) => !prev)
  }, [])

  return (
    <Container background={background}>
      <LeftIcon src={NavLogo} alt="Logo" />
      <RightSection>
        {isMyPage ? (
          <Icon src={AlarmIcon} alt="alarm" onClick={() => handleIconClick('/alarms')} />
        ) : (
          <Icon src={HouseIcon} alt="home" onClick={handleHomeClick} />
        )}
        <Icon src={SearchIcon} alt="SearchUser" onClick={() => handleIconClick('/search')} />
        <Icon src={SettingIcon} alt="Settings" onClick={() => handleIconClick('/settings')} />
      </RightSection>
      {showModal && <LoginModal content={`앗!\n로그인을 해야 접근할 수 있어요😥`} clickModal={toggleModal} />}
    </Container>
  )
}

export default Header

const Container = styled.div<{ background: string }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 48px;
  background-color: ${(props) => props.background};
`

const LeftIcon = styled.img`
  position: absolute;
  width: 44.5px;
  height: 20px;
  left: 20px;
  cursor: pointer;
`

const RightSection = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  right: 20px;
  gap: 20px;
`

const Icon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`
