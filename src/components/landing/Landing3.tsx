import Phone from '@/assets/landing/PhoneAsk.png'
import Phone2 from '@/assets/landing/PhoneAsk2.png'
import { colors } from '@/styles/colors'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const Landing3 = () => {
  const [imageIndex, setImageIndex] = useState<number>(0)
  const images = [Phone, Phone2]

  const changeImage = () => {
    setImageIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  useEffect(() => {
    const interval = setInterval(changeImage, 3000)
    return () => clearInterval(interval)
  }, [])

  const Variants = {
    default: {
      opacity: 0.9,
      transition: {
        duration: 0.5,
        delay: 0,
      },
    },
    phone: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0,
      },
    },
    offscreen: {
      y: +100,
      opacity: 0,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1.2,
        delay: 0.1,
      },
    },
  }
  return (
    <Container initial="offscreen" whileInView="onscreen" variants={Variants}>
      <CategoryText>홈 · 질문하기</CategoryText>
      <TextWrapper>
        <TitleText>{`소통의 시작,\n어색하지 않게 질문으로`}</TitleText>
      </TextWrapper>
      <ImageWrapper key={imageIndex} onClick={changeImage}>
        <PhoneImage src={images[imageIndex]} initial="default" animate="phone" exit="default" variants={Variants} />
      </ImageWrapper>
      <SubText>{`상대방이 직접 열어둔 플리빗 페이지를 통해\n소통을 위한 한발짝을 더 쉽게 할 수 있습니다.`}</SubText>
    </Container>
  )
}

export default Landing3

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 50px 30px;
`
const CategoryText = styled.h3`
  color: ${colors.primary};
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
const ImageWrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  background-color: ${colors.primary};
  border-radius: 30px;
  margin-bottom: 30px;
`
const PhoneImage = styled(motion.img)`
  width: 315px;
  height: 440px;
`
const SubText = styled.h3`
  color: ${colors.white};
  font-family: Pretendard;
  font-size: 17px;
  font-weight: 400;
  line-height: 25.5px;
  letter-spacing: -0.34px;
  white-space: pre-wrap;
`
