import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Outer from './pages/Outer'
import Landing from './pages/Landing'
import Login from './pages/Login'
import KakaoRedirection from './pages/KakaoRedirection'
import Spotify from './pages/Spotify'
import SignUpTerms from './pages/SignUpTerms'
import SignUpNickname from './pages/SignUpNickname'
import Setting from './pages/Setting'
import EditProfile from './pages/EditProfile'
import SignUpOnBoarding from './pages/SignUpOnBoarding'
import Main from './pages/Main'
import QuestionList from './pages/QuestionList'

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
          <Route path=":username" element={<Main />} />
          <Route path=":username/questionList" element={<QuestionList />} />
          <Route path="spotify" element={<Spotify />} />
          <Route path="setting" element={<Setting />} />
          <Route path="setting/editProfile" element={<EditProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
