import styled from 'styled-components'
import Header from '@/components/common/Header'
import { colors } from '@/styles/colors'

const PrivacyPolicy = () => {
  return (
    <Container>
      <Header text="개인정보처리방침" background={colors.grey7} />
      <ContentWrapper>
        <ContentHeader>
          개인정보처리방침
          <br />
          개인정보처리방침의 정의와 내용
          <br />
          2024년 4월 19일부터 적용
        </ContentHeader>
        <ContentBody>
          플리빗이 수집하는 정보의 유형과 저희가 해당 정보를 이용하고 공유하는 방식을 알려 드리고자 합니다.따라서 저희의
          개인정보처리방침을 읽어보시기를 권합니다. 이는 회원님이 본인에게 맞는 방식으로 을 사용하는 데 도움이 됩니다.
          <br />
          개인정보처리방침에는 저희가 정보를 수집, 사용, 공유, 유지, 이전하는 방법이 설명되어 있습니다. 또한 회원님의
          권리도 알려드립니다. 방침의 각 조항에서는 저희의 관행을 더 쉽게 이해할 수 있도록 도움이 되는 예와 간명한
          설명을 포함합니다. 또한 관심이 있는 개인정보보호 관련 주제를 더 자세히 알아보실 수 있도록 리소스의 링크도
          추가해 두었습니다.
          <br />
          또한 저희는 회원님이 본인의 개인정보를 관리하는 방법을 아는 것을 중요하게 생각합니다. 따라서 저희는 회원님이
          사용하는 요떼 제품의 설정에서 회원님이 본인의 정보를 관리할 수 있는 위치도 안내해 드립니다. 하여 환경을 구성할
          수 있습니다.
          <br />
          아래에서 개인정보처리방침 전문을 읽어보세요.
          <br />
          저희가 수집하는 정보
          <br />
          <br />
          저희가 수집하고 처리하는 회원님에 대한 정보는 회원님이 저희 을 어떤 방식으로 이용하는지에 따라 다릅니다. 예를
          들어 회원님이 Marketplace에서 가구를 팔 때와 Instagram에 릴스를 게시했을 때 저희는 각각 다른 정보를
          수집합니다. 회원님이 저희 제품을 사용할 때 저희는 일부 정보를 수집합니다.
          <br />
          저희가 수집하는 정보는 다음과 같습니다.
          <br />
          회원님이 특정 정보 수집을 거부할 때 발생하는 결과
          <br />
          일부 정보는 저희 제품이 작동하는 데 필요합니다. 그 외 정보는 선택 사항이지만 이러한 정보가 없는 경우 회원님이
          저희 제품을 사용하는 경험의 질에 영향을 미칠 수 있습니다.
          <br />
        </ContentBody>
      </ContentWrapper>
    </Container>
  )
}

export default PrivacyPolicy

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  margin: 20px;
  padding: 20px;
  gap: 30px;
  border-radius: 12px;
  background-color: ${colors.white};
`

const ContentHeader = styled.div`
  align-self: stretch;
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.56px;
`

const ContentBody = styled(ContentHeader)`
  font-family: Abel;
  font-weight: 400;
`
