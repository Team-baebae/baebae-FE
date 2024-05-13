import styled from 'styled-components'
import Header from '@/components/common/Header'
import { BottomButton } from '@/components/common/Button'
import FolderList from '@/components/folder/FolderList'
import { colors } from '@/styles/colors'
import { useRecoilValue } from 'recoil'
import { UserInfoStateProps, userInfoState } from '@/context/Atoms'
import { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { connectGroupApi } from '@/apis/AnswerApi'

// 답변 완료 후 그룹 선택 페이지
const Folder = () => {
  const { questionId } = useParams()

  const location = useLocation()
  const answerId = location.state?.answerId
  console.log(answerId)

  const [selectedDirectoryId, setSelectedDirectoryId] = useState<number>(0) // 선택된 디렉토리 ID 상태

  const navigate = useNavigate()

  // 리코일 userInfo
  const userInfo = useRecoilValue<UserInfoStateProps>(userInfoState)

  const connetGroup = async () => {
    try {
      await connectGroupApi(userInfo.accessToken, selectedDirectoryId, answerId).then((res) => {
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
      <FolderList selectedDirectoryId={selectedDirectoryId} setSelectedDirectoryId={setSelectedDirectoryId} />
      <BottomButton $positive={selectedDirectoryId === 0 ? false : true} func={connetGroup} text="완료" />
    </Container>
  )
}

export default Folder

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
