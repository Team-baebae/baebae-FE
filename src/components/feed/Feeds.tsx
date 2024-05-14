import styled from 'styled-components'
import { colors } from '../../styles/colors'
import QuotationMark from '../../assets/question/QuotationMark.svg'
import { useState } from 'react'
import DetailFeed from './DetailFeed'

interface FeedProps {
  answerId: number
  questionId: number
  questionContent: string
  memberId: number
  content: string
  linkAttachments: string[]
  musicName: string
  musicSinger: string
  musicAudioUrl: string
  imageUrls: string[]
  createdDate: string
  heartCount: number
  curiousCount: number
  sadCount: number
  fcmtoken: string
}

interface FeedsProps {
  data: FeedProps[]
}

const Feeds = ({ data }: FeedsProps) => {
  const [selectedFeed, setSelectedFeed] = useState<FeedProps>({
    answerId: -1,
    questionId: -1,
    questionContent: '',
    memberId: -1,
    content: '',
    linkAttachments: [''],
    musicName: '',
    musicSinger: '',
    musicAudioUrl: '',
    imageUrls: [''],
    createdDate: '',
    heartCount: -1,
    curiousCount: -1,
    sadCount: -1,
    fcmtoken: '',
  })
  // 모달 버튼 클릭 유무를 저장할 state
  const [showModal, setShowModal] = useState<boolean>(false)
  // 버튼 클릭시 모달 버튼 클릭 유무를 설정하는 state 함수
  const clickFlip = (feed: FeedProps) => {
    setSelectedFeed(feed)
    clickModal()
  }

  const clickModal = () => {
    setShowModal(!showModal)
  }

  return (
    <>
      <GridContainer>
        {data.map((feed) => (
          <FlipWrapper key={feed.answerId} onClick={() => clickFlip(feed)}>
            <Icon src={QuotationMark} />
            <FlipContent>{feed.questionContent}</FlipContent>
            <WriterBlock>
              FROM<WriterRegion>추후수정님</WriterRegion>
            </WriterBlock>
          </FlipWrapper>
        ))}
      </GridContainer>
      <TotalFeedsBtn>전체 보기</TotalFeedsBtn>
      {showModal && <DetailFeed setShowModal={setShowModal} showModal={showModal} selectedFeed={selectedFeed} />}
    </>
  )
}

export default Feeds

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

const TotalFeedsBtn = styled.div`
  display: flex;

  height: 40px;
  padding: 10px 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  background: ${colors.grey1};
  color: var(--White, #fff);
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.28px;
  margin: 14px 0px 20px 0px;
`
