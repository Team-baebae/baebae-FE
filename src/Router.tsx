import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Outer from './pages/Outer'
import Landing from './pages/Landing'
import Login from './pages/Login'
import KakaoRedirection from './pages/KakaoRedirection'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Outer />}>
          <Route path="" element={<Landing />} />
          <Route path="login" element={<Login />} />
          <Route path="auth" element={<KakaoRedirection />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
