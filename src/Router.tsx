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
import Folder from './pages/Folder'
import AnswerComplete from './pages/AnswerComplete'
import Main from './pages/Main'
import QuestionList from './pages/QuestionList'
import GroupPlus from './pages/GroupPlus'
import GroupModify from './pages/GroupModify'
import Term from './pages/Term'

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
          <Route path="setting/term" element={<Term />} />
          <Route path="setting/editProfile" element={<EditProfile />} />
          <Route path="questions/:questionId/answer" element={<Answer />} />
          <Route path="questions/:questionId/folder" element={<Folder />} />
          <Route path="questions/:questionId/complete" element={<AnswerComplete />} />
          <Route path=":username" element={<Main />} />
          <Route path=":username/questionList" element={<QuestionList />} />
          <Route path="groupPlus" element={<GroupPlus />} />
          <Route path="groupModify" element={<GroupModify />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
