/* Minimal offline shell — H6. Does not cache OSM tiles (license/size). */
const SHELL = "sg-shell-v1";
const ASSETS = ["/", "/manifest.webmanifest"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(SHELL).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  if (request.url.includes("tile.openstreetmap.org")) return;
  event.respondWith(
    caches.match(request).then((cached) => cached || fetch(request).catch(() => caches.match("/")))
  );
});
