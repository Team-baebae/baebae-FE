import styled from 'styled-components'
import { colors } from '@/styles/colors'

// 하단 고정 버튼
interface BottomButtonProps {
  $positive: boolean
  func: any
  func2?: any
  text: string
}
// margin설정 버튼
interface UnFixedButtonprops {
  $positive: boolean
  func: any
  func2: any
  text: string
  margin: string
}
// 일반 버튼
interface Buttonprops {
  $positive: boolean
  func: any
  text: string
}

// 공통 초록색 버튼 구현 ($positive가 true일경우 진한초록, false일경우 연한초록)
export const BottomButton = ({ $positive, func, func2, text }: BottomButtonProps) => {
  return $positive ? (
    <GreenCommonBtn onClick={func} $positive={true}>
      {text}
    </GreenCommonBtn>
  ) : (
    <GreenCommonBtn onClick={func2} $positive={false}>
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
export const Button = ({ $positive, func, text }: Buttonprops) => {
  return $positive ? (
    <CommonBtn onClick={func} $positive={true}>
      {text}
    </CommonBtn>
  ) : (
    <CommonBtn onClick={func} $positive={false}>
      {text}
    </CommonBtn>
  )
}

export const FixedButton = ({ $positive, func, text }: Buttonprops) => {
  return (
    <FixedBtn onClick={func} $positive={$positive}>
      {text}
    </FixedBtn>
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
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 30px;
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
    justify-content: center;
    align-items: center;
    width: calc(100% - 40px);
    height: 56px;
    padding: 16px 20px;
    margin: ${(props) => props.margin};
    background: ${(props) => (props.$positive ? colors.primary : colors.primary40)};
    border-radius: 12px;
    border: none;
    outline: none;
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 600;
    line-height: 150%;
    letter-spacing: -0.28px;
    color: ${(props) => (props.$positive ? colors.grey1 : colors.grey3)};

    cursor: pointer;
  }
  @media screen and (width > 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 335px;
    height: 56px;
    padding: 16px 20px;
    margin: ${(props) => props.margin};
    border-radius: 12px;
    background: ${(props) => (props.$positive ? colors.primary : colors.primary40)};
    border: none;
    outline: none;
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 600;
    line-height: 150%;
    letter-spacing: -0.28px;
    color: ${(props) => (props.$positive ? colors.grey1 : colors.grey3)};

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

const FixedBtn = styled.button<{ $positive: boolean }>`
  position: fixed;
  left: 20px;
  right: 20px;
  bottom: 30px;
  z-index: 100;

  display: flex;
  justify-content: center;
  align-items: center;

  height: 56px;
  border: none;
  border-radius: 12px;
  padding: 16px 20px;

  background: ${(props) => (props.$positive ? colors.primary : colors.primary40)};
  color: ${(props) => (props.$positive ? colors.grey1 : colors.grey3)};
  font-size: 14px;
  font-weight: 600;

  cursor: pointer;

  @media screen and (width > 768px) {
    display: flex;
    justify-content: center;
    width: 335px;
    left: 50%;
    right: auto;
    transform: translateX(-50%);
  }
`
