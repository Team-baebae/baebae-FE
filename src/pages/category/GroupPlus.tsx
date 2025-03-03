import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useRecoilState } from 'recoil'
import heic2any from 'heic2any'
import { useLocation, useNavigate } from 'react-router-dom'
import GroupHeader from '@/components/common/GroupHeader'
import { UnFixedButton } from '@/components/common/Button'
import Feeds from '@/components/category/Feeds'
import NoFlip from '@/components/main/NoFlip'
import { FeedProps } from '@/components/feed/types'
import ChangeGroupName from '@/components/category/ChangeGroupName'
import { makeCategoryApi } from '@/apis/CategoryApi'
import { getTotalFeedsApi } from '@/apis/AnswerApi'
import { userInfoState } from '@/context/Atoms'
import { colors } from '@/styles/colors'
import DefaultImg from '@/assets/main/DefaultImage.png'

// 새 그룹 생성 페이지
const GroupPlus = () => {
  const navigate = useNavigate()

  // 넘겨받은 category 정보 저장
  const location = useLocation()
  const redirectRoute = location.state?.redirectRoute

  // 리코일 로그인한 userInfo
  const [userInfo, setUserInfo] = useRecoilState(userInfoState)

  // 카테고리 정보 저장
  const [categoryImgUrl, setCategoryImgUrl] = useState<string>('')
  const [categoryImgFile, setCategoryImgFile] = useState<File>()
  const [selectedAnswerIds, setSelectedAnswerIds] = useState<number[]>([])
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
          setCategoryImgUrl(URL.createObjectURL(file))
          setCategoryImgFile(file)
        })
      } else {
        setCategoryImgUrl(URL.createObjectURL(file))
        setCategoryImgFile(file)
      }
    }
  }

  // 카테고리 이름
  const [groupName, setGroupName] = useState<string>('')
  const onChangeFolderName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setGroupName(value)
  }

  //전체 피드리스트 조회
  const [feedList, setFeedList] = useState<FeedProps[]>([])
  const getFeeds = useCallback(async () => {
    try {
      await getTotalFeedsApi(userInfo.memberId).then((res) => {
        setFeedList(res.data.content)
      })
    } catch (err) {
      console.log(err)
    }
  }, [])

  // 카테고리 생성
  const makeCategory = async () => {
    try {
      await makeCategoryApi(
        userInfo.accessToken,
        userInfo.memberId,
        categoryImgFile,
        groupName,
        selectedAnswerIds,
        userInfo.refreshToken,
        setUserInfo,
      ).then((res: any) => {
        if (redirectRoute === 'feedTotal') {
          navigate('/groups', {
            state: {
              selectedCategoryId: res.data.categoryId,
              selectedCategoryGroupName: res.data.groupName,
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

  useEffect(() => {
    getFeeds()
  }, [getFeeds])

  return (
    <Container>
      <GroupHeader text="새 그룹 추가" background={colors.grey7} />
      {/* 카테고리 이미지 */}
      <FolderImgWrapper>
        {categoryImgUrl === '' ? (
          <ImageWrapper>
            <FolderImg src={DefaultImg} />
          </ImageWrapper>
        ) : (
          <ImageWrapper>
            <FolderImg src={categoryImgUrl} />
          </ImageWrapper>
        )}
      </FolderImgWrapper>
      <label htmlFor="file">
        <EditFolderImgText>사진 수정하기</EditFolderImgText>
      </label>
      <input type="file" name="file" id="file" style={{ display: 'none' }} onChange={handleImageChange} />
      {/* 카테고리 이름 */}
      <ChangeGroupName groupName={groupName} onChangeFolderName={onChangeFolderName} />
      <FolderNameConditionText color={colors.grey3} fontSize="12px" margin="40px 20px 0px 20px">
        추가할 플립 선택
      </FolderNameConditionText>
      {/* 전체 피드리스트 */}
      {feedList.length > 0 ? (
        <Feeds data={feedList} selectedAnswerIds={selectedAnswerIds} setSelectedAnswerIds={setSelectedAnswerIds} />
      ) : (
        <NoFlip />
      )}
      {/* 카테고리 생성 버튼 */}
      <UnFixedButton
        $positive={groupName.length >= 2 && groupName.length <= 4 ? true : false}
        func={makeCategory}
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
const ImageWrapper = styled.div`
  position: relative;
  width: 76px;
  height: 76px;
  border-radius: 16px;
  border: 1.76px solid ${colors.grey6};
  background-color: ${colors.white};
`
const FolderImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 16px;
  transform: translate(50, 50);
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin: auto;
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

const FolderNameConditionText = styled.div<{ color: string; fontSize: string; margin?: string }>`
  margin: ${(props) => props.margin || '0px'};
  color: ${(props) => props.color};
  font-family: Pretendard;
  font-size: ${(props) => props.fontSize};
  font-weight: 400;
`
