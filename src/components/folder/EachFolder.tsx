import styled from 'styled-components'
import { colors } from '../../styles/colors'
import testImg from '../../assets/Glasses.svg'
import plus from '../../assets/main/Plus.svg'

interface EachFolderProps {
  $positive: boolean
  func: any
}

const EachFolder = ({ $positive, func }: EachFolderProps) => {
  return (
    <>
      <FolderWrapper>
        {$positive ? (
          <FolderImgWrapper onClick={func}>
            <FolderImg src={testImg} alt="img" />
          </FolderImgWrapper>
        ) : (
          <NewFolderImgWrapper onClick={func}>
            <PlusImg src={plus} alt="+" />
          </NewFolderImgWrapper>
        )}

        {$positive ? <FolderName>음식</FolderName> : <FolderName>추가</FolderName>}
      </FolderWrapper>
    </>
  )
}

export default EachFolder

const FolderWrapper = styled.div`
  width: 66px;
  height: 95px;
`
const FolderImgWrapper = styled.div`
  display: flex;
  width: 66px;
  height: 66px;
  padding: 4.5px;
  justify-content: center;
  align-items: center;
  border-radius: 18px;
  border: 1.5px solid ${colors.grey5};
  background: ${colors.white};
  cursor: pointer;
`

const NewFolderImgWrapper = styled(FolderImgWrapper)`
  padding: 0px;
`

const FolderImg = styled.img`
  width: 57px;
  height: 57px;
  border-radius: 12px;
  border: 1.2px solid ${colors.grey6};
  background: url(<path-to-image>) lightgray 50% / cover no-repeat;
`

const PlusImg = styled.img`
  width: 100%;
  height: 100%;
`
const FolderName = styled.div`
  text-align: center;
  margin: 6px 0px 0px 0px;
  color: ${colors.grey3};
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.6px;
`
