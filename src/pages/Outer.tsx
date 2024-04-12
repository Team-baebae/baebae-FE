import styled from 'styled-components'
import { Outlet } from 'react-router-dom'

const Outer = () => {
  return (
    <LandingComponent>
      <Outlet />
    </LandingComponent>
  )
}

export default Outer

const LandingComponent = styled.div`
  width: 100vw;
`
