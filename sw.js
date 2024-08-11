const cacheName = "aamedia"
const preCache = ["./", "./style.css", "./script.js", "./ScheherazadeNew-Medium.ttf", "./duror.html"] //backup

self.addEventListener("install", (e)=>{
  console.log("service worker installed")
  e.waitUntil ((async ()=>{
    const cache = await caches.open(cacheName)
    cache.addAll(preCache) //(isi preCache)
  })())
})

self.addEventListener("fetch",(e)=>{
  e.respondWith((async ()=>{
    const cache = await caches.open(cacheName)
    const resCache = await cache.match(e.request)
    
    if(resCache) return resCache
    
    try {
      const res = await fetch(e.request)

      //notifilasi lirik baru
      if (e.request.url.endsWith('index.html')) {
        const oldLyrics = resCache ? await resCache.text() : '';
        const newLyrics = await res.clone().text();
      
        if (oldLyrics !== newLyrics) {
          self.registration.showNotification('Ada Lirik Baru Ditambahkan!', {
            body: 'Kami Telah Menambahkan List Sholawat Baru, Silahkan Bisa Update!',
            icon: './aamedia.png', // Sesuaikan path ikon
            tag: 'update-notification'
          });
        }
      }      

      cache.put(e.request,res.clone())
      return res
    } catch (error){
      console.log(error)
    }
  })())
})


// Event Notification Click - menangani klik notifikasi
self.addEventListener('notificationclick', event => {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
      // Cek apakah sudah ada tab yang terbuka dengan URL yang sama
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        if (client.url.includes('index.html') && 'focus' in client) {
          return client.focus();
        }
      }
      // Jika belum ada, buka tab baru
      if (clients.openWindow) {
        return clients.openWindow('/index.html');
      }
    })
  );
});

