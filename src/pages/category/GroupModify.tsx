import styled from 'styled-components'
import GroupHeader from '../../components/common/GroupHeader'
import { colors } from '../../styles/colors'
import { useState } from 'react'
import Feeds from '../../components/folder/Feeds'
import Flips from '../../components/main/Flips'
import { useLocation, useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { userInfoState } from '../../context/Atoms'
import { UnFixedButton } from '../../components/common/Button'
import { modifyDirectoryApi } from '../../apis/DirectoryApi'

const GroupModify = () => {
  const navigate = useNavigate()
  //   넘겨받은 카카오 어세스 토큰 저장
  const location = useLocation()
  const categoryId = location.state?.categoryId

  const [userInfo, setUserInfo] = useRecoilState(userInfoState)
  const [directoryImgUrl, setDirectoryImgUrl] = useState<string>('')
  const [directoryImgFile, setDirectoryImgFile] = useState<File>()
  const [answerIds, setAnswerIds] = useState<any>([])
  // 이미지 파일 선택 핸들러
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]
    // 이미지 파일을 보낼 시엔 formData로 file을 추가해야함(추후 추가)
    if (file) {
      setDirectoryImgFile(file)
      setDirectoryImgUrl(URL.createObjectURL(file)) // 미리보기를 위해 파일 URL 생성
    }
  }

  const [categoryName, setCategoryName] = useState<string>('')

  const onChangeFolderName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCategoryName(value)
  }

  const feedList = [
    {
      questionId: 1,
      questionContent: '가은아 넌 양식이 좋아, 한식이 좋아?',
      writer: '하이',
    },
    {
      questionId: 2,
      questionContent: '가은아 넌 양식이 좋아, 한식이 좋아?',
      writer: '하염',
    },
    {
      questionId: 3,
      questionContent: '가은아 넌 양식이 좋아, 한식이 좋아?',
      writer: '하익',
    },
    {
      questionId: 4,
      questionContent: '가은아 넌 양식이 좋아, 한식이 좋아?',
      writer: '하웅',
    },
    {
      questionId: 5,
      questionContent: '가은아 넌 양식이 좋아, 한식이 좋아?',
      writer: '하열',
    },
    {
      questionId: 6,
      questionContent: '가은아 넌 양식이 좋아, 한식이 좋아?',
      writer: '하악',
    },
    {
      questionId: 7,
      questionContent: '가은아 넌 양식이 좋아, 한식이 좋아?',
      writer: '하악',
    },
  ]

  const modifyDirectory = async () => {
    try {
      await modifyDirectoryApi(userInfo.accessToken, categoryId, categoryName, answerIds).then((res) => {
        console.log(res)
        navigate(`/${userInfo.nickname}`)
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Container>
      <GroupHeader text="그룹 수정" background={colors.grey7} />
      <FolderImgWrapper>
        <FolderImg />
      </FolderImgWrapper>
      <label htmlFor="file">
        <EditFolderImgText>사진 수정하기</EditFolderImgText>
      </label>
      <input type="file" name="file" id="file" style={{ display: 'none' }} onChange={handleImageChange} />
      <FolderNameLabel>그룹명</FolderNameLabel>
      <FolderName value={categoryName} onChange={onChangeFolderName} placeholder="그룹명을 입력해주세요" />
      <FolderNameConditionWrapper>
        <FolderNameConditionText color={colors.grey1} fontSize="12px">
          2-8자로 입력해주세요.
        </FolderNameConditionText>
        <FolderNameLengthWrapper>
          {categoryName.length > 0 ? (
            <FolderNameConditionText color={colors.grey2} fontSize="10px">
              {categoryName.length}
            </FolderNameConditionText>
          ) : (
            <FolderNameConditionText color={colors.grey4} fontSize="10px">
              {categoryName.length}
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
      <FolderNameConditionText color={colors.grey3} fontSize="12px" margin="40px 20px 0px 20px">
        추가할 플립 선택
      </FolderNameConditionText>
      {feedList.length > 0 ? <Feeds data={feedList} /> : <Flips />}
      <UnFixedButton
        $positive={true}
        func={modifyDirectory}
        func2={() => console.log('실패')}
        text="그룹 수정하기"
        margin="30px 20px 30px 20px"
      />
    </Container>
  )
}

export default GroupModify

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
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
const FolderNameLabel = styled.div`
  align-self: stretch;
  color: ${colors.grey3};
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.48px;
  margin: 40px 0px 0px 20px;
`

const FolderName = styled.input`
  display: flex;
  padding: 20px;
  align-items: flex-start;
  gap: 12px;
  flex-direction: column;
  width: calc(100% - 40px);
  align-self: stretch;
  border-radius: 12px;
  background: ${colors.white};
  margin: 4px 20px 0px 20px;
  border: none;

  &:focus {
    outline: none;
  }
`

const FolderNameConditionWrapper = styled.div`
  display: flex;
  margin: 4px 20px 0px 20px;
  padding: 0px 8px;
  justify-content: space-between;
`

const FolderNameConditionText = styled.div<{ color: string; fontSize: string; margin?: string }>`
  color: ${(props) => props.color};
  font-family: Pretendard;
  font-size: ${(props) => props.fontSize};
  font-style: normal;
  font-weight: 400;
  margin: ${(props) => props.margin || '0px'};
`

const FolderNameLengthWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`
