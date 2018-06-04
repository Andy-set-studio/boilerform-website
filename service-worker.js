const VERSION = '1.0.0';
const CACHE_KEYS = {
    PRE_CACHE: `precache-${VERSION}`,
    RUNTIME: 'runtime'
};

// URLS that we want to be cached when the worker is installed
const PRE_CACHE_URLS = [
    '/',
    '/assets/css/main.css'
];

const OFFLINE_URL = '/offline.html';

// Push the offline page into the pre cache
PRE_CACHE_URLS.push(OFFLINE_URL);

// On install, stick any of the pre cache items into storage
self.addEventListener('install', evt => {
    evt.waitUntil(
        caches.open(CACHE_KEYS.PRE_CACHE)
            .then(cache => cache.addAll(PRE_CACHE_URLS))
            .then(self.skipWaiting())
    );
});

self.addEventListener('activate', evt => {
    
    // Look for any old caches and clear them out
    evt.waitUntil(
        caches.keys().then(cacheNames => {
            return cacheNames.filter(item => !Object.values(CACHE_KEYS).includes(item));
        })
        .then(itemsToDelete => {
            return Promise.all(itemsToDelete.map(item => {
                return caches.delete(item);
            }))
        })
        .then(() => self.clients.claim())
    )
});

self.addEventListener('fetch', evt => {
    
    // We're only interested in local items right now
    if(evt.request.url.startsWith(self.location.origin)) {
        evt.respondWith(

            caches.match(evt.request)
                .then(cachedResponse => {
                    // Item found in cache so return
                    if(cachedResponse) {
                        return cachedResponse;
                    }

                    // Nothing found so load up the request from the network
                    return caches.open(CACHE_KEYS.RUNTIME)
                        .then(cache => {
                            return fetch(evt.request)
                                .then(response => {

                                    // Put the new response in cache and return it
                                    return cache.put(evt.request, response.clone())
                                        .then(() => {
                                            return response;
                                        });
                                })
                                .catch(error => { 
                                    return caches.match(OFFLINE_URL);  
                                });
                        })
                })
        )
    }
});