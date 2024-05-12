import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { ChangeEvent, useState } from 'react'
import { BottomButton } from '@/components/common/Button'
import Header from '@/components/common/Header'
import IsValidNicknameText from '@/components/common/IsValidNicknameText'
import { colors } from '@/styles/colors'
import { UserInfoStateProps, userInfoState } from '@/context/Atoms'
import { isExistingNicknameApi, updateUserNicknameApi, updateUserProfileApi } from '@/apis/UserApi'

// 계정 정보 수정 페이지
const EditAccount = () => {
  const navigate = useNavigate()

  const [userInfo, setUserInfo] = useRecoilState<UserInfoStateProps>(userInfoState)

  // 이미지 파일 선택 핸들러
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]
    if (file) {
      updateUserProfile(file)
    }
  }

  // 유저 프로필 사진 업데이트
  const updateUserProfile = async (file: File) => {
    try {
      await updateUserProfileApi(userInfo.accessToken, userInfo.memberId, file).then((res) => {
        console.log(res)
        setUserInfo({
          ...userInfo,
          profileImage: res.data.imageUrl,
        })
        setProfileImg(URL.createObjectURL(file)) // 미리보기를 위해 파일 URL 저장
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

  // 닉네임 수정
  const onChangeNickname = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setNickname(value)
    setIsValid(isValidNickname(value))
    setIsClickDuplicate(false)
    setIsDuplicate(false)
  }

  // 닉네임 중복인지 여부 저장
  const [isDuplicate, setIsDuplicate] = useState<boolean>(false)
  //중복 확인 버튼 누른 직후 상태 저장
  const [isClickDuplicate, setIsClickDuplicate] = useState<boolean>(false)

  // 닉네임 중복 확인
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

  // 유저 닉네임 수정
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

  // 수정 버튼 클릭 시
  const onClickModifyBtn = () => {
    updateUserNickname()
  }

  return (
    <Container>
      <Header text="내 프로필 수정" background={colors.grey7} />

      {/* 유저 프로필 수정 부분*/}
      <ProfileImageWrapper>
        <ProfileImage src={profileImg} />
        <label htmlFor="file">
          <EditButton>사진 수정하기</EditButton>
        </label>
        <input type="file" name="file" id="file" style={{ display: 'none' }} onChange={handleImageChange} />
      </ProfileImageWrapper>

      {/* 닉네임 수정 부분 */}
      <SignUpNicknameLabel>아이디</SignUpNicknameLabel>
      <SignUpInputWrapper>
        <SingUpNicknameInput
          $isValid={isValid}
          $isClickDuplicate={isClickDuplicate}
          $isDuplicate={isDuplicate}
          value={nickname}
          onChange={onChangeNickname}
          placeholder="사용자 아이디를 입력해주세요."
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

      <BottomButton $positive={nickname === '' ? false : true} text="수정하기" func={onClickModifyBtn} />
    </Container>
  )
}

export default EditAccount

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

// 프로필 이미지 수정 부분
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
  border-radius: 100px;
  border: 1px solid ${colors.grey1};
  background-color: #fff;
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: -0.48px;
  cursor: pointer;
`

// 닉네임 수정 부분
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
  height: 61px;
  width: calc(100% - 40px);
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
  flex: 1 0 0;
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
  padding: 4px 12px;
  top: 50%;
  right: 40px;
  gap: 10px;
  border-radius: 6px;
  border: 1px solid ${colors.grey1};
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
