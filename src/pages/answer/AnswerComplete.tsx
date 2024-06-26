import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import Header from '@/components/common/Header'
import { colors } from '@/styles/colors'
import { userInfoState } from '@/context/Atoms'
import LogoIcon from '@/assets/signup/OnboardingIcon.svg'

// 답변 완료 페이지
const AnswerComplete = () => {
  const navigate = useNavigate()
  // 로그인 한 userInfo
  const userInfo = useRecoilValue(userInfoState)

  return (
    <Container>
      <Header text="답변하기" background={colors.grey7} />
      <Logo src={LogoIcon} />
      <UnderLogoText>답변이 완료되었어요!</UnderLogoText>
      <BtnWrapper>
        <Btn
          onClick={() => {
            navigate('/questions')
          }}
          color={colors.grey1}
          backgroundColor={colors.white}
        >
          새로운 질문 보러가기
        </Btn>
        <Btn
          onClick={() => {
            navigate(`/${userInfo.nickname}`, {
              state: {
                defaultCategory: 1,
              },
            })
          }}
          color={colors.grey1}
          backgroundColor={colors.primary}
        >
          작성한 플립 보러가기
        </Btn>
      </BtnWrapper>
    </Container>
  )
}

export default AnswerComplete

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0px 0px 30px 0px;
`
const Logo = styled.img`
  width: 150px;
  height: 146.73px;
  margin: 208.63px 0px 0px 0px;
`
const UnderLogoText = styled.div`
  margin: 30px 0px 0px 0px;
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.36px;
`

const BtnWrapper = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 30px;
  left: 20px;
  right: 20px;
  gap: 10px;
`

const Btn = styled.button<{ backgroundColor: string; color: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 0 0;
  height: 56px;
  padding: 16px 20px;
  border: none;
  border-radius: 12px;
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.28px;
  cursor: pointer;
`
