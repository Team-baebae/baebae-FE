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
    const dummyData = [
      {
        notificationId: 3,
        notificationContent: '배승우님이 질문을 남기셨습니다! 확인해보세요',
        questionContent: '가은아! 넌 무슨색상을 좋아해?',
        notificationTime: '2024-05-03 07:10:48',
        isChecked: false,
      },
      {
        notificationId: 2,
        notificationContent: '유자인 님이 ♥ 반응을 남겼어요.',
        questionContent: '유자인 님이 반응한 플립 확인하기',
        notificationTime: '2024-05-02 07:10:48',
        isChecked: true,
      },
      {
        notificationId: 1,
        notificationContent: '유자인 님과 취향이 통했어요! 👉🏻👈🏻',
        questionContent: '유자인 님과 통한 플립 확인하기',
        notificationTime: '2024-05-01 07:10:48',
        isChecked: true,
      },
    ]
    return dummyData
  } catch (error) {
    console.error(error)
  }
}
