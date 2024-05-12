import Phone from '@/assets/landing/PhoneInsta.png'
import { colors } from '@/styles/colors'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const Landing6 = () => {
  const INSTA_URL = 'https://www.instagram.com/flipit.co.kr?igsh=aXpzcGRnaGVncHNq&utm_source=qr'

  const Variants = {
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
      <CategoryText>플리빗 매거진</CategoryText>
      <TextWrapper>
        <TitleText>{`플리빗 매거진을 구독하고\n서비스 OPEN 소식을\n받아 보세요.`}</TitleText>
      </TextWrapper>
      <ImageWrapper href={INSTA_URL}>
        <PhoneImage src={Phone} initial="default" animate="onscreen" variants={Variants} />
      </ImageWrapper>
    </Container>
  )
}

export default Landing6

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 50px 30px;
`
const CategoryText = styled.h3`
  color: ${colors.white};
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: -0.8px;
`
const TextWrapper = styled.div`
  gap: 6px;
  margin: 30px 0 50px 0;
`
const TitleText = styled.h1`
  color: ${colors.white};
  font-family: Pretendard;
  font-size: 30px;
  font-weight: 600;
  line-height: 45px;
  letter-spacing: -1.5px;
  white-space: pre-wrap;
`
const ImageWrapper = styled(motion.a)`
  display: flex;
  justify-content: center;
  background-color: ${colors.white};
  border-radius: 30px;
  margin-bottom: 30px;
  cursor: pointer;
`
const PhoneImage = styled(motion.img)`
  width: 315px;
  height: 440px;
`
