import styled from 'styled-components'
import { colors } from '@/styles/colors'

interface IsValidNicknameTextProps {
  isValid: boolean
  isClickDuplicate: boolean
  isDuplicate: boolean
  nickname: string
}

// 닉네임 입력하고 나오는 아래 텍스트 컴포넌트
const IsValidNicknameText = ({ isValid, isClickDuplicate, isDuplicate, nickname }: IsValidNicknameTextProps) => {
  return (
    <UnderInputWrapper>
      {/* 닉네임이 조건에 맞는지 여부 */}
      {!isClickDuplicate && nickname.length === 0 ? (
        <UnderInputText>6-25자의 영문, 숫자, 기호(_)만 입력해주세요.</UnderInputText>
      ) : !isClickDuplicate && nickname.length > 0 ? (
        <UnderInputText></UnderInputText>
      ) : isClickDuplicate && !isValid ? (
        <UnderInputTextRed>
          올바른 형식으로 입력해 주세요.(6~25자)
          <br />
          가능한 문자: 영어,숫자,특수기호(_)
        </UnderInputTextRed>
      ) : isClickDuplicate && isDuplicate ? (
        <UnderInputTextRed>이미 존재하는 아이디예요.</UnderInputTextRed>
      ) : (
        <UnderInputText>사용가능한 아이디예요.</UnderInputText>
      )}
      {/* 닉네임의 텍스트 길이 */}
      <UnderInputNicknameLengthWrapper>
        {nickname.length === 0 ? (
          <UnderInputNicknameLengthText color={colors.grey4}>{nickname.length}</UnderInputNicknameLengthText>
        ) : (
          <UnderInputNicknameLengthText color={colors.grey3}>{nickname.length}</UnderInputNicknameLengthText>
        )}
        <UnderInputNicknameLengthText color={colors.grey4}>/</UnderInputNicknameLengthText>
        <UnderInputNicknameLengthText color={colors.grey4}>25</UnderInputNicknameLengthText>
      </UnderInputNicknameLengthWrapper>
    </UnderInputWrapper>
  )
}

export default IsValidNicknameText

const UnderInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 6px 0px 0px 0px;
  padding: 0px 20px;
`

const UnderInputText = styled.div`
  margin: 0px 0px 0px 8px;
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 400;
  line-height: 130%;
  letter-spacing: -0.24px;
`

const UnderInputTextRed = styled(UnderInputText)`
  color: #f00;
`

const UnderInputNicknameLengthWrapper = styled.div`
  display: flex;
  margin: 0px 8px 0px 0px;
  gap: 2px;
`

const UnderInputNicknameLengthText = styled.div<{ color: string }>`
  color: ${(props) => props.color};
  font-family: Pretendard;
  font-size: 10px;
  font-weight: 400;
  letter-spacing: -0.4px;
`
