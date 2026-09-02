const CACHE = "fantacalcio-asta-v4-vicario-20260902";
const ASSETS = ["./", "./index.html", "./manifest.json", "./market-patch.js"];
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (event.request.mode === "navigate" || url.pathname.endsWith('/index.html') || url.pathname.endsWith('/fantacalcio-asta/')) {
    event.respondWith(fetch(event.request).then(r=>r.text()).then(html=>{
      html=html.replace(/<script src="\.\/market-patch\.js[^>]*><\/script>/g,'');
      html=html.replace('</body>','<script src="./market-patch.js?v=20260902-1548"></script></body>');
      return new Response(html,{headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-cache, no-store, must-revalidate'}});
    }).catch(()=>caches.match('./index.html')));
    return;
  }
  event.respondWith(fetch(event.request,{cache:'no-store'}).then(response => {
    const copy = response.clone(); caches.open(CACHE).then(cache => cache.put(event.request, copy)); return response;
  }).catch(() => caches.match(event.request)));
});
