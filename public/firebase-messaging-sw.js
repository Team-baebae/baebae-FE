importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js')

self.addEventListener('install', function (e) {
  self.skipWaiting()
})

self.addEventListener('activate', function (e) {
  console.log('fcm service worker가 실행되었습니다.')
})

const firebaseConfig = {
  apiKey: 'AIzaSyAo38j9D2mq1sJ4v6L3cpiCFZNd0Ul4i_0',
  authDomain: 'baebae-acbaf.firebaseapp.com',
  projectId: 'baebae-acbaf',
  storageBucket: 'baebae-acbaf.appspot.com',
  messagingSenderId: '137365255473',
  appId: '1:137365255473:web:1d1fb55f3875822797ac10',
  measurementId: 'G-SVCK95XLXP',
}

firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.title
  const notificationOptions = {
    body: payload.body,
  }
  self.registration.showNotification(notificationTitle, notificationOptions)
})

self.addEventListener('push', function (e) {
  if (!e.data.json()) return

  const resultData = e.data.json().notification
  const notificationTitle = resultData.title
  const notificationOptions = {
    body: resultData.body,
    icon: resultData.image, // 웹 푸시 이미지는 icon
    tag: resultData.tag,
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})
