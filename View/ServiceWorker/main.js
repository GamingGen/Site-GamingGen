'use strict'; 

const CACHE_NAME = 'gaming-gen-cache-v1';
let urlsToCache = [
  '../Img/Slider/SLIDER-GG6V4.png',
  '../Img/Partenaires/SILVER-RUSH.jpg',
  // 'https://static.hotjar.com/c/hotjar-390971.js?sv=5',
  // 'https://player.twitch.tv/js/embed/v1.js',
  // 'https://daneden.github.io/animate.css/animate.min.css',
  // 'https://www.google-analytics.com/analytics.js'
];

this.addEventListener('install', function(event) {
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

this.addEventListener('fetch', function(event) {
  console.log('try to fetch:' + event.request);
  event.respondWith(
    caches.match(event.request)
  );
});