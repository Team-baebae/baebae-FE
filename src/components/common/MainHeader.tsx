import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import NavLogo from '@/assets/nav/NavLogo.svg'
import Alram from '@/assets/nav/Alarm.svg'
import Setting from '@/assets/nav/Setting.svg'
import { useRecoilState, useRecoilValue } from 'recoil'
import { isLoggedInState, ownerUserData, userInfoState, UserInfoStateProps } from '@/context/Atoms'
import { useState } from 'react'
import LoginModal from '../question/LoginModal'
import { colors } from '@/styles/colors'
import { getMemberIdApi, getOwnerProfileApi } from '@/apis/MainInfoApi'

interface HeaderProps {
  background: string
  isMine: boolean
}

// 메인페이지의 헤더 컴포넌트
const MainHeader = ({ background, isMine }: HeaderProps) => {
  const navigate = useNavigate()
  // 로그인 된 상태인지 확인
  const isLoggedIn = useRecoilValue(isLoggedInState)
  console.log(isMine)
  // 리코일에서 받은 로그인한 사용자의 userInfo
  const myInfo = useRecoilValue<UserInfoStateProps>(userInfoState)
  const myNickname = myInfo.nickname

  const [userData, setUserData] = useRecoilState(ownerUserData)

  // 아이콘 누르면 실행되는 함수
  const clickIcon = (route: string) => {
    isLoggedIn ? moveMyFeed(route) : setShowModal(true)
  }

  const moveMyFeed = (route: string) => {
    if (route === 'settings') {
      navigate('/settings')
    } else {
      getMemberIdApi(route).then((result) => {
        getOwnerProfileApi(result.memberId).then((response) => {
          // console.log(response)
          setUserData({
            nickname: route,
            memberId: result.memberId,
            imageUrl: response.imageUrl,
          })
          navigate(`/${route}`, {
            state: {
              defaultCategory: 0,
            },
          })
        })
      })
    }
  }

  // 모달 버튼 클릭 유무를 저장할 state (로그인 안했을 시 나오는 모달)
  const [showModal, setShowModal] = useState<boolean>(false)
  // 버튼 클릭시 모달 버튼 클릭 유무를 설정하는 state 함수
  const clickModal = () => setShowModal(!showModal)

  return (
    <HeaderTotalComponent background={background}>
      <HeaderLeftIcon
        src={NavLogo}
        alt="flipit"
        onClick={() => {
          navigate('/')
        }}
      />
      <HeaderRight>
        {!isMine && <HeaderRightText onClick={() => clickIcon(myNickname)}>내 플리빗으로 이동</HeaderRightText>}
        <HeaderRightIcon src={Alram} alt="alram" onClick={() => clickIcon('alrams')} />
        <HeaderRightIcon
          src={Setting}
          alt="setting"
          onClick={() => {
            clickIcon('settings')
          }}
        />
      </HeaderRight>
      {/* 로그인 안하고 질문 시 나오는 모달 */}
      {showModal && <LoginModal content={`앗!\n로그인을 해야 접근할 수 있어요😥`} clickModal={clickModal} />}
    </HeaderTotalComponent>
  )
}

export default MainHeader

const HeaderTotalComponent = styled.div<{ background: string }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 48px;
  background-color: ${(props) => props.background};
`
const HeaderLeftIcon = styled.img`
  position: absolute;
  width: 44.5px;
  height: 20px;
  left: 20px;
  cursor: pointer;
`
const HeaderRight = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  right: 20px;
  gap: 20px;
`
const HeaderRightIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`
const HeaderRightText = styled.button`
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
