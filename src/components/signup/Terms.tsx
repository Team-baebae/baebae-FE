import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { colors } from '@/styles/colors'
import Unchecked from '@/assets/signup/UnChecked.svg'
import Checked from '@/assets/signup/Checked.svg'

// 이용 약관 항목 3가지를 담은 컴포넌트
const Terms = ({ isChecked, setIsChecked }: TermsProps) => {
  const navigate = useNavigate()

  return (
    <Container>
      {/* 모두 동의 약관 */}
      <TermWrapper>
        {isChecked.isCheckedTotal ? (
          <TermCheckIcon
            onClick={() => {
              setIsChecked({
                ...isChecked,
                isCheckedTotal: false,
                isCheckedFirst: false,
                isCheckedSecond: false,
                isCheckedThird: false,
              })
            }}
            src={Checked}
          />
        ) : (
          <TermCheckIcon
            onClick={() => {
              setIsChecked({
                ...isChecked,
                isCheckedTotal: true,
                isCheckedFirst: true,
                isCheckedSecond: true,
                isCheckedThird: true,
              })
            }}
            src={Unchecked}
          />
        )}
        <TermText fontWeight="600" color={colors.grey1}>
          모두 동의
        </TermText>
      </TermWrapper>
      <Line />
      {/* 필수 약관 동의 */}
      <TermWrapper>
        {isChecked.isCheckedFirst ? (
          <TermCheckIcon
            onClick={() => {
              setIsChecked({
                ...isChecked,
                isCheckedTotal: false,
                isCheckedFirst: false,
              })
            }}
            src={Checked}
          />
        ) : (
          <TermCheckIcon
            onClick={() => {
              setIsChecked({
                ...isChecked,
                isCheckedFirst: true,
              })
            }}
            src={Unchecked}
          />
        )}
        <TermText fontWeight="500" color={colors.grey3}>
          [필수] 이용약관 동의
        </TermText>
        <UnderlinedTermText
          onClick={() => {
            navigate('/settings/terms/serviceTerms')
          }}
          fontWeight="500"
          color={colors.grey3}
        >
          보기
        </UnderlinedTermText>
      </TermWrapper>
      {/* 필수 약관 동의 */}
      <TermWrapper margin="24px 0px 0px 0px">
        {isChecked.isCheckedSecond ? (
          <TermCheckIcon
            onClick={() => {
              setIsChecked({
                ...isChecked,
                isCheckedTotal: false,
                isCheckedSecond: false,
              })
            }}
            src={Checked}
          />
        ) : (
          <TermCheckIcon
            onClick={() => {
              setIsChecked({
                ...isChecked,
                isCheckedSecond: true,
              })
            }}
            src={Unchecked}
          />
        )}
        <TermText fontWeight="500" color={colors.grey3}>
          [필수] 만 14세 이상입니다
        </TermText>
        <UnderlinedTermText fontWeight="500" color={colors.grey3}>
          보기
        </UnderlinedTermText>
      </TermWrapper>
      {/* 선택 약관 동의 */}
      <TermWrapper margin="24px 0px 0px 0px">
        {isChecked.isCheckedThird ? (
          <TermCheckIcon
            onClick={() => {
              setIsChecked({
                ...isChecked,
                isCheckedTotal: false,
                isCheckedThird: false,
              })
            }}
            src={Checked}
          />
        ) : (
          <TermCheckIcon
            onClick={() => {
              setIsChecked({
                ...isChecked,
                isCheckedThird: true,
              })
            }}
            src={Unchecked}
          />
        )}
        <TermText fontWeight="500" color={colors.grey3}>
          [선택] 광고성 정보 수신 동의
        </TermText>
        <UnderlinedTermText fontWeight="500" color={colors.grey3}>
          보기
        </UnderlinedTermText>
      </TermWrapper>
    </Container>
  )
}

export default Terms

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 40px);
  height: 100%;
  margin: 0px 20px 0px 20px;
`

const TermWrapper = styled.div<{ margin?: string }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  gap: 12px;
  margin: ${(props) => props.margin || '0px'};
`

const TermCheckIcon = styled.img`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
`

const TermText = styled.div<{ color: string; fontWeight: string }>`
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.56px;
  color: ${(props) => props.color};
  font-weight: ${(props) => props.fontWeight};
`

const UnderlinedTermText = styled(TermText)`
  position: absolute;
  text-decoration-line: underline;
  right: 0px;
`

const Line = styled.div`
  align-self: stretch;
  height: 1px;
  margin: 16px 0px;
  background-color: ${colors.grey5};
`
