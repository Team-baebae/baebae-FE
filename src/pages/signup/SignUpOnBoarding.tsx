import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { BottomButton } from '@/components/common/Button'
import { colors } from '@/styles/colors'
import OnBoardingIcon from '@/assets/signup/OnboardingIcon.svg'

// 회원가입 성공 화면
const SignUpOnBoarding = () => {
  const navigate = useNavigate()

  return (
    <Container>
      <Icon src={OnBoardingIcon} />
      <UnderIconText>
        플리빗에서 상대방의 취향에 대해 질문하고,
        <br />
        답변을 통해 자신의 취향을 표현해보세요.
      </UnderIconText>
      <BottomButton
        $positive={true}
        func={() => {
          navigate('/tutorial')
        }}
        text="시작하기"
      />
    </Container>
  )
}

export default SignUpOnBoarding

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
`

const Icon = styled.img`
  width: 150px;
  height: 146.73px;
  margin: 214.13px 0px 0px 0px;
`

const UnderIconText = styled.div`
  margin: 40px 0px 0px 0px;
  color: ${colors.grey1};
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.36px;
`
