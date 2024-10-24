const cacheName = "aamedia";
const preCache = ["./", "./style.css", "./script.js", "./ScheherazadeNew-Medium.ttf", "./duror.html", "./barzanji.html"];

// self.addEventListener("install", (e) => {
//   console.log("Service worker installed");
//   e.waitUntil(
//     (async () => {
//       const cache = await caches.open(cacheName);
//       await cache.addAll(preCache); // Cache all specified files
//     })()
//   );
// });

// Menghindari caching otomatis saat install
self.addEventListener("install", (e) => {
  console.log("Service worker installed");
  // Di sini kita tidak melakukan caching otomatis
});

// Event listener untuk caching yang di-trigger oleh pengguna
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === 'cache-files') {
    (async () => {
      const cache = await caches.open(cacheName);
      await cache.addAll(preCache); // Cache all specified files
      console.log("Files cached successfully!");
    })();
  }
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      const cache = await caches.open(cacheName);
      const resCache = await cache.match(e.request);
      
      if (resCache) return resCache;
      
      try {
        const res = await fetch(e.request);
        
        // Handle notifications for index.html updates
        if (e.request.url.endsWith('index.html')) {
          const oldLyrics = resCache ? await resCache.text() : '';
          const newLyrics = await res.clone().text();
          
          if (oldLyrics !== newLyrics) {
            self.registration.showNotification('Ada Lirik Baru Ditambahkan!', {
              body: 'Kami Telah Menambahkan List Sholawat Baru, Silahkan Bisa Update!',
              icon: './aamedia.png', // Ensure this path is correct
              tag: 'update-notification'
            });
          }
        }
        
        cache.put(e.request, res.clone());
        return res;
      } catch (error) {
        console.log('Fetch error:', error);
      }
    })()
  );
});

// Handle notification click event
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      // Check if there's already a window open with the URL
      for (const client of windowClients) {
        if (client.url.includes('index.html') && 'focus' in client) {
          return client.focus();
        }
      }
      // If no such window is found, open a new one
      if (clients.openWindow) {
        return clients.openWindow('/index.html');
      }
    })
  );
});
