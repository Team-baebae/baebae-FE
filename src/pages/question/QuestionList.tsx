import styled from 'styled-components'
import { useEffect, useState } from 'react'
import Header from '@/components/common/Header'
import NoFlip from '@/components/main/NoFlip'
import { colors } from '@/styles/colors'
import QuotationMark from '@/assets/question/QuotationMark.svg'
import { deleteQuestionsApi, getQuestionsApi } from '@/apis/MainInfoApi'
import { useRecoilValue } from 'recoil'
import { userInfoState } from '@/context/Atoms'
import { QuestionProps } from './types'
import { useNavigate } from 'react-router-dom'
import Loading from '@/components/common/Loading'
import CloseIcon from '@/assets/main/Close.svg'
import Modal from '@/components/common/Modal'

// 답변을 기다리는 질문 리스트 페이지
const QuestionList = () => {
  const userData = useRecoilValue(userInfoState)
  const myMemberId = userData.memberId
  const accessToken = userData.accessToken
  const navigate = useNavigate()

  const [askCount, setAskCount] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [questions, setQuestions] = useState<QuestionProps[]>([])
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(true) // 첫 데이터 로딩 상태
  const [scrollLoading, setScrollLoading] = useState<boolean>(true) // 무한스크롤 로딩 상태

  const getQuestionList = async (page: number) => {
    await getQuestionsApi(myMemberId, page, accessToken).then((result) => {
      if (result.length > 0) {
        // 새로운 데이터가 있을 경우
        if (currentPage === 0) {
          // 첫 페이지일 경우 질문 리스트를 초기화
          setQuestions(result)
        } else {
          // 첫 페이지가 아닐 경우 기존 데이터에 추가
          setQuestions((prevData) => [...prevData, ...result])
        }
        setAskCount(questions.length + result.length)
        setCurrentPage(page + 1)
        console.log(result)
        if (result.length < 8) {
          // 더 이상 데이터가 없을 경우
          setHasMore(false) // 무한 스크롤 중단
        }
      } else {
        setHasMore(false)
      }
      setLoading(false)
      setScrollLoading(false)
    })
  }

  useEffect(() => {
    getQuestionList(currentPage)
  }, [])

  // 무한스크롤
  const handleScroll = () => {
    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight
    const body = document.body
    const html = document.documentElement
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight,
    )
    const windowBottom = windowHeight + window.pageYOffset

    if (windowBottom >= docHeight && !loading && hasMore && !scrollLoading) {
      setScrollLoading(true)
      getQuestionList(currentPage)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrollLoading, hasMore]) // 스크롤 이벤트 리스너 등록 및 해제

  // 닉네임 값으로 이동 경로 설정 필요
  const clickName = (active: boolean) => {
    active && navigate(`/joohee`)
  }

  // 삭제 관련 함수
  // 모달 버튼 클릭 유무를 저장할 state
  const [showModal, setShowModal] = useState<boolean>(false)
  // 버튼 클릭시 모달 버튼 클릭 유무를 설정하는 state 함수
  const clickModal = () => setShowModal(!showModal)

  const [deleteId, setDeleteId] = useState<number>(-1)
  const deleteQuestion = (questionId: number) => {
    deleteQuestionsApi(questionId, accessToken).then(() => {
      const updatedQuestions = questions.filter((question) => question.questionId !== questionId)
      setQuestions(updatedQuestions)
      setAskCount(updatedQuestions.length)
      setShowModal(false)
    })
  }
  const clickDeletion = (questionId: number) => {
    console.log(questionId)
    setDeleteId(questionId)
    setShowModal(true)
  }

  if (loading) {
    return <Loading /> // 데이터 로딩 중일 때 로딩 표시
  }

  return (
    <Container>
      <Header text="답변을 기다리는 질문" background={colors.grey7} />
      <Title color={colors.grey1}>
        총 <CountText color={askCount ? colors.grey1 : colors.grey4}>{askCount}개</CountText>
      </Title>
      <ContentWrapper askCount={askCount}>
        {askCount == 0 ? (
          <NoFlip />
        ) : (
          <GridContainer>
            {questions.map((value) => (
              <FlipWrapper key={value.questionId}>
                <DeleteIcon src={CloseIcon} onClick={() => clickDeletion(value.questionId)} />
                <Icon src={QuotationMark} />
                <FlipContent>{value.content}</FlipContent>
                <WriterBlock>
                  FROM{' '}
                  <WriterRegion public={value.profileOnOff ? 1 : 0} onClick={() => clickName(value.profileOnOff)}>
                    {value.nickname}님
                  </WriterRegion>
                </WriterBlock>
              </FlipWrapper>
            ))}
          </GridContainer>
        )}
        {scrollLoading && <div>loading...</div>}
      </ContentWrapper>
      {showModal && (
        <Modal
          content="해당 질문을 삭제하시겠어요?"
          buttonText1="삭제"
          buttonText2="취소"
          func1={() => deleteQuestion(deleteId)}
          func2={clickModal}
          clickModal={clickModal}
        />
      )}
    </Container>
  )
}

export default QuestionList

const Container = styled.div`
  display: flex;
  flex-direction: column;
`
const Title = styled.div`
  display: flex;
  margin: 30px 20px 20px 20px;
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.9px;
`
const CountText = styled.div<{ color: string }>`
  display: flex;
  margin: 0px 0px 0px 6px;
  color: ${(props) => props.color};
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.9px;
`
const ContentWrapper = styled.div<{ askCount: number }>`
  padding-top: ${(props) => (props.askCount == 0 ? '80px' : '0px')};
`
const GridContainer = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(2, 1fr);
  gap: 9px;
  margin: 0 20px;
  padding-bottom: 20px;
`
const DeleteIcon = styled.img`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 24px;
  height: 24px;
  cursor: pointer;
`
const Icon = styled.img`
  width: 7.72px;
  height: 6.28px;
`
const FlipWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  flex: 1 0 0;
  height: 179px;
  padding: 30px 10px 10px 10px;
  border-radius: 2px;
  background-color: ${colors.white};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.08);
`
const FlipContent = styled.div`
  display: flex;
  flex: 1 0 0;
  margin: 18px 0px 0px 0px;
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 600;
  line-height: 21px;
  letter-spacing: -0.56px;
`
const WriterBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 4px;
  color: ${colors.primary};
  font-family: Pretendard;
  font-size: 10px;
  font-weight: 500;
  line-height: 15px;
  letter-spacing: -0.2px;
`
const WriterRegion = styled.button<{ public: number }>`
  border: none;
  outline: none;
  background-color: transparent;
  color: ${(props) => (props.public ? colors.grey1 : colors.grey4)};
  font-family: Pretendard;
  font-size: 10px;
  font-weight: 500;
  line-height: 15px;
  letter-spacing: -0.2px;
  cursor: ${(props) => props.public && 'pointer'};
`
