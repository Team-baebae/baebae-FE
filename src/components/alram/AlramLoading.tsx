import styled from 'styled-components'
import LoadingIcon from '@/assets/kakaoRedirection/Loading.svg'

// 카카오 로그인 로딩 컴포넌트
const AlramLoading = () => {
  return (
    <Container>
      <Icon src={LoadingIcon} />
      <LoadingText>{`pc 화면에서는\n알림을 설정해주세요`}</LoadingText>
    </Container>
  )
}

export default AlramLoading
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

const Icon = styled.img`
  margin: 300px 0px 0px 0px;
  width: 36px;
  height: 36px;
`

const LoadingText = styled.div`
  margin: 18px 0px 0px 0px;
  font-size: 20px;
  font-weight: 600;
`
