import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Outer from './pages/Outer'
import Landing from './pages/Landing'
import Login from './pages/Login'
import KakaoRedirection from './pages/KakaoRedirection'
import Spotify from './pages/Spotify'
import SignUp from './pages/SignUp'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Outer />}>
          <Route path="" element={<Landing />} />
          <Route path="login" element={<Login />} />
          <Route path="auth" element={<KakaoRedirection />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="spotify" element={<Spotify />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
