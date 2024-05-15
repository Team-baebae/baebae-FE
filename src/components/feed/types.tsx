// 단일 피드 props
export interface FeedProps {
  questionId: number
  questionContent: string
  profileOnOff: boolean
  memberNickname: string
  nickname: string
  memberId: number
  answerId: number
  content: string
  createdDate: string
  linkAttachments: string
  musicAudioUrl: string
  musicName: string
  musicSinger: string
  curiousCount: number
  heartCount: number
  sadCount: number
  imageUrl: string
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
