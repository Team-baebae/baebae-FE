import styled from 'styled-components'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import Modal from '@/components/common/Modal'
import { colors } from '@/styles/colors'
import { logoutApi, signOutApi } from '@/apis/UserApi'
import { isLoggedInState, userInfoState } from '@/context/Atoms'
import ForwardArrow from '@/assets/ForwardArrow.svg'

// 설정리스트 컴포넌트
const Settings = () => {
  const navigate = useNavigate()

  // 리코일 유저정보
  const [userInfo, setUserInfo] = useRecoilState(userInfoState)
  // 리코일 로그인 여부
  const setIsLoggedIn = useSetRecoilState(isLoggedInState)

  // 회원탈퇴 모달 버튼 클릭 유무를 저장할 state
  const [openSignOutModal, setOpenSignOutModal] = useState(false)
  // 회원탈퇴 버튼 클릭시 탈퇴 모달 버튼 클릭 유무를 설정하는 state 함수
  const clickModal = () => setOpenSignOutModal(!openSignOutModal)

  // 로그아웃 모달 버튼 클릭 유무를 저장할 state
  const [openlogoutModal, setOpenLogoutModal] = useState(false)
  // 로그아웃 버튼 클릭시 로그아웃 모달 버튼 클릭 유무를 설정하는 state 함수
  const clickModal2 = () => setOpenLogoutModal(!openlogoutModal)

  // 로그아웃
  const logout = async () => {
    try {
      await logoutApi(userInfo.accessToken).then((res) => {
        if (res.status === 200) {
          setUserInfo({
            accessToken: '',
            refreshToken: '',
            memberId: 0,
            email: '',
            nickname: '',
            profileImage: '',
          })
          setIsLoggedIn(false)
          navigate('/login')
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  // 회원탈퇴
  const signOut = async () => {
    try {
      await signOutApi(userInfo.accessToken, userInfo.memberId).then((res) => {
        if (res.status === 200) {
          setUserInfo({
            accessToken: '',
            refreshToken: '',
            memberId: 0,
            email: '',
            nickname: '',
            profileImage: '',
          })
          setIsLoggedIn(false)
          navigate('/login')
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Container>
      {/* 개인정보 처리방침 */}
      <ContentsWrapper
        onClick={() => {
          navigate('/settings/terms/privacyPolicy')
        }}
      >
        <Contents>개인정보처리방침</Contents>
        <RightIcon src={ForwardArrow} />
      </ContentsWrapper>
      {/* 이용 약관 */}
      <ContentsWrapper
        onClick={() => {
          navigate('/settings/terms/serviceTerms')
        }}
      >
        <Contents>이용약관</Contents>
        <RightIcon src={ForwardArrow} />
      </ContentsWrapper>
      {/* 문의 */}
      <ContentsWrapper
        onClick={() => {
          navigate('/settings/support')
        }}
      >
        <Contents>
          문의하기
          <SubContents>평일 오전 9시-오후 6시 운영</SubContents>
        </Contents>
        <RightIcon src={ForwardArrow} />
      </ContentsWrapper>
      {/* 로그아웃 */}
      <ContentsWrapper onClick={clickModal2}>
        <Contents>로그아웃</Contents>
        <RightIcon src={ForwardArrow} />
      </ContentsWrapper>
      {openlogoutModal && (
        <Modal
          content="로그아웃 하시겠습니까?"
          buttonText1="예"
          buttonText2="아니오"
          func1={logout}
          func2={clickModal2}
          clickModal={clickModal2}
        />
      )}
      {/* 회원탈퇴 */}
      <ContentsWrapper onClick={clickModal}>
        <Contents>
          회원 탈퇴
          <SubContents>게시된 정보가 다 사라져요</SubContents>
        </Contents>
        <RightIcon src={ForwardArrow} />
      </ContentsWrapper>
      {openSignOutModal && (
        <Modal
          content="정말 탈퇴하시겠습니까?"
          buttonText1="아니오"
          buttonText2="예"
          func1={clickModal}
          func2={signOut}
          clickModal={clickModal}
        />
      )}
    </Container>
  )
}

export default Settings

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 30px 20px;
  padding: 20px;
  gap: 20px;
  border-radius: 20px;
  background-color: ${colors.white};
`
const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1 0 0;
  cursor: pointer;
`
const Contents = styled.div`
  color: ${colors.black};
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
`
const SubContents = styled.div`
  color: ${colors.grey4};
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 500;
  margin-top: 4px;
`
const RightIcon = styled.img`
  width: 24px;
  height: 24px;
`
