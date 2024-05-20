import { useAxiosInterceptors } from './apis/apis'
import Router from './Router'

function App() {
  // 토큰 만료 처리를 위한 함수
  useAxiosInterceptors()
  return <Router />
}

export default App
