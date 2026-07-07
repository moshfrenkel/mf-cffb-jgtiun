/* MoshFit service worker — offline shell cache */
const CACHE = 'moshfit-v12';
const ASSETS = ['./','./index.html','./app.js','./sync.js','./manifest.webmanifest','./icon.svg'];

self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate', e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch', e=>{
  const u = new URL(e.request.url);
  // never cache Supabase/API calls
  if(u.pathname.includes('/rest/v1/')) return;
  e.respondWith(
    caches.match(e.request).then(hit=> hit || fetch(e.request).then(res=>{
      if(e.request.method==='GET' && res.ok && u.origin===location.origin){
        const copy=res.clone(); caches.open(CACHE).then(c=>c.put(e.request,copy));
      }
      return res;
    }).catch(()=>hit))
  );
});
