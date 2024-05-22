import { flipitAxios } from './apis'

export const getNotificationList = async (memberId: number, accessToken: string) => {
  try {
    let API = `/api/notifications/member/${memberId}`
    const response = await flipitAxios.get(API, {
      params: memberId,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return response.data.notificationList
  } catch (error) {
    console.error(error)
  }
}

export const postFCM = async (memberId: number, accessToken: string, fcmToken: string) => {
  try {
    let API = `/api/fcm/${memberId}`
    const response = await flipitAxios.post(
      API,
      {
        fcmToken,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    console.log(response)
  } catch (error) {
    console.error(error)
  }
}
