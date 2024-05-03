import styled from 'styled-components'
import { colors } from '../../styles/colors'

interface ButtonProps {
  positive: boolean
  func1: any
  func2: any
}

// 공통 초록색 버튼 구현 (positive가 true일경우 진한초록, false일경우 연한초록)
const Button = ({ positive, func1, func2 }: ButtonProps) => {
  return positive ? (
    <GreenCommonBtn onClick={func1} positive={true}>
      다음
    </GreenCommonBtn>
  ) : (
    <GreenCommonBtn onClick={func2} positive={false}>
      다음
    </GreenCommonBtn>
  )
}

export default Button

const GreenCommonBtn = styled.button<{ positive: boolean }>`
  position: absolute;
  bottom: 30px;
  left: 20px;
  right: 20px;
  width: calc(100%-40px);
  display: flex;
  height: 56px;
  padding: 16px 20px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background: ${(props) => (props.positive ? colors.primary : colors.primary40)};
  color: ${(props) => (props.positive ? colors.grey1 : colors.grey3)};
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.28px;
  border: none;
  cursor: pointer;
`
