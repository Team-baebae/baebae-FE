import styled from 'styled-components'
import { colors } from '@/styles/colors'
import { EachCategoryProps } from '@/components/category/types'
import Plus from '@/assets/main/Plus.svg'

// 답변 작성 후 나오는 카테고리 연결페이지의 각자의 카테고리 컴포넌트
const AnswerEachFolder = ({ selectedCategoryId, category, $positive, func }: EachCategoryProps) => {
  return (
    <>
      <FolderWrapper>
        {$positive ? (
          <FolderImgWrapper selected={selectedCategoryId === category?.categoryId} onClick={func}>
            <FolderImg src={category?.categoryImage} />
          </FolderImgWrapper>
        ) : (
          <NewFolderImgWrapper selected={selectedCategoryId === category?.categoryId} onClick={func}>
            <PlusImg src={Plus} />
          </NewFolderImgWrapper>
        )}

        {$positive ? (
          <FolderName selected={selectedCategoryId === category?.categoryId}>{category?.categoryName}</FolderName>
        ) : (
          <FolderName selected={selectedCategoryId === category?.categoryId}>추가</FolderName>
        )}
      </FolderWrapper>
    </>
  )
}

export default AnswerEachFolder

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

const FolderImg = styled.img`
  width: 57px;
  height: 57px;
  border-radius: 12px;
  border: 1.2px solid ${colors.grey6};
  background: url(<path-to-image>) lightgray 50% / cover no-repeat;
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
