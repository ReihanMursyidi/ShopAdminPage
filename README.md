# Simple Shop Admin Page 🛍️

Project ini adalah aplikasi manajemen toko sederhana (E-Commerce Admin) yang dikembangkan sebagai bagian dari **Pre-Interview Test Web Developer**.

Aplikasi ini mendemonstrasikan kemampuan Fullstack JavaScript (Node.js & Express) dengan fokus pada logika database relasional, manajemen stok (*concurrency handling*), dan tampilan UI/UX yang modern (Dark Mode).

## 🛠️ Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** SQLite (Relational)
* **ORM:** Sequelize
* **Frontend:** EJS (Server-Side Rendering) + Tailwind CSS (via CDN)
* **Fitur Khusus:** ACID Transactions untuk keamanan data stok.

## 🚀 Fitur Utama

1.  **Katalog Produk & UI:**
    * Tampilan Grid Responsif dengan tema **Dark Mode**.
    * Indikator stok visual (Merah jika stok menipis, Hijau jika aman).
    * Gambar produk statis (tersimpan di folder public).
2.  **Sistem Pembelian (Purchasing Logic):**
    * Validasi input (tidak bisa input melebihi sisa stok).
    * Pengurangan stok otomatis di database saat checkout.
3.  **Admin Dashboard:**
    * Riwayat transaksi *real-time* di panel sebelah kanan.
    * **Fitur Cancel Order:** Membatalkan pesanan dan **mengembalikan stok (refund stock)** ke produk terkait secara otomatis.

---

## 💻 Cara Instalasi (Installation)

Pastikan **Node.js** sudah terinstall di komputer Anda.

1.  **Clone Repository**
    ```bash
    git clone https://github.com/ReihanMursyidi/ShopAdminPage.git
    cd ShopAdminPage
    ```

2.  **Install Dependencies**
    Download library yang dibutuhkan (Express, Sequelize, SQLite3, EJS):
    ```bash
    npm install
    ```

3.  **Setup Database (PENTING)**
    Jalankan perintah ini untuk membuat file database SQLite dan mengisi 10 produk dummy:
    ```bash
    node seed.js
    ```
    *Output sukses: "10 Produk berhasil"*

4.  **Jalankan Server**
    ```bash
    node server.js
    ```

5.  **Akses Aplikasi**
    Buka browser dan kunjungi: `http://localhost:3000`

---

## 📖 Panduan Penggunaan (User Guide)

Berikut adalah langkah-langkah untuk menguji fitur aplikasi:

### 1. Simulasi Pembelian (User)
1.  Pilih salah satu produk di katalog sebelah kiri.
2.  Lihat jumlah stok yang tersedia.
3.  Masukkan jumlah barang yang ingin dibeli (misal: 2).
4.  Klik tombol **"Beli Sekarang"**.
5.  **Hasil:** Halaman akan refresh, stok produk akan berkurang sesuai jumlah pembelian, dan transaksi akan muncul di panel kanan (History).

### 2. Simulasi Stok Habis
1.  Cari produk dengan stok sedikit.
2.  Beli semua sisa stok produk tersebut.
3.  **Hasil:** Tombol beli akan berubah menjadi **"Stok Habis"** (disabled) dan Anda tidak bisa membeli lagi.

### 3. Simulasi Pembatalan / Admin (Cancel Order)
1.  Lihat panel **"Transaksi Terkini"** di sebelah kanan.
2.  Klik tombol **"Batalkan Pesanan"** pada salah satu transaksi sukses.
3.  Klik "OK" pada konfirmasi browser.
4.  **Hasil:** * Status transaksi berubah menjadi "BATAL" (warna merah).
    * Stok produk yang dibatalkan akan **bertambah kembali** (Refund Stock).

---

## 📂 Struktur Folder

```text
.
├── database.js     # Konfigurasi Database & Model (Sequelize)
├── server.js       # Entry point, Routing & Business Logic
├── seed.js         # Script seeding data
├── public/         # Aset statis (Gambar produk disimpan di sini)
├── views/          # Tampilan Frontend (EJS)
└── README.md       # Dokumentasi
