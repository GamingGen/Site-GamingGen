'use strict';

const CACHE_NAME = 'gaming-gen-cache-v1';
let urlsToCache = [
  '/',
  '/index.html',
  '/please-wait.min.js',
  // '/Javascript/*',
  // '/Img/*',
  // '/Style/main.css',
  // 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
  // 'https://maxcdn.bootstrapcdn.com/…tstrap/3.3.7/css/bootstrap-theme.min.css',
  // 'https://maxcdn.bootstrapcdn.com/…t-awesome/4.6.3/css/font-awesome.min.css',
  // 'https://cdnjs.cloudflare.com/…epicker/1.1.4/css/datetimepicker.min.css',
  // 'https://cdnjs.cloudflare.com/…bs/angular-ui-grid/4.0.6/ui-grid.min.css',
  // 'https://daneden.github.io/animate.css/animate.min.css',
  // 'https://static.hotjar.com/c/hotjar-390971.js?sv=5',
  // 'https://player.twitch.tv/js/embed/v1.js',
  // 'https://daneden.github.io/animate.css/animate.min.css',
  // 'https://www.google-analytics.com/analytics.js'
];

this.addEventListener('install', (event) => {
//   event.registerForeignFetch({
// 		scopes:['/'],
// 		origins:['*'] // or simply '*' to allow all origins
// 	});
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache.map((urlToPrefetch) => {
        return new Request(urlToPrefetch, { mode: 'no-cors' });
      })).then(() => {
        console.log('All resources have been fetched and cached.');
      });
    })
  );
});

this.addEventListener('foreignfetch', event => {
  console.log('try to foreignfetch:' + event.request.url);
	event.respondWith(fetch(event.request).then(response => {
		return {
			response: response,
			origin: event.origin,
			headers: ['Content-Type']
		};
	}));
});

// this.addEventListener('fetch', (event) => {
//   console.log('try to fetch:' + event.request);
//   event.respondWith(
//     caches.match(event.request)
//   );
// });


this.addEventListener('fetch', (event) => {
  const requestURL = new URL(event.request.url);
  
  if (/^\/Img.*\.(jpg|png)$/.test(requestURL.pathname)) {
    event.respondWith(returnWebpOrOriginal(event.request));
  }
  else if (/^(\/css\/|\/js\/)/.test(requestURL.pathname)) {
    event.respondWith(returnFromCacheOrFetch(event));
  }
});

function returnFromCacheOrFetch(event) {
  return caches.open(CACHE_NAME).then((cache) => {
    return cache.match(event.request).then((cacheResponse) => {
      return cacheResponse || fetch(event.request).then(function(response) {
        return caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, response.clone());
          return response;
        });  
      });
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
    console.log('webpUrl: ', webpUrl);
    // Then use fetch to return the webp file
    return fetch(webpUrl).then((response) => {
      // If not all the images have been converted then we fallback to requesting the original file.
      return response.status === 404 ? fetch(request) : response;
    });
  }
  else {
    // If the browser doesn't support webp, just fetch the original request.
    return fetch(request);
  }
}