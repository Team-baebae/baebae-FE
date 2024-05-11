import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Outer from './pages/Outer'
import Landing from './pages/landing/Landing'
import Login from './pages/login/Login'
import KakaoRedirection from './pages/signup/KakaoRedirection'
import SignUpTerms from './pages/signup/SignUpTerms'
import SignUpNickname from './pages/signup/SignUpNickname'
import Setting from './pages/setting/Setting'
import EditProfile from './pages/setting/EditProfile'
import SignUpOnBoarding from './pages/signup/SignUpOnBoarding'
import Answer from './pages/answer/Answer'
import Folder from './pages/answer/Folder'
import AnswerComplete from './pages/answer/AnswerComplete'
import Main from './pages/main/Main'
import QuestionList from './pages/question/QuestionList'
import GroupPlus from './pages/category/GroupPlus'
import GroupModify from './pages/category/GroupModify'
import PrivacyPolicy from './pages/setting/PrivacyPolicy'
import Ask from './pages/setting/Complaint'
import Term from './pages/setting/Tos'
import DetailTestPage from './pages/DetailTestPage'

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
          <Route path="setting/privacyPolicy" element={<PrivacyPolicy />} />
          <Route path="setting/ask" element={<Ask />} />
          <Route path="questions/:questionId/answer" element={<Answer />} />
          <Route path="questions/:questionId/folder" element={<Folder />} />
          <Route path="questions/:questionId/complete" element={<AnswerComplete />} />
          <Route path=":username" element={<Main />} />
          <Route path=":username/questionList" element={<QuestionList />} />
          <Route path="groupPlus" element={<GroupPlus />} />
          <Route path="groupModify" element={<GroupModify />} />
          <Route path="detailTest" element={<DetailTestPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
