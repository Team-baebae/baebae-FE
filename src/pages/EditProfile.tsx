import styled from 'styled-components'
import Header from '../components/common/Header'
import { colors } from '../styles/colors'
import { useRecoilState } from 'recoil'
import { userInfoState } from '../context/Atoms'
import { ChangeEvent, useState } from 'react
import { isExistingNicknameApi, updateUserNicknameApi, updateUserProfileApi } from '../apis/UserApi'
import { BottomButton } from '../components/common/Button'
import { useNavigate } from 'react-router-dom'

const EditProfile = () => {
  const navigate = useNavigate()

  // const nickname = '기존닉네임'
  const [userInfo, setUserInfo] = useRecoilState(userInfoState)

  // 이미지 파일 선택 핸들러
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]
    // 이미지 파일을 보낼 시엔 formData로 file을 추가해야함(추후 추가)
    if (file) {
      updateUserProfile(file)
      setProfileImg(URL.createObjectURL(file)) // 미리보기를 위해 파일 URL 생성
    }
  }

  const updateUserProfile = async (file: File) => {
    try {
      await updateUserProfileApi(userInfo.accessToken, userInfo.memberId, file).then((res) => {
        console.log(res)
        setUserInfo({
          ...userInfo,
          profileImage: res.data.imageUrl,
        })
        setProfileImg(URL.createObjectURL(file)) // 미리보기를 위해 파일 URL 생성
      })
    } catch (err) {
      console.log(err)
    }
  }

  // 닉네임 입력 및 유효성 확인 (형식에 맞는지만 체크)
  const [nickname, setNickname] = useState<string>(userInfo.nickname)
  const [profileImg, setProfileImg] = useState<string>(userInfo.profileImage)
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

  const updateUserNickname = async () => {
    try {
      await updateUserNicknameApi(userInfo.accessToken, userInfo.memberId, nickname).then((res) => {
        if (res.status === 200) {
          setUserInfo({
            ...userInfo,
            nickname: nickname,
          })
          navigate('/setting')
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  const onClickModifyBtn = () => {
    updateUserNickname()
  }

  return (
    <Container>
      <Header text="내 프로필 수정" background={colors.grey7} />
      <ProfileImageWrapper>
        <ProfileImage src={profileImg} />
        <label htmlFor="file">
          <EditButton>사진 수정하기</EditButton>
        </label>
        <input type="file" name="file" id="file" style={{ display: 'none' }} onChange={handleImageChange} />
      </ProfileImageWrapper>
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
      <BottomButton positive={nickname === '' ? false : true} text="수정하기" func={onClickModifyBtn} />
    </Container>
  )
}

export default EditProfile

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`
const ProfileImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px 20px;
  gap: 12px;
`
const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 59px;
  background-color: ${colors.grey2};
`
const EditButton = styled.div`
  padding: 4px 12px;
  justify-content: center;
  color: ${colors.grey1};
  border-radius: 100px;
  border: 1px solid ${colors.grey1};
  background: #fff;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: -0.48px;
  cursor: pointer;
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
