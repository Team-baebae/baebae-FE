import styled from 'styled-components'
import { colors } from '@/styles/colors'
import SearchIcon from '@/assets/search/Search.svg'
import DeleteIcon from '@/assets/search/Delete.svg'

interface SearchInputProps {
  searchTerm: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClear: () => void
}

const SearchInput = ({ searchTerm, onChange, onClear }: SearchInputProps) => {
  return (
    <SearchBarWrap>
      <Icon src={SearchIcon} size="20px" />
      <SearchBar type="text" placeholder="친구 아이디를 검색해보세요!" value={searchTerm} onChange={onChange} />
      {searchTerm && <Icon src={DeleteIcon} onClick={onClear} size="16px" />} {/* 검색어 있을 때만 X 아이콘 표시 */}
    </SearchBarWrap>
  )
}

export default SearchInput

const SearchBarWrap = styled.div`
  display: flex;
  padding: 12px;
  margin: 20px;
  border-radius: 12px;
  justify-content: flex-start;
  align-items: center;
  gap: 9px;
  background-color: ${colors.grey7};
`
const Icon = styled.img<{ size: string }>`
  cursor: pointer;
  width: ${(props) => props.size};
  height: ${(props) => props.size};
`
const SearchBar = styled.input`
  width: 100%;
  border: none;
  background-color: transparent;
  color: ${colors.grey1};
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;

  &::placeholder {
    color: ${colors.grey5};
  }
  &:focus {
    outline: none;
    border: none;
  }
`
