import styled from 'styled-components'
import { colors } from '@/styles/colors'
import { EachEditGroupProps } from '@/components/category/types'

// 답변 작성 후 나오는 카테고리 연결페이지의 각자의 카테고리 컴포넌트
const EachEditGroup = ({ selectedCategoryIds, setSelectedCategoryIds, category }: EachEditGroupProps) => {
  // 선택한 카테고리 업데이트
  const updateSelectedCategoryIds = () => {
    const index = selectedCategoryIds.indexOf(category.categoryId)
    if (index !== -1) {
      // categoryId가 이미 선택된 상태이므로 제거
      setSelectedCategoryIds(selectedCategoryIds.filter((id) => id !== category.categoryId))
    } else {
      // categoryId가 선택되지 않은 상태이므로 추가
      setSelectedCategoryIds([...selectedCategoryIds, category.categoryId])
    }
  }

  return (
    <>
      <FolderWrapper>
        <FolderImgWrapper
          selected={selectedCategoryIds.includes(category?.categoryId)}
          onClick={updateSelectedCategoryIds}
        >
          <ImageWrapper>
            <FolderImg src={category?.categoryImage} />
          </ImageWrapper>
        </FolderImgWrapper>

        <FolderName selected={selectedCategoryIds.includes(category?.categoryId)} onClick={updateSelectedCategoryIds}>
          {category?.categoryName}
        </FolderName>
      </FolderWrapper>
    </>
  )
}

export default EachEditGroup

const FolderWrapper = styled.div`
  width: 66px;
  height: 95px;
`
const FolderImgWrapper = styled.div<{ selected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 66px;
  height: 66px;
  padding: 4.5px;
  border-radius: 18px;
  border: ${(props) => (props.selected ? `1.5px solid ${colors.grey1}` : `1.5px solid ${colors.grey5}`)};
  background-color: ${colors.white};
  cursor: pointer;
`
const NewFolderImgWrapper = styled(FolderImgWrapper)`
  padding: 0px;
`
const ImageWrapper = styled.div`
  position: relative;
  width: 57px;
  height: 57px;
  border-radius: 12px;
  border: 1.2px solid ${colors.grey6};
`
const FolderImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 12px;
  transform: translate(50, 50);
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin: auto;
`
const PlusImg = styled.img`
  width: 100%;
  height: 100%;
`
const FolderName = styled.div<{ selected: boolean }>`
  text-align: center;
  margin: 6px 0px 0px 0px;
  color: ${(props) => (props.selected ? `${colors.grey1}` : `${colors.grey3}`)};
  font-family: Pretendard;
  font-size: 15px;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.6px;
`
