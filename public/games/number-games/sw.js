const CACHE_NAME = 'numplay-v24';
const CORE_ASSETS = [
    './index.html',
    './games/mathsprint.js',
    './games/pattern.js',
    './games/pairs.js',
    './games/match.js',
    './games/sudoku.js',
    './games/detective.js',
    './games/guessing.js',
    './games/numberle.js',
    './games/memory.js',
    './manifest.json',
    './icon-192.png',
    './icon-512.png'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) { return cache.addAll(CORE_ASSETS); })
            .then(function() { return self.skipWaiting(); })
    );
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys()
            .then(function(names) {
                return Promise.all(
                    names
                        .filter(function(name) {
                            return name.indexOf('numplay-') === 0 && name !== CACHE_NAME;
                        })
                        .map(function(name) { return caches.delete(name); })
                );
            })
            .then(function() { return self.clients.claim(); })
    );
});

self.addEventListener('fetch', function(event) {
    const request = event.request;
    if (request.method !== 'GET') return;

    const url = new URL(request.url);
    if (url.origin !== self.location.origin) return;

    if (request.mode === 'navigate') {
        event.respondWith(
            fetch(request)
                .then(function(response) {
                    if (response.ok) {
                        const copy = response.clone();
                        caches.open(CACHE_NAME).then(function(cache) { cache.put(request, copy); });
                    }
                    return response;
                })
                .catch(function() {
                    return caches.match(request).then(function(cached) {
                        return cached || caches.match('./index.html');
                    });
                })
        );
        return;
    }

    event.respondWith(
        caches.match(request).then(function(cached) {
            const network = fetch(request)
                .then(function(response) {
                    if (response.ok) {
                        const copy = response.clone();
                        caches.open(CACHE_NAME).then(function(cache) { cache.put(request, copy); });
                    }
                    return response;
                })
                .catch(function() {
                    return cached || new Response('Offline', {
                        status: 503,
                        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
                    });
                });

            return cached || network;
        })
    );
});
