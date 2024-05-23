import styled from 'styled-components'
import { useCallback, useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import heic2any from 'heic2any'
import { useLocation, useNavigate } from 'react-router-dom'
import GroupHeader from '@/components/common/GroupHeader'
import Feeds from '@/components/category/Feeds'
import NoFlip from '@/components/main/NoFlip'
import { UnFixedButton } from '@/components/common/Button'
import { FeedProps } from '@/components/feed/types'
import ChangeGroupName from '@/components/category/ChangeGroupName'
import ChangeGroupImage from '@/components/category/ChangeGroupImage'
import { UserInfoStateProps, userInfoState } from '@/context/Atoms'
import { colors } from '@/styles/colors'
import { modifyCategoryApi, updateCategoryImgApi } from '@/apis/CategoryApi'
import { getTotalFeedsApi } from '@/apis/AnswerApi'

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
    let file = e.target.files && e.target.files[0]
    if (file) {
      if (file?.name.split('.')[1].toLowerCase() === 'heic') {
        let blob = file
        heic2any({ blob: blob, toType: 'image/jpeg' }).then((resultBlob) => {
          const convertedBlob = Array.isArray(resultBlob) ? resultBlob[0] : resultBlob
          file = new File([convertedBlob], file?.name.split('.')[0] + '.jpg', {
            type: 'image/jpeg',
            lastModified: new Date().getTime(),
          })
          console.log(file)
          setGroupImgUrl(URL.createObjectURL(file)) // 미리보기를 위해 파일 URL 생성
          setIsEditGroupImg(true)
          setGroupImgFile(file)
        })
      } else {
        setGroupImgUrl(URL.createObjectURL(file)) // 미리보기를 위해 파일 URL 생성
        setIsEditGroupImg(true)
        setGroupImgFile(file)
      }
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
  const getFeeds = useCallback(async () => {
    try {
      await getTotalFeedsApi(userInfo.memberId).then((res) => {
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
      <ChangeGroupImage groupImgUrl={groupImgUrl} handleImageChange={handleImageChange} />
      {/* 카테고리 이름 */}
      <ChangeGroupName groupName={groupName} onChangeFolderName={onChangeFolderName} />
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

const FolderNameConditionText = styled.div<{ color: string; fontSize: string; margin?: string }>`
  margin: ${(props) => props.margin || '0px'};
  color: ${(props) => props.color};
  font-family: Pretendard;
  font-size: ${(props) => props.fontSize};
  font-weight: 400;
`
