import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import NavLogo from '@/assets/nav/NavLogo.svg'
import SettingIcon from '@/assets/nav/Setting.svg'
import SearchIcon from '@/assets/nav/Search.svg'
import { useRecoilState, useRecoilValue } from 'recoil'
import { isLoggedInState, ownerUserData, userInfoState, UserInfoStateProps } from '@/context/Atoms'
import LoginModal from '../question/LoginModal'
import { colors } from '@/styles/colors'
import { getMemberIdApi, getOwnerProfileApi } from '@/apis/MainInfoApi'

interface HeaderProps {
  background: string
  isMine: boolean
}

const Header = ({ background, isMine }: HeaderProps) => {
  const navigate = useNavigate()
  const isLoggedIn = useRecoilValue(isLoggedInState)
  const myInfo = useRecoilValue<UserInfoStateProps>(userInfoState)
  const myNickname = myInfo.nickname
  const [, setUserData] = useRecoilState(ownerUserData)

  // 모달 버튼 클릭 유무를 저장할 state
  const [showModal, setShowModal] = useState<boolean>(false)

  // 아이콘 클릭 이벤트 핸들러
  const handleIconClick = useCallback(
    (route: string) => {
      if (isLoggedIn) {
        handleNavigation(route)
      } else {
        setShowModal(true)
      }
    },
    [isLoggedIn],
  )

  // 페이지 이동 함수
  const handleNavigation = useCallback(
    (route: string) => {
      if (route === myNickname) {
        getMemberIdApi(route).then((result) => {
          getOwnerProfileApi(result.memberId).then((response) => {
            setUserData({
              nickname: route,
              memberId: result.memberId,
              imageUrl: response.imageUrl,
            })
            navigate(`/${route}`, {
              state: { defaultCategory: 0 },
            })
          })
        })
      } else {
        navigate(route)
      }
    },
    [myNickname, navigate, setUserData],
  )

  // 모달 토글 함수
  const toggleModal = useCallback(() => {
    setShowModal((prev) => !prev)
  }, [])

  return (
    <Container background={background}>
      <LeftIcon src={NavLogo} alt="Flipit Logo" onClick={() => navigate('/')} />
      <RightSection>
        {!isMine && <NavButton onClick={() => handleIconClick(myNickname)}>내 플리빗으로 이동</NavButton>}
        <Icon src={SearchIcon} alt="Search" onClick={() => handleIconClick('/search')} />
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

const NavButton = styled.button`
  display: flex;
  align-items: center;
  outline: none;
  border: none;
  background-color: transparent;
  color: ${colors.grey4};
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: -0.28px;
  cursor: pointer;
`
