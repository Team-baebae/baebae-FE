import styled from 'styled-components'
import { Outlet } from 'react-router-dom'
import { colors } from '@/styles/colors'
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
  background-color: ${colors.white};
  width: 100vw;
  /* 시연 시 */
  min-height: 100vh;
  /* 앱 출시 시 */
  /* min-height: calc(100vh - 80px); */
`

const PhoneBrowserContainer = styled.div`
  width: 375px;
  background-color: ${colors.grey7};
  min-height: 100%;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`
