// 단일 피드 props
export interface FeedProps {
  answerId: number
  questionId: number
  questionContent: string
  memberId: number
  content: string
  linkAttachments: string[]
  musicName: string
  musicSinger: string
  musicAudioUrl: string
  imageUrls: string[]
  createdDate: string
  heartCount: number
  curiousCount: number
  sadCount: number
  fcmtoken: string
}

// 피드리스트 컴포넌트 props
export interface FeedListProps {
  data: FeedProps[]
  selectedCategoryId: number
  selectedCategoryImage: string
  selectedCategoryGroupName: string
  selectedCategoryAnswerIds: number[]
}

// 확대 화면 모달 props
export interface ModalProps {
  setShowModal: any
  showModal: boolean
  selectedFeed: FeedProps
  selectedCategoryId: number
  selectedCategoryImage: string
  selectedCategoryGroupName: string
  selectedCategoryAnswerIds: number[]
}

// 선택된 피드 정보 props
export interface SelectedFeedProps {
  selectedFeed: FeedProps
}
