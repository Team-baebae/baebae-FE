import styled from 'styled-components'
import { colors } from '../../styles/colors'
import Toggle from '../common/Toggle'

const AlramSetting = () => {
  return (
    <Container>
      <ContentsWrapper>
        <Contents>공감 알림</Contents>
        <Toggle />
      </ContentsWrapper>
      <ContentsWrapper>
        <Contents>새 질문 알림</Contents>
        <Toggle />
      </ContentsWrapper>
      <ContentsWrapper>
        <Contents>이벤트 정보 알림</Contents>
        <Toggle />
      </ContentsWrapper>
    </Container>
  )
}

export default AlramSetting

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0px 20px;
  padding: 20px;
  gap: 20px;
  border-radius: 20px;
  background-color: ${colors.white};
`
const ContentsWrapper = styled.div`
  display: flex;
  flex: 1 0 0;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
const Contents = styled.div`
  color: ${colors.black};
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`
const RightIcon = styled.img`
  width: 24px;
  height: 24px;
`
