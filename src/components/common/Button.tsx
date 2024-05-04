import styled from 'styled-components'
import { colors } from '../../styles/colors'

interface ButtonProps {
  positive: boolean
  func: any
}

interface UnFixedButtonProps {
  margin: string
  positive: boolean
  func: any
}

// 공통 초록색 버튼 구현 (positive가 true일경우 진한초록, false일경우 연한초록)
export const FixedButton = ({ positive, func }: ButtonProps) => {
  return positive ? (
    <GreenCommonBtn onClick={func} positive={true}>
      다음
    </GreenCommonBtn>
  ) : (
    <GreenCommonBtn
      onClick={() => {
        console.log('비활성화 상태')
      }}
      positive={false}
    >
      다음
    </GreenCommonBtn>
  )
}

// 공통 초록색 버튼 구현 (하단 고정되지 않은 버전)
export const UnFixedButton = ({ margin, positive, func }: UnFixedButtonProps) => {
  return positive ? (
    <UnFixedGreenCommonBtn margin={margin} onClick={func} positive={true}>
      다음
    </UnFixedGreenCommonBtn>
  ) : (
    <UnFixedGreenCommonBtn
      margin={margin}
      onClick={() => {
        console.log('비활성화 상태')
      }}
      positive={false}
    >
      다음
    </UnFixedGreenCommonBtn>
  )
}

const GreenCommonBtn = styled.button<{ positive: boolean }>`
  position: absolute;
  bottom: 30px;
  width: 335px;
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
  @media screen and (max-width: 768px) {
    width: calc(100% - 40px);
  }
`
const UnFixedGreenCommonBtn = styled.button<{ margin: string; positive: boolean }>`
  margin: ${(props) => props.margin || '0px 20px 0px 20px'};
  width: 335px;
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
  @media screen and (max-width: 768px) {
    width: calc(100% - 40px);
  }
`
