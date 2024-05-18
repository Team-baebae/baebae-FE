import { ChangeEvent, useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import styled from 'styled-components'
import { useNavigate, useLocation } from 'react-router-dom'
import Header from '@/components/common/Header'
import { BottomButton } from '@/components/common/Button'
import IsValidNicknameText from '@/components/common/IsValidNicknameText'
import { LoginProps, GetUserInfoProps } from '@/components/signup/types'
import { getUserInfoApi, isExistingNicknameApi, loginApi } from '@/apis/UserApi'
import { colors } from '@/styles/colors'
import { UserInfoStateProps, isLoggedInState, userInfoState } from '@/context/Atoms'
import { registerServiceWorker, requestPermission } from '@/firebase-messaging-sw'

//회원가입 닉네임 입력 페이지
const SignUpNickname = () => {
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

  const login = async (kakaoAccessToken: string, nickname: string) => {
    try {
      registerServiceWorker()
      let fcmToken = await requestPermission()
      setUserInfo({
        ...userInfo,
        fcmToken: fcmToken,
      })
      console.log('fcmToken' + fcmToken)
      await loginApi(kakaoAccessToken, nickname, fcmToken).then(async (res: LoginProps) => {
        if (res.status === 200) {
          console.log(res)
          console.log(res.data.accessToken)
          console.log(res.data.id)
          getUserInfo(res.data)
          setIsLoggedIn(true)
          navigate(`/signup/complete`, {
            state: {
              nickname: nickname,
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

  // 유저 정보 받아오기
  const getUserInfo = async (data: GetUserInfoProps) => {
    try {
      await getUserInfoApi(data.accessToken, data.id).then((res) => {
        console.log(res)
        setUserInfo({
          ...userInfo,
          memberId: data.id,
          nickname: data.nickname,
          email: data.email,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          profileImage: res.data.profileImage,
        })
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
      {/* 아이디 입력받기 */}
      <SignUpNicknameLabel>아이디</SignUpNicknameLabel>
      <SignUpInputWrapper>
        <SingUpNicknameInput
          $isValid={isValid}
          $isClickDuplicate={isClickDuplicate}
          $isDuplicate={isDuplicate}
          value={nickname}
          onChange={onChangeNickname}
          placeholder="사용자 아이디를 입력해주세요."
          maxLength={25}
        />
        <DuplicationCheckBtn onClick={checkDuplicateNickname}>중복 확인</DuplicationCheckBtn>
      </SignUpInputWrapper>
      {/* Input박스 아래 텍스트 컴포넌트 */}
      <IsValidNicknameText
        isValid={isValid}
        isClickDuplicate={isClickDuplicate}
        isDuplicate={isDuplicate}
        nickname={nickname}
      />
      <BottomButton
        $positive={isValid && isClickDuplicate && !isDuplicate ? true : false}
        func={() => login(kakaoAccessToken, nickname)}
        text="다음"
      />
    </Container>
  )
}

export default SignUpNickname

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

const SingUpNicknameInput = styled.input<{ $isValid: boolean; $isClickDuplicate: boolean; $isDuplicate: boolean }>`
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
  border: ${({ $isValid, $isClickDuplicate, $isDuplicate }) =>
    $isClickDuplicate && !$isValid
      ? '1px solid #f00'
      : $isClickDuplicate && $isDuplicate
        ? '1px solid #f00'
        : $isClickDuplicate && !$isDuplicate
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
