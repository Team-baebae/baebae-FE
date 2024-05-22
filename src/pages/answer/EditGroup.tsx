import styled from 'styled-components'
import { useRecoilValue } from 'recoil'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Header from '@/components/common/Header'
import { BottomButton } from '@/components/common/Button'
import AnswerFolderList from '@/components/category/AnswerFolderList'
import { colors } from '@/styles/colors'
import { UserInfoStateProps, userInfoState } from '@/context/Atoms'
import { connectGroupApi } from '@/apis/AnswerApi'
import EditGroupList from '@/components/feed/EditGroupList'
import { getCategoryListOfFeedApi, modifyCategoryListOfFeedApi } from '@/apis/CategoryApi'
import { ContainedGroupProps } from '@/components/feed/types'

// 답변 완료 후 그룹 선택 페이지
const EditGroup = () => {
  const navigate = useNavigate()

  // url에서 questionId 추출
  const { questionId } = useParams()

  // 전달받은 answerId
  const location = useLocation()
  const answerId = location.state?.answerId

  // 리코일 로그인하 유저정보
  const userInfo = useRecoilValue<UserInfoStateProps>(userInfoState)

  // 해당 피드가 속한 카테고리 리스트
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([])

  // 해당 피드가 속한 카테고리 리스트 받기
  const getCategoryListOfFeed = async () => {
    try {
      const res = await getCategoryListOfFeedApi(userInfo.accessToken, answerId)
      const categoryList = res.data
      const newSelectedCategoryIds = categoryList.map((category: ContainedGroupProps) => category.categoryId)
      // 선택된 카테고리 Id 배열 업데이트
      setSelectedCategoryIds(newSelectedCategoryIds)
      console.log(newSelectedCategoryIds)
    } catch (err) {
      console.log(err)
    }
  }

  const modifyCategoryListOfFeed = async () => {
    try {
      await modifyCategoryListOfFeedApi(userInfo.accessToken, answerId, selectedCategoryIds).then((res) => {
        console.log(res)
        navigate(`/${userInfo.nickname}`, {
          state: {
            defaultCategory: 1,
          },
        })
      })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getCategoryListOfFeed()
  }, [])

  useEffect(() => {
    console.log(selectedCategoryIds)
  }, [selectedCategoryIds])

  return (
    <Container>
      <Header text="그룹 수정" background={colors.grey7} />
      <FolderHeaderText>이 플립을 어떤 그룹에 추가할까요?</FolderHeaderText>

      <EditGroupList selectedCategoryIds={selectedCategoryIds} setSelectedCategoryIds={setSelectedCategoryIds} />

      <BottomButton
        $positive={selectedCategoryIds.length > 0 ? true : false}
        func={modifyCategoryListOfFeed}
        text="완료"
      />
    </Container>
  )
}

export default EditGroup

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
`

const FolderHeaderText = styled.div`
  align-self: stretch;
  margin: 20px 20px 0px 20px;
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.36px;
`
