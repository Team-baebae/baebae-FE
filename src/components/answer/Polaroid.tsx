import styled from 'styled-components'
import { colors } from '../../styles/colors'

const Polaroid = () => {
  return (
    <Container>
      <ProfileImg />
      <PlusImgText>사진 추가</PlusImgText>
      <AnswerText placeholder="답변을 입력해보세요." />
    </Container>
  )
}

export default Polaroid

const Container = styled.div`
  position: relative;
  margin: 20px 0px 0px 0px;
  display: flex;
  width: 315px;
  height: 346px;
  padding: 18px;
  flex-direction: column;
  align-items: flex-start;
  gap: 18px;
  border-radius: 2px;
  background: ${colors.white};
  box-shadow: 0px 4.945px 8.655px 0px rgba(0, 0, 0, 0.1);
`

const ProfileImg = styled.img`
  width: 279px;
  height: 250px;
  flex-shrink: 0;
  border-radius: 2.473px;
  background: ${colors.grey6};
  box-shadow:
    0px 4.945px 8.655px 0px rgba(0, 0, 0, 0.04) inset,
    0px 4.945px 8.655px 0px rgba(0, 0, 0, 0.04) inset;
  cursor: pointer;
`

const PlusImgText = styled.div`
  position: absolute;
  top: 133px;
  left: 132px;
  color: ${colors.grey4};
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.56px;
  cursor: pointer;
`

const AnswerText = styled.textarea`
  height: 42px;
  flex-shrink: 0;
  align-self: stretch;
  color: ${colors.grey5};
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.56px;
  border: none;
`
