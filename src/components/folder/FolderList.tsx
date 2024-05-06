import styled from 'styled-components'
import EachFolder from './EachFolder'

const FolderList = () => {
  return (
    <Container>
      <EachFolder positive={true} func={() => console.log('폴더 추가')} />
      <EachFolder positive={true} func={() => console.log('폴더 추가')} />
      <EachFolder positive={true} func={() => console.log('폴더 추가')} />
      <EachFolder positive={true} func={() => console.log('폴더 추가')} />
      <EachFolder positive={true} func={() => console.log('폴더 추가')} />
      <EachFolder positive={true} func={() => console.log('폴더 추가')} />
      {/* <EachFolder positive={true} func={() => console.log('폴더 추가')}/>
      <EachFolder positive={true} func={() => console.log('폴더 추가')}/>
      <EachFolder positive={true} func={() => console.log('폴더 추가')}/>
      <EachFolder positive={true} func={() => console.log('폴더 추가')}/>
      <EachFolder positive={true} func={() => console.log('폴더 추가')}/>
      <EachFolder positive={true} func={() => console.log('폴더 추가')}/>
      <EachFolder positive={true} func={() => console.log('폴더 추가')}/>
      <EachFolder positive={true} func={() => console.log('폴더 추가')}/>
      <EachFolder positive={true} func={() => console.log('폴더 추가')}/>
      <EachFolder positive={true} func={() => console.log('폴더 추가')}/>
      <EachFolder positive={true} func={() => console.log('폴더 추가')}/>
      <EachFolder positive={true} func={() => console.log('폴더 추가')}/>
      <EachFolder positive={true} func={() => console.log('폴더 추가')}/>
      <EachFolder positive={true} func={() => console.log('폴더 추가')}/>
      <EachFolder positive={true} func={() => console.log('폴더 추가')}/>
      <EachFolder positive={true} func={() => console.log('폴더 추가')}/> */}
      <EachFolder positive={false} func={() => console.log('폴더 추가')} />
    </Container>
  )
}
export default FolderList

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px 23px;
  width: 335px;
  margin: 0px 20px 0px 20px;
  padding: 20px 0px 20px 0px;
  max-height: calc(100vh - 330px);
  overflow-y: scroll;
  justify-items: stretch;
`
