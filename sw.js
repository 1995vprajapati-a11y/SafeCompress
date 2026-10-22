/* SafeCompress offline cache. Third-party libraries are cached only after they are fetched online. */
'use strict';
const CACHE_VERSION = 'safecompress-shell-v1';
const SHELL_FILES = ['/', '/index.html', '/manifest.json', '/favicon.png', '/icon-192.png', '/icon-512.png'];
const CDN_HOSTS = new Set(['cdn.jsdelivr.net', 'cdnjs.cloudflare.com']);
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_VERSION);
    await cache.addAll(SHELL_FILES);
    await self.skipWaiting();
  })());
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith('safecompress-') && key !== CACHE_VERSION).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin === self.location.origin) {
    if (request.mode === 'navigate') {
      event.respondWith((async () => {
        try {
          const fresh = await fetch(request);
          const cache = await caches.open(CACHE_VERSION);
          cache.put('/index.html', fresh.clone()).catch(() => {});
          return fresh;
        } catch (_) {
          return (await caches.match(request)) || (await caches.match('/index.html'));
        }
      })());
    } else {
      event.respondWith((async () => {
        const cached = await caches.match(request);
        if (cached) return cached;
        try {
          const fresh = await fetch(request);
          if (fresh && fresh.ok) (await caches.open(CACHE_VERSION)).put(request, fresh.clone()).catch(() => {});
          return fresh;
        } catch (_) { return cached || Response.error(); }
      })());
    }
  } else if (CDN_HOSTS.has(url.hostname)) {
    // Opaque cross-origin script responses can be cached after a successful online fetch.
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_VERSION);
      const cached = await cache.match(request);
      if (cached) return cached;
      try {
        const response = await fetch(request);
        if (response && (response.ok || response.type === 'opaque')) cache.put(request, response.clone()).catch(() => {});
        return response;
      } catch (_) { return cached || Response.error(); }
    })());
  }
});
