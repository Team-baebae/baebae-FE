import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { colors } from '@/styles/colors'
import LandingTelepathy from '@/components/landing/LandingTelepathy'
import LandingFeedBack from '@/components/landing/LandingFeedBack'

const Landing6 = () => {
  const heartNum = 23
  const seeNum = 20
  const sadNum = 100
  const [giveTelepathy, setGiveTelepathy] = useState<boolean>(false)
  const [popLottie, setPopLottie] = useState<boolean>(false)

  const clickTelepathy = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    !giveTelepathy && setPopLottie(true)
    setGiveTelepathy(!giveTelepathy)
    setTimeout(() => {
      setPopLottie(false)
    }, 2350)
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
      <CategoryText>홈 · 취향 피드</CategoryText>
      <TextWrapper>
        <TitleText>{`사소한 피드백을 통한\n소통의 재미`}</TitleText>
      </TextWrapper>
      <FeedWrapper>
        <FlipContainer>통했당 버튼을 눌러보세요!</FlipContainer>
        <CardWrapper>
          <LandingFeedBack topFeed={false} answer="난 스트리트 빈티지 느낌!" />
          <BottomContents>
            <EmotionButton state={true}>
              <EmotionText>🖤</EmotionText>
              <EmotionText>{heartNum}</EmotionText>
            </EmotionButton>
            <EmotionButton state={true}>
              <EmotionText>👀</EmotionText>
              <EmotionText>{seeNum}</EmotionText>
            </EmotionButton>
            <EmotionButton state={true}>
              <EmotionText>🥺</EmotionText>
              <EmotionText>{sadNum}</EmotionText>
            </EmotionButton>
            <TelepathyButton state={giveTelepathy} onClick={clickTelepathy}>
              <EmotionText style={{ fontSize: 20 }}>👉🏻</EmotionText>
              <EmotionText style={{ fontSize: 20, opacity: giveTelepathy ? 1 : 0.3 }}>👈🏻</EmotionText>
              <EmotionText>통했당!</EmotionText>
            </TelepathyButton>
          </BottomContents>
          {popLottie && <LandingTelepathy />}
        </CardWrapper>
      </FeedWrapper>
      <SubText>{`친구와 내가 플립을 통해 서로 소통할 수 있어요.\n일방적인 좋아요가 아닌, 통했당으로!`}</SubText>
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
const SubText = styled.h3`
  color: ${colors.white};
  font-family: Pretendard;
  font-size: 17px;
  font-weight: 400;
  line-height: 25.5px;
  letter-spacing: -0.34px;
  white-space: pre-wrap;
`
const BottomContents = styled.div`
  display: flex;
  flex-direction: row;
  width: 315px;
  gap: 6px;
  margin-top: 8px;
`
const EmotionButton = styled.div<{ state: boolean }>`
  display: flex;
  align-items: center;
  height: 30px;
  padding: 4px 8px;
  background: ${(props) => (props.state ? colors.green : colors.white)};
  gap: 4px;
  border-radius: 100px;
`
const TelepathyButton = styled.div<{ state: boolean }>`
  display: flex;
  align-items: center;
  height: 30px;
  padding: 4px 12px;
  gap: 4px;
  border-radius: 100px;
  background: ${(props) => (props.state ? colors.primary : colors.white)};
  cursor: pointer;
`
const EmotionText = styled.div`
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: -0.24px;
`
const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const FeedWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
  margin-bottom: 30px;
`
const FlipContainer = styled.div`
  text-align: center;
  color: ${colors.white};
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 400;
  line-height: 27px;
  letter-spacing: -0.9px;
`
