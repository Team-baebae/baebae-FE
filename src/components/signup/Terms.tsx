import styled from 'styled-components'
import unchecked from '../../assets/UnChecked.svg'
import checked from '../../assets/Checked.svg'
import { colors } from '../../styles/colors'
import { useNavigate } from 'react-router-dom'

interface TermsProps {
  isChecked: {
    isCheckedTotal: boolean
    isCheckedFirst: boolean
    isCheckedSecond: boolean
    isCheckedThird: boolean
  }
  setIsChecked: any
}

const Terms = ({ isChecked, setIsChecked }: TermsProps) => {
  const navigate = useNavigate()
  return (
    <Container>
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
            src={checked}
            alt="v"
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
            src={unchecked}
            alt="v"
          />
        )}
        <TermText fontWeight="600" color={colors.grey1}>
          모두 동의
        </TermText>
      </TermWrapper>
      <Line />
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
            src={checked}
            alt="v"
          />
        ) : (
          <TermCheckIcon
            onClick={() => {
              setIsChecked({
                ...isChecked,
                isCheckedFirst: true,
              })
            }}
            src={unchecked}
            alt="v"
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
            src={checked}
            alt="v"
          />
        ) : (
          <TermCheckIcon
            onClick={() => {
              setIsChecked({
                ...isChecked,
                isCheckedSecond: true,
              })
            }}
            src={unchecked}
            alt="v"
          />
        )}
        <TermText fontWeight="500" color={colors.grey3}>
          [필수] 만 14세 이상입니다
        </TermText>
        <UnderlinedTermText fontWeight="500" color={colors.grey3}>
          보기
        </UnderlinedTermText>
      </TermWrapper>
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
            src={checked}
            alt="v"
          />
        ) : (
          <TermCheckIcon
            onClick={() => {
              setIsChecked({
                ...isChecked,
                isCheckedThird: true,
              })
            }}
            src={unchecked}
            alt="v"
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
  width: calc(100% - 40px);
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0px 20px 0px 20px;
`

const TermWrapper = styled.div<{ margin?: string }>`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
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
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.56px;
  color: ${(props) => props.color};
  font-weight: ${(props) => props.fontWeight};
`

const UnderlinedTermText = styled(TermText)`
  text-decoration-line: underline;
  position: absolute;
  right: 0px;
`

const Line = styled.div`
  height: 1px;
  align-self: stretch;
  margin: 16px 0px;
  background: ${colors.grey5};
`
