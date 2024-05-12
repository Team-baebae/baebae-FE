import styled from 'styled-components'
import LoadingIcon from '@/assets/kakaoRedirection/Loading.svg'

const Loading = () => {
  return (
    <Container>
      <Icon src={LoadingIcon} />
      <LoadingText>Loading..</LoadingText>
    </Container>
  )
}

export default Loading
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

const Icon = styled.img`
  width: 36px;
  height: 36px;
  margin: 300px 0px 0px 0px;
`

const LoadingText = styled.div`
  margin: 18px 0px 0px 0px;
  font-size: 20px;
  font-weight: 600;
`
