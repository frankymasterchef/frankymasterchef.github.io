
var CACHE_STATIC_NAME = 'static-v1';
var CACHE_DYNAMIC_NAME = 'dynamic-v1';

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
          '/js/aos.js',
          '/js/bootstrap-datepicker.min.js',
          '/js/bootstrap.min.js',
          '/js/jquery-3.3.1.min.js',
          '/js/jquery-migrate-3.0.0.min.js',
          '/js/jquery-ui.js',
          '/js/jquery.animateNumber.min.js',
          '/js/jquery.countdown.min.js',
          '/js/jquery.easing.1.3.js',
          '/js/jquery.fancybox.min.js',
          '/js/jquery.magnific-popup.min.js',
          '/js/jquery.stellar.min.js',
          '/js/jquery.sticky.js',
          '/js/jquery.waypoints.min.js',
          '/js/main.js',
          '/js/mediaelement-and-player.min.js',
          '/js/owl.carousel.min.js',
          '/js/popper.min.js',
          '/js/slick.min.js',
          '/js/typed.js',
          '/css/aos.css',
          '/css/bootstrap-datepicker.css',
          '/css/bootstrap.min.css',
          '/css/bootstrap.min.map',
          '/css/jquery-ui.css',
          '/css/jquery.fancybox.min.css',
          '/css/magnific-popup.css',
          '/css/mediaelementplayer.css',
          '/css/owl.carousel.min.css',
          '/css/owl.theme.default.min.css',
          '/css/style.css',
          '/fonts/flaticon/font/flaticon.css',
          '/fonts/icomoon/style.css',
          '/images/Ingredients.jpg',
          '/images/carousel_3.jpg',
          '/images/carousel_1.jpg',
          '/images/newspaper_2.png',
          '/images/explore.png',
          '/images/create.png',
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
});