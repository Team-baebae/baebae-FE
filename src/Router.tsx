import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Outer from '@/pages/Outer'
import Landing from '@/pages/landing/Landing'
import Login from '@/pages/login/Login'
import KakaoRedirection from '@/pages/signup/KakaoRedirection'
import SignUpTerms from '@/pages/signup/SignUpTerms'
import SignUpNickname from '@/pages/signup/SignUpNickname'
import Setting from '@/pages/setting/Setting'
import EditProfile from '@/pages/setting/EditProfile'
import SignUpOnBoarding from '@/pages/signup/SignUpOnBoarding'
import Answer from '@/pages/answer/Answer'
import Folder from '@/pages/answer/Folder'
import AnswerComplete from '@/pages/answer/AnswerComplete'
import Main from '@/pages/main/Main'
import QuestionList from '@/pages/question/QuestionList'
import GroupPlus from '@/pages/category/GroupPlus'
import GroupModify from '@/pages/category/GroupModify'
import PrivacyPolicy from '@/pages/setting/PrivacyPolicy'
import Ask from '@/pages/setting/Complaint'
import Tos from '@/pages/setting/Tos'
import DetailTestPage from '@/pages/DetailTestPage'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Outer />}>
          <Route index element={<Landing />} />
          <Route path="login" element={<Login />} />
          <Route path="auth" element={<KakaoRedirection />} />
          <Route path="signup">
            <Route path="terms" element={<SignUpTerms />} />
            <Route path="nickname" element={<SignUpNickname />} />
            <Route path="complete" element={<SignUpOnBoarding />} />
          </Route>
          <Route path="settings">
            <Route index element={<Setting />} />
            <Route path="account/edit" element={<EditProfile />} />
            <Route path="terms">
              <Route path="serviceTerms" element={<Tos />} />
              <Route path="privacyPolicy" element={<PrivacyPolicy />} />
            </Route>
            <Route path="support" element={<Ask />} />
          </Route>
          <Route path=":username">
            <Route index element={<Main />} />
          </Route>
          <Route path="questions">
            <Route index element={<QuestionList />} />
            <Route path=":questionId">
              <Route path="answer" element={<Answer />} />
              <Route path="group" element={<Folder />} />
              <Route path="complete" element={<AnswerComplete />} />
            </Route>
          </Route>
          <Route path="groups">
            <Route path="new" element={<GroupPlus />} />
            <Route path=":groupId">
              <Route path="edit" element={<GroupModify />} />
            </Route>
          </Route>
          <Route path="detailTest" element={<DetailTestPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
