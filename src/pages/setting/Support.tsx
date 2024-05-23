import styled from 'styled-components'
import { useState } from 'react'
import Header from '@/components/common/Header'
import { BottomButton } from '@/components/common/Button'
import { colors } from '@/styles/colors'

// 문의하기 페이지
const Support = () => {
  // 문의하기 텍스트 저장 및 수정
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
      <BottomButton
        $positive={content === '' ? false : true}
        text="문의하기"
        func={() => (window.location.href = 'http://pf.kakao.com/_fSzLG')}
      />
    </Container>
  )
}

export default Support

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
`

const ContentLabel = styled.div`
  align-self: stretch;
  margin: 40px 20px 0px 20px;
  color: ${colors.grey3};
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.48px;
`

const ContentTextArea = styled.textarea`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  height: 250px;
  margin: 4px 20px 0px 20px;
  padding: 20px;
  gap: 12px;
  border-radius: 12px;
  background-color: ${colors.white};
  border: none;
  resize: none;
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 14px;
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
