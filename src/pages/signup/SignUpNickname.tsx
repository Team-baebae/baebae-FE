import { ChangeEvent, useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import styled from 'styled-components'
import { useNavigate, useLocation } from 'react-router-dom'
import Header from '@/components/common/Header'
import { BottomButton } from '@/components/common/Button'
import { isExistingNicknameApi, loginApi } from '@/apis/UserApi'
import { colors } from '@/styles/colors'
import { UserInfoStateProps, isLoggedInState, userInfoState } from '@/context/Atoms'

const SignUp = () => {
  const navigate = useNavigate()

  // 넘겨 받은 카카오 어세스토큰 저장
  const location = useLocation()
  const kakaoAccessToken = location.state?.kakaoAccessToken

  // 리코일로 받은 유저 정보
  const [userInfo, setUserInfo] = useRecoilState<UserInfoStateProps>(userInfoState)
  // 리코일 로그인 여부
  const setIsLoggedIn = useSetRecoilState(isLoggedInState)

  // 닉네임 입력 및 유효성 확인 (형식에 맞는지만 체크)
  const [nickname, setNickname] = useState<string>('')
  const [isValid, setIsValid] = useState<boolean>(true)
  const isValidNickname = (nickname: string): boolean => {
    const regex = /^[a-zA-Z0-9_-]{6,25}$/
    return regex.test(nickname)
  }
  // 닉네임 텍스트 수정
  const onChangeNickname = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setNickname(value)
    setIsValid(isValidNickname(value))
    setIsClickDuplicate(false)
    setIsDuplicate(false)
  }

  // 닉네임 중복인지 여부 확인
  const [isDuplicate, setIsDuplicate] = useState<boolean>(false)
  //중복 확인 버튼 누른 직후인지 확인
  const [isClickDuplicate, setIsClickDuplicate] = useState<boolean>(false)

  // 닉네임 중복체크
  const checkDuplicateNickname = async () => {
    try {
      setIsClickDuplicate(true)
      if (isValid) {
        await isExistingNicknameApi(nickname).then((res) => {
          console.log(res)
          if (res.data.isExisting) {
            setIsDuplicate(true)
          } else {
            setIsDuplicate(false)
          }
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  // 로그인 함수
  const login = async (kakaoAccessToken: string, nickname: string) => {
    try {
      await loginApi(kakaoAccessToken, nickname).then((res: LoginProps) => {
        if (res.status === 200) {
          console.log(res.data.accessToken)
          setUserInfo({
            ...userInfo,
            memberId: res.data.id,
            nickname: res.data.nickname,
            email: res.data.email,
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken,
          })
          setIsLoggedIn(true)
          navigate('/signup/onboarding', {
            state: {
              nickname: res.data.nickname,
            },
          })
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
      <Header text="회원가입" background={colors.grey7} />
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
      <BottomButton
        $positive={isValid && isClickDuplicate && !isDuplicate ? true : false}
        func={() => login(kakaoAccessToken, nickname)}
        text="다음"
      />
    </Container>
  )
}

export default SignUp

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
`

const SignUpHeaderText = styled.div`
  width: 100%;
  padding: 0px 0px 0px 20px;
  margin: 20px 20px 0px 20px;
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.36px;
`

const SignUpNicknameLabel = styled.div`
  align-self: stretch;
  margin: 40px 0px 0px 20px;
  color: ${colors.grey3};
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.48px;
`

const SignUpInputWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 61px;
  margin: 4px 0px 0px 0px;
`

const SingUpNicknameInput = styled.input<{ isValid: boolean; isClickDuplicate: boolean; isDuplicate: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  flex: 1 0 0;
  width: calc(100% - 40px);
  height: 61px;
  margin: 0px 20px 0px 20px;
  padding: 20px;
  gap: 12px;
  border: ${({ isValid, isClickDuplicate, isDuplicate }) =>
    isClickDuplicate && !isValid
      ? '1px solid #f00'
      : isClickDuplicate && isDuplicate
        ? '1px solid #f00'
        : isClickDuplicate && !isDuplicate
          ? `1px solid ${colors.grey1}`
          : 'none'};
  border-radius: 12px;
  background-color: ${colors.white};
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.56px;

  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${colors.grey5};
  }
`

const DuplicationCheckBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: absolute;
  top: 50%;
  right: 40px;
  padding: 4px 12px;
  gap: 10px;
  border: 1px solid ${colors.grey1};
  border-radius: 6px;
  background-color: ${colors.grey1};
  color: ${colors.white};
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.48px;
  transform: translateY(-50%);
  cursor: pointer;
`

const UnderInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 6px 0px 0px 0px;
  padding: 0px 20px;
`

const UnderInputText = styled.div`
  margin: 0px 0px 0px 8px;
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 400;
  line-height: 130%;
  letter-spacing: -0.24px;
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
  font-weight: 400;
  letter-spacing: -0.4px;
`
