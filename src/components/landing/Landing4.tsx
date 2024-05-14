import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useState } from 'react'
import LandingLogoWhite from '@/assets/landing/LandingLogoWhite.svg'
import { colors } from '@/styles/colors'
import LandingFeedFront from './LandingFeedFront'
import LandingFeedBack from './LandingFeedBack'

const Landing4 = () => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false)

  const spring = {
    type: 'spring',
    stiffness: 300,
    damping: 40,
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    setIsFlipped((prevState) => !prevState)
  }

  const Variants = {
    offscreen: {
      y: +50,
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
      <Category src={LandingLogoWhite} />
      <TextWrapper>
        <TitleText>{`질문에 대한 답변은\n뒤집어서 확인`}</TitleText>
      </TextWrapper>
      <FeedWrapper>
        <FlipContainer>뒤집어보세요!</FlipContainer>
        <FlipWrapper onClick={handleClick} transition={spring}>
          <CardWrapper
            animate={{ rotateY: isFlipped ? -180 : 0 }}
            transition={spring}
            style={{ zIndex: isFlipped ? 0 : 1 }}
          >
            <LandingFeedFront />
          </CardWrapper>
          <CardWrapper
            initial={{ rotateY: 180 }}
            animate={{ rotateY: isFlipped ? 0 : 180 }}
            transition={spring}
            style={{
              zIndex: isFlipped ? 1 : 0,
            }}
          >
            {/* 뒷면 */}
            <LandingFeedBack topFeed={true} answer="요즘 약간 조약돌 네일?" />
          </CardWrapper>
        </FlipWrapper>
      </FeedWrapper>
    </Container>
  )
}

export default Landing4

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 50px 30px;
`
const Category = styled.img`
  width: 35px;
  height: 24px;
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
const FlipContainer = styled.div`
  text-align: center;
  color: ${colors.white};
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 27px;
  letter-spacing: -0.9px;
`
const FeedWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
`
const FlipWrapper = styled(motion.div)`
  width: 300px;
  height: 329px;
  perspective: 1200px;
  transform-style: preserve-3d;
  z-index: 1;
  background-color: transparent;
  padding: 0;
  cursor: pointer;
`
const CardWrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  position: absolute;
`
