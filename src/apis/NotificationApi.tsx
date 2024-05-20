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
