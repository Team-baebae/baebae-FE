import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Outer from './pages/Outer'
import Landing from './pages/Landing'
import Login from './pages/Login'
import KakaoRedirection from './pages/KakaoRedirection'
import SignUpTerms from './pages/SignUpTerms'
import SignUpNickname from './pages/SignUpNickname'
import Setting from './pages/Setting'
import EditProfile from './pages/EditProfile'
import SignUpOnBoarding from './pages/SignUpOnBoarding'
import Answer from './pages/Answer'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Outer />}>
          <Route path="" element={<Landing />} />
          <Route path="login" element={<Login />} />
          <Route path="auth" element={<KakaoRedirection />} />
          <Route path="signup/terms" element={<SignUpTerms />} />
          <Route path="signup/nickname" element={<SignUpNickname />} />
          <Route path="signup/onboarding" element={<SignUpOnBoarding />} />
          <Route path="setting" element={<Setting />} />
          <Route path="editProfile" element={<EditProfile />} />
          <Route path="questions/answer" element={<Answer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
