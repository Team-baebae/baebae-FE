import Phone from '@/assets/landing/PhoneFeed.png'
import { colors } from '@/styles/colors'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const Landing5 = () => {
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
      <CategoryText>홈 · 취향 피드</CategoryText>
      <TextWrapper>
        <TitleText>{`답변을 통해 정리하는\n나만의 아이덴티티`}</TitleText>
      </TextWrapper>
      <ImageWrapper>
        <PhoneImage src={Phone} initial="default" animate="onscreen" variants={Variants} />
      </ImageWrapper>
      <SubText>{`SNS라는 열린 공간 속\nflipit이라는 닫힌 공간에서,\n자신을 좀 더 자유롭게 드러내 보세요.`}</SubText>
    </Container>
  )
}

export default Landing5

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 50px 30px;
`
const CategoryText = styled.h3`
  color: ${colors.green};
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
  background-color: ${colors.green};
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
