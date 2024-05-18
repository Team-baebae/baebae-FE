import { colors } from '@/styles/colors'
import styled from 'styled-components'

interface PaginationProps {
  total: number
  current: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  setCategory: React.Dispatch<React.SetStateAction<number>>
}
const Pagination = ({ total, current, setPage, setCategory }: PaginationProps) => {
  const changePage = (index: number) => {
    setPage(index)
    index > 3 ? setCategory(1) : setCategory(0)
  }
  return (
    <DotsWrapper>
      {Array.from({ length: total }).map((_, index) => (
        <Dot key={index} active={index === current} onClick={() => changePage(index)} />
      ))}
    </DotsWrapper>
  )
}

export default Pagination

// 기본 Dot 스타일
const Dot = styled.div<{ active: boolean }>`
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background-color: ${colors.white};
  opacity: 0.4;
  margin: 0 2px;
  transition: width 0.3s ease-out;
  z-index: 100;

  // active 상태의 Dot 스타일
  ${({ active }) =>
    active &&
    `
    width: 21px;
    height: 9px;
    border-radius: 4px;
    opacity: 1;
    background-color: ${colors.primary};
  `}
`

const DotsWrapper = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  top: 676px;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  z-index: 100;
`
