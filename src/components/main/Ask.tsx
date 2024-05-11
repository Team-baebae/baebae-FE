import styled from 'styled-components'
import NewIcon from '../../assets/main/NewIcon.svg'
import ForwardArrow from '../../assets/ForwardArrow.svg'
import Info from '../../assets/main/Info.svg'
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import { colors } from '../../styles/colors'
import { useNavigate } from 'react-router-dom'
import MiniToggle from '../common/MiniToggle'
import { Button } from '../common/Button'
import { userDataProps } from './types'
import { useRecoilValue } from 'recoil'
import { isLoggedInState, userInfoState } from '../../context/Atoms'
import LoginModal from './LoginModal'
import Tooltip from './Tooltip'
import { postQuestionApi } from '../../apis/MainInfoApi'
import { toast, Flip } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { StyledToastContainer } from '../toast/toastStyle'

interface AskProps {
  userInfo: userDataProps
  isMyPage: boolean
}
const Ask = ({ userInfo, isMyPage }: AskProps) => {
  const isMine = JSON.stringify(isMyPage)
  const isLoggedIn = useRecoilValue(isLoggedInState)
  const writerToken = useRecoilValue(userInfoState).accessToken
  const receiverId = userInfo.memberId
  const [askCount, setAskCount] = useState<number>(0)
  const navigate = useNavigate()
  const questionClick = () => {
    navigate(`/${userInfo?.nickname}/questions`)
  }

  useEffect(() => {
    // api 연동
    setAskCount(3)
    console.log(`나의 페이지인가? : ${isMine}`)
  }, [])

  // 모달 버튼 클릭 유무를 저장할 state
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

  // 질문 전송
  const submitHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const questionData = { content: text, nickname: writer, profileOnOff: isProfileOn }
    console.log(questionData)
    setText('')
    setWriter('')
    setIsProfileOn(false)
    // 비로그인인 경우 모달창
    !isLoggedIn && setShowModal(true)
    // 로그인인 경우 질문 전송
    isLoggedIn && postQuestionApi(receiverId, questionData, writerToken).then(() => toast('질문 완료!'))
  }

  return (
    <Container>
      {isMyPage == true && (
        <AskNotification onClick={questionClick}>
          {askCount && <Icon width={34.25} height={16} src={NewIcon} />}
          <TextWrapper ml={askCount ? '6px' : '0px'} color={colors.white}>
            답변을 기다리는 질문
            <TextWrapper ml="4px" color={askCount ? colors.primary : colors.grey4}>
              {askCount}개
            </TextWrapper>
          </TextWrapper>
          <Icon width={20} height={20} src={ForwardArrow} />
        </AskNotification>
      )}
      <AskContainer margin={isMyPage ? '53px' : '0'}>
        <TextRegion
          placeholder={`이런 질문은 어떤가요?\n너의 패션 스타일이 궁금해!\n무슨 음식 좋아해?`}
          value={text}
          onChange={onChangeText}
        />
        <WriterBlock>
          FROM <WriterRegion placeholder="자유롭게 입력해주세요" type="text" value={writer} onChange={onChangeWriter} />
        </WriterBlock>
      </AskContainer>
      {!isMyPage && (
        <OpenProfileWrapper margin={isMyPage ? '0' : '78px'}>
          <OpenProfile>
            <MiniToggle isActive={isProfileOn} setIsActive={setIsProfileOn} />
            <OpenProfileText>
              질문자 프로필 공개
              <Icon width={18} height={18} src={Info} onClick={clickIcon} />
            </OpenProfileText>
          </OpenProfile>
          <Tooltip show={showTooltip} clickIcon={clickIcon} />
        </OpenProfileWrapper>
      )}
      <Button $positive={true} func={submitHandler} text="질문하기" />
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
  padding: 12px 20px;
  justify-content: space-between;
  align-items: center;
  border-radius: 12px;
  background: ${colors.grey2};
  cursor: pointer;
`
const TextWrapper = styled.div<{ ml: string; color: string }>`
  display: flex;
  flex: 1 0 0;
  margin-left: ${(props) => props.ml};
  color: ${(props) => props.color};
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.6px;
`
const Icon = styled.img``
const AskContainer = styled.div<{ margin: string }>`
  display: flex;
  height: 346px;
  padding: 20px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  border-radius: 2.127px;
  background-color: ${colors.white};
  box-shadow: 0px 5.259px 9.204px 0px rgba(0, 0, 0, 0.04);
  margin-bottom: ${(props) => props.margin};
`
const TextRegion = styled.textarea`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 346px;
  flex: 1 0 0;
  flex-shrink: 0;
  border: none;
  resize: none;
  outline: none;
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 30px;
  letter-spacing: -0.8px;
  &::placeholder {
    color: ${colors.grey5};
  }
`
const WriterBlock = styled.div`
  display: flex;
  width: 100%;
  color: ${colors.primary};
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: -0.28px;
`
const WriterRegion = styled.input`
  color: ${colors.grey1};
  width: 100%;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: -0.28px;
  margin-left: 12.6px;
  border: none;
  outline: none;
  &::placeholder {
    color: ${colors.grey5};
  }
`
const OpenProfileWrapper = styled.div<{ margin: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
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
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: -0.24px;
`
