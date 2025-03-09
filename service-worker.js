const CACHE_NAME = "my-app-cache-v4"; // Change version to force update
const BASE_URL = "/sifrovaci-pomucky"; // GitHub Pages subdirectory

const urlsToCache = [
  `${BASE_URL}/`,
  `${BASE_URL}/index.html`,
  `${BASE_URL}/static/js/main.js`,
  `${BASE_URL}/static/css/main.css`,
  `${BASE_URL}/logo192.png`,
  `${BASE_URL}/manifest.json`
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    }).catch((error) => console.log("Cache addAll failed:", error))
  );
  self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});