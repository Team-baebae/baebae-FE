// userData Props
export interface userDataProps {
  nickname: string
  memberId: number
}

// 질문페이지 Props
export interface AskProps {
  userInfo: userDataProps
  isMyPage: boolean
}

// 디렉토리 Props
export interface directoryProps {
  categoryId: number
  categoryName: string
  answerAnswers: number[]
  categoryImage: string
}

// 모달창 Props
export interface ModalProps {
  content: string
  clickModal: () => void
}
