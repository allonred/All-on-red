// ALL ON RED! LEVEL 1 — single-file game with embedded soundtrack + recorded voices.
const CACHE='all-on-red-level1-v7-embedded-voices';
const ASSETS=['./','./index.html'];
self.addEventListener('install',event=>event.waitUntil(
 caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting())
));
self.addEventListener('activate',event=>event.waitUntil(
 caches.keys().then(keys=>Promise.all(keys.filter(key=>
 (key.startsWith('all-on-red-level1-')||key.startsWith('all-on-red-landscape-'))&&key!==CACHE
 ).map(key=>caches.delete(key)))).then(()=>self.clients.claim())
));
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET'||event.request.url.startsWith('blob:'))return;
 if(event.request.mode==='navigate'){
  event.respondWith(fetch(event.request).then(response=>{
   if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy)).catch(()=>{});}
   return response;
  }).catch(()=>caches.match(event.request)));return;
 }
 event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request)));
});
