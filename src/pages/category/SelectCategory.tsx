import styled from 'styled-components'
import { useRecoilValue } from 'recoil'
import { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Header from '@/components/common/Header'
import { BottomButton } from '@/components/common/Button'
import FolderList from '@/components/category/FolderList'
import { colors } from '@/styles/colors'
import { UserInfoStateProps, userInfoState } from '@/context/Atoms'
import { connectGroupApi } from '@/apis/AnswerApi'

// 답변 완료 후 그룹 선택 페이지
const SelectCategory = () => {
  const navigate = useNavigate()

  // url에서 questionId 추출
  const { questionId } = useParams()

  // 전달받은 answerId
  const location = useLocation()
  const answerId = location.state?.answerId

  // 선택된 카테고리 저장
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0)

  // 리코일 로그인하 유저정보
  const userInfo = useRecoilValue<UserInfoStateProps>(userInfoState)

  // 작성한 답변 카테고리와 연결
  const connetGroup = async () => {
    try {
      await connectGroupApi(userInfo.accessToken, selectedCategoryId, answerId).then((res) => {
        console.log(res)
        navigate(`/questions/${questionId}/complete`)
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Container>
      <Header text="답변하기" background={colors.grey7} />
      <FolderHeaderText>이 플립을 어떤 그룹에 추가할까요?</FolderHeaderText>
      <FolderList selectedCategoryId={selectedCategoryId} setSelectedCategoryId={setSelectedCategoryId} />
      <BottomButton $positive={selectedCategoryId === 0 ? false : true} func={connetGroup} text="완료" />
    </Container>
  )
}

export default SelectCategory

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
