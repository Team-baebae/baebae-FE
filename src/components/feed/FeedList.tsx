import styled from 'styled-components'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DetailFeed from '@/components/feed/DetailFeed'
import { FeedProps, FeedListProps } from '@/components/feed/types'
import { colors } from '@/styles/colors'
import QuotationMark from '@/assets/question/QuotationMark.svg'

// 해당 카테고리에 속한 피드들 보여주는 컴포넌트
const FeedList = ({
  data,
  selectedCategoryId,
  selectedCategoryImage,
  selectedCategoryGroupName,
  selectedCategoryAnswerIds,
}: FeedListProps) => {
  const navigate = useNavigate()

  // 선택된 필드 확대모달 띄워주기 위한 상태 저장
  const [selectedFeed, setSelectedFeed] = useState<FeedProps>({
    answerId: -1,
    memberId: -1,
    memberNickname: '',
    questionContent: '',
    questionId: -1,
    nickname: '',
    profileOnOff: false,
    content: '',
    createdDate: '',
    linkAttachments: '',
    musicAudioUrl: '',
    musicName: '',
    musicSinger: '',
    sadCount: 0,
    heartCount: 0,
    curiousCount: 0,
    connectCount: 0,
    imageUrl: '',
  })

  // 모달 버튼 클릭 유무를 저장할 state (피드 확대)
  const [showModal, setShowModal] = useState<boolean>(false)
  // 버튼 클릭시 모달 버튼 클릭 유무를 설정하는 state 함수
  const clickFlip = (feed: FeedProps) => {
    setSelectedFeed(feed)
    clickModal()
  }
  // 모달창 열고 닫는 state 함수
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
              FROM
              {feed.profileOnOff ? (
                <WriterRegion color={colors.grey1}>{feed.nickname}</WriterRegion>
              ) : (
                <WriterRegion color={colors.grey4}>{feed.nickname}</WriterRegion>
              )}
            </WriterBlock>
          </FlipWrapper>
        ))}
      </GridContainer>
      {/* 해당 카테고리 피드리스트 전체보기 */}
      <TotalFeedsBtn
        onClick={() => {
          navigate('/groups', {
            state: {
              selectedCategoryId: selectedCategoryId,
              selectedCategoryImage: selectedCategoryImage,
              selectedCategoryGroupName: selectedCategoryGroupName,
              selectedCategoryAnswerIds: selectedCategoryAnswerIds,
            },
          })
        }}
      >
        전체 보기
      </TotalFeedsBtn>
      {/* 피드 누를시 피드 확대 */}
      {showModal && (
        <DetailFeed
          setShowModal={setShowModal}
          showModal={showModal}
          selectedFeed={selectedFeed}
          selectedCategoryId={selectedCategoryId}
          selectedCategoryImage={selectedCategoryImage}
          selectedCategoryGroupName={selectedCategoryGroupName}
          selectedCategoryAnswerIds={selectedCategoryAnswerIds}
        />
      )}
    </>
  )
}

export default FeedList

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

const WriterRegion = styled.button<{ color: string }>`
  margin: 0px 0px 0px 4px;
  color: ${(porps) => porps.color};
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
