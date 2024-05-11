import styled from 'styled-components'
import { colors } from '../../styles/colors'
import ExampleImage from '../../assets/main/DefaultImage.svg'

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
const FlipContent = styled.div`
  display: flex;
  margin-top: 18px;
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 30px;
  letter-spacing: -0.8px;
`
const WriterBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 12px;
  color: ${colors.primary};
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: -0.28px;
`

const WriterRegion = styled.button`
  color: ${colors.grey4};
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: -0.28px;
  border: none;
  outline: none;
  background-color: transparent;
`
