const CACHE_NAME = "image-cache-v1";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(["/index.html", "/index.css", "/index.js"]); // Cache core files
    })
  );
});

self.addEventListener("fetch", (event) => {

  if (event.request.url.match(/\.(webp|png)$/)) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request).then((fetchResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, fetchResponse.clone()); // Cache the new image
            return fetchResponse;
          });
        });
      })
    );
  } else {

    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});
