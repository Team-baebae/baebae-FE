import styled from 'styled-components'
import Logo from '@/assets/Logo.svg'

const Landing = () => {
  return (
    <Container>
      <Header>
        <Icon src={Logo} alt="flipit" />
      </Header>
    </Container>
  )
}

export default Landing

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #181818;
`
const Header = styled.div`
  width: 100%;
  padding: 15px 24px;
`
const Icon = styled.img`
  width: 68.577px;
  height: 30px;
`
