import styled from 'styled-components'
import { colors } from '../../styles/colors'

interface BottomButtonProps {
  $positive: boolean
  func: any
  text: string
}

interface UnFixedButtonprops {
  $positive: boolean
  func: any
  func2: any
  text: string
  margin: string
}

interface Buttonprops {
  $positive: boolean
  func: any
  func2: any
  text: string
}

// 하단 고정된 버전
// 공통 초록색 버튼 구현 ($positive가 true일경우 진한초록, false일경우 연한초록)
export const BottomButton = ({ $positive, func, text }: BottomButtonProps) => {
  return $positive ? (
    <GreenCommonBtn onClick={func} $positive={true}>
      {text}
    </GreenCommonBtn>
  ) : (
    <GreenCommonBtn
      onClick={() => {
        console.log('비활성화 상태')
      }}
      $positive={false}
    >
      {text}
    </GreenCommonBtn>
  )
}

// 부모 컴포넌트 margin 설정 안된 곳 button
// 공통 초록색 버튼 구현 (하단 고정되지 않은 버전)
export const UnFixedButton = ({ $positive, func, func2, text, margin }: UnFixedButtonprops) => {
  return $positive ? (
    <UnFixedGreenCommonBtn margin={margin} onClick={func} $positive={true}>
      {text}
    </UnFixedGreenCommonBtn>
  ) : (
    <UnFixedGreenCommonBtn margin={margin} onClick={func2} $positive={false}>
      {text}
    </UnFixedGreenCommonBtn>
  )
}

// 부모 컴포넌트 margin 설정된 곳 button
// 공통 초록색 버튼 구현 (하단 고정되지 않은 버전)
export const Button = ({ $positive, func, func2, text }: Buttonprops) => {
  return $positive ? (
    <CommonBtn onClick={func} $positive={true}>
      {text}
    </CommonBtn>
  ) : (
    <CommonBtn onClick={func2} $positive={false}>
      {text}
    </CommonBtn>
  )
}

// 시연에서는 bottom 30px, 휴대폰 사용시에는 100px정도로 수정
const GreenCommonBtn = styled.button<{ $positive: boolean }>`
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
    background: ${(props) => (props.$positive ? colors.primary : colors.primary40)};
    color: ${(props) => (props.$positive ? colors.grey1 : colors.grey3)};
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
    background: ${(props) => (props.$positive ? colors.primary : colors.primary40)};
    color: ${(props) => (props.$positive ? colors.grey1 : colors.grey3)};
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
  }
`

const UnFixedGreenCommonBtn = styled.button<{ margin: string; $positive: boolean }>`
  @media screen and (width <= 768px) {
    display: flex;
    width: calc(100% - 40px);
    height: 56px;
    padding: 16px 20px;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
    letter-spacing: -0.28px;
    margin: ${(props) => props.margin};
    background: ${(props) => (props.$positive ? colors.primary : colors.primary40)};
    color: ${(props) => (props.$positive ? colors.grey1 : colors.grey3)};
    border: none;
    outline: none;
    cursor: pointer;
  }
  @media screen and (width > 768px) {
    display: flex;
    width: 335px;
    height: 56px;
    padding: 16px 20px;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
    letter-spacing: -0.28px;
    margin: ${(props) => props.margin};
    background: ${(props) => (props.$positive ? colors.primary : colors.primary40)};
    color: ${(props) => (props.$positive ? colors.grey1 : colors.grey3)};
    border: none;
    outline: none;
    cursor: pointer;
  }
`

const CommonBtn = styled.button<{ $positive: boolean }>`
  @media screen and (width <= 768px) {
    display: flex;
    justify-content: center;
    border: none;
    border-radius: 12px;
    padding: 16px 20px;
    background: ${(props) => (props.$positive ? colors.primary : colors.primary40)};
    color: ${(props) => (props.$positive ? colors.grey1 : colors.grey3)};
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
  }
  @media screen and (width > 768px) {
    display: flex;
    justify-content: center;
    width: 335px;
    border: none;
    border-radius: 12px;
    padding: 16px 20px;
    background: ${(props) => (props.$positive ? colors.primary : colors.primary40)};
    color: ${(props) => (props.$positive ? colors.grey1 : colors.grey3)};
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
  }
`
