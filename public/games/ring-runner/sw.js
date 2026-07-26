/* Service Worker — cache offline untuk PWA Ring Runner */

/* Dinaikkan dari v2. Perangkat yang sudah pernah memasang game ini menyimpan
   cache lama yang isinya tidak lengkap, dan tanpa nama baru cache itu tidak
   akan pernah dibuang. */
const CACHE = "ring-runner-v3";

/* "./" sengaja tidak lagi ada di sini. URL itu ternyata dialihkan lalu berujung
   404, dan cache.addAll menolak seluruh daftar bila satu saja anggotanya gagal
   — jadi satu URL buruk membuat precache tidak pernah tersimpan sama sekali. */
const ASSETS = [
  "./index.html",
  "./three.min.js",
  "./BufferGeometryUtils.js",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE)
      /* Ditambahkan satu per satu, bukan addAll, supaya satu aset yang gagal
         tidak menggagalkan sisanya. */
      .then((c) => Promise.all(ASSETS.map((u) => c.add(u).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          /* Awalan ini penting. Sebelumnya filternya hanya k !== CACHE,
             padahal caches.keys() mengembalikan seluruh cache pada origin ini
             — jadi mengaktifkan Ring Runner ikut menghapus cache offline
             flappy-bird, guess-country dan number-games. */
          .filter((k) => k.startsWith("ring-runner-") && k !== CACHE)
          .map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  if (new URL(req.url).origin !== self.location.origin) return;

  /* Dokumen diambil dari jaringan lebih dulu, aset dari cache lebih dulu.
     Sebelumnya semuanya cache-first, sehingga index.html yang sudah diperbarui
     tidak pernah sampai ke perangkat yang sudah memasang game ini. */
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => { try { c.put(req, copy); } catch (_) {} });
          return res;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  e.respondWith(
    caches.match(req).then((hit) => hit || fetch(req)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => { try { c.put(req, copy); } catch (_) {} });
        return res;
      })
      /* Hanya navigasi yang boleh dijawab dengan dokumen HTML. Menjawab
         permintaan skrip dengan index.html membuat browser mengurai HTML
         sebagai JavaScript, THREE gagal terdefinisi, dan game berhenti di
         layar "Memuat game…" selamanya. */
      .catch(() => Response.error()))
  );
});
