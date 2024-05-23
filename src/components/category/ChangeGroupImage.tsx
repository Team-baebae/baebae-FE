import styled from 'styled-components'
import { colors } from '@/styles/colors'
import { ChangeGroupImageProps } from './types'

// 그룹 이미지 수정
const ChangeGroupImage = ({ groupImgUrl, handleImageChange }: ChangeGroupImageProps) => {
  return (
    <>
      <FolderImgWrapper>
        <ImageWrapper>
          <FolderImg src={groupImgUrl} />
        </ImageWrapper>
      </FolderImgWrapper>
      <label htmlFor="file">
        <EditFolderImgText>사진 수정하기</EditFolderImgText>
      </label>
      <input type="file" name="file" id="file" style={{ display: 'none' }} onChange={handleImageChange} />
    </>
  )
}

export default ChangeGroupImage

const FolderImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 88px;
  height: 88px;
  padding: 5.996px 6px 6.004px 6px;
  margin: 20px 0px 0px 50%;
  border-radius: 24px;
  border: 1.76px solid ${colors.grey5};
  background-color: ${colors.white};
  transform: translateX(-50%);
`
const ImageWrapper = styled.div`
  position: relative;
  width: 76px;
  height: 76px;
  flex-shrink: 0;
  border-radius: 16px;
  border: 1.76px solid ${colors.grey6};
  background-color: ${colors.white};
`
const FolderImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 16px;
  transform: translate(50, 50);
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin: auto;
`

const EditFolderImgText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 87px;
  height: 26px;
  gap: 10px;
  margin: 9.09px 0px 0px 50%;
  border-radius: 100px;
  border: 1px solid ${colors.grey1};
  background-color: ${colors.white};
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.48px;
  transform: translateX(-50%);
  cursor: pointer;
`
