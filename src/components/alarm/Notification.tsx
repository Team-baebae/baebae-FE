import { colors } from '@/styles/colors'
import styled from 'styled-components'
import NewIcon from '@/assets/notification/NewIcon.svg'

interface NotificationType {
  title: string
  content: string
  isChecked: boolean
}
const Notification = ({ title, content, isChecked }: NotificationType) => {
  return (
    <AlarmWrapper isNew={!isChecked}>
      <TopWrapper>
        <TitleMessage>{title}</TitleMessage>
        {!isChecked && <Icon src={NewIcon} alt="NEW" />}
      </TopWrapper>
      <SubMessage>{content}</SubMessage>
    </AlarmWrapper>
  )
}

export default Notification

const AlarmWrapper = styled.div<{ isNew: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 14px 20px;
  gap: 4px;
  background-color: ${(props) => (props.isNew ? colors.primary5 : colors.white)};
`
const TopWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const TitleMessage = styled.h1`
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.6px;
`
const SubMessage = styled.h3`
  color: ${colors.grey3};
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 400;
  line-height: 18.2px;
  letter-spacing: -0.6px;
`
const Icon = styled.img`
  width: 34.25px;
  height: 16px;
`
