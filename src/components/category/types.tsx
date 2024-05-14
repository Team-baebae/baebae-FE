// 디렉토리 Props
export interface categoryProps {
  categoryId: number
  categoryName: string
  answerIds: number[]
  categoryImage: string
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
