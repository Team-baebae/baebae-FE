import { getNotificationList } from '@/apis/NotificationApi'
import NoAlram from '@/components/alram/NoAlram'
import Notification from '@/components/alram/Notification'
import { NotificationProps } from '@/components/alram/types'
import Header from '@/components/common/Header'
import { userInfoState } from '@/context/Atoms'
import { colors } from '@/styles/colors'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'

const Alrams = () => {
  const userInfo = useRecoilValue(userInfoState)
  const memberId = userInfo.memberId
  const accessToken = userInfo.accessToken

  const [notifications, setNotifications] = useState<NotificationProps[]>([])

  useEffect(() => {
    getNotificationList(memberId, accessToken).then((result) => {
      if (result) {
        setNotifications(result)
      }
    })
  }, [])

  return (
    <Container>
      <Header text="알림" background={colors.white} />
      {notifications.length == 0 ? (
        <>
          <NoAlram />
        </>
      ) : (
        notifications.map((value) => (
          <Notification title={value.notificationContent} content={value.questionContent} isChecked={value.checked} />
        ))
      )}
    </Container>
  )
}

export default Alrams

const Container = styled.div`
  height: 100vh;
  background-color: ${colors.white};
`
