import { useState } from 'react'
import styled from 'styled-components'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '@/components/common/Header'
import Terms from '@/components/signup/Terms'
import { BottomButton } from '@/components/common/Button'
import { colors } from '@/styles/colors'

// 회원가입 약관 페이지
const SignUpTerms = () => {
  const navigate = useNavigate()

  //   넘겨받은 카카오 어세스 토큰 저장
  const location = useLocation()
  const kakaoAccessToken = location.state?.kakaoAccessToken

  // 약관 체크여부 확인
  const [isChecked, setIsChecked] = useState({
    isCheckedTotal: false,
    isCheckedFirst: false,
    isCheckedSecond: false,
    isCheckedThird: false,
  })

  // 약관 체크 후 다음 버튼 눌렀을 때
  const onClickNextBtn = () => {
    if (isChecked.isCheckedFirst && isChecked.isCheckedSecond) {
      navigate('/signup/nickname', {
        state: {
          kakaoAccessToken: kakaoAccessToken,
        },
      })
    }
  }

  return (
    <Container>
      <Header text="회원가입" background={colors.grey7} />
      <TermsHeader>플리빗 이용약관에 동의해주세요</TermsHeader>
      {/* 약관리스트 */}
      <Terms isChecked={isChecked} setIsChecked={setIsChecked} />
      <BottomButton
        $positive={isChecked.isCheckedFirst && isChecked.isCheckedSecond ? true : false}
        func={onClickNextBtn}
        text="다음"
      />
    </Container>
  )
}

export default SignUpTerms

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
`

const TermsHeader = styled.div`
  width: 100%;
  margin: 20px 0px 40px 0px;
  padding: 0px 0px 0px 20px;
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.36px;
`
