const CACHE_NAME = "my-app-cache-v5"; // Change version to force update
const BASE_URL = "/sifrovaci-pomucky"; // Adjust for GitHub Pages

const urlsToCache = [
  `${BASE_URL}/`,
  `${BASE_URL}/index.html`,
  `${BASE_URL}/manifest.json`,
  `${BASE_URL}/logo192.png`
];

// Install event: precache core assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    }).catch((error) => console.error("Cache addAll failed:", error))
  );
  self.skipWaiting();
});

// Fetch event: cache dynamic files and serve from cache
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).then((networkResponse) => {
        return caches.open(CACHE_NAME).then((cache) => {
          // Cache dynamic files (JS, CSS)
          if (event.request.url.includes("/static/")) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        });
      });
    }).catch(() => caches.match(`${BASE_URL}/index.html`)) // Fallback for offline
  );
});

// Activate event: cleanup old caches
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
  self.clients.claim();
});