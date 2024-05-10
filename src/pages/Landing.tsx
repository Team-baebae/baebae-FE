import styled from 'styled-components'
import { colors } from '../styles/colors'

const Landing = () => {
  return <Container>랜딩페이지</Container>
}

export default Landing

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${colors.grey2};
`
