import { postFCM } from '@/apis/NotificationApi'
import AlramLoading from '@/components/alram/AlramLoading'
import { userInfoState } from '@/context/Atoms'
import { requestPermission } from '@/firebase-messaging-sw'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'

const SignupLoadingPage = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState)
  const navigate = useNavigate()

  const Login = async () => {
    try {
      let fcmToken = await requestPermission()
      postFCM(userInfo.memberId, userInfo.accessToken, fcmToken).then(() => {
        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          fcmToken: fcmToken,
        }))
        navigate('/signup/complete')
      })
    } catch {
      navigate('/signup/complete')
    }
  }

  useEffect(() => {
    Login()
  }, [])

  return <AlramLoading />
}

export default SignupLoadingPage
