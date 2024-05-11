import styled from 'styled-components'
import Header from '@/components/common/Header'
import { BottomButton } from '@/components/common/Button'
import FolderList from '@/components/folder/FolderList'
import { colors } from '@/styles/colors'

const Folder = () => {
  return (
    <Container>
      <Header text="답변하기" background={colors.grey7} />
      <FolderHeaderText>이 플립을 어떤 그룹에 추가할까요?</FolderHeaderText>
      <FolderList />
      <BottomButton
        $positive={false}
        func={() => {
          console.log('완료')
        }}
        text="완료"
      />
    </Container>
  )
}

export default Folder

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
`

const FolderHeaderText = styled.div`
  align-self: stretch;
  margin: 20px 20px 0px 20px;
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.36px;
`
