import { BrowserRouter, Routes, Route } from 'react-router-dom'
//가장 바깥 틀
import Outer from '@/pages/Outer'
//랜딩
import Landing from '@/pages/landing/Landing'
//로그인 및 회원가입
import Login from '@/pages/login/Login'
import KakaoRedirection from '@/pages/signup/KakaoRedirection'
import SignUpTerms from '@/pages/signup/SignUpTerms'
import SignUpNickname from '@/pages/signup/SignUpNickname'
import SignUpOnBoarding from '@/pages/signup/SignUpOnBoarding'
//메인
import Main from '@/pages/main/Main'
//설정
import Setting from '@/pages/setting/Setting'
import EditProfile from '@/pages/setting/EditAccount'
import PrivacyPolicy from '@/pages/setting/PrivacyPolicy'
import Ask from '@/pages/setting/Support'
import Tos from '@/pages/setting/Tos'
//질문
import QuestionList from '@/pages/question/QuestionList'
//답변
import Answer from '@/pages/answer/Answer'
import Folder from '@/pages/answer/Folder'
import AnswerComplete from '@/pages/answer/AnswerComplete'
//카테고리
import GroupPlus from '@/pages/group/GroupPlus'
import GroupModify from '@/pages/group/GroupModify'
import Groups from '@/pages/category/Groups'
//알림
import Alrams from './pages/alram/Alrams'
//테스트
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
            <Route index element={<Groups />} />
            <Route path="new" element={<GroupPlus />} />
            <Route path=":groupId">
              <Route path="edit" element={<GroupModify />} />
            </Route>
          </Route>
          <Route path="alrams">
            <Route index element={<Alrams />} />
          </Route>
          <Route path="detailTest" element={<DetailTestPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
