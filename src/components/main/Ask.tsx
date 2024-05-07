import styled from 'styled-components'
import NewIcon from '../../assets/main/NewIcon.svg'
import ForwardArrow from '../../assets/ForwardArrow.svg'
import Info from '../../assets/main/Info.svg'
import { useEffect, useState } from 'react'
import { colors } from '../../styles/colors'
import { useNavigate } from 'react-router-dom'
import MiniToggle from '../common/MiniToggle'
import { Button } from '../common/Button'

interface AskProps {
  params: ParamsProps
}
interface ParamsProps {
  username: string | undefined
}
const Ask = (props: AskProps) => {
  const { params } = props
  const [askCount, setAskCount] = useState<number>(0)
  const navigate = useNavigate()
  const questionClick = () => {
    navigate(`/${params?.username}/questionList`)
  }
  useEffect(() => {
    // api 연동
    setAskCount(3)
  })
  return (
    <Container>
      <AskNotification onClick={questionClick}>
        {askCount && <Icon width={34.25} height={16} src={NewIcon} />}
        <TextWrapper ml={askCount ? '6px' : '0px'} color={colors.white}>
          답변을 기다리는 질문
          <TextWrapper ml="4px" color={askCount ? colors.primary : colors.grey4}>
            {askCount}개
          </TextWrapper>
        </TextWrapper>
        <Icon width={20} height={20} src={ForwardArrow} />
      </AskNotification>
      <AskContainer>
        <TextRegion placeholder={`이런 질문은 어떤가요?\n너의 패션 스타일이 궁금해!\n무슨 음식 좋아해?`} />
        <WriterBlock>
          FROM <WriterRegion placeholder="자유롭게 입력해주세요" />
        </WriterBlock>
      </AskContainer>
      <OpenProfileWrapper>
        <MiniToggle />
        <OpenProfile>
          질문자 프로필 공개
          <Icon width={18} height={18} src={Info} />
        </OpenProfile>
      </OpenProfileWrapper>
      <Button positive={true} func={() => console.log('질문')} text="질문하기" />
    </Container>
  )
}

export default Ask

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  gap: 14px;
`
const AskNotification = styled.div`
  display: flex;
  padding: 12px 20px;
  justify-content: space-between;
  align-items: center;
  border-radius: 12px;
  background: ${colors.grey2};
  cursor: pointer;
`
const TextWrapper = styled.div<{ ml: string; color: string }>`
  display: flex;
  flex: 1 0 0;
  margin-left: ${(props) => props.ml};
  color: ${(props) => props.color};
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.6px;
`
const Icon = styled.img``
const AskContainer = styled.div`
  display: flex;
  height: 346px;
  padding: 20px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  border-radius: 2.127px;
  background-color: ${colors.white};
  box-shadow: 0px 5.259px 9.204px 0px rgba(0, 0, 0, 0.04);
`
const TextRegion = styled.textarea`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 346px;
  flex: 1 0 0;
  flex-shrink: 0;
  border: none;
  resize: none;
  outline: none;
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 30px;
  letter-spacing: -0.8px;
  &::placeholder {
    color: ${colors.grey5};
  }
`
const WriterBlock = styled.div`
  display: flex;
  width: 100%;
  color: ${colors.primary};
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: -0.28px;
`
const WriterRegion = styled.input`
  color: ${colors.grey1};
  width: 100%;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: -0.28px;
  margin-left: 12.6px;
  border: none;
  outline: none;
  &::placeholder {
    color: ${colors.grey5};
  }
`
const OpenProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`
const OpenProfile = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  color: ${colors.grey4};
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: -0.24px;
`
