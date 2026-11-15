// Change this version every time you upload changes so the phone gets the new files.
const cacheName = "finanzas-v4";

const filesToCache = ["./", "./index.html", "./manifest.json", "./icon.png"];

// Saves the app files on the phone the first time it is opened.
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(filesToCache);
    })
  );
  self.skipWaiting();
});

// Deletes caches from older versions.
self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function (name) { return name !== cacheName; })
          .map(function (name) { return caches.delete(name); })
      );
    })
  );
  self.clients.claim();
});

// Serves files from the cache first so the app works without internet.
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (cachedResponse) {
      return cachedResponse || fetch(event.request);
    })
  );
});
