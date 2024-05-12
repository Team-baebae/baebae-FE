import styled from 'styled-components'
import { colors } from '@/styles/colors'
import ExampleImage from '@/assets/main/DefaultImage.svg'

const BackFeedContents = () => {
  const answer = '나의 패션스타일은 답변답변답변답변 답변답변답변답변'

  return (
    <FlipWrapper>
      <Photo src={ExampleImage} />
      <ContentWrapper>{answer}</ContentWrapper>
    </FlipWrapper>
  )
}

export default BackFeedContents

const Photo = styled.img`
  width: 279px;
  height: 250px;
`
const FlipWrapper = styled.div`
  display: flex;
  height: 100%;
  padding: 18px;
  flex-direction: column;
  gap: 18px;
  background: ${colors.white};
  box-shadow: 0px 4.945px 8.655px 0px rgba(0, 0, 0, 0.32);
`
const ContentWrapper = styled.div`
  height: 42px;
  overflow: hidden;
`
