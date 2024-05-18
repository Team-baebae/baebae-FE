import styled from 'styled-components'
import TutorialMain from '@/components/tutorial/TutorialMain'

const Tutorial = () => {
  return (
    <>
      <Container onClick={() => console.log('튜토')}>
        <TutorialMain />
      </Container>
    </>
  )
}

export default Tutorial

const Container = styled.div`
  position: relative;
  overflow-y: hidden;
`
