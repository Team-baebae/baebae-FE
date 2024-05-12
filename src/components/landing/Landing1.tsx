import Intro from '@/assets/landing/Intro.png'
import IntroBack from '@/assets/landing/IntroBack.png'
import DownMark from '@/assets/landing/DownMark.svg'
import { colors } from '@/styles/colors'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const Landing1 = () => {
  const INSTA_URL = 'https://www.instagram.com/flipit.co.kr?igsh=aXpzcGRnaGVncHNq&utm_source=qr'
  const Variants = {
    default: {
      scale: 1,
    },
    scaleUp: {
      scale: 1.1,
      transition: {
        duration: 0.2,
        delay: 0,
      },
    },
    offscreen: {
      y: +50,
      opacity: 0,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: 0,
      },
    },
  }
  return (
    <Container initial="offscreen" whileInView="onscreen" variants={Variants}>
      <TextWrapper>
        <SubText>타인을 알아가고 본인을 표현하는</SubText>
        <TitleText>가장 단순한 방법, 플리빗.</TitleText>
      </TextWrapper>
      <Button href={INSTA_URL} initial="default" whileHover="scaleUp" variants={Variants}>
        지금 시작하기
      </Button>
      <PhoneImage src={Intro} />
      <BackImage src={IntroBack} />
      <ImageSpace>
        <DownIcon src={DownMark} />
      </ImageSpace>
    </Container>
  )
}

export default Landing1

const Container = styled(motion.div)`
  position: relative;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #eee;
  margin-top: 60px;
`
const TextWrapper = styled.div`
  gap: 6px;
  text-align: center;
  margin-bottom: 30px;
`
const SubText = styled.h1`
  font-family: Pretendard;
  font-size: 19px;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.38px;
`
const TitleText = styled.h1`
  font-family: Pretendard;
  font-size: 32px;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -1.6px;
`
const Button = styled(motion.a)`
  display: flex;
  padding: 14px 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-radius: 100px;
  z-index: 10;
  text-decoration: none;
  background: ${colors.primary};
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.8px;
  cursor: pointer;
`
const PhoneImage = styled.img`
  position: absolute;
  width: 375px;
  height: 653px;
  top: 105px;
`
const BackImage = styled.img`
  position: absolute;
  width: 100%;
  height: 548.5px;
  top: 215px;
`
const ImageSpace = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 625px;
`
const DownIcon = styled.img`
  width: 50px;
  height: 17px;
  flex-shrink: 0;
  animation: move 0.7s ease-in 0s infinite alternate;
  margin-bottom: 5px;

  @keyframes move {
    0% {
      margin-bottom: 10px;
    }
    100% {
      margin-bottom: 0px;
    }
  }
`
