import styled from 'styled-components'
import { colors } from '../styles/colors'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import MainHeader from '../components/common/MainHeader'
import MainProfile from '../components/main/MainProfile'
import Feed from '../components/main/Feed'
import Ask from '../components/main/Ask'

// interface UserData {
//   username: string
// }

const Main = () => {
  const { username } = useParams<{ username: string }>()
  const [userData, setUserData] = useState<string | undefined>(undefined)
  useEffect(() => {
    //api 추가 필요
    setUserData(username)
    console.log(username)
  }, [username])

  const [category, setCategory] = useState<number>(0)

  return (
    <>
      <Container>
        <MainHeader backColor={colors.white} />
        <MainProfile nickname={username} image="image" />
        <CategoryBox>
          <Category category={category} num={0} onClick={() => setCategory(0)}>
            질문
          </Category>
          <Category category={category} num={1} onClick={() => setCategory(1)}>
            피드
          </Category>
        </CategoryBox>
        {category ? <Feed /> : <Ask username={userData} />}
      </Container>
    </>
  )
}

export default Main
const Container = styled.div`
  height: 100vh;
`
const CategoryBox = styled.div`
  display: flex;
  height: 44px;
  align-items: flex-end;
  flex: 1 0 0;
  gap: 18.5px;
  padding: 0px 21.25px;
  background-color: ${colors.white};
  border-bottom: 0.2px solid ${colors.grey4};
`
const Category = styled.div<{ category: number; num: number }>`
  display: flex;
  flex: 1 0 0;
  flex-direction: column;
  height: 33px;
  align-items: center;
  gap: 9px;
  border-bottom: 2px solid ${(props) => (props.category == props.num ? colors.grey1 : colors.white)};
  cursor: pointer;
`
