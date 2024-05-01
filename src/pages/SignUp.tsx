import styled from 'styled-components'
import Header from '../components/common/Header'
import { useEffect, useRef } from 'react'
import { colors } from '../styles/colors'

const SignUp = () => {
  //   const divRef = useRef<HTMLDivElement>(null)

  //   useEffect(() => {
  //     const handleVisualViewPortResize = () => {
  //       const currentVisualViewport = Number(window.visualViewport?.height)
  //       if (divRef) {
  //         divRef.current!.style.height = `${currentVisualViewport - 30}px`
  //         window.scrollTo(0, 40)
  //       }
  //       if (window.visualViewport) {
  //         window.visualViewport.onresize = handleVisualViewPortResize
  //       }
  //     }
  //   }, [])

  return (
    <SignUpTotalComponent>
      <Header text="텍스트" backColor={colors.grey7} />
      <SignUpHeaderText>
        플리빗을 사용하기 위해 <br />
        닉네임이 필요해요!
      </SignUpHeaderText>
      <SignUpNicknameLabel>닉네임</SignUpNicknameLabel>
      <SingUpNicknameInput placeholder="닉네임 입력" />
      <NextBtn>다음</NextBtn>
    </SignUpTotalComponent>
  )
}

export default SignUp

const SignUpTotalComponent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 48px);
`

const SignUpHeaderText = styled.div`
  font-family: 'Pretendard';
  width: 335px;
  height: 54px;
  color: #1d1d1d;
  font-size: 18px;
  font-weight: 600;
  margin: 20px 0px 0px 0px;
`

const SignUpNicknameLabel = styled.div`
  font-family: 'Pretendard';
  color: #767676;
  align-self: flex-start;
  font-size: 12px;
  font-weight: 400;
  margin: 40px 0px 0px 20px;
`

const SingUpNicknameInput = styled.input`
  font-family: 'Pretendard';
  width: 335px;
  height: 61px;
  padding: 20px;
  border-radius: 12px;
  background-color: #fff;
  color: #1d1d1d;
  font-size: 14px;
  margin: 4px 0px 0px 0px;
  border: none;
  outline: none;
  &:hover {
    border: 1px solid #1d1d1d;
  }
  &::placeholder {
    color: #c1c1c1;
  }
`

const NextBtn = styled.button`
  font-family: 'Pretendard';
  position: absolute;
  bottom: 30px;
  border: none;
  width: 335px;
  height: 56px;
  border-radius: 12px;
  background-color: #55eab0;
  color: #1d1d1d;
  font-size: 14px;
  font-weight: 600;
  /* margin: 300px 0px 0px 0px; */
`
