import styled from 'styled-components'
import Header from '../components/common/Header'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { loginApi } from '../apis/UserApi'
import { colors } from '../styles/colors'
import { ChangeEvent, useState } from 'react'
import { FixedButton } from '../components/common/Button'

// Login함수의 response 인터페이스
interface LoginProps {
  data: any
  status: number
  statusText: string
  headers: any
  config: any
}

const SignUp = () => {
  const navigate = useNavigate()

  // 넘겨 받은 카카오 어세스토큰 저장
  const location = useLocation()
  const kakaoAccessToken = location.state?.kakaoAccessToken

  // 닉네임 입력 및 유효성 확인 (형식에 맞는지만 체크)
  const [nickname, setNickname] = useState<string>('')
  const [isValid, setIsValid] = useState<boolean>(true)
  const isValidNickname = (nickname: string): boolean => {
    const regex = /^[a-zA-Z0-9_-]{6,25}$/
    return regex.test(nickname)
  }
  const onChangeNickname = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setNickname(value)
    setIsValid(isValidNickname(value))
    setIsClickDuplicate(false)
    setIsDuplicate(false)
  }

  // 닉네임 중복인지 여부 확인
  const [isDuplicate, setIsDuplicate] = useState<boolean>(false)
  //중복 확인 버튼 누른 직후 상태
  const [isClickDuplicate, setIsClickDuplicate] = useState<boolean>(false)

  const checkDuplicateNickname = () => {
    setIsClickDuplicate(true)
    if (isValid) {
      setIsDuplicate(false)
    }
  }

  // 로그인 함수
  const login = async (kakaoAccessToken: string, nickname: string) => {
    try {
      await loginApi(kakaoAccessToken, nickname).then((res: LoginProps) => {
        if (res.status === 200) {
          localStorage.setItem('memberId', res.data.memberId)
          localStorage.setItem('accessToken', res.data.accessToken)
          localStorage.setItem('nickname', res.data.nickname)
          localStorage.setItem('email', res.data.email)
          localStorage.setItem('refreshToken', res.data.refreshToken)
          navigate('/signup/onboarding')
        } else {
          alert('로그인 실패')
          navigate('/login')
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Container>
      <Header text="회원가입" backColor={colors.grey7} />
      <SignUpHeaderText>
        플리빗을 사용하기 위한 <br />
        아이디가 필요해요!
      </SignUpHeaderText>
      <SignUpNicknameLabel>아이디</SignUpNicknameLabel>

      <SignUpInputWrapper>
        <SingUpNicknameInput
          isValid={isValid}
          isClickDuplicate={isClickDuplicate}
          isDuplicate={isDuplicate}
          value={nickname}
          onChange={onChangeNickname}
          placeholder="사용자 아이디를 입력해주세요."
        />
        <DuplicationCheckBtn onClick={checkDuplicateNickname}>중복 확인</DuplicationCheckBtn>
      </SignUpInputWrapper>
      <UnderInputWrapper>
        {!isClickDuplicate && nickname.length === 0 ? (
          <UnderInputText>6-25자의 영문, 숫자, 기호(_)만 입력해주세요.</UnderInputText>
        ) : !isClickDuplicate && nickname.length > 0 ? (
          <UnderInputText></UnderInputText>
        ) : isClickDuplicate && !isValid ? (
          <UnderInputTextRed>
            올바른 형식으로 입력해 주세요.
            <br />
            가능한 문자: 영어,숫자,특수기호(_)
          </UnderInputTextRed>
        ) : isClickDuplicate && isDuplicate ? (
          <UnderInputTextRed>이미 존재하는 아이디에요.</UnderInputTextRed>
        ) : (
          <UnderInputText>사용가능한 아이디에요.</UnderInputText>
        )}

        <UnderInputNicknameLengthWrapper>
          {nickname.length === 0 ? (
            <UnderInputNicknameLengthText color={colors.grey4}>{nickname.length}</UnderInputNicknameLengthText>
          ) : (
            <UnderInputNicknameLengthText color={colors.grey3}>{nickname.length}</UnderInputNicknameLengthText>
          )}
          <UnderInputNicknameLengthText color={colors.grey4}>/</UnderInputNicknameLengthText>
          <UnderInputNicknameLengthText color={colors.grey4}>25</UnderInputNicknameLengthText>
        </UnderInputNicknameLengthWrapper>
      </UnderInputWrapper>
      <FixedButton
        positive={isValid && isClickDuplicate && !isDuplicate ? true : false}
        func={login(kakaoAccessToken, nickname)}
      />
    </Container>
  )
}

export default SignUp

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const SignUpHeaderText = styled.div`
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 27px */
  letter-spacing: -0.36px;
  margin: 20px 20px 0px 20px;
`

const SignUpNicknameLabel = styled.div`
  align-self: stretch;
  color: ${colors.grey3};
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.48px;
  margin: 40px 0px 0px 20px;
`

const SignUpInputWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 61px;
  margin: 4px 0px 0px 0px;
`

const SingUpNicknameInput = styled.input<{ isValid: boolean; isClickDuplicate: boolean; isDuplicate: boolean }>`
  display: flex;
  height: 61px;
  width: calc(100% - 40px);
  margin: 0px 20px 0px 20px;
  padding: 20px;
  justify-content: center;
  align-items: center;
  gap: 12px;
  align-self: stretch;
  border-radius: 12px;
  background: ${colors.white};
  flex: 1 0 0;
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.56px;
  border: ${({ isValid, isClickDuplicate, isDuplicate }) =>
    isClickDuplicate && !isValid
      ? '1px solid #f00'
      : isClickDuplicate && isDuplicate
        ? '1px solid #f00'
        : isClickDuplicate && !isDuplicate
          ? `1px solid ${colors.grey1}`
          : 'none'};
  &:focus {
    outline: none;
    /* border: 1px solid ${colors.grey1}; */
  }
  &::placeholder {
    color: ${colors.grey5};
  }
`

const DuplicationCheckBtn = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 40px;
  display: flex;
  padding: 4px 12px;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  border-radius: 6px;
  border: 1px solid ${colors.grey1};
  background: ${colors.grey1};
  color: ${colors.white};
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.48px;
  cursor: pointer;
`

const UnderInputWrapper = styled.div`
  width: 100%;
  margin: 6px 0px 0px 0px;
  padding: 0px 20px;
  display: flex;
  justify-content: space-between;
`

const UnderInputText = styled.div`
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 130%;
  letter-spacing: -0.24px;
  margin: 0px 0px 0px 8px;
`

const UnderInputTextRed = styled(UnderInputText)`
  color: #f00;
`

const UnderInputNicknameLengthWrapper = styled.div`
  display: flex;
  margin: 0px 8px 0px 0px;
  gap: 2px;
`

const UnderInputNicknameLengthText = styled.div<{ color: string }>`
  color: ${(props) => props.color};
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.4px;
`
