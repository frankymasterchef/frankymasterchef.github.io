
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
          '/offline.html',
          '/js/app.js',
          '/js/bootstrap.min.js',
          '/js/jquery-3.3.1.min.js',
          '/css/bootstrap.min.css',
          '/css/style.css',
          '/images/icon_chef_128.png',
          '/images/Ingredients.webp',
          'https://firebasestorage.googleapis.com/v0/b/webchefpad-1e9bd.appspot.com/o/static%2FIngredients.webp?alt=media&token=231e3a02-c93e-4b9c-b354-adbe116e4b38',
          'https://firebasestorage.googleapis.com/v0/b/webchefpad-1e9bd.appspot.com/o/static%2Fcarousel_3.webp?alt=media&token=f7989ac9-709a-4761-ab58-301b3cd018c6',
          'https://firebasestorage.googleapis.com/v0/b/webchefpad-1e9bd.appspot.com/o/static%2Fcarousel_1.webp?alt=media&token=9c8da68a-5729-4abc-8439-ce2a127dd339',
          'https://firebasestorage.googleapis.com/v0/b/webchefpad-1e9bd.appspot.com/o/static%2Fcarousel_3.webp?alt=media&token=f7989ac9-709a-4761-ab58-301b3cd018c6',
          'https://firebasestorage.googleapis.com/v0/b/webchefpad-1e9bd.appspot.com/o/static%2Fabout_cook_1.webp?alt=media&token=6e26d5ef-77fa-490e-aff4-3ce1bcb3d5f9',
          'https://firebasestorage.googleapis.com/v0/b/webchefpad-1e9bd.appspot.com/o/static%2Fabout_cook_2.webp?alt=media&token=5d1e787c-0354-47c5-af5a-62ff7b5213eb',
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
                  return caches.open(CACHE_STATIC_NAME)
                  .then(function(cache) {
                    return cache.match('/offline.html');
                  });
                });
            }
          })
      );
    }
});
