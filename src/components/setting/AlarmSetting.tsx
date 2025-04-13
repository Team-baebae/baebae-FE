import styled from 'styled-components'
import Toggle from '@/components/common/Toggle'
import { colors } from '@/styles/colors'

// 알림 설정 컴포넌트
const AlarmSetting = () => {
  return (
    <Container>
      <ContentsWrapper>
        <TextWrapper>
          <Contents>플리빗 알림</Contents>
          <MiniContents>공감, 새 질문, 이벤트 정보 알림</MiniContents>
        </TextWrapper>
        <Toggle />
      </ContentsWrapper>
    </Container>
  )
}

export default AlarmSetting

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
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1 0 0;
`
const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`
const Contents = styled.div`
  color: ${colors.black};
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
`
const MiniContents = styled.div`
  color: ${colors.grey4};
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 500;
`
