import styled from 'styled-components'
import onBoardingIcon from '../assets/OnboardingIcon.svg'
import { colors } from '../styles/colors'
import { BottomButton } from '../components/common/Button'
import { useNavigate } from 'react-router-dom'

const SignUpOnBoarding = () => {
  const navigate = useNavigate()
  return (
    <Container>
      <Icon src={onBoardingIcon} alt="icon" />
      <UnderIconText>
        플리빗에서 상대방의 취향에 대해 질문하고,
        <br />
        답변을 통해 자신의 취향을 표현해보세요.
      </UnderIconText>
      <BottomButton
        $positive={true}
        func={() => {
          navigate('/')
        }}
        text="시작하기"
      />
    </Container>
  )
}

export default SignUpOnBoarding

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Icon = styled.img`
  width: 150px;
  height: 146.73px;
  margin: 214.13px 0px 0px 0px;
`

const UnderIconText = styled.div`
  color: ${colors.grey1};
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.36px;
  margin: 40px 0px 0px 0px;
`
