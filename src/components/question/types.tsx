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

// 질문 props
export interface QuestionProps {
  content: string
  createdDate: string
  isAnswered: boolean
  memberNickname: string
  nickname: string
  profileOnOff: boolean
  questionId: number
}
