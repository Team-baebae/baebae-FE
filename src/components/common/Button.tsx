import styled from 'styled-components'
import { colors } from '../../styles/colors'

interface ButtonProps {
  positive: boolean
  func: any
  text: string
}

// 공통 초록색 버튼 구현 (positive가 true일경우 진한초록, false일경우 연한초록)
const Button = ({ positive, func, text }: ButtonProps) => {
  return positive ? (
    <GreenCommonBtn onClick={func} positive={true}>
      {text}
    </GreenCommonBtn>
  ) : (
    <GreenCommonBtn
      onClick={() => {
        console.log('비활성화 상태')
      }}
      positive={false}
    >
      {text}
    </GreenCommonBtn>
  )
}

export default Button

const GreenCommonBtn = styled.button<{ positive: boolean }>`
  @media screen and (width <= 768px) {
    display: flex;
    justify-content: center;
    position: absolute;
    left: 20px;
    right: 20px;
    bottom: 30px;
    border: none;
    border-radius: 12px;
    padding: 16px 20px;
    background: ${(props) => (props.positive ? colors.primary : colors.primary40)};
    color: ${(props) => (props.positive ? colors.grey1 : colors.grey3)};
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
  }
  @media screen and (width > 768px) {
    position: absolute;
    bottom: 30px;
    display: flex;
    justify-content: center;
    width: 335px;
    border: none;
    border-radius: 12px;
    padding: 16px 20px;
    background: ${(props) => (props.positive ? colors.primary : colors.primary40)};
    color: ${(props) => (props.positive ? colors.grey1 : colors.grey3)};
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
  }
`
