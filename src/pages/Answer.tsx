import styled from 'styled-components'
import Header from '../components/common/Header'
import { colors } from '../styles/colors'
import Question from '../components/answer/Question'

const Answer = () => {
  return (
    <Container>
      <Header text="답변하기" backColor={colors.grey7} />
      <Question />
    </Container>
  )
}

export default Answer

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
