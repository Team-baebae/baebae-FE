import { colors } from '@/styles/colors'
import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import 'swiper/css'
import { categoryProps } from './types'
import plus from '@/assets/main/Plus.svg'
import { useNavigate } from 'react-router-dom'

interface GroupListProps {
  categories: categoryProps[]
  setCurrentPage: any
  selectedCategoryId: number
  setSelectedCategoryId: any
  setSelectedCategoryImage: any
  setSelectedCategoryGroupName: any
  setSelectedCategoryAnswerIds: any
  bind: any
  isMyPage: boolean
}

const GroupList = ({
  categories,
  setCurrentPage,
  selectedCategoryId,
  setSelectedCategoryId,
  setSelectedCategoryImage,
  setSelectedCategoryGroupName,
  setSelectedCategoryAnswerIds,
  isMyPage,
  bind,
}: GroupListProps) => {
  const navigate = useNavigate()

  return (
    <TopComponent>
      <Swiper
        style={{ width: '100%' }}
        slidesPerView={6.1}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
        {categories.map((item) => {
          return (
            <SwiperSlide key={item.categoryId}>
              <GroupWrapper>
                <GroupImgWrapper
                  onClick={() => {
                    setCurrentPage(0)
                    setSelectedCategoryId(item.categoryId)
                    setSelectedCategoryImage(item.categoryImage)
                    setSelectedCategoryGroupName(item.categoryName)
                    setSelectedCategoryAnswerIds(item.answerIds)
                  }}
                  selected={selectedCategoryId === item.categoryId}
                  {...bind(item.categoryId, item.categoryImage, item.categoryName, item.answerIds)}
                  onContextMenu={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                >
                  <ImageWrapper>
                    <GroupImg src={item.categoryImage} />
                  </ImageWrapper>
                </GroupImgWrapper>
                <GroupName selected={selectedCategoryId === item.categoryId}>{item.categoryName}</GroupName>
              </GroupWrapper>
            </SwiperSlide>
          )
        })}
        {/* 카테고리 생성 */}
        {isMyPage && (
          <SwiperSlide>
            <GroupWrapper>
              <GroupPlusImg
                onClick={() => {
                  navigate('/groups/new', {
                    state: {
                      redirectRoute: 'feedTotal',
                    },
                  })
                }}
                src={plus}
              />
              <GroupName>추가</GroupName>
            </GroupWrapper>
          </SwiperSlide>
        )}
      </Swiper>
    </TopComponent>
  )
}

export default GroupList

const TopComponent = styled.div`
  display: flex;
  width: 100%;
  padding: 12px 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
  z-index: 0;
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
const ImageWrapper = styled.div`
  position: relative;
  width: 38px;
  height: 38px;
  border-radius: 8px;
  border: 0.8px solid ${colors.grey6};
  user-select: none;
  pointer-events: none;
  /* z-index: -3; */
`
const GroupImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 8px;
  transform: translate(50, 50);
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin: auto;
`

const GroupName = styled.div<{ selected?: boolean }>`
  color: ${(props) => (props.selected ? `${colors.grey1}` : `${colors.grey3}`)};
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.4px;
`

const GroupPlusImg = styled.img`
  width: 44px;
  height: 44px;
`
