import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { postFCM } from '@/apis/NotificationApi'
import AlramLoading from '@/components/alram/AlramLoading'
import { ownerUserData, userInfoState } from '@/context/Atoms'
import { requestPermission } from '@/firebase-messaging-sw'

const LoadingPage = () => {
  const navigate = useNavigate()

  const [userInfo, setUserInfo] = useRecoilState(userInfoState)
  const ownerUserInfo = useRecoilValue(ownerUserData)

  const Login = async () => {
    try {
      let fcmToken = await requestPermission()
      postFCM(userInfo.memberId, userInfo.accessToken, fcmToken).then(() => {
        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          fcmToken: fcmToken,
        }))
        ownerUserInfo.nickname === '' ? navigate(`/${userInfo.nickname}`) : navigate(`/${ownerUserInfo.nickname}`)
      })
    } catch {
      ownerUserInfo.nickname === '' ? navigate(`/${userInfo.nickname}`) : navigate(`/${ownerUserInfo.nickname}`)
    }
  }

  useEffect(() => {
    Login()
  }, [])

  return <AlramLoading />
}

export default LoadingPage
