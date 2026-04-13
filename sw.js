/* =============================================
 * QuickRead — Service Worker
 * Provides offline support and PWA caching
 * ============================================= */

const CACHE_NAME = 'quickread-v1';

const PRECACHE_ASSETS = [
  './',
  './index.html',
  './favicon.svg',
  './manifest.json'
];

const CDN_ASSETS = [
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js',
  'https://cdn.jsdelivr.net/npm/qrious@4.0.2/dist/qrious.min.js'
];

// Install — precache app shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      // Cache local assets
      await cache.addAll(PRECACHE_ASSETS);
      // Cache CDN assets (best-effort, don't fail install if CDN is down)
      for (const url of CDN_ASSETS) {
        try {
          await cache.add(url);
        } catch (e) {
          console.warn('Failed to cache CDN asset:', url, e);
        }
      }
    })
  );
  self.skipWaiting();
});

// Activate — clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Fetch — stale-while-revalidate for all requests
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      // Return cached version immediately, and update cache in background
      const fetchPromise = fetch(event.request)
        .then((response) => {
          // Only cache valid responses
          if (response.ok && (response.type === 'basic' || response.type === 'cors')) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => {
          // Network failed — if navigating, fall back to index.html
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
          return cached;
        });

      return cached || fetchPromise;
    })
  );
});
