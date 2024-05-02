import styled from 'styled-components'
import { Outlet } from 'react-router-dom'

const Outer = () => {
  return (
    <TotalBrowserContainer>
      <PhoneBrowserContainer>
        <Outlet />
      </PhoneBrowserContainer>
    </TotalBrowserContainer>
  )
}

export default Outer

const TotalBrowserContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: #fff;
  width: 100vw;
  min-height: 100vh;
`

const PhoneBrowserContainer = styled.div`
  width: 375px;
  background-color: #f5f5f5;
  min-height: 100%;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`
