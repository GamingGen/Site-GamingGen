'use strict';

const CACHE_NAME = 'gaming-gen-static-v1';
const DEV_PRECACHE = [
  // '/',
  'index.html',
  '/please-wait.min.js',
  '/Javascript/app.js',
  '/Style/main.css',
];

const PROD_PRECACHE = [
  'js/lib.min.js',
  'js/main.min.js',
  'css/min.css',
];

self.addEventListener('install', event => {
//   event.registerForeignFetch({
// 		scopes:['/'],
// 		origins:['*'] // or simply '*' to allow all origins
// 	});

const myHeaders = new Headers();

const myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };

const aboutRequest = new Request('/about',myInit);

// bodyUsed:false
// cache:"default"
// credentials:"include"
// destination:""
// headers:Headers {}
// integrity:""
// keepalive:false
// method:"GET"
// mode:"cors"
// redirect:"follow"
// referrer:"https://si-gaminggen-darkterra-1.c9users.io/"
// referrerPolicy:"no-referrer-when-downgrade"
// signal:AbortSignal {aborted: false, onabort: null}
// url:"https://si-gaminggen-darkterra-1.c9users.io/socket.io/?EIO=3&transport=polling&t=MEhC9DR&sid=eyfEb8-E60oib21OAACz"


  event.waitUntil(
    fetch(aboutRequest).then(response => response.json()).then(function(json) {
      console.log('SW: json aboutRequest: ', json);
      const PRECACHE = json.env === 'production' ? PROD_PRECACHE : DEV_PRECACHE;
      caches.open(CACHE_NAME).then((cache) => {
        console.log('SW: Opened cache');
        return cache.addAll(DEV_PRECACHE.map((urlToPrefetch) => {
          console.log('SW: urlToPrefetch: ', urlToPrefetch);
          return new Request(urlToPrefetch, { mode: 'no-cors' });
        })).then(() => {
          self.skipWaiting();
          console.log('SW: All resources have been fetched and cached.');
        });
      });
    })
  );
});

self.addEventListener('foreignfetch', event => {
  console.log('SW: try to foreignfetch:' + event.request.url);
	event.respondWith(fetch(event.request).then(response => {
		return {
			response: response,
			origin: event.origin,
			headers: ['Content-Type']
		};
	}));
});


self.addEventListener('fetch', event => {
  const requestURL = new URL(event.request.url);
  
  console.log('SW: event.request: ', event.request);
  
  if (requestURL == location.origin && requestURL.pathname === '/') {
    event.respondWith(caches.match('index.html'));
  }
  else if (/^\/Img.*\.(jpg|png)$/.test(requestURL.pathname)) {
    event.respondWith(returnWebpOrOriginal(event.request));
  }
  else if (/^(\/css\/|\/js\/)/.test(requestURL.pathname)) {
    event.respondWith(returnFromCacheOrFetch(event));
  }
  // else if (event.request.url)
  else if (event.request.url.startsWith(self.location.origin) && !/^(\/socket.io\/)/.test(requestURL.pathname)) {
    event.respondWith(returnFromCacheOrFetch(event));
  }
});

function returnFromCacheOrFetch(event) {
  if (event.request.method === "GET") {
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
  // else {
  //   console.log(`SW: Can't CACHE POST -_-`);
  //   fetch(event.request).then(function(response) {
  //     console.log('SW: response: ', response);
  //     return response;
  //   });
  // }
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
    console.log('SW: webpUrl: ', webpUrl);
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