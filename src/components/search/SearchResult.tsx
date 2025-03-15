import styled from 'styled-components'
import { colors } from '@/styles/colors'
import SearchItem from './SearchItem'
import { useSearch } from '@/hooks/useSearch'

const SearchResult = ({ keyword }: { keyword: string }) => {
  const { data, loading, observerRef } = useSearch(keyword)

  return (
    <Container>
      {!keyword && <Message>친구와 함께 취향 소통을 시작해 보세요 🙌</Message>}
      {keyword && data.length === 0 && !loading && <Message>검색 결과가 없습니다.</Message>}

      {data.map((user) => (
        <SearchItem
          key={user.memberId}
          memberId={user.memberId}
          nickname={user.nickname}
          profileImage={user.profileImage}
        />
      ))}

      {loading && <Message>Loading...</Message>}
      <div ref={observerRef} />
    </Container>
  )
}

export default SearchResult

const Container = styled.div`
  width: 100%;
`

const Message = styled.div`
  margin-top: 200px;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  color: ${colors.grey5};
`
