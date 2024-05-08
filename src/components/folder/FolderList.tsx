import styled from 'styled-components'
import EachFolder from './EachFolder'
import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'
import { useState } from 'react'
import { colors } from '../../styles/colors'
import { UnFixedButton } from '../common/Button'

const FolderList = () => {
  // open은 모달 열고 닫는 상태
  const [open, setOpen] = useState<boolean>(false)

  // 모달 이전상태로 변화
  const handleDismissPlusMusicModal = () => {
    setOpen(false)
  }

  const [folderImgUrl, setFolderImgUrl] = useState<string>('')
  const [folderName, setFolderName] = useState<string>('')

  const onChangeFolderName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFolderName(value)
  }

  return (
    <Container>
      <EachFolder $positive={true} func={() => console.log('폴더 추가')} />
      <EachFolder $positive={true} func={() => console.log('폴더 추가')} />
      <EachFolder $positive={true} func={() => console.log('폴더 추가')} />
      <EachFolder $positive={true} func={() => console.log('폴더 추가')} />
      <EachFolder $positive={true} func={() => console.log('폴더 추가')} />
      <EachFolder $positive={true} func={() => console.log('폴더 추가')} />
      <EachFolder $positive={false} func={() => setOpen(!open)} />
      <BottomSheet open={open} snapPoints={() => [433.09091]} onDismiss={handleDismissPlusMusicModal} blocking={true}>
        <PlusLinkText>새 그룹 추가</PlusLinkText>
        <FolderImgWrapper>
          <FolderImg />
        </FolderImgWrapper>
        <EditFolderImgText>사진 수정하기</EditFolderImgText>
        <FolderName value={folderName} onChange={onChangeFolderName} placeholder="그룹명을 입력해주세요" />
        <FolderNameConditionWrapper>
          <FolderNameConditionText color={colors.grey1} fontSize="12px">
            2-8자로 입력해주세요.
          </FolderNameConditionText>
          <FolderNameLengthWrapper>
            {folderName.length > 0 ? (
              <FolderNameConditionText color={colors.grey2} fontSize="10px">
                {folderName.length}
              </FolderNameConditionText>
            ) : (
              <FolderNameConditionText color={colors.grey4} fontSize="10px">
                {folderName.length}
              </FolderNameConditionText>
            )}

            <FolderNameConditionText color={colors.grey4} fontSize="10px">
              /
            </FolderNameConditionText>
            <FolderNameConditionText color={colors.grey4} fontSize="10px">
              8
            </FolderNameConditionText>
          </FolderNameLengthWrapper>
        </FolderNameConditionWrapper>
        <UnFixedButton
          $positive={true}
          func={() => {
            console.log('수정')
          }}
          func2={() => {
            console.log('수정실패')
          }}
          text="추가하기"
          margin="20px 20px 0px 20px"
        />
      </BottomSheet>
    </Container>
  )
}
export default FolderList

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px 23px;
  width: 335px;
  margin: 0px 20px 0px 20px;
  padding: 20px 0px 20px 0px;
  max-height: calc(100vh - 330px);
  overflow-y: scroll;
  justify-items: stretch;
`

// 모달창 내부
const PlusLinkText = styled.div`
  align-self: stretch;
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.36px;
  margin: 20px 0px 0px 20px;
`

const FolderImgWrapper = styled.div`
  display: flex;
  width: 88px;
  height: 88px;
  padding: 5.996px 6px 6.004px 6px;
  margin: 20px 0px 0px 50%;
  transform: translateX(-50%);
  justify-content: center;
  align-items: center;
  border-radius: 24px;
  border: 1.76px solid ${colors.grey5};
  background: ${colors.white};
`

const FolderImg = styled.div`
  width: 76px;
  height: 76px;
  flex-shrink: 0;
  border-radius: 16px;
  border: 1.76px solid ${colors.grey6};
  background: ${colors.white};
`

const EditFolderImgText = styled.div`
  display: flex;
  width: 87px;
  height: 26px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 9.09px 0px 0px 50%;
  transform: translateX(-50%);
  border-radius: 100px;
  border: 1px solid ${colors.grey1};
  background: ${colors.white};
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.48px;
  cursor: pointer;
`
const FolderName = styled.input`
  display: flex;
  padding: 20px;
  align-items: flex-start;
  gap: 9px;
  width: calc(100% - 40px);
  align-self: stretch;
  border-radius: 12px;
  background: ${colors.grey7};
  margin: 20px 20px 0px 20px;
  border: none;

  &:focus {
    outline: none;
  }
`

const FolderNameConditionWrapper = styled.div`
  display: flex;
  margin: 6px 20px 0px 20px;
  padding: 0px 8px;
  justify-content: space-between;
`

const FolderNameConditionText = styled.div<{ color: string; fontSize: string }>`
  color: ${(props) => props.color};
  font-family: Pretendard;
  font-size: ${(props) => props.fontSize};

  font-style: normal;
  font-weight: 400;
`

const FolderNameLengthWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`
