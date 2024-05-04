import styled from 'styled-components'
import FeedArrow from '../../assets/main/FeedArrow.svg'
import Add from '../../assets/main/Add.svg'
import { colors } from '../../styles/colors'
import Flips from './Flips'

const Feed = () => {
  const group = ['전체', '노래', '음식']
  return (
    <Container>
      <TopComponent>
        <GroupWrapper>
          {group.map((v) => (
            <Group>{v}</Group>
          ))}
          <GroupPlus>
            <Icon src={Add} width={18} height={18} />
          </GroupPlus>
        </GroupWrapper>
        <RightComponent>
          전체보기
          <Icon width={14} height={14} src={FeedArrow} />
        </RightComponent>
      </TopComponent>
      <Flips />
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
const GroupWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`
const Group = styled.div`
  display: flex;
  height: 44px;
  padding: 8px 12px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border: none;
  background: ${colors.grey2};
  color: ${colors.white};
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 18px */
  letter-spacing: -0.24px;
`
const GroupPlus = styled.div`
  display: flex;
  width: 44px;
  height: 44px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border: none;
  background: ${colors.primary60};
`
const TopComponent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
const RightComponent = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  color: ${colors.grey3};
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 18px */
  letter-spacing: -0.48px;
`
const Icon = styled.img``
