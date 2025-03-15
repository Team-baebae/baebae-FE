import { useEffect, useState, useMemo } from 'react'
import { debounce } from 'lodash'

export const useSearchInput = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedKeyword, setDebouncedKeyword] = useState('')

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedKeyword(value)
      }, 300),
    [],
  )

  // 검색어 변경 시 debounce 적용
  useEffect(() => {
    debouncedSearch(searchTerm)
    return () => debouncedSearch.cancel() // Cleanup
  }, [searchTerm, debouncedSearch])

  // 검색어 입력 이벤트
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  // 검색어 삭제 이벤트
  const handleClearSearch = () => {
    setSearchTerm('')
    setDebouncedKeyword('')
  }

  return {
    searchTerm,
    debouncedKeyword,
    handleSearchChange,
    handleClearSearch,
  }
}
