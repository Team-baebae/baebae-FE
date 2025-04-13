import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { userInfoState } from '@/context/Atoms'
import { getNotificationList } from '@/apis/NotificationApi'
import NoAlarm from '@/components/alarm/NoAlarm'
import Notification from '@/components/alarm/Notification'
import { NotificationProps } from '@/components/alarm/types'
import Header from '@/components/common/Header'
import { colors } from '@/styles/colors'

const Alarms = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState)
  const memberId = userInfo.memberId
  const accessToken = userInfo.accessToken

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [notifications, setNotifications] = useState<NotificationProps[]>([])

  useEffect(() => {
    getNotificationList(memberId, accessToken, userInfo.refreshToken, setUserInfo).then((result) => {
      if (result) {
        setNotifications(result)
      }
      setIsLoading(false)
    })
  }, [])

  return (
    <Container>
      <Header text="알림" background={colors.white} />
      {isLoading ? (
        <></>
      ) : (
        <>
          {notifications.length == 0 ? (
            <>
              <NoAlarm />
            </>
          ) : (
            notifications.map((value) => (
              <Notification
                title={value.notificationContent}
                content={value.questionContent}
                isChecked={value.checked}
              />
            ))
          )}
        </>
      )}
    </Container>
  )
}

export default Alarms

const Container = styled.div`
  height: 100vh;
  background-color: ${colors.white};
`
