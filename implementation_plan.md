# Otomatisasi Status Sold & Redesain Ribbon Sold Out (Konsep 3)

Rencana ini bertujuan untuk memudahkan pembaruan status produk yang terjual (sold) melalui file terpusat di folder `public`, sekaligus mengimplementasikan desain Sold Out baru sesuai **Konsep 3 (Darken + Diagonal Sold Ribbon)** pada Product Card dan Detail Page.

## User Review Required

> [!NOTE]
> File `public/sold.json` akan menjadi sumber data untuk menandai produk sebagai terjual. Pengguna cukup memasukkan nomor koleksi (contoh: `"RC-012"`, `"RC-001"`) ke dalam file ini, lalu sistem secara otomatis mendeteksi dan mengubah status produk tersebut menjadi `Sold` saat build atau development dijalankan.

## Open Questions

*Tidak ada. Rencana ini didasarkan langsung pada Concept 3 dari gambar yang Anda lampirkan dan mempermudah pemeliharaan data.*

## Proposed Changes

---

### Sync Data Script & Public Data

#### [NEW] [sold.json](file:///c:/Users/Eningma/.gemini/antigravity/scratch/royyan-collectibles/public/sold.json)
Membuat file baru di mana pengguna dapat memasukkan ID/nomor koleksi produk yang terjual. Formatnya sangat fleksibel (array JSON, tidak sensitif huruf besar/kecil, dan otomatis menormalisasi format seperti `rc 12` atau `rc-012` menjadi `RC-012`).

#### [MODIFY] [sync-data.js](file:///c:/Users/Eningma/.gemini/antigravity/scratch/royyan-collectibles/scripts/sync-data.js)
Memodifikasi script sinkronisasi untuk:
1. Membaca data dari `public/sold.json` (jika ada).
2. Melakukan normalisasi nomor koleksi dari list terjual tersebut.
3. Mengubah properti `status` item menjadi `"Sold"` jika nomor koleksinya terdaftar di `public/sold.json`.

---

### UI Components (Redesain Sold Out)

#### [MODIFY] [ProductCard.tsx](file:///c:/Users/Eningma/.gemini/antigravity/scratch/royyan-collectibles/components/ProductCard.tsx)
Mengubah overlay sold lama (tulisan "SOLD" sederhana dengan rotasi) menjadi **Concept 3: Diagonal Ribbon**:
1. Menambahkan ribbon miring berwarna merah marun/crimson (`bg-gradient-to-r from-red-900 via-red-700 to-red-900` dengan border emas halus `border-amber-500/40`) bertuliskan **SOLD OUT** dan sub-tulisan **TERIMA KASIH**.
2. Memastikan teks ini ramah Google Translate agar otomatis berubah sesuai bahasa terpilih (misalnya "THANK YOU" untuk bahasa Inggris).

#### [MODIFY] [page.tsx](file:///c:/Users/Eningma/.gemini/antigravity/scratch/royyan-collectibles/app/catalog/[id]/page.tsx)
Menerapkan Concept 3 pada Halaman Detail:
1. Menampilkan Ribbon Diagonal di atas gambar cover detail produk jika statusnya `Sold`.
2. Mengganti tombol WhatsApp Order dengan box khusus berwarna merah/abu-abu gelap bertuliskan **SOLD OUT / Produk ini sudah tidak tersedia** ketika produk terjual.

## Verification Plan

### Automated Tests
- Menjalankan sinkronisasi data dengan perintah:
  `npm run sync-data`
- Memverifikasi bahwa file `lib/generated-data.ts` terupdate dengan status `Sold` pada produk yang didefinisikan di `public/sold.json`.

### Manual Verification
- Menjalankan server lokal: `npm run dev`.
- Membuka halaman katalog dan melihat item yang ditandai sold memiliki tampilan diagonal ribbon yang menawan sesuai gambar konsep.
- Mengubah bahasa ke bahasa Inggris/Jepang untuk memverifikasi translasi otomatis pada pita merah "TERIMA KASIH" dan teks "Produk ini sudah tidak tersedia."
- Membuka detail produk yang sold dan memverifikasi box peringatan sold out di tempat tombol WhatsApp.
