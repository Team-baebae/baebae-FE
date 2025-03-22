import styled from 'styled-components'
import { AnimatePresence } from 'framer-motion'
import { SearchModalBox, SearchModalContent } from '@/components/common/ModalStyle'
import { DeleteModalProps } from '@/components/question/types'
import { colors } from '@/styles/colors'

const DeleteModal = (props: DeleteModalProps) => {
  const { content, imageUrl, clickModal, handleDelete } = props

  return (
    <AnimatePresence>
      <SearchModalBox initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={clickModal}>
        <SearchModalContent
          width="320px"
          height="360px"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
        >
          <ModalContent>
            <Content>
              <User>
                <UserImage src={imageUrl} />
                <UserName>{content}</UserName>
              </User>
              <div>
                <Title>친구를 삭제하시겠어요?</Title>
                <Description>{`${content}님은 회원님의 친구목록에서\n삭제된 사실을 알 수 없어요`}</Description>
              </div>
            </Content>
            <Buttons>
              <Button $positive={true} onClick={handleDelete}>
                삭제
              </Button>
              <Button $positive={false} onClick={clickModal}>
                취소
              </Button>
            </Buttons>
          </ModalContent>
        </SearchModalContent>
      </SearchModalBox>
    </AnimatePresence>
  )
}

export default DeleteModal

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  gap: 20px;
`
const User = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
`
const UserImage = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
`
const UserName = styled.p`
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.28px;
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: ${colors.grey1};
  text-align: center;
  font-weight: 600;
  line-height: 28.8px;
  letter-spacing: -0.32px;
  white-space: pre-wrap;
`
const Title = styled.p`
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.32px;
  margin-bottom: 12px;
`
const Description = styled.p`
  color: ${colors.grey3};
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: -0.28px;
`
const Buttons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`
const Button = styled.button<{ $positive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 56px;
  padding: 16px 0px;
  border-radius: 12px;
  background-color: ${(props) => (props.$positive ? 'rgba(255, 0, 0, 0.80)' : colors.white)};
  border: 1px solid ${(props) => (props.$positive ? 'rgba(255, 0, 0, 0.80)' : colors.grey5)};
  color: ${(props) => (props.$positive ? colors.white : colors.grey3)};
  gap: 10px;
  font-size: ${(props) => (props.$positive ? '14px' : '16px')};
  font-weight: 600;
  line-height: ${(props) => (props.$positive ? '21px' : '24px')};
  letter-spacing: ${(props) => (props.$positive ? '-0.28px' : '-0.32px')};
  cursor: pointer;
`
