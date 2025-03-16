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
//튜토리얼
import Tutorial from '@/pages/tutorial/Tutorial'
//메인
import Main from '@/pages/main/Main'
//설정
import Setting from '@/pages/setting/Setting'
import EditProfile from '@/pages/setting/EditAccount'
import PrivacyPolicy from '@/pages/setting/PrivacyPolicy'
import Tos from '@/pages/setting/Tos'
//질문
import QuestionList from '@/pages/question/QuestionList'
//답변
import Answer from '@/pages/answer/Answer'
import Folder from '@/pages/category/SelectCategory'
import AnswerComplete from '@/pages/answer/AnswerComplete'
import EditAnswer from '@/pages/answer/EditAnswer'
import EditGroup from '@/pages/answer/EditGroup'
//카테고리
import GroupPlus from '@/pages/category/GroupPlus'
import GroupModify from '@/pages/category/GroupModify'
import Groups from '@/pages/category/Groups'
//검색
import UserSearch from '@/pages/search/UserSearch'
//팔로우리스트
import FollowList from '@/pages/follow/FollowList'

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
          <Route path="tutorial">
            <Route index element={<Tutorial />} />
          </Route>
          <Route path="search">
            <Route index element={<UserSearch />} />
          </Route>
          <Route path="settings">
            <Route index element={<Setting />} />
            <Route path="account/edit" element={<EditProfile />} />
            <Route path="terms">
              <Route path="serviceTerms" element={<Tos />} />
              <Route path="privacyPolicy" element={<PrivacyPolicy />} />
            </Route>
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
              <Route path="edit" element={<EditAnswer />} />
              <Route path="groups/edit" element={<EditGroup />} />
            </Route>
          </Route>
          <Route path="groups">
            <Route index element={<Groups />} />
            <Route path="new" element={<GroupPlus />} />
            <Route path=":groupId">
              <Route path="edit" element={<GroupModify />} />
            </Route>
          </Route>
          <Route path="follows">
            <Route index element={<FollowList />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
