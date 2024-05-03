import styled from 'styled-components'
import unchecked from '../../assets/UnChecked.svg'
import checked from '../../assets/Checked.svg'
import { colors } from '../../styles/colors'

const Terms = () => {
  return (
    <Container>
      <TermWrapper>
        <TermCheckIcon src={unchecked} alt="v" />
        <TermText fontWeight="600" color={colors.grey1}>
          모두 동의
        </TermText>
      </TermWrapper>
      <Line />
      <TermWrapper>
        <TermCheckIcon src={unchecked} alt="v" />
        <TermText fontWeight="500" color={colors.grey3}>
          [필수] 이용약관 동의
        </TermText>
        <UnderlinedTermText fontWeight="500" color={colors.grey3}>
          보기
        </UnderlinedTermText>
      </TermWrapper>
      <TermWrapper margin="24px 0px 0px 0px">
        <TermCheckIcon src={unchecked} alt="v" />
        <TermText fontWeight="500" color={colors.grey3}>
          [필수] 개인정보 수집 및 이용 동의
        </TermText>
        <UnderlinedTermText fontWeight="500" color={colors.grey3}>
          보기
        </UnderlinedTermText>
      </TermWrapper>
      <TermWrapper margin="24px 0px 0px 0px">
        <TermCheckIcon src={unchecked} alt="v" />
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
  right: 15px;
`

const Line = styled.div`
  height: 1px;
  align-self: stretch;
  margin: 16px 15px 16px 0px;
  background: ${colors.grey5};
`
