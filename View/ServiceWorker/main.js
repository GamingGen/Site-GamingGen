'use strict'; 

const CACHE_NAME = 'gaming-gen-cache-v1';
let urlsToCache = [
  '/',
  '/index.html',
  '/please-wait.min.js',
  '/Javascript/app.js',
  '../Img/Slider/SLIDER-GG6V4.png',
  '../Img/Partenaires/SILVER-RUSH.jpg',
  // 'https://static.hotjar.com/c/hotjar-390971.js?sv=5',
  // 'https://player.twitch.tv/js/embed/v1.js',
  // 'https://daneden.github.io/animate.css/animate.min.css',
  // 'https://www.google-analytics.com/analytics.js'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('Opened cache');
      return cache.addAll(urlsToCache.map(function(urlToPrefetch) {
        return new Request(urlToPrefetch, { mode: 'no-cors' });
      })).then(function() {
        console.log('All resources have been fetched and cached.');
      });
    })
  );
});

// self.addEventListener('fetch', function(event) {
//   console.log('try to fetch:' + event.request);
//   event.respondWith(
//     caches.match(event.request)
//   );
// });


self.addEventListener('fetch', function(event) {
  console.log('try to fetch:' + event.request);
  const requestURL = new URL(event.request.url);
  
  if (/^(\/css\/|\/js\/)/.test(requestURL.pathname)) {
    event.respondWith(returnFromCacheOrFetch(event.request, CACHE_NAME));
  }
  else if (/^\/images.*\.(jpg|png)$/.test(requestURL.pathname)) {
    event.respondWith(returnWebpOrOriginal(event.request));
  }
});

// this.addEventListener('foreignfetch', event => {
//   console.log('try to foreignfetch:' + event.request);
// 	event.respondWith(fetch(event.request).then(response => {
// 		return {
// 			response: response,
// 			origin: event.origin,
// 			headers: ['Content-Type']
// 		};
// 	}));
// });

function returnFromCacheOrFetch(request) {
  return caches.open(CACHE_NAME).then(function(cache) {
    return cache.match(event.request).then(function(cacheResponse) {
      return cacheResponse || fetch(request);
    });
  });
}


function returnWebpOrOriginal(request) {
  // Start by assuming the browser doesn't support webp
  let supportsWebp = false;

  // If the request's Accept header contains "webp" then we can assume the browser will happily deal with a webp file.
  if (request.headers.has('accept')) {
    supportsWebp = request.headers.get('accept').includes('webp');
  }

  if (supportsWebp) {
    // If we support webp then adjust the URL to ask for the webp file
    const webpUrl = request.url.replace(/(jpg|png)$/, "webp");
    // Then use fetch to return the webp file
    return fetch(webpUrl).then(function(response) {
      // If not all the images have been converted then we fallback to requesting the original file.
      return response.status === 404 ? fetch(request) : response;
    });
  } else {
    // If the browser doesn't support webp, just fetch the original request.
    return fetch(request);
  }
}