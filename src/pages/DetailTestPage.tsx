import { useState } from 'react'
import DetailFeed from '../components/feed/DetailFeed'
import styled from 'styled-components'

const DetailTestPage = () => {
  // 모달 버튼 클릭 유무를 저장할 state
  const [showModal, setShowModal] = useState<boolean>(false)
  // 버튼 클릭시 모달 버튼 클릭 유무를 설정하는 state 함수
  const clickModal = () => setShowModal(!showModal)

  return (
    <Container>
      <button onClick={clickModal}>피드 디테일</button>
      {showModal && <DetailFeed clickModal={clickModal} />}
    </Container>
  )
}

export default DetailTestPage

const Container = styled.div`
  font-family: Pretendard;
`
