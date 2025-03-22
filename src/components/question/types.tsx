// userData Props
export interface userDataProps {
  nickname: string
  memberId: number
}

// 모달창 Props
export interface ModalProps {
  content: string
  clickModal: () => void
}

// delete모달창 Props
export interface DeleteModalProps {
  content: string
  imageUrl: string
  clickModal: () => void
  handleDelete: () => void
}

// 질문 props
export interface QuestionProps {
  content: string
  createdDate: string
  isAnswered: boolean
  senderNickname: string
  nickname: string
  profileOnOff: boolean
  questionId: number
}
