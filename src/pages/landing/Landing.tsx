import styled from 'styled-components'
import Logo from '@/assets/login/Logo.svg'
import Landing1 from '@/components/landing/Landing1'
import Landing2 from '@/components/landing/Landing2'
import Landing3 from '@/components/landing/Landing3'
import Landing4 from '@/components/landing/Landing4'
import Landing5 from '@/components/landing/Landing5'
import Landing6 from '@/components/landing/Landing6'

const Landing = () => {
  return (
    <Container>
      <Header>
        <Icon src={Logo} alt="flipit" />
      </Header>
      <Landing1 />
      <Landing2 />
      <Landing3 />
      <Landing4 />
      <Landing5 />
      <Landing6 />
    </Container>
  )
}

export default Landing

const Container = styled.div`
  position: relative;
  width: 100%;
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
  cursor: pointer;
`
