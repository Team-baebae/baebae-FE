import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil'
import { useNavigate } from 'react-router-dom'
import GroupHeader from '@/components/common/GroupHeader'
import { UnFixedButton } from '@/components/common/Button'
import Feeds from '@/components/category/Feeds'
import NoFlip from '@/components/main/NoFlip'

import { makeCategoryApi } from '@/apis/CategoryApi'
import { userInfoState } from '@/context/Atoms'
import { colors } from '@/styles/colors'
import DefaultImg from '@/assets/main/DefaultImage.png'
import { getFeedsApi } from '@/apis/AnswerApi'

const GroupPlus = () => {
  const navigate = useNavigate()

  const userInfo = useRecoilValue(userInfoState)

  const [directoryImgUrl, setDirectoryImgUrl] = useState<string>('')
  const [directoryImgFile, setDirectoryImgFile] = useState<File>()
  const [selectedAnswerIds, setSelectedAnswerIds] = useState<number[]>([])
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

  interface FeedProps {
    answerId: number
    questionId: number
    questionContent: string
    memberId: number
    content: string
    linkAttachments: string[]
    musicName: string
    musicSinger: string
    musicAudioUrl: string
    imageUrls: string[]
    createdDate: string
    heartCount: number
    curiousCount: number
    sadCount: number
    fcmtoken: string
  }

  const [feedList, setFeedList] = useState<FeedProps[]>([])
  const selectedDirectoryId = 0
  const getFeeds = useCallback(async () => {
    try {
      await getFeedsApi(userInfo.memberId, selectedDirectoryId).then((res) => {
        console.log(res)
        setFeedList(res.data.content)
      })
    } catch (err) {
      console.log(err)
    }
  }, [])

  const makeDirectory = async () => {
    try {
      await makeCategoryApi(
        userInfo.accessToken,
        userInfo.memberId,
        directoryImgFile,
        categoryName,
        selectedAnswerIds,
      ).then((res) => {
        console.log(res)
        navigate(`/${userInfo.nickname}`)
      })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getFeeds()
  }, [getFeeds])

  return (
    <Container>
      <GroupHeader text="새 그룹 추가" background={colors.grey7} />
      <FolderImgWrapper>
        {directoryImgUrl === '' ? <FolderImg src={DefaultImg} /> : <FolderImg src={directoryImgUrl} />}
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
      {feedList.length > 0 ? (
        <Feeds data={feedList} selectedAnswerIds={selectedAnswerIds} setSelectedAnswerIds={setSelectedAnswerIds} />
      ) : (
        <NoFlip />
      )}
      <UnFixedButton
        $positive={categoryName === '' ? false : true}
        func={makeDirectory}
        func2={() => console.log('그룹 생성 실패')}
        text="그룹 추가하기"
        margin="30px 20px 30px 20px"
      />
    </Container>
  )
}

export default GroupPlus

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
`

const FolderImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 88px;
  height: 88px;
  padding: 5.996px 6px 6.004px 6px;
  margin: 20px 0px 0px 50%;
  border-radius: 24px;
  border: 1.76px solid ${colors.grey5};
  background-color: ${colors.white};
  transform: translateX(-50%);
`

const FolderImg = styled.img`
  width: 76px;
  height: 76px;
  flex-shrink: 0;
  border-radius: 16px;
  border: 1.76px solid ${colors.grey6};
  background-color: ${colors.white};
`

const EditFolderImgText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 87px;
  height: 26px;
  gap: 10px;
  margin: 9.09px 0px 0px 50%;
  border-radius: 100px;
  border: 1px solid ${colors.grey1};
  background-color: ${colors.white};
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.48px;
  transform: translateX(-50%);
  cursor: pointer;
`
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
  margin: 4px 20px 0px 20px;
  padding: 20px;
  gap: 12px;
  width: calc(100% - 40px);
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

const FolderNameConditionText = styled.div<{ color: string; fontSize: string; margin?: string }>`
  margin: ${(props) => props.margin || '0px'};
  color: ${(props) => props.color};
  font-family: Pretendard;
  font-size: ${(props) => props.fontSize};
  font-weight: 400;
`

const FolderNameLengthWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`
