import { colors } from '@/styles/colors'
import styled from 'styled-components'
import DefaultImg from '@/assets/main/DefaultImage.png'

interface EditProfileProps {
  profileImg: string
  handleImageChange: any
}

const EditProfile = ({ profileImg, handleImageChange }: EditProfileProps) => {
  return (
    <ProfileImageWrapper>
      {profileImg === null ? (
        <ImageWrapper>
          <ProfileImage src={DefaultImg} />
        </ImageWrapper>
      ) : (
        <ImageWrapper>
          <ProfileImage src={profileImg} />
        </ImageWrapper>
      )}
      <label htmlFor="file">
        <EditButton>사진 수정하기</EditButton>
      </label>
      <input type="file" name="file" id="file" style={{ display: 'none' }} onChange={handleImageChange} />
    </ProfileImageWrapper>
  )
}

export default EditProfile

const ProfileImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px 20px 0px;
  gap: 12px;
`
const ImageWrapper = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 59px;
  background-color: ${colors.grey2};
`
const ProfileImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 59px;
  transform: translate(50, 50);
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin: auto;
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
