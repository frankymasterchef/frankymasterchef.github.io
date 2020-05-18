
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
          '/src/js/app.js',
          '/src/js/aos.js',
          '/src/js/bootstrap-datepicker.min.js',
          '/src/js/bootstrap.min.js',
          '/src/js/jquery-migrate-3.0.1.min.min.js',
          '/src/js/jquery-ui.js',
          '/src/js/jquery.animateNumber.min.js',
          '/src/js/jquery.countdown.min.js',
          '/src/js/jquery.easing.1.3.js',
          '/src/js/jquery.fancybox.min.js',
          '/src/js/jquery.magnific-popup.min.js',
          '/src/js/jquery.stellar.min.js',
          '/src/js/jquery.sticky.js',
          '/src/js/jquery.waypoints.min.js',
          '/src/js/main.js',
          '/src/js/mediaelement-and-player.min.js',
          '/src/js/owl.carousel.min.js',
          '/src/js/popper.min.js',
          '/src/js/slick.min.js',
          '/src/js/typed.js',
          '/src/css/aos.css',
          '/src/css/bootstrap-datepicker.css',
          '/src/css/bootstrap.min.css',
          '/src/css/bootstrap.min.map',
          '/src/css/jquery-ui.css',
          '/src/css/jquery.fancybox.min.css',
          '/src/css/magnific-popup.css',
          '/src/css/mediaelementplayer.css',
          '/src/css/owl.carousel.min.css',
          '/src/css/owl.theme.default.min.css',
          '/src/css/style.css',
          '/src/fonts/flaticon/font/flaticon.css',
          '/src/fonts/icomoon/style.css',
          '/src/images/Ingredients.jpg',
          '/src/images/carousel_3.jpg',
          '/src/images/carousel_1.jpg',
          '/src/images/newspaper_2.png',
          '/src/images/explore.png',
          '/src/images/create.png',
          '/src/images/marinara.jpg',
          '/src/images/crock-pot-spaghetti.jpg',
          '/src/images/egg-roll-bowls.jpg',
          '/src/images/mousse.jpg',
          '/src/images/swiss_chicken.jpg',
          '/src/images/about_cook_1.jpg',
          '/src/images/about_cook_2.jpg',
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