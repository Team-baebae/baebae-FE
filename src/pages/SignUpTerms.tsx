import styled from 'styled-components'
import Header from '../components/common/Header'
import { colors } from '../styles/colors'
import Terms from '../components/signupTerms/Terms'

const SignUpTerms = () => {
  return (
    <Container>
      <Header text="회원가입" backColor={colors.grey7} />
      <TermsHeader>플리빗 이용약관에 동의해주세요</TermsHeader>
      <Terms />
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
