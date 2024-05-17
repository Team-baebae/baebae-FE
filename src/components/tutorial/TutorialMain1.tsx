import styled from 'styled-components'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { colors } from '@/styles/colors'
import MainHeader from '@/components/common/MainHeader'
import TutorialProfile from '@/components/tutorial/TutorialProfile'
import TutorialAsk from '@/components/tutorial/TutorialAsk'
import Pagination from '@/components/tutorial/Pagination'
import HighLight1 from '@/components/tutorial/HighLight1'
import TutorialFeed from './TutorialFeed'

const TutorialMain1 = () => {
  const navigate = useNavigate()
  const [category, setCategory] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState(0)
  const totalPages = 7
  const location = useLocation()
  const nickname = location.state?.nickname

  const ClickPage = () => {
    currentPage == 3
      ? (setCategory(1), setCurrentPage((prev) => prev + 1))
      : currentPage == 6
        ? navigate(`/${nickname}`)
        : setCurrentPage((prev) => prev + 1)
  }
  return (
    <>
      <Container>
        <MainHeader background={colors.white} />
        <TutorialProfile />
        <CategoryBox>
          <Category category={category} num={0}>
            질문
          </Category>
          <Category category={category} num={1}>
            피드
          </Category>
        </CategoryBox>
        {category ? <TutorialFeed /> : <TutorialAsk />}
        <ClickWrapper onClick={ClickPage} />
        <Pagination total={totalPages} current={currentPage} />
        {currentPage == 0 && <HighLight1 />}
      </Container>
    </>
  )
}

export default TutorialMain1

const Container = styled.div`
  position: relative;
  top: 0;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
`
const ClickWrapper = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  width: 100vw;
  height: 100vh;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.7);
`
const CategoryBox = styled.div`
  display: flex;
  align-items: flex-end;
  height: 44px;
  flex: 1 0 0;
  gap: 18.5px;
  padding: 0px 21.25px;
  background-color: ${colors.white};
  border-bottom: 0.2px solid ${colors.grey4};
`
const Category = styled.div<{ category: number; num: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 0 0;
  height: 33px;
  gap: 9px;
  border-bottom: 2px solid ${(props) => (props.category == props.num ? colors.grey1 : colors.white)};
  color: ${(props) => (props.category == props.num ? colors.grey1 : colors.grey3)};
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  letter-spacing: -0.6px;
  cursor: pointer;
`
