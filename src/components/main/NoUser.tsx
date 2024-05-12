import styled from 'styled-components'
import NoFeed from '@/assets/main/NoneFeed.svg'
import { colors } from '@/styles/colors'

// 검색한 사용자가 없을 때 컴포넌트
const NoUser = () => {
  return (
    <Container>
      <Image src={NoFeed} width={150} height={146} />
      <WarnText>{`해당 사용자는\n존재하지 않는 사용자입니다.`}</WarnText>
    </Container>
  )
}

export default NoUser

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 210px;
  align-items: center;
  gap: 30px;
`
const Image = styled.img``
const WarnText = styled.div`
  color: ${colors.grey3};
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 600;
  line-height: 21px;
  letter-spacing: -0.56px;
  white-space: pre-wrap;
  text-align: center;
`
