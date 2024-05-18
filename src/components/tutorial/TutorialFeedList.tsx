import styled from 'styled-components'
import { colors } from '@/styles/colors'
import QuotationMark from '@/assets/question/QuotationMark.svg'

// 해당 카테고리에 속한 피드들 보여주는 컴포넌트
const TutorialFeedList = () => {
  const data = [
    { id: 1, questionContent: '가은아 넌 양식이 좋아, 한식이 좋아?', nickname: '유자인' },
    { id: 2, questionContent: '요즘 꽂힌 노래 알려줘!', nickname: '배승우' },
    { id: 3, questionContent: '좋아하는 옷 브랜드가 뭐야?', nickname: '권예인' },
    { id: 4, questionContent: '이번 주말에 뭐해?', nickname: '김승은' },
    { id: 5, questionContent: '여행갔던 곳 중에 어디가 가장 좋았어?', nickname: '김예찬' },
    { id: 6, questionContent: '무슨 영화 좋아해?', nickname: '장지효' },
  ]

  return (
    <>
      <GridContainer>
        {data.map((feed) => (
          <FlipWrapper key={feed.id}>
            <Icon src={QuotationMark} />
            <FlipContent>{feed.questionContent}</FlipContent>
            <WriterBlock>
              FROM<WriterRegion>{feed.nickname}</WriterRegion>
            </WriterBlock>
          </FlipWrapper>
        ))}
      </GridContainer>
    </>
  )
}

export default TutorialFeedList

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 9px;
  justify-content: center;
`
const Icon = styled.img`
  width: 7.72px;
  height: 6.28px;
`
const FlipWrapper = styled.div`
  display: flex;
  flex: 1 0 0;
  height: 179px;
  padding: 30px 10px 10px 10px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  border-radius: 2px;
  background: ${colors.white};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.08);
  cursor: pointer;
`
const FlipContent = styled.div`
  display: flex;
  flex: 1 0 0;
  margin-top: 18px;
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 21px;
  letter-spacing: -0.56px;
`
const WriterBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: ${colors.primary};
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: 15px;
  letter-spacing: -0.2px;
`
const WriterRegion = styled.button`
  margin: 0px 0px 0px 4px;
  color: ${colors.grey4};
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: 15px;
  letter-spacing: -0.2px;
  border: none;
  outline: none;
  background-color: transparent;
`
