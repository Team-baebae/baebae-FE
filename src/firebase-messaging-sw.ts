import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getMessaging, getToken, isSupported } from 'firebase/messaging'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FCM_API_KEY,
  authDomain: import.meta.env.VITE_APP_FCM_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_FCM_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_FCM_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FCM_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_FCM_APP_ID,
  measurementId: import.meta.env.VITE_APP_FCM_MEASUREMENT_ID,
}
export const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const messaging = getMessaging(app)

isSupported().then((supported) => {
  if (supported) {
    initializeApp(firebaseConfig)
    getMessaging()
  } else {
    console.error('Browser does not support notifications')
  }
})

export function requestPermission(): Promise<string> {
  return new Promise((resolve, reject) => {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        getToken(messaging, {
          vapidKey: import.meta.env.VITE_APP_FCM_VAPID_KEY,
        })
          .catch((err) => {
            const error =
              "AbortError: Failed to execute 'subscribe' on 'PushManager': Subscription failed - no active Service Worker"
            if (err.toString() === error) {
              return getToken(messaging, {
                vapidKey: import.meta.env.VITE_APP_FCM_VAPID_KEY,
              })
            } else {
              throw err
            }
          })
          .then((currentToken) => {
            if (currentToken) {
              console.log(currentToken)
              resolve(currentToken)
            } else {
              console.log('No Instance ID token available. Request permission to generate one.')
              reject('')
            }
          })
          .catch((err) => {
            console.error(err)
            reject(err)
          })
      } else if (permission === 'denied') {
        console.log('푸시 권한 차단')
        resolve('')
      }
    })
  })
}

export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker
        .register('/firebase-messaging-sw.js')
        .then(function (registration) {
          console.log('Service Worker가 scope에 등록되었습니다.:', registration.scope)
        })
        .catch(function (err) {
          console.log('Service Worker 등록 실패:', err)
        })
    })
  }
}
