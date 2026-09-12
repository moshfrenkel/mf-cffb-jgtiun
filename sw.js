/* MoshFit service worker — offline shell cache
 *
 * 12.9.2026: the phone kept showing the old block after a push. Cause: the
 * fetch handler was cache-first for everything, and CACHE stayed 'moshfit-v17'
 * across every deploy, so install never re-ran and app.js was frozen at
 * whatever shipped first. A training block that cannot reach the phone is not
 * a training block.
 *
 * Now: network-first for the app shell (index.html, app.js, sync.js), so a push
 * lands on the next launch, with the cache as the offline fallback. Everything
 * else stays cache-first. Bump BUILD on every deploy that changes the plan.
 */
const BUILD = 'v20-2026-09-12';
const CACHE = 'moshfit-' + BUILD;
const ASSETS = ['./','./index.html','./app.js','./sync.js','./manifest.webmanifest','./icon.svg'];
const SHELL = ['/', '/index.html', '/app.js', '/sync.js'];

self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate', e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});

/* the app asks for this to show the build in the settings board */
self.addEventListener('message', e=>{
  if(e.data === 'build' && e.source) e.source.postMessage({build: BUILD});
});

function isShell(u){
  if(u.origin !== location.origin) return false;
  const p = u.pathname.replace(/\/index\.html$/, '/');
  return SHELL.some(s=> p.endsWith(s.replace(/^\//,'')) || p === s) || p.endsWith('/');
}

self.addEventListener('fetch', e=>{
  const u = new URL(e.request.url);
  // never cache Supabase/API calls
  if(u.pathname.includes('/rest/v1/')) return;

  if(e.request.method === 'GET' && isShell(u)){
    // network first: the newest plan wins, the cache only covers being offline
    e.respondWith(
      fetch(e.request).then(res=>{
        if(res && res.ok){
          const copy = res.clone();
          caches.open(CACHE).then(c=>c.put(e.request, copy));
        }
        return res;
      }).catch(()=> caches.match(e.request).then(hit=> hit || caches.match('./index.html')))
    );
    return;
  }

  e.respondWith(
    caches.match(e.request).then(hit=> hit || fetch(e.request).then(res=>{
      if(e.request.method==='GET' && res.ok && u.origin===location.origin){
        const copy=res.clone(); caches.open(CACHE).then(c=>c.put(e.request,copy));
      }
      return res;
    }).catch(()=>hit))
  );
});
