import styled from 'styled-components'
import NoFeed from '@/assets/main/NoneFeed.svg'
import { colors } from '@/styles/colors'

// 해당 그룹에 피드가 없을 때 컴포넌트
const Flips = () => {
  return (
    <Container>
      <Image src={NoFeed} width={150} height={146} />
      <WarnWrapper>
        <WarnText>플립이 아직 없어요!</WarnText>
        <QBtn>질문하러 가기</QBtn>
      </WarnWrapper>
    </Container>
  )
}

export default Flips

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-direction: center;
  align-items: center;
  width: 100%;
  margin: 60px 0px;
  gap: 30px;
`
const Image = styled.img``
const WarnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
`
const WarnText = styled.div`
  color: ${colors.grey3};
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 600;
  line-height: 21px;
  letter-spacing: -0.56px;
`
const QBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 24px;
  border-radius: 8px;
  border: none;
  outline: none;
  background-color: ${colors.grey1};
  color: ${colors.white};
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 600;
  line-height: 18px;
  letter-spacing: -0.24px;
`
