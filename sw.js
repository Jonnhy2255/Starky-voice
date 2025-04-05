123dwfconst CACHE_NAME = "Starky-v3";
const ASSETS = [
  "/Starky-voice/",
  "/Starky-voice/index.html",
  "/Starky-voice/manifest.json",
  "/Starky-voice/icon-192x192.png",
  "/Starky-voice/icon-512x512.png",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
];

// Mise en cache des fichiers lors de l'installation
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Mise en cache des fichiers...");
      return cache.addAll(ASSETS);
    })
  );
});

// Activation du service worker et suppression des anciennes versions du cache
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("Suppression de l'ancien cache :", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Interception des requêtes pour servir le contenu depuis le cache si disponible
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }).catch(() => {
      return caches.match("/Starky-voice/index.html"); // Rediriger vers la page d'accueil si offline
    })
  );
});
