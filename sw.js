const CHACHE_NAME = "poke-api-v1";
const assets = [
  "./index.html",
  "./css/main.css",
  "./app.js",
  "./assets/pokeball.png",
  "./assets/loader.svg",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(CHACHE_NAME)
      .then((cache) => {
        return cache.addAll(assets).then(() => self.skipWaiting());
      })
      .catch((err) => {
        console.log("ERROR AL REGISTRAR CACHE", err);
      })
  );
});
self.addEventListener("active", (e) => {
  const chacheWhiteList = [CHACHE_NAME];
  e.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        cacheNames.map((cacheName) => {
          if (chacheWhiteList.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        });
      })
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request)
      .then(res => {
        return res || fetch(e.request)
      })
  )
})
