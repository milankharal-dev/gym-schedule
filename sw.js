const CACHE_NAME = "training-week-v23";
const APP_ASSETS = [
  "./", "./index.html", "./styles.css?v=22", "./safety-guidance.js?v=2", "./motion-guides.js?v=2", "./app.js?v=21",
  "./library.html", "./library.css?v=8", "./library.js?v=9",
  "./manifest.webmanifest", "./icon.svg", "./assets/muscle-anatomy.png", "./assets/equipment-machine-face-pull-guide-v2.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request).then((cached) => cached || caches.match("./index.html"))),
  );
});
