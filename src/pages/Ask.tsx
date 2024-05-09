import styled from 'styled-components'
import Header from '../components/common/Header'
import { colors } from '../styles/colors'
import { BottomButton } from '../components/common/Button'
import { useState } from 'react'

const Ask = () => {
  const [content, setContent] = useState<string>('')

  const handleChangeContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value
    setContent(value)
  }
  return (
    <Container>
      <Header text="문의 및 신고하기" background={colors.grey7} />
      <ContentLabel>내용</ContentLabel>
      <ContentTextArea
        onChange={handleChangeContent}
        value={content}
        placeholder="문의 혹은 신고하실 내용을 입력해주세요. "
      />
      <BottomButton $positive={content === '' ? false : true} text="문의하기" func={() => console.log('문의하기')} />
    </Container>
  )
}

export default Ask

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ContentLabel = styled.div`
  align-self: stretch;
  color: ${colors.grey3};
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.48px;
  margin: 40px 20px 0px 20px;
`

const ContentTextArea = styled.textarea`
  display: flex;
  padding: 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  align-self: stretch;
  border-radius: 12px;
  background: ${colors.white};
  height: 250px;
  margin: 4px 20px 0px 20px;
  border: none;
  resize: none;
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.56px;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${colors.grey5};
  }
`
