import styled from 'styled-components'
import { AnimatePresence } from 'framer-motion'
import { SearchModalBox, SearchModalContent } from '@/components/common/ModalStyle'
import { ModalProps } from '@/components/question/types'
import { colors } from '@/styles/colors'
import KakaoIcon from '@/assets/login/KakaoIcon.svg'

// 로그인 모달 컴포넌트
const LoginModal = (props: ModalProps) => {
  // 전달받은 state 함수
  const { content, clickModal } = props

  // 카카오 로그인
  const clientId = import.meta.env.VITE_KAKAO_CLIENT_ID
  const redirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`

  const loginHandler = () => {
    window.location.href = link
  }

  return (
    <AnimatePresence>
      <SearchModalBox initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={clickModal}>
        <SearchModalContent
          width="320px"
          height="287px"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
        >
          <ModalContent>
            <Content>{content}</Content>
            <Button $positive={true} onClick={loginHandler}>
              <Icon src={KakaoIcon} />
              카카오로 3초만에 로그인하러가기
            </Button>
            <Button $positive={false} onClick={clickModal}>
              취소
            </Button>
          </ModalContent>
        </SearchModalContent>
      </SearchModalBox>
    </AnimatePresence>
  )
}

export default LoginModal

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  gap: 8px;
`
const Content = styled.div`
  margin: 20px 0px;
  color: ${colors.grey1};
  text-align: center;
  font-family: Pretendard;
  font-weight: 600;
  line-height: 28.8px;
  letter-spacing: -0.32px;
  white-space: pre-wrap;
`
const Button = styled.button<{ $positive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  height: 56px;
  padding: 16px 0px;
  border-radius: 12px;
  background-color: ${(props) => (props.$positive ? '#FEE500' : colors.white)};
  border: 1px solid ${(props) => (props.$positive ? '#FEE500' : colors.grey5)};
  color: ${(props) => (props.$positive ? colors.grey1 : colors.grey3)};
  gap: 10px;
  font-size: ${(props) => (props.$positive ? '14px' : '16px')};
  font-weight: 600;
  line-height: ${(props) => (props.$positive ? '21px' : '24px')};
  letter-spacing: ${(props) => (props.$positive ? '-0.28px' : '-0.32px')};
  cursor: pointer;
`
const Icon = styled.img`
  width: 24px;
  height: 24px;
`
