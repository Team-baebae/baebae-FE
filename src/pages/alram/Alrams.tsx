import Header from '@/components/common/Header'
import { colors } from '@/styles/colors'
import styled from 'styled-components'

const Alrams = () => {
  const data = [
    { title: '배승우 님의 질문을 확인해 보세요.', content: '가은아! 너가 가장 좋아하는 음식이 뭐야?' },
    { title: '유자인 님이 ♥ 반응을 남겼어요.', content: '유자인 님이 반응한 플립 확인하기' },
    { title: '유자인 님과 취향이 통했어요! 👉🏻👈🏻', content: '유자인 님과 통한 플립 확인하기' },
  ]
  return (
    <Container>
      <Header text="알림" background={colors.white} />
      {data.map((value) => (
        <AlramWrapper>
          <TitleMessage>{value.title}</TitleMessage>
          <SubMessage>{value.content}</SubMessage>
        </AlramWrapper>
      ))}
    </Container>
  )
}

export default Alrams

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${colors.white};
`
const AlramWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 14px 20px;
  gap: 4px;
`
const TitleMessage = styled.h1`
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.6px;
`
const SubMessage = styled.h3`
  color: ${colors.grey3};
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 400;
  line-height: 18.2px;
  letter-spacing: -0.6px;
`
