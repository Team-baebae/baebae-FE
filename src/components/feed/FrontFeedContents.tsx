import styled from 'styled-components'
import { SelectedFeedProps } from '@/components/feed/types'
import { colors } from '@/styles/colors'
import QuotationMark from '@/assets/question/QuotationMark.svg'
import { useNavigate } from 'react-router-dom'
import { Flip, toast } from 'react-toastify'
import { StyledToastContainer } from '../toast/toastStyle'

// 피드의 질문 컴포넌트
const FrontFeedContents = (props: SelectedFeedProps) => {
  const navigate = useNavigate()

  const selectedFeed = props.selectedFeed
  return (
    <FlipWrapper>
      <ContentWrapper>
        <Icon src={QuotationMark} />
        <FlipContent>{selectedFeed.questionContent}</FlipContent>
      </ContentWrapper>
      <WriterBlock>
        FROM
        {selectedFeed.profileOnOff ? (
          <WriterRegion
            onClick={(e) => {
              e.stopPropagation()
              navigate(`/${selectedFeed.senderNickname}`)
              window.location.reload()
            }}
            color={colors.grey1}
          >
            {selectedFeed.nickname}
          </WriterRegion>
        ) : (
          <WriterRegion
            color={colors.grey4}
            onClick={(e) => {
              e.stopPropagation()
              toast('질문자가 피드 공개를 설정하지 않았어요!')
            }}
          >
            {selectedFeed.nickname}
          </WriterRegion>
        )}
      </WriterBlock>
      <StyledToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar
        pauseOnHover={false}
        closeOnClick={false}
        closeButton={false}
        rtl={false}
        theme="dark"
        transition={Flip}
      />
    </FlipWrapper>
  )
}

export default FrontFeedContents

const Icon = styled.img`
  margin-top: 64.5px;
  width: 15.4px;
  height: 12.52px;
`
const FlipWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  height: 100%;
  padding: 30px;
  background: ${colors.white};
  box-shadow: 0px 4.945px 8.655px 0px rgba(0, 0, 0, 0.32);
`
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const FlipContent = styled.div`
  display: flex;
  margin-top: 18px;
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 600;
  line-height: 30px;
  letter-spacing: -0.8px;
`
const WriterBlock = styled.div`
  position: absolute;
  bottom: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 12px;
  color: ${colors.primary};
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: -0.28px;
`

const WriterRegion = styled.button<{ color: string }>`
  border: none;
  outline: none;
  background-color: transparent;
  color: ${(props) => props.color};
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: -0.28px;
  cursor: pointer;
`
