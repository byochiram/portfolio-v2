# ✈️ PESAWAT — Ring Runner (Game Web 3D)

Versi **game** dari Tugas Besar Grafika Komputer & Visual.
Model pesawat & kota aslinya ditulis dengan **C++/OpenGL (GLUT)** di
[`../main.cpp`](../main.cpp), lalu dibangun ulang jadi **game 3D interaktif**
dengan **Three.js / WebGL** supaya jalan langsung di browser — cocok untuk
**portofolio online** dan bisa **dibagikan lewat link**.

## 🎯 Cara main

Terbangkan pesawat menembus **setiap lingkaran (gate)**:

- Tiap lingkaran yang berhasil ditembus = **+1 poin**, dan permainan **makin cepat**.
- **Meleset dari lingkaran = tamat** (game over) — skor terbaik tersimpan otomatis.
- Lingkaran target menyala **🔵 cyan**; berubah **🟢 hijau** saat pesawatmu **sudah sejajar**
  (artinya pasti tembus). Saat tembus: kilat hijau + skor memantul + bunyi *ding*.

## 🎮 Kontrol

| Input | Aksi |
|------|------|
| **W A S D** / **← ↑ ↓ →** | kemudikan pesawat (naik/turun/kiri/kanan) |
| **🖱️ tahan & geser** / **👆 seret** | kemudi alternatif (juga di HP) |
| **Scroll** / tombol **➕ ➖** / **pinch** | zoom in / out |
| **Spasi / Enter** | mulai / main lagi |
| **R**, tombol **🔊** | on/off suara |

Gerakan pesawat halus (fisika kecepatan + easing), dan kamera mengikuti dari belakang.

## 📂 Isi folder

| File | Keterangan |
|------|------------|
| `index.html` | Game utama (scene + logika + UI). Semua ada di sini. |
| `three.min.js` | Library Three.js r128 (lokal, tanpa internet). |
| `BufferGeometryUtils.js` | Util penggabung geometri (biar ribuan gedung ringan). |
| `README.md` | File ini. |

> Semuanya **self-contained** (tak perlu koneksi internet saat dimainkan),
> jadi bisa di-host di mana saja atau dibuka offline.

## ▶️ Menjalankan di komputer (lokal)

Paling gampang: **dobel-klik `index.html`**.

Kalau ada yang dibatasi browser saat dibuka via file, jalankan server kecil dari folder ini:

```bash
python -m http.server 8000
```
lalu buka <http://localhost:8000>.

## 🌐 Deploy online (pilih salah satu)

### Netlify Drop (paling cepat)
1. Buka <https://app.netlify.com/drop> → **seret folder `web`** ke sana → dapat link.

### GitHub Pages (paling pas untuk portofolio)
1. Push repo ke GitHub, lalu **Settings → Pages → Branch: `main` → `/ (root)` → Save**.
2. Link: `https://<username>.github.io/<repo>/` (file redirect di root akan membuka game).

### Vercel
1. <https://vercel.com> → **Add New → Project** → import repo → **Deploy**.

## 🧩 Menempel di website portofolio (embed)

```html
<iframe src="https://LINK-KAMU/" width="100%" height="560"
        style="border:0;border-radius:12px" title="Pesawat 3D — Ring Runner"
        allowfullscreen></iframe>
```

## 📝 Catatan teknis

- Model pesawat/kota = replikasi 1:1 transformasi OpenGL asli (`glPushMatrix/glTranslate/…`)
  ke `THREE.Matrix4`; `glutSolidCube/Sphere/Torus` & `gluCylinder` → geometry Three.js.
- Audio dibuat sintetis dengan **Web Audio API** (tanpa file suara).
- Lingkaran & kota memakai object-pool + geometri gabungan → tetap 60 FPS.
