import styled from 'styled-components'
import { colors } from '@/styles/colors'
import NoFeed from '@/assets/main/NoneFeed.svg'

const NoAlarm = () => {
  return (
    <Container>
      <Image src={NoFeed} width={150} height={146} />
      <WarnWrapper>
        <WarnText>알림이 아직 없어요!</WarnText>
      </WarnWrapper>
    </Container>
  )
}

export default NoAlarm

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80%;
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
