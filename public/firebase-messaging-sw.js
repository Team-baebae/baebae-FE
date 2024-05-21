importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js')

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

const offlineFallbackPage = 'offline.html'
const sCacheName = 'practice-pwa' //캐시 이름 선언
const aFilesToCache = ['./', './index.html', './manifest.json', './icon-main.png'] //캐시할 파일 선언

//서비스워커 설치하고 캐시파일 저장
self.addEventListener('install', (pEvent) => {
  console.log('서비스워커를 설치합니다.')
  pEvent.waitUntil(
    caches.open(sCacheName).then((pCache) => {
      console.log('파일을 캐시에 저장합니다.')
      return pCache.addAll(aFilesToCache)
    }),
  )
})

// 고유번호 할당받은 서비스 워커 동작 시작
self.addEventListener('activate', (pEvent) => {
  console.log('서비스워커 동작 시작')
})

self.addEventListener('push', function (e) {
  if (!e.data.json()) return

  const resultData = e.data.json().notification
  const notificationTitle = resultData.title
  const notificationOptions = {
    body: resultData.body,
    icon: 'https://kr.object.ncloudstorage.com/baebae-bucket/flipit.png',
    tag: resultData.tag,
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})
