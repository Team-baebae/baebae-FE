import styled from 'styled-components'
import TutorialMain1 from '@/components/tutorial/TutorialMain1'

const Tutorial = () => {
  return (
    <>
      <Container onClick={() => console.log('튜토')}>
        <TutorialMain1 />
      </Container>
    </>
  )
}

export default Tutorial

const Container = styled.div`
  position: relative;
  overflow-y: hidden;
`
