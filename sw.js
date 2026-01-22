const CACHE_NAME = 'icono-estudio-v2';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './img/logo.png',
  'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600&display=swap'
];

// Instalación: Guarda los archivos en caché
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Activación: Limpia cachés antiguas
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// Estrategia: Cache First, luego Red (Offline Ready)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});