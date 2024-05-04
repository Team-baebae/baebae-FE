import styled from 'styled-components'
import Header from '../components/common/Header'
import { colors } from '../styles/colors'
import Question from '../components/answer/Question'
import Polaroid from '../components/answer/Polaroid'
import music from '../assets/Music.svg'
import link from '../assets/Link.svg'
import Button from '../components/common/Button'

const Answer = () => {
  return (
    <Container>
      <Header text="답변하기" backColor={colors.grey7} />
      <Question />
      <Polaroid />

      <PlusBtn margin="20px 0px 0px 0px">
        <BtnIcon src={music} alt="music" />
        <BtnText>음악 추가</BtnText>
      </PlusBtn>
      <PlusBtn margin="10px 0px 0px 0px">
        <BtnIcon src={link} alt="link" />
        <BtnText>링크 추가</BtnText>
      </PlusBtn>
      {/* <Button
        positive={false}
        func={() => {
          console.log('답변완료')
        }}
      /> */}
    </Container>
  )
}

export default Answer

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const PlusBtn = styled.button<{ margin: string }>`
  display: flex;
  padding: 10px 12px;
  width: 315px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  background: ${colors.grey1};
  margin: ${(props) => props.margin};
  cursor: pointer;
`

const BtnIcon = styled.img`
  width: 15px;
  height: 15px;
  flex-shrink: 0;
`

const BtnText = styled.div`
  color: ${colors.white};
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.28px;
`
