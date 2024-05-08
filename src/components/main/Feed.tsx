import styled from 'styled-components'
import logo from '../../assets/Logo.svg'
import plus from '../../assets/Plus.svg'
import { colors } from '../../styles/colors'
import Flips from './Flips'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import 'swiper/css'
import Feeds from '../feed/Feeds'

const Feed = () => {
  const groups = [
    {
      directoryName: '영화',
      directoryImg: logo,
    },
    {
      directoryName: '음식',
      directoryImg: logo,
    },
    {
      directoryName: '노래',
      directoryImg: logo,
    },
    {
      directoryName: '폴더',
      directoryImg: logo,
    },
    {
      directoryName: '폴더',
      directoryImg: logo,
    },
    {
      directoryName: '폴더',
      directoryImg: logo,
    },
    {
      directoryName: '폴더',
      directoryImg: logo,
    },
    {
      directoryName: '폴더',
      directoryImg: logo,
    },
  ]

  const feedList = [
    {
      questionId: 1,
      questionContent: '가은아 넌 양식이 좋아, 한식이 좋아?',
      writer: '하이',
    },
    {
      questionId: 2,
      questionContent: '가은아 넌 양식이 좋아, 한식이 좋아?',
      writer: '하염',
    },
    {
      questionId: 3,
      questionContent: '가은아 넌 양식이 좋아, 한식이 좋아?',
      writer: '하익',
    },
    {
      questionId: 4,
      questionContent: '가은아 넌 양식이 좋아, 한식이 좋아?',
      writer: '하웅',
    },
    {
      questionId: 5,
      questionContent: '가은아 넌 양식이 좋아, 한식이 좋아?',
      writer: '하열',
    },
    {
      questionId: 6,
      questionContent: '가은아 넌 양식이 좋아, 한식이 좋아?',
      writer: '하악',
    },
  ]

  return (
    <Container>
      <TopComponent>
        <Swiper
          style={{ width: '100%' }}
          slidesPerView={6.1}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
        >
          {groups.map((item) => {
            return (
              <SwiperSlide>
                <GroupWrapper>
                  <GroupImgWrapper>
                    <GroupImg src={item.directoryImg} />
                  </GroupImgWrapper>
                  <GroupName>{item.directoryName}</GroupName>
                </GroupWrapper>
              </SwiperSlide>
            )
          })}
          <SwiperSlide>
            <GroupWrapper>
              <GroupPlusImg src={plus} />
              <GroupName>추가</GroupName>
            </GroupWrapper>
          </SwiperSlide>
        </Swiper>
      </TopComponent>
      {feedList.length > 0 ? <Feeds data={feedList} /> : <Flips />}
    </Container>
  )
}

export default Feed

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
`

const GroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  width: 44px;
  height: 63px;
`
const GroupImgWrapper = styled.div`
  display: flex;
  width: 44px;
  height: 44px;
  padding: 3px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  border: 1px solid ${colors.grey5};
  background: ${colors.white};
`

const GroupImg = styled.img`
  width: 38px;
  height: 38px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 0.8px solid ${colors.grey6};
  background: lightgray 50% / cover no-repeat;
`

const GroupName = styled.div`
  color: ${colors.grey3};
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
