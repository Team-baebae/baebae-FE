import styled from 'styled-components'
import { useCallback, useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { useLocation, useNavigate } from 'react-router-dom'
import GroupHeader from '@/components/common/GroupHeader'
import Feeds from '@/components/category/Feeds'
import NoFlip from '@/components/main/NoFlip'
import { UnFixedButton } from '@/components/common/Button'
import { FeedProps } from '@/components/feed/types'
import { UserInfoStateProps, userInfoState } from '@/context/Atoms'
import { colors } from '@/styles/colors'
import { modifyCategoryApi, updateCategoryImgApi } from '@/apis/CategoryApi'
import { getFeedsApi } from '@/apis/AnswerApi'

// 그룹 수정페이지
const GroupModify = () => {
  const navigate = useNavigate()

  // 로그인 한 userInfo
  const userInfo = useRecoilValue<UserInfoStateProps>(userInfoState)

  // 넘겨받은 category 정보 저장
  const location = useLocation()
  const categoryId = location.state?.categoryId
  const categoryImage = location.state?.categoryImage
  const categoryName = location.state?.categoryName
  const [selectedAnswerIds, setSelectedAnswerIds] = useState<number[]>(location.state?.answerIds)
  const redirectRoute = location.state?.redirectRoute
  // 사진 수정했는지 여부 확인
  const [isEditGroupImg, setIsEditGroupImg] = useState(false)

  // 카테고리 이미지
  const [groupImgUrl, setGroupImgUrl] = useState<string>(categoryImage)
  const [groupImgFile, setGroupImgFile] = useState<File>()
  // 이미지 파일 선택 핸들러
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]
    // 이미지 파일을 보낼 시엔 formData로 file을 추가해야함(추후 추가)
    if (file) {
      setGroupImgUrl(URL.createObjectURL(file)) // 미리보기를 위해 파일 URL 생성
      setIsEditGroupImg(true)
      setGroupImgFile(file)
    }
  }

  // 카테고리 이름
  const [groupName, setGroupName] = useState<string>(categoryName)
  const onChangeFolderName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setGroupName(value)
  }

  // 전체피드리스트 조회
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

  // 카테고리 수정
  const modifyCategory = async () => {
    try {
      await modifyCategoryApi(userInfo.accessToken, categoryId, groupName, selectedAnswerIds).then((res) => {
        console.log(res)
        console.log(redirectRoute)
        if (redirectRoute === 'feedTotal') {
          navigate('/groups', {
            state: {
              selectedCategoryId: res.data.categoryId,
              selectedCategoryGroupName: res.data.categoryName,
              selectedCategoryImage: res.data.categoryImage,
              selectedCategoryAnswerIds: res.data.answerIds,
            },
          })
        } else {
          navigate(`/${userInfo.nickname}`, {
            state: {
              defaultCategory: 1,
            },
          }) // 현재 페이지에서 뒤로 이동
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  // 카테고리 이미지 수정
  const updateDirectoryImg = async () => {
    try {
      await updateCategoryImgApi(userInfo.accessToken, categoryId, groupImgFile).then((res) => {
        console.log(res)
      })
    } catch (err) {
      console.log(err)
    }
  }

  // 수정버튼 클릭 시
  const onClickModifyBtn = () => {
    if (isEditGroupImg && groupImgFile) {
      updateDirectoryImg()
      modifyCategory()
    } else {
      modifyCategory()
    }
  }

  useEffect(() => {
    getFeeds()
  }, [getFeeds])

  return (
    <Container>
      <GroupHeader text="그룹 수정" background={colors.grey7} />
      {/* 카테고리 이미지 */}
      <FolderImgWrapper>
        <FolderImg src={groupImgUrl} />
      </FolderImgWrapper>
      <label htmlFor="file">
        <EditFolderImgText>사진 수정하기</EditFolderImgText>
      </label>
      <input type="file" name="file" id="file" style={{ display: 'none' }} onChange={handleImageChange} />
      {/* 카테고리 이름 */}
      <FolderNameLabel>그룹명</FolderNameLabel>
      <FolderName value={groupName} onChange={onChangeFolderName} placeholder="그룹명을 입력해주세요" />
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
      <FolderNameConditionText color={colors.grey3} fontSize="12px" margin="40px 20px 0px 20px">
        추가할 플립 선택
      </FolderNameConditionText>
      {/* 전체 카테고리 리스트 */}
      {feedList.length > 0 ? (
        <Feeds data={feedList} selectedAnswerIds={selectedAnswerIds} setSelectedAnswerIds={setSelectedAnswerIds} />
      ) : (
        <NoFlip />
      )}
      {/* 카테고리 수정버튼 */}
      <UnFixedButton
        $positive={groupName.length >= 2 && groupName.length <= 4 ? true : false}
        func={onClickModifyBtn}
        func2={() => console.log('수정 실패')}
        text="그룹 수정하기"
        margin="30px 20px 30px 20px"
      />
    </Container>
  )
}

export default GroupModify

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
