import styled from 'styled-components'
import { colors } from '../../styles/colors'

interface PolaroidProps {
  image: string
  setImage: any
  text: string
  setText: any
}

const Polaroid = ({ image, setImage, text, setText }: PolaroidProps) => {
  // 이미지 파일 선택 핸들러
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]
    if (file) {
      setImage(URL.createObjectURL(file)) // 미리보기를 위해 파일 URL 생성
    }
  }

  const onChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setText(value)
  }

  return (
    <PolaroidContainer>
      <label htmlFor="file">
        <ProfileWrapper>
          {image === '' ? <ProfileImg /> : <ProfileImg src={image} alt="image" />}
          {image === '' ? <PlusImgText>사진 추가</PlusImgText> : <PlusImgText></PlusImgText>}
        </ProfileWrapper>
      </label>
      <input type="file" name="file" id="file" style={{ display: 'none' }} onChange={handleImageChange} />

      <AnswerText onChange={onChangeText} value={text} placeholder="답변을 입력해보세요." />
    </PolaroidContainer>
  )
}

export default Polaroid

const PolaroidContainer = styled.div`
  position: relative;
  margin: 20px 0px 0px 0px;
  display: flex;
  width: 315px;
  height: 346px;
  padding: 18px;
  flex-direction: column;
  align-items: flex-start;
  gap: 18px;
  border-radius: 2px;
  background: ${colors.white};
  box-shadow: 0px 4.945px 8.655px 0px rgba(0, 0, 0, 0.1);
`

const ProfileWrapper = styled.div`
  width: 279px;
  height: 250px;
  flex-shrink: 0;
  border-radius: 2.473px;
  background: ${colors.grey6};
  box-shadow:
    0px 4.945px 8.655px 0px rgba(0, 0, 0, 0.04) inset,
    0px 4.945px 8.655px 0px rgba(0, 0, 0, 0.04) inset;
  cursor: pointer;
`

const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 2.473px;
`

const PlusImgText = styled.div`
  position: absolute;
  top: 133px;
  left: 132px;
  color: ${colors.grey4};
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.56px;
  cursor: pointer;
`

const AnswerText = styled.textarea`
  height: 42px;
  flex-shrink: 0;
  align-self: stretch;
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.56px;
  border: none;
  outline: none;
  &::placeholder {
    color: ${colors.grey5};
  }
`
