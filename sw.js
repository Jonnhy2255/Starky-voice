const CACHE_NAME = "Starky-v2";
const ASSETS = [
  "/Starky-voice/",
  "/Starky-voice/index.html",
  "/Starky-voice/manifest.json",
  "/Starky-voice/icon-192x192.png",
  "/Starky-voice/icon-512x512.png",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Mise en cache des fichiers...");
      return cache.addAll(ASSETS);
    })
  );
});
