// 단일 피드 props
export interface FeedProps {
  questionId: number
  questionContent: string
  profileOnOff: boolean
  senderNickname: string
  nickname: string
  memberId: number
  answerId: number
  content: string
  createdDate: string
  linkAttachments: string
  musicAudioUrl: string
  musicName: string
  musicSinger: string
  imageUrl: string
}

// 피드리스트 컴포넌트 props
export interface FeedListProps {
  data: FeedProps[]
  setFeedList: any
  selectedCategoryId: number
  selectedCategoryImage: string
  selectedCategoryGroupName: string
  selectedCategoryAnswerIds: number[]
}

// 확대 화면 모달 props
export interface ModalProps {
  setShowModal: any
  showModal: boolean
  flipPlane: boolean
  selectedFeed: FeedProps
  feedList: FeedProps[]
  setFeedList: any
  selectedCategoryId: number
  selectedCategoryImage: string
  selectedCategoryGroupName: string
  selectedCategoryAnswerIds: number[]
}

// 선택된 피드 정보 props
export interface SelectedFeedProps {
  selectedFeed: FeedProps
}

// 반응 정보들 props
export interface ReactionProps {
  curiousCount: number
  heartCount: number
  sadCount: number
  connectCount: number
}

// 피드의 그룹 수정시 그룹리스트 props
export interface EditGroupListProps {
  selectedCategoryIds: number[]
  setSelectedCategoryIds: any
}

// 피드의 그룹 수정시 피드가 속한 그룹리스트 받을 때 그룹의 props
export interface ContainedGroupProps {
  categoryId: number
  categoryImage: string
  categoryName: string
}
