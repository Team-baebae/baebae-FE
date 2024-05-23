import styled from 'styled-components'
import { colors } from '@/styles/colors'
import { ChangeGroupNameProps } from './types'

// 그룹명 수정
const ChangeGroupName = ({ groupName, onChangeFolderName }: ChangeGroupNameProps) => {
  return (
    <>
      <FolderNameLabel>그룹명</FolderNameLabel>
      <FolderName value={groupName} onChange={onChangeFolderName} placeholder="그룹명을 입력해주세요" maxLength={4} />
      <FolderNameConditionWrapper>
        <FolderNameConditionText color={colors.grey1} fontSize="12px">
          2-4자로 입력해주세요.
        </FolderNameConditionText>
        <FolderNameLengthWrapper>
          {groupName.length > 0 ? (
            <FolderNameConditionText color={colors.grey2} fontSize="10px">
              {groupName.length}
            </FolderNameConditionText>
          ) : (
            <FolderNameConditionText color={colors.grey4} fontSize="10px">
              {groupName.length}
            </FolderNameConditionText>
          )}

          <FolderNameConditionText color={colors.grey4} fontSize="10px">
            /
          </FolderNameConditionText>
          <FolderNameConditionText color={colors.grey4} fontSize="10px">
            4
          </FolderNameConditionText>
        </FolderNameLengthWrapper>
      </FolderNameConditionWrapper>
    </>
  )
}

export default ChangeGroupName

const FolderNameLabel = styled.div`
  align-self: stretch;
  margin: 40px 0px 0px 20px;
  color: ${colors.grey3};
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.48px;
`
const FolderName = styled.input`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  width: calc(100% - 40px);
  margin: 4px 20px 0px 20px;
  padding: 20px;
  gap: 12px;
  border-radius: 12px;
  background-color: ${colors.white};
  border: none;
  &:focus {
    outline: none;
  }
`
const FolderNameConditionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 4px 20px 0px 20px;
  padding: 0px 8px;
`
const FolderNameLengthWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`

const FolderNameConditionText = styled.div<{ color: string; fontSize: string; margin?: string }>`
  margin: ${(props) => props.margin || '0px'};
  color: ${(props) => props.color};
  font-family: Pretendard;
  font-size: ${(props) => props.fontSize};
  font-weight: 400;
`
