import styled from 'styled-components'
import Header from '../components/common/Header'
import { colors } from '../styles/colors'

const EditProfile = () => {
  const nickname = '기존닉네임'
  return (
    <Container>
      <Header text="내 프로필 수정" backColor={colors.grey7} />
      <ProfileImageWrapper>
        <ProfileImage />
        <EditButton>사진 수정하기</EditButton>
      </ProfileImageWrapper>
      <NicknameWrapper>
        <Title>닉네임</Title>
        <InputContent type="text" placeholder={nickname} />
      </NicknameWrapper>
      <NextBtn>수정하기</NextBtn>
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
const EditButton = styled.button`
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
const NicknameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
`
const Title = styled.div`
  margin: 0px 20px;
  color: ${colors.grey3};
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: -0.48px;
`
const InputContent = styled.input`
  display: flex;
  padding: 20px;
  margin: 4px 20px;
  align-items: center;
  flex-shrink: 0;
  border-radius: 12px;
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px;
  border: none;
  background: ${colors.white};
  &:focus {
    outline: none;
    border: 1px solid ${colors.grey1};
  }
  &::placeholder {
    color: ${colors.grey1};
  }
`
const NextBtn = styled.button`
  display: flex;
  justify-content: center;
  position: absolute;
  left: 20px;
  right: 20px;
  bottom: 30px;
  border: none;
  border-radius: 12px;
  padding: 16px 20px;
  background-color: ${colors.primary};
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`
