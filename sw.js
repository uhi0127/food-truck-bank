// 설치(Install) 단계
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// 활성화(Activate) 단계
self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

// 요청 가로채기 (네트워크로 그대로 통과시키기)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
  );
});