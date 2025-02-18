const CACHE_NAME = "my-app-cache-v2"; // Increment cache name to force an update

const urlsToCache = [
  "/",
  "/index.html",
  "/static/js/bundle.js",
  "/static/js/main.js",
  "/static/css/main.css",
  "/logo192.png",
  "/manifest.json"
];

// Install and precache resources
self.addEventListener("install", (event) => {
  console.log("Service Worker installing...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Caching files...");
      return cache.addAll(urlsToCache);
    })
  );
  // Force the service worker to activate immediately
  self.skipWaiting();
});


// Serve cached content when offline
self.addEventListener("fetch", (event) => {
  console.log("Fetching:", event.request.url);
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response; // Serve from cache
      }
      // If not found in cache, fetch from network
      return fetch(event.request).catch(() => {
        // Optionally, return a fallback offline page or asset if the network fails
        console.log('Network request failed. Returning fallback.');
        return caches.match('/offline.html');  // You can create an offline fallback page if desired
      });
    })
  );
});


// Clean up old caches
self.addEventListener("activate", (event) => {
  console.log("Service Worker activating...");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("Deleting old cache:", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});