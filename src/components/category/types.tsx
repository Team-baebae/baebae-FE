import { FeedProps } from '@/components/feed/types'

// 디렉토리 Props
export interface categoryProps {
  categoryId: number
  categoryName: string
  answerIds: number[]
  categoryImage: string
}

// 그룹 이미지 수정 시 Props
export interface ChangeGroupImageProps {
  groupImgUrl: string
  handleImageChange: any
}

// 그룹명 수정 시 Props
export interface ChangeGroupNameProps {
  groupName: string
  onChangeFolderName: any
}

// folderList의 props
export interface FolderListProps {
  selectedCategoryId: number
  setSelectedCategoryId: any
}

// 답변 후 나오는 카테고리 연결 페이지의 카테고리 props
export interface EachCategoryProps {
  selectedCategoryId: number
  category?: categoryProps
  $positive: boolean
  func: any
}

// Feeds props 컴포넌트
export interface FeedsProps {
  data: FeedProps[]
  selectedAnswerIds: number[]
  setSelectedAnswerIds: any
}

// TotalPageFeeds props
export interface TotalPageFeedsProps {
  feedList: FeedProps[]
  selectedCategoryId: number
  selectedCategoryImage: string
  selectedCategoryGroupName: string
  selectedCategoryAnswerIds: number[]
}

// TotalPageFeeds에 있는
export interface TotalPageFeedProps {
  selectedFeed: FeedProps
  selectedCategoryId: number
  selectedCategoryImage: string
  selectedCategoryGroupName: string
  selectedCategoryAnswerIds: number[]
  currentAudio: any
  setCurrentAudio: any
  isPlaying: boolean
  setIsPlaying: any
}

// 피딍 그룹 수정시 나오는 각자의 그룹의 props
export interface EachEditGroupProps {
  selectedCategoryIds: number[]
  setSelectedCategoryIds: any
  category: categoryProps
}
// 피딍 그룹 수정시 나오는 그룹추가의 props
export interface EachEditGroupPlusProps {
  func: any
}
