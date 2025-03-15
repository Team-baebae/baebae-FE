import Header from '@/components/common/Header'
import { colors } from '@/styles/colors'
import SearchResult from '@/components/search/SearchResult'
import SearchInput from '@/components/search/SearchInput'
import { useSearchInput } from '@/hooks/useSearchInput'
import styled from 'styled-components'

const UserSearch = () => {
  const { searchTerm, debouncedKeyword, handleSearchChange, handleClearSearch } = useSearchInput()

  return (
    <Container>
      <Header text="친구 검색" background={colors.white} />
      <SearchInput searchTerm={searchTerm} onChange={handleSearchChange} onClear={handleClearSearch} />
      <SearchResult keyword={debouncedKeyword} />
    </Container>
  )
}

export default UserSearch

const Container = styled.div`
  background-color: ${colors.white};
  height: 100%;
`
