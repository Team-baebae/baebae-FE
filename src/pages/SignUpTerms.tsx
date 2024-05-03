import styled from 'styled-components'
import Header from '../components/common/Header'
import { colors } from '../styles/colors'
import Terms from '../components/signup/Terms'
import { useState } from 'react'
import Button from '../components/common/Button'
import { useNavigate } from 'react-router-dom'

const SignUpTerms = () => {
  const navigate = useNavigate()

  // 약관 체크여부 확인
  const [isChecked, setIsChecked] = useState({
    isCheckedTotal: false,
    isCheckedFirst: false,
    isCheckedSecond: false,
    isCheckedThird: false,
  })

  const onClickNextBtn = () => {
    if (isChecked.isCheckedFirst && isChecked.isCheckedSecond) {
      navigate('/signup/nickname')
    }
  }

  return (
    <Container>
      <Header text="회원가입" backColor={colors.grey7} />
      <TermsHeader>플리빗 이용약관에 동의해주세요</TermsHeader>
      <Terms isChecked={isChecked} setIsChecked={setIsChecked} />
      <Button
        positive={isChecked.isCheckedFirst && isChecked.isCheckedSecond ? true : false}
        func1={onClickNextBtn}
        func2={() => {
          console.log('약관 체크 안함')
        }}
      />
    </Container>
  )
}

export default SignUpTerms

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const TermsHeader = styled.div`
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.36px;
  margin: 20px 0px 40px 20px;
`
