import styled from 'styled-components'
import { motion } from 'framer-motion'
import LandingLogoGradient from '@/assets/landing/LandingLogoGradient.svg'
import { colors } from '@/styles/colors'

const Landing2 = () => {
  const Variants = {
    offscreen: {
      y: +50,
      opacity: 0,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        delay: 0.1,
      },
    },
  }
  return (
    <Container initial="offscreen" whileInView="onscreen" variants={Variants}>
      <ContentWrapper>
        <Logo src={LandingLogoGradient} />
        <TitleText>{`플리빗으로 궁금한 질문을 남기고\n취향이 가득 담긴 답변을 받아보세요!`}</TitleText>
      </ContentWrapper>
    </Container>
  )
}

export default Landing2

const Container = styled(motion.div)``
const ContentWrapper = styled.div`
  gap: 12px;
  margin: 120px 0px;
  text-align: center;
`
const Logo = styled.img`
  width: 43px;
  height: 24px;
`
const TitleText = styled.h1`
  color: ${colors.white};
  font-family: Pretendard;
  font-size: 22px;
  font-weight: 500;
  line-height: 33px;
  letter-spacing: -1.1px;
  white-space: pre-wrap;
`
