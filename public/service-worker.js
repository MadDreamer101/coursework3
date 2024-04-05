var cacheName = 'proskill-v1';
var cacheFiles = [
    'index.html',
    'proskill.webmanifest',
    'images/badminton.jpg',
    'images/basketball.jpeg',
    'images/chess.png',
    'images/cutelogo.png',
    'images/cricket.png',
    'images/football.jpeg',
    'images/hockey.png',
    'images/horse_riding.png',
    'images/swimming.jpg',
    'images/table-tennis.png',
    'images/volleyball.png',
    
];

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('[Service Worker] Caching all the files');
            return cache.addAll(cacheFiles);
        })
    );
});


self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (r) {
            // Download the file if it is not in the cache, 
            return r || fetch(e.request).then(function (response) {
                // add the new file to cache
                return caches.open(cacheName).then(function (cache) {
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })
    );
});