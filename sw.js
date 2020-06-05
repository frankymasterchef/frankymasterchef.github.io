
var CACHE_STATIC_NAME = 'static-v8';
var CACHE_DYNAMIC_NAME = 'dynamic-v8';

self.addEventListener('install', function(event) {
  console.log('[Service Worker] Installing Service Worker ...', event);
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME)
      .then(function(cache) {
        console.log('[Service Worker] Precaching App Shell');
        cache.addAll([
          '/',
          '/index.html',
          '/js/app.js',
          '/js/bootstrap.min.js',
          '/js/jquery-3.3.1.min.js',
          '/css/bootstrap.min.css',
          '/css/owl.carousel.min.css',
          '/css/owl.theme.default.min.css',
          '/css/style.css',
          '/fonts/flaticon/font/flaticon.css',
          '/fonts/icomoon/style.css',
          '/images/icon_chef_128.png',

          'https://fonts.googleapis.com/css?family=Muli:400,700|Playfair+Display:400,900&display=swap'
        ]);
      })
  )
});

self.addEventListener('activate', function(event) {
  console.log('[Service Worker] Activating Service Worker ....', event);
  event.waitUntil(
    caches.keys()
      .then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
          if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
            console.log('[Service Worker] Removing old cache.', key);
            return caches.delete(key);
          }
        }));
      })
  );
  return self.clients.claim();
});


self.addEventListener('fetch', function(event) {
  if(event.request.url.indexOf('firestore.googleapis.com') === -1){
      event.respondWith(
        caches.match(event.request)
          .then(function(response) {
            if (response) {
              return response;
            } else {
              return fetch(event.request)
                .then(function(res) {
                  return caches.open(CACHE_DYNAMIC_NAME)
                    .then(function(cache) {
                      cache.put(event.request.url, res.clone());
                      return res;
                    })
                })
                .catch(function(err) {

                });
            }
          })
      );
    }
});
