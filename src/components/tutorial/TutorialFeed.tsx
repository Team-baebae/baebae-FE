import { useState } from 'react'
import styled from 'styled-components'
import { colors } from '@/styles/colors'
import Plus from '@/assets/main/Plus.svg'
import TutorialFeedList from '@/components/tutorial/TutorialFeedList'
import MovieIcon from '@/assets/tutorial/MovieGroup.png'
import FoodIcon from '@/assets/tutorial/FoodGroup.png'
import MusicIcon from '@/assets/tutorial/MusicGroup.png'

// 메인페이지 피드 컴포넌트
const TutorialFeed = () => {
  const categories = [
    { categoryId: 0, categoryName: '영화', categoryImage: MovieIcon },
    { categoryId: 1, categoryName: '음식', categoryImage: FoodIcon },
    { categoryId: 2, categoryName: '노래', categoryImage: MusicIcon },
  ]

  // 클릭하여 선택된 카테고리의 정보 저장
  const [selectedCategoryId] = useState<number>(0)

  return (
    <>
      <Container>
        {/* 카테고리 부분 */}
        <TopComponent>
          {categories.map((item) => (
            <GroupWrapper key={item.categoryId}>
              <GroupImgWrapper selected={selectedCategoryId === item.categoryId}>
                <GroupImg src={item.categoryImage} />
              </GroupImgWrapper>
              <GroupName selected={selectedCategoryId === item.categoryId}>{item.categoryName}</GroupName>
            </GroupWrapper>
          ))}
          <GroupWrapper>
            <GroupPlusImg src={Plus} />
            <GroupName>추가</GroupName>
          </GroupWrapper>
        </TopComponent>
        <TutorialFeedList />
      </Container>
    </>
  )
}

export default TutorialFeed

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  gap: 14px;
`
const TopComponent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  z-index: 0;
  gap: 12px;
`
const GroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  width: 44px;
  height: 63px;
  cursor: pointer;
`
const GroupImgWrapper = styled.div<{ selected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  padding: 3px;
  border-radius: 12px;
  border: ${(props) => (props.selected ? `1px solid ${colors.grey1}` : `1px solid ${colors.grey5}`)};
  background-color: ${colors.white};
  user-select: none;
`
const GroupImg = styled.img`
  width: 38px;
  height: 38px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 0.8px solid ${colors.grey6};
  background: lightgray 50% / cover no-repeat;
  user-select: none;
  pointer-events: none;
`
const GroupName = styled.div<{ selected?: boolean }>`
  color: ${(props) => (props.selected ? `${colors.grey1}` : `${colors.grey3}`)};
  font-family: Pretendard;
  font-size: 10px;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.4px;
`
const GroupPlusImg = styled.img`
  width: 44px;
  height: 44px;
`
