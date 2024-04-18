import styled from 'styled-components'
import { Outlet } from 'react-router-dom'

const Outer = () => {
  return (
    <TotalBrowserComponent>
      <PhoneBrowserComponent>
        <Outlet />
      </PhoneBrowserComponent>
    </TotalBrowserComponent>
  )
}

export default Outer

const TotalBrowserComponent = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  min-height: 100vh;
`

const PhoneBrowserComponent = styled.div`
  width: 390px;
  min-height: 100%;
  /* 경계 지을려고 일단 이렇게 설정함 추후 수정 예정 */
  background-color: #f1f1f1;
`
