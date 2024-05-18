import styled from 'styled-components'
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { useNavigate } from 'react-router-dom'
import Filter from 'badwords-ko'
import { toast, Flip } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import MiniToggle from '@/components/common/MiniToggle'
import { Button } from '@/components/common/Button'
import { StyledToastContainer } from '@/components/toast/toastStyle'
import LoginModal from '@/components/question/LoginModal'
import Tooltip from '@/components/question/Tooltip'
import { colors } from '@/styles/colors'
import { isLoggedInState, isMineState, ownerUserData, userInfoState } from '@/context/Atoms'
import { getQuestionLengthApi, postQuestionApi } from '@/apis/MainInfoApi'
import NewIcon from '@/assets/main/NewIcon.svg'
import ForwardArrow from '@/assets/setting/ForwardArrow.svg'
import Info from '@/assets/main/Info.svg'

// 질문하기 컴포넌트
const Ask = () => {
  const navigate = useNavigate()
  // 로그인한 사람의 데이터 정보
  const loginUserInfo = useRecoilValue(userInfoState)
  // 리코일 계정주인 데이터 정보
  const userInfo = useRecoilValue(ownerUserData)
  //계정 주인의 memberId
  const receiverId = userInfo.memberId

  // 내 페이지인지 여부 확인
  const isMyPage = useRecoilValue(isMineState)
  const isMine = JSON.stringify(isMyPage)

  // 로그인 된 상태인지 확인
  const isLoggedIn = useRecoilValue(isLoggedInState)
  // 로그인 되었다면 로그인 된 사람의 어세스토큰
  const writerToken = useRecoilValue(userInfoState).accessToken

  // 답변을 기다리는 질문 개수와 클릭 시
  const [askCount, setAskCount] = useState<number>(0)
  const questionClick = () => {
    navigate(`/questions`)
  }

  // 질문 개수 받기
  const getQuestionLength = async () => {
    await getQuestionLengthApi(loginUserInfo.accessToken, loginUserInfo.memberId).then((res) => {
      setAskCount(res)
    })
  }

  useEffect(() => {
    isMine == 'true' && getQuestionLength()
    console.log(`나의 페이지인가? : ${isMine}`)
  }, [])

  // 모달 버튼 클릭 유무를 저장할 state (로그인 안했을 시 나오는 모달)
  const [showModal, setShowModal] = useState<boolean>(false)
  // 버튼 클릭시 모달 버튼 클릭 유무를 설정하는 state 함수
  const clickModal = () => setShowModal(!showModal)

  // 툴팁 여부를 저장할 state
  const [showTooltip, setShowTooltip] = useState<boolean>(false)
  const clickIcon = () => setShowTooltip(!showTooltip)

  // 질문 내용 state
  const [text, setText] = useState<string>('')
  const [writer, setWriter] = useState<string>('')
  const [isProfileOn, setIsProfileOn] = useState<boolean>(false)

  const onChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }
  const onChangeWriter = (e: ChangeEvent<HTMLInputElement>) => {
    setWriter(e.target.value)
  }

  // 비속어 필터링
  const filter = new Filter()

  // 질문 전송
  const submitHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const filteredText = filter.clean(text)
    const questionData = { content: filteredText, nickname: writer, profileOnOff: isProfileOn }
    console.log(questionData)
    setText('')
    setWriter('')
    setIsProfileOn(false)
    // 비로그인인 경우 모달창
    !isLoggedIn && setShowModal(true)
    // 로그인인 경우 질문 전송
    isLoggedIn &&
      postQuestionApi(loginUserInfo.memberId, receiverId, questionData, writerToken).then((status) => {
        status == 201 ? toast('질문 완료!') && getQuestionLength() : toast('[전송 오류] 잠시 후 다시 시도해 주세요')
      })
  }

  return (
    <Container>
      {/* 답변을 기다리는 질문은 계정 주인만 볼 수 있다 */}
      {isMyPage == true && (
        <AskNotification onClick={questionClick}>
          {askCount > 0 && <Icon width={34.25} height={16} src={NewIcon} />}
          <TextWrapper ml={askCount ? '6px' : '0px'} color={colors.white}>
            답변을 기다리는 질문
            <TextWrapper ml="4px" color={askCount ? colors.primary : colors.grey4}>
              {askCount}개
            </TextWrapper>
          </TextWrapper>
          <Icon width={20} height={20} src={ForwardArrow} />
        </AskNotification>
      )}
      {/* 질문 입력 */}
      <AskContainer>
        <TextRegion
          placeholder={`이런 질문은 어떤가요?\n너의 패션 스타일이 궁금해!\n무슨 음식 좋아해?`}
          value={text}
          onChange={onChangeText}
        />
        <WarnText
          isShow={text == '' ? true : false}
        >{`* 사칭으로 인한 신고 접수시\n플리빗 이용에 제한이 있을 수 있어요.`}</WarnText>
        <WriterBlock>
          FROM{' '}
          <WriterRegion
            placeholder="자유롭게 입력해주세요"
            type="text"
            value={writer}
            onChange={onChangeWriter}
            maxLength={10}
          />
        </WriterBlock>
      </AskContainer>
      {/* 프로필 공개여부 */}
      <OpenProfileWrapper margin={isMyPage ? '30px' : '82px'}>
        <OpenProfile>
          <MiniToggle isActive={isProfileOn} setIsActive={setIsProfileOn} />
          <OpenProfileText>
            질문자 프로필 공개
            <Icon width={18} height={18} src={Info} onClick={clickIcon} />
          </OpenProfileText>
        </OpenProfile>
        <Tooltip show={showTooltip} clickIcon={clickIcon} />
      </OpenProfileWrapper>
      {/* 최하단 버튼 */}
      <Button $positive={text == '' || writer == '' ? false : true} func={submitHandler} text="질문하기" />
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
      {/* 로그인 안하고 질문 시 나오는 모달 */}
      {showModal && <LoginModal content={`앗!\n로그인을 해야 질문을 남길 수 있어요😥`} clickModal={clickModal} />}
    </Container>
  )
}

export default Ask

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  gap: 14px;
`
const AskNotification = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  border-radius: 12px;
  background-color: ${colors.grey2};
  cursor: pointer;
`
const TextWrapper = styled.div<{ ml: string; color: string }>`
  display: flex;
  flex: 1 0 0;
  margin-left: ${(props) => props.ml};
  color: ${(props) => props.color};
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: -0.6px;
`
const Icon = styled.img``

const AskContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  height: 346px;
  padding: 20px;
  border-radius: 2.127px;
  background-color: ${colors.white};
  box-shadow: 0px 5.259px 9.204px 0px rgba(0, 0, 0, 0.04);
`
const TextRegion = styled.textarea`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 346px;
  flex: 1 0 0;
  border: none;
  resize: none;
  outline: none;
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 500;
  line-height: 30px;
  letter-spacing: -0.8px;
  &::placeholder {
    color: ${colors.grey5};
  }
`
const WarnText = styled.span<{ isShow: boolean }>`
  visibility: ${(props) => (props.isShow ? 'visible' : 'hidden')};
  position: absolute;
  top: 127px;
  white-space: pre-wrap;
  color: #e1e1e1;
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: -0.48px;
`
const WriterBlock = styled.div`
  display: flex;
  width: 100%;
  color: ${colors.primary};
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: -0.28px;
`
const WriterRegion = styled.input`
  width: 100%;
  margin-left: 12.6px;
  border: none;
  outline: none;
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: -0.28px;
  &::placeholder {
    color: ${colors.grey5};
  }
`

const OpenProfileWrapper = styled.div<{ margin: string }>`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: ${(props) => props.margin};
`
const OpenProfile = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`
const OpenProfileText = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  color: ${colors.grey4};
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: -0.24px;
`
