const OFFLINE = 'lyricracha-offline-v1';
const SHELL = 'lyricracha-shell-v1';
const ROOT = new URL('./', self.registration.scope);
self.addEventListener('install', event => { event.waitUntil(caches.open(SHELL).then(c => c.addAll([new URL('index.html',ROOT),new URL('offline.html',ROOT)]))); self.skipWaiting(); });
self.addEventListener('activate', event => { event.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', event => {
 const request=event.request;
 if(request.method!=='GET'||new URL(request.url).origin!==self.location.origin)return;
 event.respondWith((async()=>{
   const offline=await caches.open(OFFLINE);
   const cached=await offline.match(request,{ignoreSearch:true});
   if(cached)return cached;
   try {return await fetch(request);}catch(e){
     const shell=await caches.open(SHELL);
     return (await shell.match(request,{ignoreSearch:true})) || (request.mode==='navigate' ? await shell.match(new URL('offline.html',ROOT)) : Response.error());
   }
 })());
});
